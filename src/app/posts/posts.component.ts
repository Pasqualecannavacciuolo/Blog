import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../models/Post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {

  // Saves all the posts from the API
  posts: Post[] = [];

  private subscription: Subscription | undefined;

  // Saves all the tags from the API
  tagList: string[]|undefined;
  uniqueTags: any[] = []; // Final list tha removes all the duplicates

  filterContent: Post[] = []; // Saves all the posts that we want to dispaly using the filter options

  constructor(private service: PostService) {}
  

  ngOnInit(): void {
    this.showPosts();
    console.log(this.filterContent)
  }

  /**
   * Getting the posts from the Service
   */
  showPosts() {
    this.subscription = this.service.getPosts()
    .subscribe(data => {
      // Ho creato questo passaggio perchè nella risposta dell'API ricevo una stringa di tags
      let fetched_posts = JSON.parse(JSON.stringify(data)) // Converto la risposta in JSON
      
      /* 
      * Creo un array temporaneo per salvare i tags relativi ad un post
      * Dopodichè li saoverò nel fetchedPost e salverò definitivamente in posts
      */
      let tagsArray: string[] = [];
      for(let i=0; i< data.length; i++) {
        tagsArray.push(fetched_posts[i]['tags'].split(/[ ,]+/))
        fetched_posts[i]['tags'] = tagsArray[i];
        this.posts = fetched_posts;
        this.filterContent = [...this.posts];
      }
      
      this.tagList = tagsArray;
      
      // Rimuovo i duplicati dall'array di tags
      for(let i=0; i<this.tagList.length; i++) {
        for(let j=0; j<this.tagList[i].length; j++) {
          if (!this.uniqueTags.includes(this.tagList[i][j])) {
            this.uniqueTags.push(this.tagList[i][j]);
          }
        }
      }
      //console.log(this.uniqueTags)
    });
  }

  /**
   * Filtering the posts
   * @param value -> Getting the value of the filter button
   */
  getValue(value: any) {    
      this.filterContent = this.posts.filter((post: Post) => {
        return post.tags.includes(value);
      });
  }

  /**
   * Called on a click -> reset the filters and displays all posts
   */
  reset() {
    this.filterContent = [...this.posts];
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

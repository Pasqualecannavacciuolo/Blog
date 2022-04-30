import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../models/Post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post: Post | undefined;

  constructor(private service: PostService, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadPost()
  }

  loadPost() {
    this.actRoute.params.subscribe(params => {
      const id = params['id'];
      if(id){
        this.service.getById(id).subscribe(p => this.post = p);
      }
    });
  }


}

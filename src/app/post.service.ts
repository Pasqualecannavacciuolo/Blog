import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './models/Post';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostService implements OnInit{

  constructor(private http: HttpClient) {}
  
  
  ngOnInit(): void {
    
  }


  getPosts(): Observable<Post[]>{
    return this.http.get<Post[]>('http://localhost:8080/api/v1/');
  }

  getById(id: any): Observable<any>{
    const url = `http://localhost:8080/api/v1/${id}`;
    return this.http.get(url);
  }


}

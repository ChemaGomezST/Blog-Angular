import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params} from '@angular/router';
import { params } from 'jquery';
import { error } from 'protractor';
import {Category} from '../../models/category';
import {UserService} from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { CategoryService} from '../../services/category.service'; 
import { global} from '../../services/global';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers:[CategoryService,UserService,PostService]
})
export class CategoryDetailComponent implements OnInit {
    public page_title :string;
    public status;
    public identity;
    public token;
    public category:Category;
    public posts:any;
    public url:string;

  constructor(
      private _route:ActivatedRoute,
      private _router:Router,
      private _categoryService:CategoryService,
      private _userService:UserService,
      private _postService:PostService

  ) { 
    this.url=global.url;
    this.identity= this._userService.getIdentity();
    this.token=this._userService.getToken();
  }

  ngOnInit(): void {
    this.getPostsByCategory();
  }


  getPostsByCategory(){
    
    this._route.params.subscribe(params =>{
        let id = +params['id'];
      
        this._categoryService.getCategory(id).subscribe(
          response=>{
              if(response.status == 'success'){
                this.category=response.category;

                this._categoryService.getPosts(id).subscribe(
                  response =>{
                      if(response.status == 'success'){
                        this.posts=response.post;
                      }else{
                        this._router.navigate(['/inicio']);
                      }
                     
                  },
                  error=>{
                    console.log(error);
                  }
                );
              }else{
                this._router.navigate(['/inicio']);
              }
          },
           error =>{
             
            console.log(error);
          } 
        );
      },
      error=>{
          console.log(error);
      }
    );

  }
  deletePost(id){
    this._postService.delete(this.token,id).subscribe(
     response =>{
      this.getPostsByCategory();
     },error=>{
       console.log(error);

     }
    );
  }

}

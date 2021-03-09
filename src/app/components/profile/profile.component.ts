import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,Params} from '@angular/router';
import {UserService} from '../../services/user.service';
import { Post} from '../../models/post';
import { User} from '../../models/user';
import { PostService } from '../../services/post.service';
import { global } from '../../services/global';
import { tick } from '@angular/core/testing';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [PostService,UserService]
})
export class ProfileComponent implements OnInit {
  public url;
  public status;
  public identity;
  public token;
  public user:User;
  public posts:Array<Post>;
  
    constructor(
  
      private _postService:PostService,
      private _userService:UserService,
      private _route:ActivatedRoute,
      private _router:Router
  
    ) {
    
      this.url=global.url;
      this.identity= this._userService.getIdentity();
      this.token=this._userService.getToken();
     }

 
     ngOnInit(): void {
      this.getProfile();
    }

    getProfile(){
      this._route.params.subscribe(
        params =>{
        let userId =+ params['id'];
        this.getUser(userId);
        this.getPosts(userId);
        });
    }
    
    getUser(userId){
      this._userService.getUser(userId).subscribe(
           
        response =>{
            if(response.status == 'success'){
                this.user= response.user;
                console.log(this.user);
            }
        },
        error =>{
            console.log(error);
        }
  
       );
    }
    
     getPosts(userId){
       this._userService.getPosts(userId).subscribe(
           
        response =>{
            if(response.status == 'success'){
                this.posts= response.post;
                console.log(this.posts);
            }
        },
        error =>{
            console.log(error);
        }
  
       );
     }
    
     deletePost(id){
       
       this._postService.delete(this.token,id).subscribe(
        response =>{
          this.getProfile();        
        },
        error=>{
          console.log(error);
  
        }
       );
     }

}

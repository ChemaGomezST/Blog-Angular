import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,Params} from '@angular/router';
import { Post} from '../../models/post';
import { PostService} from '../../services/post.service';
import { UserService} from '../../services/user.service';
import { from } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { global } from '../../services/global';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService,UserService]

})
export class PostDetailComponent implements OnInit {
public status;
public post;
public url;
public identity;

  constructor(
    
      private _postService:PostService,
      private _route:ActivatedRoute,
      private _router:Router,
      private _userService:UserService
      

  ) { 
    this.identity=_userService.getIdentity();
    this.url=global.url;

  }

  ngOnInit(): void {
    this.getPost();
  }

 getPost(){
  //Sacar el id del post desde la url
    this._route.params.subscribe(
      params =>{
      let id =+params['id'];
      console.log(id);
    
    //Peticion ajax para sacar los datos del curso
    
    this._postService.getPost(id).subscribe( 
      response=>{
          if(response.status == 'success'){
            this.post= response.post;
            console.log(this.post);
          }else{
            this._router.navigate(['/inicio']);
          }
    },
    error =>{
      console.log(error);
      this._router.navigate(['/inicio']);
    }
      
      );
    });
  

    

  }
   

}

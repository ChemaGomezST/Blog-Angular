import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params} from '@angular/router';
import { UserService} from '../../services/user.service';
import { CategoryService} from '../../services/category.service';
import { PostService} from '../../services/post.service';
import { Post} from '../../models/post';
import { global} from '../../services/global';

@Component({
  selector: 'post-edit',
  templateUrl: '../post-new/post-new.component.html',
  providers: [UserService,PostService]
})
export class PostEditComponent implements OnInit {
public page_title:string;
public identity;
public token;
public post:Post;
public categories;
public status;
public resetVar;
public url; 
public is_edit:boolean;

public froala_options: Object = {
  charCounterCount: true,
  language:'es',
  toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat'],
  toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat'],
  toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat'],
  toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat'],
};

public afuConfig = {
  multiple: false,
  formatsAllowed: ".jpg,.png,.gif,.jpeg",
  maxSize: "50",
  uploadAPI:  {
    url:global.url+'post/upload',

    headers: {
   "Authorization" : this._userService.getToken()
    },
    params: {
      'page': '1'
    },
    responseType: 'blob',
  },
  theme: "attachPin",
  hideProgressBar: false,
  hideResetBtn: true,
  hideSelectBtn: false,
  attachPinText:'Sube tu imagen de post'

};


  constructor(

    private _route:ActivatedRoute,
    private _router:Router,
    private _userService:UserService,
    private _categoryService:CategoryService,
    private _postService:PostService

  ) { 

    this.page_title='Editar Entrada';
    this.identity= this._userService.getIdentity();
    this.token= this._userService.getToken();
    this.is_edit=true;
    this.url=global.url;
    
  }

  OnSubmit(form){
    this._postService.update(this.token,this.post,this.post.id).subscribe(
      response =>{
          if(response.status== 'success'){
            this.status='success';
            ///Redirigir ala pagina del post
            this._router.navigate(['/entrada/',this.post.id]);

          }else{
            this.status='error';
          }
      },
      error =>{
        this.status='error';
      }

    );
   
  }

  ngOnInit(): void {
    this.post= new Post(1,this.identity.sub,1,'','',null,null);
    this.getCategories();
    this.getPost();
 
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      response =>{
        if(response.status == 'success'){
          this.categories = response.categories;
    
        }

      },
      error =>{
          console.log(error);

      }
    );
  }
  
 getPost(){
  //Sacar el id del post desde la url
    this._route.params.subscribe(
      params =>{
      let id =+params['id'];

    //Peticion ajax para sacar los datos del curso
    
    this._postService.getPost(id).subscribe( 
      response=>{
          if(response.status == 'success'){
            this.post= response.post;

            if(this.post.user_id !=this.identity.sub){
              this._router.navigate(['/inicio']);
            }
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
  imageUpload(data){
    let image_data = JSON.parse(data.response);
    this.post.image = image_data.image;
  }
}

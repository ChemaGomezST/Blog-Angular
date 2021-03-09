import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
@Input() posts;
@Input() identity;
@Input() url;

@Output()
delete= new EventEmitter<number>(); 

  constructor() { }

  ngOnInit(): void {
  }

  deletePost(Postid){
    this.delete.emit(Postid);
  }
}

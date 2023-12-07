import { Component, OnInit } from '@angular/core';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { getPostById } from '../state/posts.selectors';
import { Observable } from 'rxjs';
import { Post } from '../../models/posts.model';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent implements OnInit {
  post: Observable<Post>;

  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    //this.post = this.store.select(getPostById);

  }
}

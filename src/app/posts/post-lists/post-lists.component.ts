import { Component, OnInit } from '@angular/core';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from '../../models/posts.model';

import { getPosts } from './../state/posts.selectors';
import { deletePost, loadPosts } from '../state/posts.actions';

@Component({
  selector: 'app-post-lists',
  templateUrl: './post-lists.component.html',
  styleUrl: './post-lists.component.css',
})
export class PostListsComponent implements OnInit {
  posts: Observable<Post[]>;

  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.posts = this.store.select(getPosts);
    this.store.dispatch(loadPosts());
  }

  onDeletePost(id: string) {
    if (confirm('are you sure to delete')) {
      this.store.dispatch(deletePost({ id }));
    }
  }
}

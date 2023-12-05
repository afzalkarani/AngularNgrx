import { RouterModule, Routes } from '@angular/router';
import { PostListsComponent } from './post-lists/post-lists.component';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { postsReducer } from './state/posts.reducer';
import { POST_STATE_NAME } from './state/posts.selectors';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from './state/posts.effects';

const routes: Routes = [
  {
    path: '',
    component: PostListsComponent,
    children: [
      { path: 'posts/add', component: AddPostComponent },
      { path: 'edit/:id', component: EditPostComponent },
    ],
  },
];

@NgModule({
  declarations: [
    PostListsComponent, 
    AddPostComponent, 
    EditPostComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(POST_STATE_NAME, postsReducer),
    EffectsModule.forFeature([PostsEffects])
  ],
})
export class PostsModule {}

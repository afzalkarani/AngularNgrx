import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostsService } from '../../services/posts.service';
import { addPost, addPostSuccess, loadPosts, loadPostsSuccess } from './posts.actions';
import { map, mergeMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Router } from '@angular/router';
import { setErrorMessage, setLoadingSpinner } from '../../store/shared/shared.actions';


@Injectable()
export class PostsEffects {
  constructor(
    private actions$: Actions, 
    private postsService: PostsService,
    private store: Store<AppState>,
    private router: Router
    ) {}

  postRedirect$ = createEffect(
    () => {       
      return this.actions$.pipe(
        ofType(...[addPostSuccess]),
        tap((action) => {    
          this.store.dispatch(setErrorMessage({ errorMessage: '' }));       
          this.store.dispatch(setLoadingSpinner({ status: false }));   
          if(action.redirect)
          {            
            this.router.navigate(['/posts']);
          }
        })
      );
    },
    { dispatch: false }
  );



  loadposts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPosts),
      mergeMap((action) => {
        return this.postsService.getPosts().pipe(
          map((posts) => {
            return loadPostsSuccess({ posts });
          })
        );
      })
    );
  });

  addPost$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(addPost),
        mergeMap((action) => {
        this.store.dispatch(setLoadingSpinner({ status: true }));
          return this.postsService.addPost(action.post).pipe(
            map((data) => {
             const post = {...action.post, id:data.name}
             return addPostSuccess({post, redirect:true})

            })
          );
        })
      );
    }   
  );
}

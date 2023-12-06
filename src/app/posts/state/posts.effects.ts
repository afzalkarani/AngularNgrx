import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PostsService } from '../../services/posts.service';
import {
  addPost,
  addPostSuccess,
  deletePost,
  deletePostSuccess,
  loadPosts,
  loadPostsSuccess,
  updatePost,
  updatePostSuccess,
} from './posts.actions';
import {
  Observable,
  catchError,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Router } from '@angular/router';
import {
  setErrorMessage,
  setLoadingSpinner,
} from '../../store/shared/shared.actions';
import { loaderInit } from '../../shared/loader/state/loader.actions';
import { Loader } from '../../models/Loader.model';

@Injectable()
export class PostsEffects {
  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  deleteSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(deletePostSuccess),
        tap((action) => {
          this.store.dispatch(
            loaderInit({
              component: {
                message: `Deleting Post ${action.id}`,
                spinDialog: false,
              },
            })
          );
          this.router.navigate(['/posts']);
        })
      );
    },
    { dispatch: false }
  );
  postRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[addPostSuccess, updatePostSuccess]),
        tap((action) => {
          this.store.dispatch(setErrorMessage({ errorMessage: '' }));
          this.store.dispatch(
            loaderInit({
              component: {
                message: `Saving Post ${action.post.title}`,
                spinDialog: false,
              },
            })
          );
          if (action.redirect) {
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

  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPost),
      mergeMap((action) => {
        this.store.dispatch(
          loaderInit({
            component: {
              message: `Saving Post ${action.post.title}`,
              spinDialog: true,
            },
          })
        );
        return this.postsService.addPost(action.post).pipe(
          map((data) => {
            const post = { ...action.post, id: data.name };
            return addPostSuccess({ post, redirect: true });
          }),
          catchError((err) => {

            const error_message =   `${err.error.error} error occurred while saving ${action.post.title}. Please login to repost`
            this.store.dispatch(setErrorMessage({errorMessage: error_message}))
            this.router.navigate(['auth'])

            this.store.dispatch(
              loaderInit({
                component: {
                  message:error_message,
                  spinDialog: false,
                },
              })
            );
            throw 'error in source. Details: ' + JSON.stringify(err);
          })
        );
      })     
    );
  });

  updatePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatePost),
      switchMap((action) => {
        this.store.dispatch(
          loaderInit({
            component: {
              message: `Updating Post ${action.post.title}`,
              spinDialog: true,
            },
          })
        );
        return this.postsService.updatePost(action.post).pipe(
          map((data) => {
            return updatePostSuccess({ post: action.post, redirect: true });
          })
        );
      })
    );
  });

  deletePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletePost),
      switchMap((action) => {
        this.store.dispatch(
          loaderInit({
            component: {
              message: `Deleting Post ${action.id}`,
              spinDialog: true,
            },
          })
        );
        return this.postsService.deletePost(action.id).pipe(
          map((data) => {
            return deletePostSuccess({ id: action.id });
          })
        );
      })
    );
  });
}

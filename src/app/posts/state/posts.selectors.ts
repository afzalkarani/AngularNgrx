import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './posts.state';
import { getCurrentRoute } from '../../store/router/router.selector';
import { RouterStateUrl } from '../../store/router/custom-serializer';

export const POST_STATE_NAME = 'posts';

const getPostsState = createFeatureSelector<PostsState>(POST_STATE_NAME);

export const getPosts = createSelector(getPostsState, (state) => {
  return state.posts;
});

export const getPostById = createSelector(
  getPosts,
  getCurrentRoute,
  (posts, route: RouterStateUrl) => {

    let date = new Date()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    let milliseconds = date.getMilliseconds();

    console.log(`getPostById ${minutes}:${seconds}.${milliseconds}`)
    return posts ? posts.find((post) => post.id === route.params['id']) : null;
  }
);

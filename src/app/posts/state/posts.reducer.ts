import { createReducer, on } from '@ngrx/store';
import { initialState } from './posts.state';
import { addPostSuccess, deletePost, loadPostsSuccess, updatePost } from './posts.actions';

const _postsReducer = createReducer(
  initialState,

  on(addPostSuccess, (state, action) => {

    let post = { ...action.post };   

    console.log('addPostSuccess')

    return {
      ...state,
      posts: [...state.posts, post]
    };

    
    

  }),

  on(updatePost, (state, action) => {
    const updatedPost = state.posts.map((post) => {
      return action.post.id === post.id ? action.post : post;
    });
    return {      ...state,      posts: updatedPost };
  }),
  on(deletePost, (state, { id }) => {
    const updatedPost = state.posts.filter((post) => {
      return post.id != id;
    });
    return {...state,      posts: updatedPost,    };
  }),
  on(loadPostsSuccess, (state, action) =>{
    return {
      ...state,
      posts:action.posts

    }
  })
);

export function postsReducer(state, action) {
  return _postsReducer(state, action);
}

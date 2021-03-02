import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl } from 'src/app/store/router/custom-serializer';
import { getCurrentRoute } from 'src/app/store/router/router.selector';
import { postsAdapter, PostsState } from './posts.state';

export const POST_STATE_NAME = 'posts';

const getPostsState = createFeatureSelector<PostsState>(POST_STATE_NAME);
export const postsSelectors = postsAdapter.getSelectors(); // using selector with entity

export const getPosts = createSelector(getPostsState, postsSelectors.selectAll);
export const getPostEntites = createSelector(
  getPostsState,
  postsSelectors.selectEntities
);

export const getPostById = createSelector(
  getPostEntites,
  getCurrentRoute,
  (posts, route: RouterStateUrl) => {
    return posts ? posts[route.params.id] : null; // return post by id
  }
);

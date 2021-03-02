import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Post } from 'src/app/models/posts.model';

export interface PostsState extends EntityState<Post> {}
export const postsAdapter = createEntityAdapter<Post>();
export const initialState: PostsState = postsAdapter.getInitialState(); // you can add default posts here.

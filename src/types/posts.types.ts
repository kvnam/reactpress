import { WPPost, WPCategory } from "./wptypes";

export const LOADING_ALL_POSTS = "LOADING_ALL_POSTS";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const SINGLE_POST_ACTION = "SINGLE_POST_ACTION";
export const SEARCH_POSTS_ACTION = "SEARCH_POSTS_ACTION";

export interface RPPost extends WPPost {
  medialink?: string;
  categoryTags?: WPCategory[];
}

export type LoadingPostsAction = {
  type: typeof LOADING_ALL_POSTS;
  postsLoading: boolean;
};

export type GetAllPostsAction = {
  posts: [WPPost] | any | null;
  postsLoading?: boolean;
  error?: Error | any | null;
};

export type GetSinglePostAction = {
  post?: RPPost | any | null;
  error?: Error | any | null;
  postsLoading?: boolean;
};

export type SearchPostsAction = {
  posts?: [WPPost] | any | null;
  postsLoading?: boolean;
  error?: Error | any | null;
};

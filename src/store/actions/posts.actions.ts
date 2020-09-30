import { ThunkAction, ThunkDispatch } from "redux-thunk";
import axiosOrig, { AxiosResponse } from "axios";
import axios from "../../axios-wp";

import {
  LOADING_ALL_POSTS,
  SINGLE_POST_ACTION,
  SEARCH_POSTS_ACTION,
  GET_ALL_POSTS,
  PostActionTypes,
} from "../../types/posts.types";
import { WPMedia, WPPost } from "../../types/wptypes";

type MediaLinkType = {
  media_link?: string;
};

export const loadAllPosts = (perpage: number): ThunkAction<Promise<void>, {}, {}, PostActionTypes> => {
  //Load all posts available on WordPress site
  return (dispatch: ThunkDispatch<{}, {}, PostActionTypes>): Promise<void> => {
    dispatch({ type: LOADING_ALL_POSTS, postsLoading: true });
    return axios
      .get("/wp/v2/posts?per_page=" + perpage)
      .then((postsRes: AxiosResponse) => {
        //Retrieve a list of all Media IDs
        let mediaIds: [number?] = [];
        postsRes.data.forEach((post: WPPost) => {
          mediaIds.push(post.featured_media);
        });
        //Retrieve media from WP DB
        axios
          .get("/wp/v2/media?include=" + mediaIds.join(","))
          .then((mediaRes: AxiosResponse) => {
            let updatedPosts = null;
            updatedPosts = postsRes.data.map((postObj: WPPost) => {
              let mediaLinkObj: MediaLinkType = {};
              mediaRes.data.forEach((media: WPMedia) => {
                if (media.id === postObj.featured_media) {
                  mediaLinkObj.media_link = media.guid.rendered;
                }
              });
              return {
                ...postObj,
                ...mediaLinkObj,
              };
            });
            dispatch({ type: GET_ALL_POSTS, posts: updatedPosts, postsLoading: false });
          })
          .catch((err) => {
            dispatch({ type: GET_ALL_POSTS, error: err, postsLoading: false });
          });
      })
      .catch((err) => {
        dispatch({ type: GET_ALL_POSTS, error: err, postsLoading: false });
      });
  };
};

function getMedia(mediaId: number) {
  return axios.get("/wp/v2/media/" + mediaId);
}

function getCats(catIds: [number]) {
  return axios.get("wp/v2/categories?include=" + catIds.join(","));
}

export const loadSinglePost = (pid: number): ThunkAction<Promise<void>, {}, {}, PostActionTypes> => {
  return (dispatch: ThunkDispatch<{}, {}, PostActionTypes>): Promise<void> => {
    return axios
      .get("/wp/v2/posts/" + pid)
      .then((postRes: AxiosResponse) => {
        const post: WPPost = postRes.data;
        //Retrieve featured image
        let mediaId = post.featured_media;
        axiosOrig
          .all([getMedia(mediaId), getCats(post.categories)])
          .then(
            axiosOrig.spread(function (mediaRes, catRes) {
              let postObject = {
                ...post,
                medialink: mediaRes.data.guid.rendered,
                categoryTags: [...catRes.data],
              };
              dispatch({ type: SINGLE_POST_ACTION, post: postObject, postsLoading: false });
            }),
          )
          .catch((err) => {
            dispatch({ type: SINGLE_POST_ACTION, error: err, postsLoading: false });
          });
      })
      .catch((err) => {
        dispatch({ type: SINGLE_POST_ACTION, error: err, postsLoading: false });
      });
  };
};

export const searchAllPosts = (term: string): ThunkAction<Promise<void>, {}, {}, PostActionTypes> => {
  return (dispatch: ThunkDispatch<{}, {}, PostActionTypes>): Promise<void> => {
    return axios
      .get("/wp/v2/posts?search=" + term)
      .then((postResults) => {
        //Retrieve featured images
        let mediaIds: [number?] = [];
        postResults.data.forEach((post: WPPost) => {
          mediaIds.push(post.featured_media);
        });
        if (mediaIds.length !== 0) {
          axios
            .get("/wp/v2/media?include=" + mediaIds.join(","))
            .then((mediaResults) => {
              let updatedPosts = null;
              updatedPosts = postResults.data.map((post: WPPost) => {
                let mediaLinkObj: MediaLinkType = {};
                mediaResults.data.forEach((media: WPMedia) => {
                  if (media.id === post.featured_media) {
                    mediaLinkObj.media_link = media.guid.rendered;
                  }
                });
                return {
                  ...post,
                  ...mediaLinkObj,
                };
              });
              dispatch({ type: SEARCH_POSTS_ACTION, posts: updatedPosts, postsLoading: false });
            })
            .catch((error) => {
              //Attach a placeholder image
            });
        }
      })
      .catch((err) => {
        dispatch({ type: SEARCH_POSTS_ACTION, error: err, postsLoading: false });
      });
  };
};

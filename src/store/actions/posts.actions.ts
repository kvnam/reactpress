import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosOrig from "axios";
import axios from "@/axios-wp";

import { SINGLE_POST_ACTION, SEARCH_POSTS_ACTION, GET_ALL_POSTS, RPPost } from "@rptypes/posts.types";
import { WPMedia, WPPost, WPCategory } from "@rptypes/wptypes";

type MediaLinkType = {
  media_link?: string;
};

export const loadAllPosts = createAsyncThunk("posts/loadAllPosts", async (perpage: number, { rejectWithValue }) => {
  const postsResponse = await axios.get(`/wp/v2/posts?per_page=${perpage}`);
  if (postsResponse) {
    const mediaIds: [number?] = [];
    postsResponse.data.forEach((post: WPPost) => {
      mediaIds.push(post.featured_media);
    });
    // Retrieve media from WP DB
    const mediaRes = await axios.get(`/wp/v2/media?include=${mediaIds.join(",")}`);
    if (mediaRes) {
      let updatedPosts = null;
      updatedPosts = postsResponse.data.map((postObj: WPPost) => {
        const mediaLinkObj: MediaLinkType = {};
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
      return { type: GET_ALL_POSTS, posts: updatedPosts, postsLoading: false };
    }
  }
  return rejectWithValue({ type: GET_ALL_POSTS, posts: [], postsLoading: false, error: "Error loading posts" });
});

export const loadSinglePost = createAsyncThunk("posts/loadSinglePost", async (pid: number, { rejectWithValue }) => {
  const postResponse = await axios.get(`/wp/v2/posts/${pid}`);
  if (postResponse) {
    const post: WPPost = postResponse.data;
    const postObject: RPPost = {
      ...post,
    };
    // Retrieve featured image
    const mediaId = post.featured_media;
    if (mediaId) {
      const mediaRes = await axios.get(`/wp/v2/media/${mediaId}`);
      postObject.medialink = mediaRes.data.guid.rendered;
    }
    if (post.categories?.length) {
      const categoriesResp = await axios.get(`wp/v2/categories?include=${post.categories.join(",")}`);
      postObject.categoryTags = [...categoriesResp.data];
    }

    return { type: SINGLE_POST_ACTION, post: postObject, postsLoading: false };
  }
  return rejectWithValue({ type: SINGLE_POST_ACTION, post: null, postsLoading: false, error: "Error loading post" });
});

export const searchAllPosts = createAsyncThunk("posts/searchAllPosts", async (term: string, { rejectWithValue }) => {
  const postResults = await axios.get(`/wp/v2/posts?search=${term}`);
  if (postResults?.data) {
    const mediaIds: [number?] = [];
    postResults.data.forEach((post: WPPost) => {
      mediaIds.push(post.featured_media);
    });
    if (mediaIds.length !== 0) {
      const mediaResults = await axios.get(`/wp/v2/media?include${mediaIds.join(",")}`);
      if (mediaResults?.data) {
        let updatedPosts = null;
        updatedPosts = postResults.data.map((post: WPPost) => {
          const mediaLinkObj: MediaLinkType = {};
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

        return { type: SEARCH_POSTS_ACTION, posts: updatedPosts, postsLoading: false };
      }
    }
  }
  return rejectWithValue({ type: SEARCH_POSTS_ACTION, posts: [], postsLoading: false, error: "No posts found" });
});

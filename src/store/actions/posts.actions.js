import axios from "../../axios-wp";
import axiosOrig from "axios";

export const loadAllPosts = (perpage) => {
  //Load all posts available on WordPress site
  return dispatch => {
    axios.get("/wp/v2/posts?per_page=" + perpage)
      .then(postsRes => {
        //Retrieve a list of all Media IDs
        let mediaIds = [];
        postsRes.data.forEach(post => {
          mediaIds.push(post.featured_media);
        });
        //Retrieve media from WP DB
        axios.get("/wp/v2/media?include=" + mediaIds.join(","))
          .then(mediaRes => {
            let updatedPosts = null;
            updatedPosts = postsRes.data.map((post) => {
              mediaRes.data.forEach((media) => {
                if(media.id === post.featured_media){
                  post.media_link = media.guid.rendered;
                }
              });
              return {
                ...post
              };
            });
            dispatch({type: "GET_ALL_POSTS", posts: updatedPosts});    
          }).catch((err) => {
            dispatch({type: "GET_ALL_POSTS_FAIL", error: err});
          });
      }).catch((err) => {
        dispatch({type: "GET_ALL_POSTS_FAIL", error: err});
      });
  };
}

function getMedia(mediaId){
  return axios.get("http://dev.bluekrill.com/demoWP/wp-json/wp/v2/media/" + mediaId);
}

function getCats(catIds){
  return axios.get("http://dev.bluekrill.com/demoWP/wp-json/wp/v2/categories?include=" + catIds.join(","));
}

export const loadSinglePost = (pid) => {
  return dispatch => {
    axios.get("/wp/v2/posts/" + pid)
      .then(post => {
        //Retrieve featured image
        let mediaId = post.data.featured_media;
        axiosOrig.all([getMedia(mediaId), getCats(post.data.categories)])
          .then(axiosOrig.spread(function(mediaRes, catRes) {
            let postRes = {
              ...post.data,
              medialink: mediaRes.data.guid.rendered,
              categoryTags: [
                ...catRes.data
              ]
            };
            dispatch({type: "SINGLE_POST_SUCCESS", post: postRes})
          }))
          .catch((err) => {
            dispatch({type: "SINGLE_POST_FAIL", error: err});    
          })
      })
      .catch((err) => {
        dispatch({type: "SINGLE_POST_FAIL", error: err});
      });
  }
}

export const searchAllPosts = (term) => {
  return dispatch => {
    axios.get("/wp/v2/posts?search=" + term)
      .then(postResults => {
        //Retrieve featured images
        let mediaIds = [];
        postResults.data.forEach((post) => {
          mediaIds.push(post.featured_media);
        });
        if(mediaIds.length !== 0){
          axios.get("/wp/v2/media?include="+ mediaIds.join(","))
            .then(mediaResults => {
              let updatedPosts = null;
              updatedPosts = postResults.data.map((post) => {
                mediaResults.data.forEach((media) => {
                  if(media.id === post.featured_media){
                    post.media_link = media.guid.rendered;
                  }
                });
                return {
                  ...post
                };
              });
              dispatch({type: "SEARCH_POSTS_SUCCESS", posts: updatedPosts});
            }).catch((error) => {
              //Attach a placeholder image
            })
        }
      }).catch((err) => {
        dispatch({type: "SEARCH_POSTS_FAIL", error: err});
      });
  };
}

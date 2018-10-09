import axios from '../../axios-wp';

export const loadAllPosts = (perpage) => {
  //Load all posts available on WordPress site
  return dispatch => {
    axios.get('/wp/v2/posts?per_page=' + perpage)
      .then(postsRes => {
        console.log('[LOADALLPOSTS] Posts returned');
        console.log(postsRes.data);
        //Retrieve a list of all Media IDs
        let mediaIds = [];
        postsRes.data.forEach(post => {
          mediaIds.push(post.featured_media);
        });
        console.log('[LOADALLPOSTS] Featured Media IDs collected');
        console.log(mediaIds);
        //Retrieve media from WP DB
        axios.get('/wp/v2/media?include=' + mediaIds.join(','))
          .then(mediaRes => {
            console.log('[LOADALLPOSTS] Media returned');
            console.log(mediaRes.data[0]);
            let updatedPosts = null;
            updatedPosts = postsRes.data.map(post => {
              mediaRes.data.forEach(media => {
                if(media.id === post.featured_media){
                  post.media_link = media.guid.rendered;
                }
              });
              return {
                ...post
              };
            });
            dispatch({type: 'GET_ALL_POSTS', posts: updatedPosts});    
          }).catch(err => {
            dispatch({type: 'GET_ALL_POSTS_FAIL', error: err});
          });
      }).catch(err => {
        dispatch({type: 'GET_ALL_POSTS_FAIL', error: err});
      });
  }
}

export const loadSinglePost = pid => {
  return dispatch => {
    axios.get('/wp/v2/posts/' + pid)
      .then(post => {
        //Retrieve featured image
        let mediaId = post.data.featured_media;
        axios.get('/wp/v2/media/' + mediaId)
          .then(response => {
            let postRes = {
              ...post.data,
              medialink: response.data.guid.rendered
            };
            dispatch({type: 'SINGLE_POST_SUCCESS', post: postRes})
          })
          .catch(err => {
            dispatch({type: 'SINGLE_POST_FAIL', error: err});    
          })
      })
      .catch(err => {
        dispatch({type: 'SINGLE_POST_FAIL', error: err});
      });
  }
}

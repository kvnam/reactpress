import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as postActions from  './posts.actions';

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

describe('Post Actions', () => {

  beforeEach( () => {
    mockStore.clearActions();
  })

  describe('Get posts', () => {

    test('Dispatches action and payload', () => {
      const expectedActions = [
        {
          type: "GET_ALL_POSTS", 
          posts: 1
        }
      ];

      mockStore.dispatch(postActions.loadAllPosts());
      expect(mockStore.getActions()).toEqual(expectedActions);
    })

  });

});
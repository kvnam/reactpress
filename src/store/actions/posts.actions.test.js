import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

//import * as postActions from  "./posts.actions";

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);
const store = mockStore({ posts: [] });

describe("Post Actions", () => {

  beforeEach( () => {
    store.clearActions();
  })

  describe("Get posts", () => {

    test("Dispatches action and payload", () => {
      // console.log("Inside testing post actions");
      // const expectedActions = [
      //   {
      //     type: "GET_ALL_POSTS", 
      //     posts: []
      //   }
      // ];

      // store.dispatch(postActions.loadAllPosts(1));
      // expect(store.getActions()).toEqual(expectedActions);
    })

  });

});
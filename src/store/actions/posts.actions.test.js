import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

//import * as postActions from  "./posts.actions";

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);
const store = mockStore({ posts: [] });

describe("Post Actions", () => {
  beforeEach(() => {
    store.clearActions();
  });

  describe("Get posts", () => {
    test("Dispatches action and payload", () => {
      // TODO: Add actual tests
      expect(1).toEqual(1);
    });
  });
});

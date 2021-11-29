import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { Col } from "reactstrap";

import Post from "./Post";

describe("<Post />", () => {
  test("Render 4 Cols and title - Test Post", () => {
    const wrapper = shallow(
      <Post title="Test Post" excerpt="Excerpt for post" medialink="" postId={1} onReadMore={() => {}} />,
    );
    const colElements: ShallowWrapper<any, any, typeof Col> = wrapper.find(Col);
    const titleCol = colElements.first().props().children[0];
    expect(colElements).toHaveLength(4);
    expect(titleCol).toEqual("Test Post");
  });
});

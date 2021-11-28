import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Col } from "reactstrap";

import Post from "./Post";

configure({ adapter: new Adapter() });

describe("<Post />", () => {
  test("Render 4 Cols and title - Test Post", () => {
    const wrapper = shallow(<Post title="Test Post" excerpt="Excerpt for post" medialink="" postId={1} />);
    const colElements = wrapper.find(Col);
    const titleCol = wrapper.find(Col).first().props().children[0];
    expect(colElements).toHaveLength(4);
    expect(titleCol).toEqual("Test Post");
  });
});

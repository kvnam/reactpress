import React from "react";
import Post from "./Post";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Col } from "reactstrap";

configure({adapter: new Adapter()});

describe("<Post />" , () => {

  test("Render 4 Cols", () => {
    const editor = shallow(<Post />);
    expect(editor.find(Col)).toHaveLength(4);
  });

});
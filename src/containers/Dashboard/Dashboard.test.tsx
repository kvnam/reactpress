import { shallow } from "enzyme";
import React from "react";

describe("Hello, Enzyme!", () => {
  it("renders", () => {
    const wrapper = shallow(
      <div>
        <h1>Hello, Enzyme!</h1>
      </div>,
    );
    expect(wrapper.find("h1").html()).toMatch(/Hello, Enzyme/);
  });
});

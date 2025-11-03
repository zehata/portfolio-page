import { DialogPortrait as Portrait } from "@/components/about/Portrait";
import { render } from "@testing-library/react";

describe(Portrait, () => {
  test("article page should match snapshot", () => {
    const component = render(
      <Portrait
        mood="neutral"
      ></Portrait>,
    );
    expect(component).toMatchSnapshot();
  });
});

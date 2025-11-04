import Papers from "@/components/article/Papers";
import { render } from "@testing-library/react";

describe(Papers, () => {
  test("papers should match snapshot", () => {
    const component = render(<Papers></Papers>);
    expect(component).toMatchSnapshot();
  });
});

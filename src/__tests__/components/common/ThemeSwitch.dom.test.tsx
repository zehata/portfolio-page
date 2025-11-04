import ThemeSwitch from "@/components/common/ThemeSwitch";
import { render } from "@testing-library/react";

describe(ThemeSwitch, () => {
  test("button should match snapshot", () => {
    const component = render(<ThemeSwitch></ThemeSwitch>);
    expect(component).toMatchSnapshot();
  });
});

import DynamicBackground from "@/components/backgrounds/DynamicBackground";
import { render } from "@testing-library/react";

describe(DynamicBackground, () => {
  test("dynamic background should match snapshot", () => {
    const component = render(
      <DynamicBackground name="about"></DynamicBackground>,
    );
    expect(component).toMatchSnapshot();
  });
});

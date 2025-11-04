import AboutLayout from "@/app/about/layout";
import { render } from "@testing-library/react";

describe(AboutLayout, () => {
  test("about page layout should match snapshot", () => {
    const component = render(
      <AboutLayout>
        <></>
      </AboutLayout>,
    );
    expect(component).toMatchSnapshot();
  });
});

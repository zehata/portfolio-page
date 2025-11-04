import DefaultProjectsPage from "@/app/projects/page";
import { render } from "@testing-library/react";

describe(DefaultProjectsPage, () => {
  test("about page layout should match snapshot", () => {
    const component = render(<DefaultProjectsPage></DefaultProjectsPage>);
    expect(component).toMatchSnapshot();
  });
});

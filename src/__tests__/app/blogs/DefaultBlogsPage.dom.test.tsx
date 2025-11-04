import DefaultBlogsPage from "@/app/blogs/page";
import { render } from "@testing-library/react";

describe(DefaultBlogsPage, () => {
  test("about page layout should match snapshot", () => {
    const component = render(<DefaultBlogsPage></DefaultBlogsPage>);
    expect(component).toMatchSnapshot();
  });
});

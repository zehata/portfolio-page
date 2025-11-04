import DefaultAboutPage from "@/app/about/page";
import { render } from "@testing-library/react";

describe(DefaultAboutPage, () => {
  test("about page layout should match snapshot", () => {
    expect(() =>
      render(<DefaultAboutPage></DefaultAboutPage>),
    ).toThrowErrorMatchingSnapshot();
  });
});

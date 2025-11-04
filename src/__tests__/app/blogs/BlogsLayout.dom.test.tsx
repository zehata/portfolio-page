import BlogLayout from "@/app/blogs/layout";
import { render } from "@testing-library/react";
import { QUERY_TEST_BLOG_ID } from "@/__tests__/testUuids";

import * as getAllArticles from "@/lib/getAllArticles";
import { act } from "react";

jest.mock("next/navigation", () => ({
  usePathname() {
    return "/projects/";
  },
  useRouter() {
    return {};
  },
}));

jest.mock("@/lib/getAllArticles", () => ({
  getAllArticles: jest.fn(),
}));

describe(BlogLayout, () => {
  jest.spyOn(getAllArticles, "getAllArticles").mockResolvedValueOnce([
    {
      id: QUERY_TEST_BLOG_ID,
      title: "test blog",
    },
  ]);
  test("about page layout should match snapshot", async () => {
    const { container } = await act(async () =>
      render(
        <BlogLayout>
          <></>
        </BlogLayout>,
      ),
    );
    expect(container).toMatchSnapshot();
  });
});

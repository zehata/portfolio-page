import BlogLayout from "@/app/blogs/layout";
import { render } from "@testing-library/react";
import { QUERY_TEST_BLOG_1_ID } from "@/__tests__/testlibs/testUuids";

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
      id: QUERY_TEST_BLOG_1_ID,
      title: "test blog",
      slug: "test_blog",
      link: "/blogs/test_blog",
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

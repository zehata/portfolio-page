import { QUERY_TEST_PROJECT_ID } from "@/__tests__/testlibs/testUuids";
import ProjectPage from "@/app/projects/[id]/page";
import { render } from "@testing-library/react";

import * as getArticle from "@/lib/getArticle";
import { act } from "react";

jest.mock("@/lib/getArticle", () => ({
  getArticle: jest.fn(),
}));
jest.mock("@/lib/getAllArticles", () => ({
  getAllArticles: jest.fn(),
}));
jest.mock("@/lib/getArticleBySlug", () => ({
  getArticleBySlug: jest.fn(),
}));

describe(ProjectPage, () => {
  test("about page layout should match snapshot", async () => {
    jest.spyOn(getArticle, "getArticle").mockResolvedValueOnce({
      id: QUERY_TEST_PROJECT_ID,
      title: "test blog",
      created: "0",
      modified: "0",
      content: "blog content",
      stamps: {
        "2a7313f5-5b8d-4b1b-9155-0c93a5ea5e80": {
          color: "#000",
          icon: "",
          id: "2a7313f5-5b8d-4b1b-9155-0c93a5ea5e80",
          label: "Status",
          value: "Ongoing",
        },
      },
    });
    const { container } = await act(async () =>
      render(
        ProjectPage({
          params: new Promise((resolve) =>
            resolve({ id: QUERY_TEST_PROJECT_ID }),
          ),
        }),
      ),
    );
    expect(container).toMatchSnapshot();
  });
});

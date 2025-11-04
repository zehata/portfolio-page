import ProjectsLayout from "@/app/projects/layout";
import { render } from "@testing-library/react";
import { QUERY_TEST_PROJECT_ID } from "@/__tests__/testUuids";

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

describe(ProjectsLayout, () => {
  jest.spyOn(getAllArticles, "getAllArticles").mockResolvedValueOnce([
    {
      id: QUERY_TEST_PROJECT_ID,
      title: "test project",
    },
  ]);
  test("about page layout should match snapshot", async () => {
    const { container } = await act(async () =>
      render(
        <ProjectsLayout>
          <></>
        </ProjectsLayout>,
      ),
    );
    expect(container).toMatchSnapshot();
  });
});

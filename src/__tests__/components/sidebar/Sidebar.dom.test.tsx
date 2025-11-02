import { render } from "@testing-library/react";

import Sidebar from "@/components/sidebar/Sidebar";
import { ArticleType } from "@/lib/types";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {};
  },
}));

describe(Sidebar, () => {
  test("Loading animation snapshot", () => {
    const component = render(
      <Sidebar
        articleType={ArticleType.Blog}
        items={[]}
        serverStarting={false}
      ></Sidebar>,
    );
    expect(component).toMatchSnapshot();
  });
});

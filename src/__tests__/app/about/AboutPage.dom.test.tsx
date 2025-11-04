import AboutPage from "@/app/about/[...id]/page";
import { render } from "@testing-library/react";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {};
  },
}));

describe(AboutPage, () => {
  test("about page layout should match snapshot", async () => {
    const { container } = render(
      await AboutPage({
        params: new Promise((resolve) => resolve({ id: "hello" })),
      }),
    );
    expect(container).toMatchSnapshot();
  });
});

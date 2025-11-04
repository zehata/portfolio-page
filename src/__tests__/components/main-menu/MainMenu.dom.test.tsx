import { render } from "@testing-library/react";

import MainMenu from "@/components/main-menu/MainMenu";

jest.mock("next/navigation", () => ({
  usePathname() {
    return "/";
  },
  useRouter() {
    return {};
  },
}));

describe(MainMenu, () => {
  test("main menu snapshot", () => {
    const component = render(<MainMenu></MainMenu>);
    expect(component).toMatchSnapshot();
  });
});

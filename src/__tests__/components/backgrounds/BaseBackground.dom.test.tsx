import BaseBackground from "@/components/backgrounds/BaseBackground";
import { render } from "@testing-library/react";

jest.mock("next/navigation", () => ({
  usePathname() {
    return "/";
  },
}));

describe(BaseBackground, () => {
  test("base background should match snapshot", () => {
    const component = render(<BaseBackground></BaseBackground>);
    expect(component).toMatchSnapshot();
  });
});

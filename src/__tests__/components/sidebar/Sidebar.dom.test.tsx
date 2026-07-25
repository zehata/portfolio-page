import { render } from "@testing-library/react";

import Sidebar from "@/components/sidebar/Sidebar";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {};
  },
}));

describe(Sidebar, () => {
  test("Loading animation snapshot", () => {
    const component = render(<Sidebar items={[]}></Sidebar>);
    expect(component).toMatchSnapshot();
  });
});

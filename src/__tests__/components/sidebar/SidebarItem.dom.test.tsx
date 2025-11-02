import SidebarItem from "@/components/sidebar/SidebarItem";
import { render } from "@testing-library/react";

describe(SidebarItem, () => {
  test("Loading animation snapshot", () => {
    const component = render(
      <SidebarItem index="0" label="Item 0" clickedId={null}></SidebarItem>,
    );
    expect(component).toMatchSnapshot();
  });
});

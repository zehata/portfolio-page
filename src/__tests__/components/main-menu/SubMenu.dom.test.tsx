import React from "react";
import SubMenu from "@/components/main-menu/SubMenu";
import { render, renderHook } from "@testing-library/react";
import { noop } from "lodash";

describe(SubMenu, () => {
  test("main menu snapshot", () => {
    const mockSubMenuItems = [] as {
      text: string;
      link: string;
      path?: string | undefined;
      image?: string | undefined;
    }[];
    const mockSubMenuRefs = renderHook(() =>
      React.useRef<HTMLDivElement[]>(
        Array.from({ length: mockSubMenuItems.length }),
      ),
    );
    const component = render(
      <SubMenu
        menuOpen={false}
        menuItems={mockSubMenuItems}
        activeMenuIndex={-1}
        submenuRefs={mockSubMenuRefs.result.current}
        handleSubmenuClick={noop}
      ></SubMenu>,
    );
    expect(component).toMatchSnapshot();
  });
});

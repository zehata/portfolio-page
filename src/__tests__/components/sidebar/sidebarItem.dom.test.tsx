import SidebarItem from "@/components/sidebar/SidebarItem";

describe(SidebarItem, () => {
  test("Loading animation snapshot", () => {
    expect(
      SidebarItem({
        index: "0",
        label: "Item 0",
        clickedId: null,
      }),
    ).toMatchSnapshot();
  });
});

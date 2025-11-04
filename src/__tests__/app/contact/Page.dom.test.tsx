import ContactPage from "@/app/contact/page";
import { render } from "@testing-library/react";

describe(ContactPage, () => {
  test("about page layout should match snapshot", () => {
    const component = render(<ContactPage></ContactPage>);
    expect(component).toMatchSnapshot();
  });
});

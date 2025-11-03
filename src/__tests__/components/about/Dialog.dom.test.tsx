import { DialogComponent as Dialog} from "@/components/about/Dialog";
import { render } from "@testing-library/react";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {};
  },
}));

describe(Dialog, () => {
  test("article page should match snapshot", () => {
    const component = render(
      <Dialog
        id="hello"
      ></Dialog>,
    );
    expect(component).toMatchSnapshot();
  });
});

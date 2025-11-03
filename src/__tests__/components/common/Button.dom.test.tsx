import SimpleButton from "@/components/common/Button";
import { render } from "@testing-library/react";

describe(SimpleButton, () => {
  test("button should match snapshot", () => {
    const component = render(
      <SimpleButton></SimpleButton>
    )
    expect(component).toMatchSnapshot();
  })
})
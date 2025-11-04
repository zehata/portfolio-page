import SpeechBubble from "@/components/about/SpeechBubble";
import { render } from "@testing-library/react";
import { noop } from "lodash";

const MOCK_WINDOW_WIDTH = 1920;

describe(SpeechBubble, () => {
  test("article page should match snapshot", () => {
    const mockProceed = noop;
    const component = render(
      <SpeechBubble
        windowWidth={MOCK_WINDOW_WIDTH}
        proceed={mockProceed}
      ></SpeechBubble>,
    );
    expect(component).toMatchSnapshot();
  });
});

import LoadingAnimation from "@/components/sidebar/LoadingAnimation";

describe(LoadingAnimation, () => {
  test("Loading animation snapshot", () => {
    expect(LoadingAnimation({})).toMatchSnapshot();
  });
});

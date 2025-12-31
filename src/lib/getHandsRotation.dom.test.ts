import { getHandsRotation } from "./getHandsRotation";

describe(getHandsRotation, () => {
  const date = new Date();
  const testHandsRotation = (
    time: [number, number, number, number],
    expectedHandsRotation: [number, number],
  ) => {
    date.setHours(...time);
    expect(getHandsRotation(date)).toStrictEqual(expectedHandsRotation);
  };

  test("current hands rotation returned is correct", () => {
    testHandsRotation([0, 0, 0, 0], [0, 0]);
    testHandsRotation([12, 0, 0, 0], [0, 0]);
    testHandsRotation([12, 30, 0, 0], [1 / 24, 0.5]);
    testHandsRotation([15, 0, 0, 0], [0.25, 0]);
  });
});

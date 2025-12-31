"use client";

const MINUTE_SECONDS = 60;
const HOUR_SECONDS = 60 * MINUTE_SECONDS;
const HOUR_HAND_PERIOD = 12 * HOUR_SECONDS;

export const getCurrentHandsRotation = (): [number, number] => {
  const date = new Date();

  const secondsSinceStartOfDay =
    date.getHours() * HOUR_SECONDS +
    date.getMinutes() * MINUTE_SECONDS +
    date.getSeconds();

  const minuteHandRotation =
    (secondsSinceStartOfDay % HOUR_SECONDS) / HOUR_SECONDS;
  const hourHandRotation =
    (secondsSinceStartOfDay % HOUR_HAND_PERIOD) / HOUR_HAND_PERIOD;
  return [hourHandRotation, minuteHandRotation];
};

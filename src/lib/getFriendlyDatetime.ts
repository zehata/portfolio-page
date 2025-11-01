"use client";

export const HOUR_DURATION = 3600000 as const;

export const getFriendlyDatetime = (timestamp: number, currentDate: Date) => {
  if (currentDate.getTime() - timestamp < 1 * HOUR_DURATION)
    return "(Just now)";
  const timeAtStartOfDay = currentDate.setHours(0, 0, 0, 0);
  const timeSinceStartOfDay = timeAtStartOfDay - timestamp;
  if (timeSinceStartOfDay < 0) return "(Today)";
  if (timeSinceStartOfDay < 24 * HOUR_DURATION) return "(Yesterday)";
  if (timeSinceStartOfDay < 2 * 24 * HOUR_DURATION)
    return "(A couple of days ago)";
  if (timeSinceStartOfDay < 7 * 24 * HOUR_DURATION) return "(A few days ago)";
  if (timeSinceStartOfDay < 14 * 24 * HOUR_DURATION) return "(Last week)";
  return "";
};

export default getFriendlyDatetime;

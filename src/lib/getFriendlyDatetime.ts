"use client";

const hourDuration = 3600000 as const;

export const getFriendlyDatetime = (date: number) => {
  const timeAtStartOfDay = new Date().setHours(0, 0, 0, 0);
  const timeSinceStartOfDay = timeAtStartOfDay - date;
  if (Date.now() - date < 1 * hourDuration) return "(Just now)";
  if (timeSinceStartOfDay < 0) return "(Today)";
  if (timeSinceStartOfDay < 24 * hourDuration) return "(Yesterday)";
  if (timeSinceStartOfDay < 2 * 24 * hourDuration)
    return "(A couple of days ago)";
  if (timeSinceStartOfDay < 7 * 24 * hourDuration) return "(A few days ago)";
  if (timeSinceStartOfDay < 14 * 24 * hourDuration) return "(Last week)";
  return "";
};

export default getFriendlyDatetime;

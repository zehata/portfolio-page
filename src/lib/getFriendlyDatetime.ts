"use client";

const hourDuration = 3600000 as const;

export const getFriendlyDatetime = (date: number) => {
  const timeSince = Date.now() - date;
  if (timeSince < 1 * hourDuration) return "(Just now)";
  if (timeSince < 24 * hourDuration) return "(Today)";
  if (timeSince < 2 * 24 * hourDuration) return "(A couple of days ago)";
  if (timeSince < 7 * 24 * hourDuration) return "(A few days ago)";
  return "";
}

export default getFriendlyDatetime;
import getFriendlyDatetime from "@/lib/getFriendlyDatetime";

describe(getFriendlyDatetime, () => {
  const currentDate = new Date(Date.parse("01 Apr 2025 11:00:00 +8"));

  test("returns just now for timestamp from less than an hour ago", () => {
    const timestamp = Date.parse("01 Apr 2025 10:30:00 +8");
    expect(getFriendlyDatetime(timestamp, currentDate)).toEqual("(Just now)");
  });

  test("returns today for timestamp from earlier today", () => {
    const timestamp = Date.parse("01 Apr 2025 09:00:00 +8");
    expect(getFriendlyDatetime(timestamp, currentDate)).toEqual("(Today)");
  });

  test("returns yesterday for timestamp from a day ago and less than 2 days ago", () => {
    const timestamp = Date.parse("31 Mar 2025 11:00:00 +8");
    expect(getFriendlyDatetime(timestamp, currentDate)).toEqual("(Yesterday)");
  });

  test("returns a couple of days ago for timestamp from more than 2 days ago and less than 3 days ago", () => {
    const timestamp = Date.parse("30 Mar 2025 11:00:00 +8");
    expect(getFriendlyDatetime(timestamp, currentDate)).toEqual(
      "(A couple of days ago)",
    );
  });

  test("returns a few days ago for timestamp more than 3 days ago and less than a week ago", () => {
    const timestamp = Date.parse("25 Mar 2025 11:00:00 +8");
    expect(getFriendlyDatetime(timestamp, currentDate)).toEqual(
      "(A few days ago)",
    );
  });

  test("returns last week for timestamp more than a week ago and less than 2 weeks ago", () => {
    const timestamp = Date.parse("22 Mar 2025 11:00:00 +8");
    expect(getFriendlyDatetime(timestamp, currentDate)).toEqual("(Last week)");
  });

  test("should return nothing for timestamp from more than 2 weeks ago", () => {
    const timestamp = Date.parse("22 Feb 2025 11:00:00 +8");
    expect(getFriendlyDatetime(timestamp, currentDate)).toEqual("");
  });
});

"server-only";

export const fetchDatabaseState = async () => {
  return "active";
  console.log("Fetching database state");
  const response = await (
    await fetch(
      `https://console.neon.tech/api/v2/projects/${process.env.NEON_PROJECT_ID}/endpoints/${process.env.ENV === "production" ? process.env.ENDPOINT_ID : process.env.DEV_ENDPOINT_ID}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.NEON_API_KEY}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    )
  ).json();
  return response.endpoint.current_state as string;
};

export default fetchDatabaseState;

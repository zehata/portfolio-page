"use server";

import Connection from "./Connection";

export const isDatabaseActive = async () => {
  return Connection.isDatabaseActive();
}

export default isDatabaseActive;
import { z } from "zod";

export const item = z.object({
  id: z.string(),
  title: z.string(),
});

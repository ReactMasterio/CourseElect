import { z } from "zod";

const schema = z.object({
  username: z.string(),
  password: z.string().min(8),
});

export default schema;
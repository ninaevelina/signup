import { z } from "zod";
import { userSchema } from "./schema";

export type Inputs = z.infer<typeof userSchema>;

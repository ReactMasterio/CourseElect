import { z } from "zod";

const UserSchema = z.object({
  UID: z.string().length(14),
  UFirstname: z.string().max(100),
  ULastname: z.string().max(100),
  Username: z.string().min(1).max(255),
  Password: z.string().min(1).max(255),
  UEmail: z.string().max(100),
  URole: z.enum(["admin", "management", "user"]),
  USSN: z.string().length(10),
  UPhoneNumber: z.string().length(11),
});

export default UserSchema;

import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: {
    // Add your database configuration here
    // For example, if using Drizzle with libSQL:
    // provider: "sqlite",
    // url: process.env.DATABASE_URL!,
  },
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL!,
  // Add other configuration options as needed
});

import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      linkedinId?: string;
      accessToken?: string;
      firstName?: string;
      lastName?: string;
    } & DefaultSession["user"];
  }

  interface User {
    linkedinId?: string;
    firstName?: string;
    lastName?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    linkedinId?: string;
    accessToken?: string;
    firstName?: string;
    lastName?: string;
    picture?: string;
  }
}

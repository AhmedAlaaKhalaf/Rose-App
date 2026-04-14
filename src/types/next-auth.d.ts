import { User } from "next-auth";
declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    accessToken: string;
    user: {
      id: string;
      username: string;
      email: string;
      phone: string;
      firstName: string;
      lastName: string;
      gender: "MALE" | "FEMALE";
      photo: string;
      wishlist: [];
      addresses: [];
      emailVerified: boolean;
      phoneVerified: boolean;
      role: "USER" | "ADMIN" | "SUPER_ADMIN";
      createdAt: string;
      updatedAt: string;
    };
    rememberMe: boolean;
  }
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User["user"];
    accessToken: string;
  }
}
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface JWT {
    accessToken: string;
    user: User["user"];
    rememberMe?: boolean;
  }
}

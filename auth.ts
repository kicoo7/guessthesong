import NextAuth from "next-auth";
import Spotify from "next-auth/providers/spotify";
export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [Spotify],
});

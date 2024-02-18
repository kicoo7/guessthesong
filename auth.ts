import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { refreshSpotifyAccessToken } from "./app/spotify";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.AUTH_SPOTIFY_ID,
      clientSecret: process.env.AUTH_SPOTIFY_SECRET,
      // we update the scope to include user-library read & modify so we can save and remove tracks from the user's library
      authorization: "https://accounts.spotify.com/authorize?scope=user-read-email,user-library-read,user-library-modify"
    }),

  ],
  callbacks: {
    async jwt({ token, account }) {
      // we need the access_token, and refresh_token to make requests on behalf of the user to the Spotify API
      if (account) {
        token = {
          ...token,
          access_token: String(account.access_token),
          refresh_token: String(account.refresh_token),
          expires_at: Date.now() + Number(account.expires_in) * 1000,
        };
      }
      // if the access token has not expired yet, return our jwt
      else if (Date.now() < Number(token?.expires_at)) {
        return token;
      }

      try {
        // refresh expired access_token, and return our jwt with updated values for access_token, refresh_token, expires_at
        const { access_token, refresh_token, expires_in } =
          await refreshSpotifyAccessToken(token.refresh_token);

        return {
          ...token,
          access_token,
          refresh_token,
          expires_at: Date.now() + Number(expires_in) * 1000,
        };
      } catch (e) {
        console.error("Error in jwt callback: ", e);
        return { ...token, error: "RefreshAccessTokenError" };
      }
    },
    async session({ session, token }) {
      // we add the access_token to the session so we can use it when making request on behalf of the user to the Spotify API
      if (session) {
        session = Object.assign({}, session, {
          access_token: token.access_token,
          refresh_token: token.refresh_token,
          error: token.error,
        });
      }    
      return session;
    },
  },
});

declare module "@auth/core/types" {
  interface Session {
    access_token: string;
    refresh_token: string;
    error?: "RefreshAccessTokenError";
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token: string;
    error?: "RefreshAccessTokenError";
  }
}

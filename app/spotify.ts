import { unstable_cache } from "next/cache";
import { getSessionOrFail } from "./utils";

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

const getSpotifyAccessToken = async () => {
  const res = await fetch(TOKEN_ENDPOINT, {
    next: { revalidate: 3600 },
    method: "POST",
    headers: {
      // this used to work
      // "Authorization": "Basic " + authorizationToken,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: String(process.env.AUTH_SPOTIFY_ID),
      client_secret: String(process.env.AUTH_SPOTIFY_SECRET),
    }),
  });

  if (res.ok) {
    const { access_token } = await res.json();
    return access_token;
  }

  return null;
};

export const refreshSpotifyAccessToken = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new Error(
      "Error in refreshSpotifyAccessToken(): Invalid refresh token"
    );
  }

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: String(process.env.AUTH_SPOTIFY_ID),
    }),
  };

  const body = await fetch(TOKEN_ENDPOINT, payload);
  const response = await body.json();

  return response;
};

export const getSpotifyPlaylist = async (playlistId: string) => {
  const accessToken = await getSpotifyAccessToken();

  if (!accessToken) {
    throw new Error(`Invalid Spotify Access Token. Got ${accessToken}`);
  }

  // name,description,images(url),tracks.items(track.artists(name),track(id,name,external_urls.spotify))
  const filters = new URLSearchParams({
    fields:
      "id,name,description,images,tracks.items(track.artists(name),track.album(images),track(uri,id,name,external_urls.spotify))",
  });
  const tracksEndpoint = `https://api.spotify.com/v1/playlists/${playlistId}?${filters}`;
  const res = await fetch(tracksEndpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const playlist: SpotifyPlaylist = await res.json();

  return playlist;
};

export const getIsTrackSavedForUser = unstable_cache(async function (trackId: string) {
  if (!trackId) {
    throw new Error("Error in getIsTrackSavedForUser(): Invalid track id");
  }

  const session = await getSessionOrFail();
  if (!session) {
    throw new Error("Error in getIsTrackSavedForUser(): Invalid session");
  }

  const url = new URL("/v1/me/tracks/contains", "https://api.spotify.com");
  url.searchParams.set("ids", trackId);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (!response.ok) {
    console.error(`Error in getIsTrackSavedForUser(): ${response.statusText}`);
    throw new Error(
      `Error in getIsTrackSavedForUser(): ${response.statusText}`
    );
  }

  const body = await response.json();

  return body[0];
}, ["saved-track"], { tags: ["saved-track"]});

export type SpotifyPlaylist = {
  id: string;
  name: string;
  description: string;
  images: { url: string }[];
  tracks: { items: { track: SpotifyTrack }[] };
};

export type SpotifyTrack = {
  id: string;
  name: string;
  uri: string;
  album: {
    images: { url: string }[];
  };
  artists: { name: string }[];
  external_urls: { spotify: string };
};

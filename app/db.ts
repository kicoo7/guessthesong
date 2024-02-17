import "server-only";
import { unstable_cache } from "next/cache";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// import { randomUUID } from "crypto";

function randomUUID() {
  // write a function that generates a random uuid string
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    }
  );

  return uuid;
}

import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { SpotifyPlaylist } from "./spotify";

const TABLE_NAME = String(process.env.TABLE_NAME);

const dynamoClient = new DynamoDBClient({
  region: "eu-central-1",
  credentials: {
    accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
    secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY),
  },
});

const ddbDocClient = DynamoDBDocumentClient.from(dynamoClient, {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
  },
});

export const createChallenge = async (spotifyPlaylist: SpotifyPlaylist) => {
  const id = `${randomUUID()}`;
  const title = spotifyPlaylist.name;
  const description = `How many songs can you guess from '${spotifyPlaylist.name}' playlist? ${spotifyPlaylist.description}`;
  const imageUrl = spotifyPlaylist.images[0].url;
  const normalizedTracks = spotifyPlaylist.tracks.items.map((item) => {
    return {
      id: item.track.id,
      name: item.track.name,
      artists: item.track.artists.map((artist) => artist.name),
      uri: item.track.uri,
      url: item.track.external_urls.spotify,
      imageUrl: item.track.album.images[0].url,
    };
  });

  const songs = normalizedTracks
    .sort(() => Math.random() - Math.random())
    .slice(0, 10);
  const options = normalizedTracks
    .filter((track) => !songs.includes(track))
    .sort(() => Math.random() - Math.random())
    .slice(0, 30);

  const update = new UpdateCommand({
    TableName: TABLE_NAME,
    Key: {
      id: id,
      type: "challenge",
    },
    UpdateExpression:
      "set title = :title, description = :description, imageUrl = :imageUrl, songs = :songs, options = :options, playlistId = :playlistId, createdAt = :createdAt",
    ExpressionAttributeValues: {
      ":title": title,
      ":description": description,
      ":imageUrl": imageUrl,
      ":songs": songs,
      ":options": options,
      ":playlistId": spotifyPlaylist.id,
      ":createdAt": Date.now(),
    },
  });

  const result = await ddbDocClient.send(update);
  return result;
};

export const getChallengeById = unstable_cache(
  async (id: string) => {
    const query = new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        id: id,
        type: "challenge",
      },
    });

    const result = await ddbDocClient.send(query);
    return result.Item;
  },
  ["challenge"],
  { tags: ["challenge"] }
);

export const getChallengeAttemptByEmail = unstable_cache(
  async (challengeId: string, email: string) => {
    const query = new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        id: challengeId,
        type: `attempt#${email}`,
      },
    });

    const result = await ddbDocClient.send(query);
    return result.Item;
  },
  ["attempt"],
  { tags: ["attempt"], revalidate: 10 }
);

export const createChallengeAttempt = async (
  challengeId: string,
  email: string
) => {
  const put = new PutCommand({
    TableName: TABLE_NAME,
    Item: {
      id: challengeId,
      type: `attempt#${email}`,
      score: 0,
      round: 1,
      lastAnswer: null,
      startedAt: Date.now(),
    },
  });

  const result = await ddbDocClient.send(put);
  return result;
};

export const updateChallengeAttempt = async (
  challengeId: string,
  email: string,
  updates: {
    score: number;
    round: number;
    lastAnswer: string | null; // null = not answered yet, string = value of the last answer
    finishedAt?: number;
  }
) => {
  const update = new UpdateCommand({
    TableName: TABLE_NAME,
    Key: {
      id: challengeId,
      type: `attempt#${email}`,
    },
    UpdateExpression:
      "set score = score + :score, round = :round, finishedAt = :finishedAt, lastAnswer = :lastAnswer",
    ExpressionAttributeValues: {
      ":score": Number(updates.score) || 0,
      ":round": updates.round,
      ":lastAnswer": updates.lastAnswer?.trim() || null,
      ":finishedAt": updates.finishedAt || null,
    },
  });

  const result = await ddbDocClient.send(update);
  return result;
};

export const deleteChallengeAttempt = async (
  challengeId: string,
  email: string
) => {
  const deleteCommand = new DeleteCommand({
    TableName: TABLE_NAME,
    Key: {
      id: challengeId,
      type: `attempt#${email}`,
    },
  });

  const result = await ddbDocClient.send(deleteCommand);
  return result;
};

export type Song = {
  id: string;
  name: string;
  artists: string[];
  url: string;
  uri: string;
  imageUrl: string;
};

export type Challenge = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  songs: Song[];
  options: Song[];
};

export type Attempt = {
  id: string;
  score: number;
  round: number;
  lastAnswer: string | null;
  startedAt: number;
  finishedAt?: number;
};
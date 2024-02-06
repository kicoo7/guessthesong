import { cache } from "react";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { randomUUID } from "crypto";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { SpotifyPlaylist } from "./spotify";

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

const TABLE_NAME = "guess-the-song-dynamodb-v2";
// move to .env.local
const accessKey = "AKIATVJLN4NA2GSOMJOD";
const secretKey = "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";

const dynamoClient = new DynamoDBClient({
  region: "eu-central-1",
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
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
    }
  });

  const result = await ddbDocClient.send(update);
  return result;
};

export const getChallengeById = cache(async (id: string) => {
  const query = new GetCommand({
    TableName: TABLE_NAME,
    Key: {
      id: id,
      type: "challenge",
    },
  });

  const result = await ddbDocClient.send(query);
  return result.Item as Challenge;
});

export const getChallengeAttemptByEmail = async (challengeId: string, email: string) => {
  const query = new GetCommand({
    TableName: TABLE_NAME,
    Key: {
      id: challengeId,
      type: `attempt#${email}`,
    },
  });

  const result = await ddbDocClient.send(query);
  return result.Item;
}

export const createChallengeAttempt = async (challengeId: string, email: string) => {
const put = new PutCommand({
  TableName: TABLE_NAME,
  Item: {
    id: challengeId,
    type: `attempt#${email}`,
    score: 0,
    round: 1,
    startedAt: Date.now(),
  }});

  const result = await ddbDocClient.send(put);
  return result;
};

export const updateChallengeAttempt = async (challengeId: string, email: string, updates:{
  score: number;
  round: number;
  finishedAt?: number;
}) => {
  const update = new UpdateCommand({
    TableName: TABLE_NAME,
    Key: {
      id: challengeId,
      type: `attempt#${email}`,
    },
    UpdateExpression: "set score = :score, round = :round, finishedAt = :finishedAt",
    ExpressionAttributeValues: {
      ":score": updates.score,
      ":round": updates.round,
      ":finishedAt": updates.finishedAt || null,
    }
  });

  const result = await ddbDocClient.send(update);
  return result;
}
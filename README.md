## Guess the song
A simple guessing song guessing game with Next.js (App Router), NextAuth(v5@beta), and DynamoDB. Powered by Spotify.
*Currently the Spotify App is in dev mode, so I will need to add your Spotify account list of allowed users* 
In case the song doesn't start disable adblockers.

## Prerequisites
- AWS account
- DynamoDB table
- AWS Key and Secret with correct DynamoDB permissions that our app will use to read and write data

## Start
- Fork the project
- Create a .env.local file with the following params 
```
AUTH_SPOTIFY_ID=<your spotify_app_id>
AUTH_SPOTIFY_SECRET=<your spotify app secret>
AUTH_SECRET=<run openssl rand -base64 32 and paste the value> 
TABLE_NAME=<your dynamodb table name>
AWS_ACCESS_KEY_ID=<your aws access key>
AWS_SECRET_ACCESS_KEY=<your aws access secret>
```
- Install all dependencies `pnpm install`
- Run it with `pnpm dev`

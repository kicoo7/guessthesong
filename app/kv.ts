
import { kv } from "@vercel/kv";
import { cache } from "react";

type UserState = {
    challengeId: string;
    score: number;
    round: number;
    startedAt: number;
}

// email: { challengeId, score, round, startedAt }
export const getUserState = cache(async (email: string) => {
 const state = await kv.hgetall(email);
 
 if(!state){
    return null;
 }

 return state as UserState;
});


type UpdatesUserState = {
    score: number;
    round: number;
    startedAt?: number;
}

export const updateUserState = async (email: string, updates: UpdatesUserState) => {  
  await kv.hset(email, updates); 
};


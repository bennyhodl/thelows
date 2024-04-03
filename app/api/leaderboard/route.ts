// pages/api/create.js
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, DATABASE_NAME, COLLECTION_NAME } from "@/lib/mongo";
import { LeaderBoardResponse, LeaderboardSong } from "@/lib/types";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
      const client = await connectToDatabase();
      const db = client.db(DATABASE_NAME);

      const collection = db.collection(COLLECTION_NAME);
      const result = await collection.aggregate([{
        $group: {
          _id: null,
          "blue-water": { $sum: "$songs.blue-water"},
          "what-i-know": { $sum: "$songs.what-i-know"},
          "like-blood": { $sum: "$songs.like-blood"},
          "upside-down": { $sum: "$songs.upside-down"},
          "life-got-crazy": { $sum: "$songs.life-got-crazy"},
          "2-birds": { $sum: "$songs.2-birds"},
          "real-things": { $sum: "$songs.real-things"},
          "g-o-d": { $sum: "$songs.g-o-d"},
          "still-works": { $sum: "$songs.still-works"}
        }
      }]).toArray()
      client.close();

      const total: number = Object.values(result[0]).reduce((acc, curr) => acc+curr, 0)
      const songs: LeaderboardSong[] = [
        {name: "Blue Water", points: result[0]["blue-water"], percent: (result[0]["blue-water"] / total * 100).toFixed(2)},
        {name: "What I Know", points: result[0]["what-i-know"], percent: (result[0]["what-i-know"] / total * 100).toFixed(2)},
        {name: "Like Blood", points: result[0]["like-blood"], percent: (result[0]["like-blood"] / total * 100).toFixed(2)},
        {name: "Upside Down", points: result[0]["upside-down"], percent: (result[0]["upside-down"] / total * 100).toFixed(2)},
        {name: "Life Got Crazy", points: result[0]["life-got-crazy"], percent: (result[0]["life-got-crazy"] / total * 100).toFixed(2)},
        {name: "2 Birds", points: result[0]["2-birds"], percent: (result[0]["2-birds"] / total * 100).toFixed(2)},
        {name: "Real Things", points: result[0]["real-things"], percent: (result[0]["real-things"] / total * 100).toFixed(2)},
        {name: "g.o.d", points: result[0]["g-o-d"], percent: (result[0]["g-o-d"] / total * 100).toFixed(2)},
        {name: "Still Works", points: result[0]["still-works"], percent: (result[0]["still-works"] / total * 100).toFixed(2)},
      ]

      let response: LeaderBoardResponse & {success: boolean} = {
        success: true,
        total,
        songs
      }

      return NextResponse.json(response, { status: 200})
    } catch (error) {
      console.log(error)
      return NextResponse.json({success: false}, {status: 500})
    }
};

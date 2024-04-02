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
          "blue-water": { $sum: "$blue-water"},
          "what-i-know": { $sum: "$don't-think"},
          "like-blood": { $sum: "$like-blood"},
          "upside-down": { $sum: "$upside-down"}
        }
      }]).toArray()
      client.close();

      const total: number = Object.values(result[0]).reduce((acc, curr) => acc+curr, 0)
      const songs: LeaderboardSong[] = [
        {name: "Blue Water", points: result[0]["blue-water"], percent: (result[0]["blue-water"] / total * 100).toFixed(2)},
        {name: "What I Know", points: result[0]["what-i-know"], percent: (result[0]["what-i-know"] / total * 100).toFixed(2)},
        {name: "Like Blood", points: result[0]["like-blood"], percent: (result[0]["like-blood"] / total * 100).toFixed(2)},
        {name: "Upside Down", points: result[0]["upside-down"], percent: (result[0]["upside-down"] / total * 100).toFixed(2)},
      ]

      let response: LeaderBoardResponse & {success: boolean} = {
        success: true,
        total,
        songs
      }

      return NextResponse.json({success: true, total, songs}, { status: 200})
    } catch (error) {
      console.log(error)
      return NextResponse.json({success: false}, {status: 500})
    }
};

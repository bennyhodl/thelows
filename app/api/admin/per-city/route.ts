// pages/api/create.js
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, DATABASE_NAME, COLLECTION_NAME } from "@/lib/mongo";
import { Cities, LeaderBoardResponse, SongScore } from "@/lib/types";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    // let city = req.nextUrl.searchParams.get("city") as Cities;
    const client = await connectToDatabase();
    const db = client.db(DATABASE_NAME);

    const collection = db.collection(COLLECTION_NAME);
    
    let inner = await collection
      .aggregate([
        // Step 1: Unwind the songs array
        {
          $unwind: "$songs",
        },
        // Step 2: Group by city and song name, and sum the points
        {
          $group: {
            _id: {
              city: "$city",
              songName: "$songs.name",
            },
            totalPoints: { $sum: "$songs.points" },
          },
        },
        // Step 3: Reshape the output to group by city and then by songs
        {
          $group: {
            _id: "$_id.city",
            songs: {
              $push: {
                name: "$_id.songName",
                totalPoints: "$totalPoints",
              },
            },
          },
        },
        {
          $addFields: {
            songs: {
              $sortArray: {
                input: "$songs",
                sortBy: { totalPoints: -1 },
              },
            },
          },
        },
        {
          $addFields: {
            songs: { $slice: ["$songs", 20] },
          },
        },
      ])
      .toArray();

    return NextResponse.json(inner, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

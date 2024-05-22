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
        // Step 2: Sort the documents by city and then by points in descending order
        {
          $sort: {
            city: 1,
            "songs.points": -1,
          },
        },
        // Step 3: Group by city and collect the top 5 songs
        {
          $group: {
            _id: "$city",
            topSongs: {
              $push: "$songs",
            },
          },
        },
        // Step 4: Slice the topSongs array to keep only the top 5
        {
          $project: {
            _id: 1,
            topSongs: { $slice: ["$topSongs", 5] },
          },
        },
        // Step 5: Unwind the topSongs array to prepare for counting
        {
          $unwind: "$topSongs",
        },
        // Step 6: Group by city and song name, and count the occurrences
        {
          $group: {
            _id: {
              city: "$_id",
              songName: "$topSongs.name",
            },
            count: { $sum: 1 },
          },
        },
        // Step 7: Reshape the output to group by city
        {
          $group: {
            _id: "$_id.city",
            songs: {
              $push: {
                name: "$_id.songName",
                count: "$count",
              },
            },
          },
        },
        // Step 8: Project the final result
        {
          $project: {
            _id: 0,
            city: "$_id",
            songs: 1,
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

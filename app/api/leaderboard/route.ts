// pages/api/create.js
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, DATABASE_NAME, COLLECTION_NAME } from "@/lib/mongo";
import { Cities, LeaderBoardResponse, SongScore } from "@/lib/types";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
      let city = req.nextUrl.searchParams.get("city") as Cities
      const client = await connectToDatabase();
      const db = client.db(DATABASE_NAME);

      const collection = db.collection(COLLECTION_NAME);

      let result;
      if (city === "steve") {
        city = "steve"
        result = await collection.aggregate([
          { $unwind: "$songs" },
          { $group: 
            {
              _id: "$songs.id",
              id: { $first: "$songs.id" },
              name: { $first: "$songs.name" },
              album: { $first: "$songs.album"},
              points: { $sum: "$songs.points"}
            }
          }
        ]).toArray()
      } else {
        result = await collection.aggregate([
          { $unwind: "$songs" },
          { $match: { city } },
          { $group: 
            {
              _id: "$songs.id",
              id: { $first: "$songs.id" },
              name: { $first: "$songs.name" },
              album: { $first: "$songs.album"},
              points: { $sum: "$songs.points"}
            }
          }
        ]).toArray()
      }
 
      if (result.length === 0) {
        let response: LeaderBoardResponse & {success: boolean} = {
          city,
          success: true,
          total: 0,
          songs: []
        }

        return NextResponse.json(response, { status: 200})
      }
      client.close();

      const total: number = Object.values(result[0]).reduce((acc, curr) => acc+curr, 0)

      let response: LeaderBoardResponse & {success: boolean} = {
        city,
        success: true,
        total,
        songs: result as SongScore[]
      }

      return NextResponse.json(response, { status: 200})
    } catch (error) {
      console.log(error)
      return NextResponse.json({success: false}, {status: 500})
    }
};

// pages/api/create.js
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, DATABASE_NAME, COLLECTION_NAME } from "@/lib/mongo";
import {
  Cities,
  LeaderBoardResponse,
  LeaderboardSong,
  SongDbEntry,
  SongScore,
  cities,
} from "@/lib/types";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const client = await connectToDatabase();
    const db = client.db(DATABASE_NAME);

    const collection = db.collection(COLLECTION_NAME);

    const totalEntries = await collection.countDocuments();

    const countEmail = { email: { $exists: true } };

    const emails = await collection.countDocuments(countEmail);

    const votesPerCity = await collection
      .aggregate([
        {
          $group: {
            _id: "$city",
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();

    return NextResponse.json(
      { totalEntries, emails, votesPerCity },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

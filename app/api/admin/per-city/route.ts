// pages/api/create.js
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, DATABASE_NAME, COLLECTION_NAME } from "@/lib/mongo";
import { Cities, LeaderBoardResponse, SongScore, cities } from "@/lib/types";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    // let city = req.nextUrl.searchParams.get("city") as Cities;
    const client = await connectToDatabase();
    const db = client.db(DATABASE_NAME);

    const collection = db.collection(COLLECTION_NAME);
    // let result: any = []
    // const result = cities.map(async city => {
      let inner = await collection
      .aggregate([
        { $unwind: "$songs" },
        // { $match: { city } },
        {$group: { city: "$$CURRENT"}},
        {
          $group: {
            _id: "$songs.id",
            id: { $first: "$songs.id" },
            name: { $first: "$songs.name" },
            album: { $first: "$songs.album" },
            points: { $sum: "$songs.points" },
          },
        },
      ])
      .toArray()
      //@ts-ignore
    //   return {
    //     city,
    //     inner
    //   }
    // })

    console.log("guy", inner)

    let response = {
      inner,
      success: true,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

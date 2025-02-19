// pages/api/create.js
import { connectToDatabase, DATABASE_NAME, COLLECTION_NAME } from "@/lib/mongo";
import { Cities, LeaderBoardResponse, SongScore } from "@/lib/types";

export async function GET(req: Request) {
  try {
    const client = await connectToDatabase();
    const db = client.db(DATABASE_NAME);

    const collection = db.collection(COLLECTION_NAME);

    let result = await collection
      .aggregate([
        { $unwind: "$songs" },
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
      .toArray();

    if (result.length === 0) {
      let response: LeaderBoardResponse & { success: boolean } = {
        success: true,
        total: 0,
        songs: [],
      };

      return Response.json(response, { status: 200 });
    }

    client.close();

    const total: number = Object.values(result[0]).reduce(
      (acc, curr) => acc + curr,
      0
    );

    let response: LeaderBoardResponse & { success: boolean } = {
      success: true,
      total,
      songs: result as SongScore[],
    };

    return Response.json(response, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false }, { status: 500 });
  }
}

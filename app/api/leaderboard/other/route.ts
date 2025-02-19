import {
  connectToDatabase,
  DATABASE_NAME,
  OTHER_SONGS_COLLECTION,
} from "@/lib/mongo";
import { LeaderBoardResponse, SongScore } from "@/lib/types";

export async function GET(req: Request) {
  try {
    const client = await connectToDatabase();
    const db = client.db(DATABASE_NAME);

    const collection = db.collection(OTHER_SONGS_COLLECTION);

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

    const total: number = Object.values(result).reduce(
      (acc, curr) => acc + curr.points,
      0
    );

    const songs = result.map((song) => {
      const randomNumber = Math.floor(Math.random() * 100);
      const randomScore = {
        id: song.id,
        name: song.name,
        album: song.album,
        points: song.points + randomNumber,
      };
      return randomScore;
    });

    let response: LeaderBoardResponse & { success: boolean } = {
      success: true,
      total,
      songs: songs as SongScore[],
    };

    return Response.json(response, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ success: false }, { status: 500 });
  }
}

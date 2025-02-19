// pages/api/create.js
import { connectToDatabase, DATABASE_NAME, COLLECTION_NAME } from "@/lib/mongo";
import { SubmitListRequest, SongDbEntry, SongScore } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const json: SubmitListRequest = await req.json();

    const numSongs = json.songs.length;
    const songs: SongScore[] = json.songs.map((song) => {
      // exponential decay scoring
      const weighted = Number(
        (0.85 ** Math.abs(song.points - numSongs) * 100).toFixed(0)
      );
      return {
        name: song.name,
        id: song.id,
        album: song.album,
        points: weighted,
      };
    });

    let document: SongDbEntry = {
      city: json.city,
      id: json.id,
      songs,
    };

    const client = await connectToDatabase();
    const db = client.db(DATABASE_NAME);

    const collection = db.collection(COLLECTION_NAME);
    const user = await collection.findOne({ id: json.id });
    if (!user) {
      await collection.insertOne(document);
    } else {
      await collection.updateOne(
        { id: json.id },
        { $set: { songs: document.songs, city: document.city } }
      );
    }

    client.close();

    // res.status(201).json({ message: "Document created", result });
    return Response.json(
      { success: true },
      {
        status: 202,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (error) {
    console.log(error);
    return Response.json({ success: false }, { status: 500 });
  }
}

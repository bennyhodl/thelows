// pages/api/create.js
import {
  connectToDatabase,
  DATABASE_NAME,
  OTHER_SONGS_COLLECTION,
} from "@/lib/mongo";
import { SongDbEntry, SubmitListRequest } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const request: SubmitListRequest = await req.json();

    let document: SongDbEntry = {
      id: request.id,
      songs: request.songs,
    };

    const client = await connectToDatabase();
    const db = client.db(DATABASE_NAME);

    const collection = db.collection(OTHER_SONGS_COLLECTION);
    const user = await collection.findOne({ id: document.id });
    if (!user) {
      await collection.insertOne(document);
    } else {
      await collection.updateOne(
        { id: document.id },
        { $set: { songs: document.songs } }
      );
    }

    client.close();

    // res.status(201).json({ message: "Document created", result });
    return Response.json({ success: true, other: true }, { status: 202 });
  } catch (error) {
    return Response.json({ success: false }, { status: 500 });
  }
}

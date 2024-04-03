// pages/api/create.js
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, DATABASE_NAME, COLLECTION_NAME } from "@/lib/mongo";
import { SubmitListRequest } from "@/lib/types";


export async function POST(req: NextRequest, res: NextResponse) {
    try {
      const json: SubmitListRequest = await req.json()
      let doc: any = {}

      const numSongs = json.songs.length
      json.songs.forEach(song => {
        const whitespace = song.name.replaceAll(" ", "-").replaceAll(".", "-")
        // exponential decay scoring
        const weighted = Number(((0.85 ** (Math.abs(song.points - numSongs))) * 100).toFixed(0))
        console.log("Weighted",song.name, weighted, song.points, Math.abs(song.points - numSongs))
        return doc[whitespace] = weighted
      })

      let document = {
        id: json.id,
        songs: doc 
      }
      
      const client = await connectToDatabase();
      const db = client.db(DATABASE_NAME);

      const collection = db.collection(COLLECTION_NAME);
      const user = await collection.findOne({"id": json.id})
      if (!user) {
        await collection.insertOne(document);
      } else {
        await collection.updateOne({"id": json.id}, {$set: {songs: doc}});
      }

      client.close();

      // res.status(201).json({ message: "Document created", result });
      return NextResponse.json({success: true}, { status: 202})
    } catch (error) {
      console.log(error)
      return NextResponse.json({success: false}, {status: 500})
    }
};

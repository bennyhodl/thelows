// pages/api/create.js
import { NextRequest, NextResponse } from "next/server";
import { COLLECTION_NAME, connectToDatabase, DATABASE_NAME, OTHER_SONGS_COLLECTION } from "@/lib/mongo";
import { SongDbEntry, SubmitEmail, SubmitListRequest } from "@/lib/types";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
      const request: SubmitEmail = await req.json()
      
      const client = await connectToDatabase();
      const db = client.db(DATABASE_NAME);

      const collection = db.collection(OTHER_SONGS_COLLECTION);
      const lows = db.collection(COLLECTION_NAME);
      
      await collection.updateOne({"id":request.id}, {$set: {email: request.email}});
      await lows.updateOne({"id":request.id}, {$set: {email: request.email}});

      client.close();

      // res.status(201).json({ message: "Document created", result });
      return NextResponse.json({success: true, email: request.email, id: request.id}, { status: 202})
    } catch (error) {
      return NextResponse.json({success: false}, {status: 500})
    }
};

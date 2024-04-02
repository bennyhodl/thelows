// pages/api/create.js
import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// Replace the following with your MongoDB connection string
const MONGO_URI = "mongodb://blockspaces:blockspaces@localhost:27017/connect?replicaSet=rs0&readPreference=primary&tls=false";
const DATABASE_NAME = "thelows";
const COLLECTION_NAME = "rankings";

async function connectToDatabase() {
    const client = await MongoClient.connect(MONGO_URI);
    return client;
}

type DbList = {
  name: string,
  points: number
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
      const json: DbList[] = await req.json()
      const document = json
      let doc: any = {}

      json.forEach(song => {
        const whitespace = song.name.replaceAll(" ", "-")
        return doc[whitespace] = song.points
      })
      
      console.log("the documet", doc)
      const client = await connectToDatabase();
      const db = client.db(DATABASE_NAME);

      const collection = db.collection(COLLECTION_NAME);
      const result = await collection.insertOne(doc);

      client.close();

      // res.status(201).json({ message: "Document created", result });
      return NextResponse.json({success: true}, { status: 202})
    } catch (error) {
      console.log(error)
      return NextResponse.json({success: false}, {status: 500})
    }
};

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

export async function GET(req: NextRequest, res: NextResponse) {
    try {
      const client = await connectToDatabase();
      const db = client.db(DATABASE_NAME);

      const collection = db.collection(COLLECTION_NAME);
      const result = await collection.aggregate([{
        $group: {
          _id: null,
          "blue-water": { $sum: "$blue-water"},
          "what-i-know": { $sum: "$don't-think"},
          "like-blood": { $sum: "$like-blood"},
          "upside-down": { $sum: "$upside-down"}
        }
      }]).toArray()
      client.close();

      const total: number = Object.values(result[0]).reduce((acc, curr) => acc+curr, 0)
      const songs = result[0]

      return NextResponse.json({success: true, total, songs}, { status: 200})
    } catch (error) {
      console.log(error)
      return NextResponse.json({success: false}, {status: 500})
    }
};

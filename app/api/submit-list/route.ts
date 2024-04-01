// pages/api/create.js
import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// Replace the following with your MongoDB connection string
const MONGO_URI = "your_mongodb_connection_string";
const DATABASE_NAME = "thelows";
const COLLECTION_NAME = "rankings";

async function connectToDatabase() {
    const client = await MongoClient.connect(MONGO_URI);
    return client;
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
      console.log("json", await req.json())
        // const client = await connectToDatabase();
        // const db = client.db(DATABASE_NAME);

        // // Assuming the document to be inserted comes in the request's body
        // const document = req.formData

        // const collection = db.collection(COLLECTION_NAME);
        // const result = await collection.insertOne(document);

        // client.close();

        // res.status(201).json({ message: "Document created", result });
        return NextResponse.json({success: true}, { status: 202})
    } catch (error) {
        return NextResponse.json({success: false}, {status: 500})
    }
};

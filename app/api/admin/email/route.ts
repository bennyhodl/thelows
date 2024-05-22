// pages/api/create.js
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, DATABASE_NAME, COLLECTION_NAME } from "@/lib/mongo";
import { Cities, LeaderBoardResponse, SongScore } from "@/lib/types";
import fs from "fs";
import { stringify } from "csv-stringify";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    // let city = req.nextUrl.searchParams.get("city") as Cities;
    const client = await connectToDatabase();
    const db = client.db(DATABASE_NAME);

    const collection = db.collection(COLLECTION_NAME);

    let inner = await collection
      .aggregate([
        // Step 1: Match documents that have an "email" field
        {
          $match: {
            email: { $exists: true },
          },
        },
        // Step 2: Unwind the songs array
        {
          $unwind: "$songs",
        },
        // Step 3: Match songs with a score of 100
        {
          $match: {
            "songs.points": 100,
          },
        },
        // Step 4: Project the desired fields
        {
          $project: {
            _id: 0,
            email: "$email",
            city: "$city",
            song: "$songs.name",
          },
        },
      ])
      .toArray();

    const filename = "set-list-email-list.csv";
    const writableStream = fs.createWriteStream(filename);
    const columns = ["email", "city", "song"];
    const stringifier = stringify({ header: true, columns });

    inner.forEach((entry) => {
      stringifier.write([entry.email, entry.city, entry.song], "utf-8");
    });
    stringifier.pipe(writableStream);
    const csvFile = fs.readFileSync(`${process.cwd()}/${filename}`);

    const headers = new Headers()
    headers.append("Content-Type", "text/csv")

    return new NextResponse(csvFile)
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

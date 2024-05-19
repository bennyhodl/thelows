// pages/api/create.js
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, DATABASE_NAME, COLLECTION_NAME } from "@/lib/mongo";
import { Cities, LeaderBoardResponse, LeaderboardSong, SongDbEntry, SongScore, cities } from "@/lib/types";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
      const client = await connectToDatabase();
      const db = client.db(DATABASE_NAME);

      const collection = db.collection(COLLECTION_NAME);

      const totalEntries = await collection.countDocuments()

      // const chart = await collection.find().map((song): SongDbEntry => {
      //   return {
      //     id: song.id,
      //     city: song.city,
      //     songs: song.songs
      //   }
      // }).toArray();
      
      // client.close();

      // let response: any = {}
      // // filter by city
      // cities.forEach(city => {
      //   return response[city] = chart.filter((entry) => city === entry.city) 
      // })

      return NextResponse.json({totalEntries}, { status: 200})
    } catch (error) {
      console.log(error)
      return NextResponse.json({success: false}, {status: 500})
    }
};

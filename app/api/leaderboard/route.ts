// pages/api/create.js
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, DATABASE_NAME, COLLECTION_NAME } from "@/lib/mongo";
import { Cities, LeaderBoardResponse, LeaderboardSong, SongScore } from "@/lib/types";

const songGroup = {
  _id: null,
  "he-said-she-said": { $sum: "$songs.he-said-she-said" },
  "downtown": { $sum: "$songs.downtown"},
  "up-again": { $sum: "$songs.up-again"},
  "backwoods": { $sum: "$songs.backwoods"},
  "6am": { $sum: "$songs.6am"},
  "sunfalls-pm": { $sum: "$songs.sunfalls-pm"},
  "swollen": { $sum: "$songs.swollen"},
  "someone-make-it-stop": { $sum: "$songs.someone-make-it-stop"},
  "good-day": { $sum: "$songs.good-day"},
  "dive-bar": { $sum: "$songs.dive-bar"},
  "same-guy": { $sum: "$songs.same-guy"},
  "strawberry": { $sum: "$songs.strawberry"},
  "same-old-me": { $sum: "$songs.same-old-me"},
  "public": { $sum: "$songs.public"},
  "another-life": {$sum: "$songs.another-life"},
  "p-street": {$sum: "$songs.p-street"},
  "skylight": {$sum: "$songs.skylight"},
  "i-remember-everything": {$sum: "$songs.i-remember-everything"},
  "head-against-the-wall": {$sum: "$songs.head-against-the-wall"},
  "coastin-(night)": {$sum: "$songs.coastin-(night)"},
  "matching-tattoo": {$sum: "$songs.matching-tattoo"},
  "woosah": {$sum: "$songs.woosah"},
  "malibu-breeze": {$sum: "$songs.malibu-breeze"},
  "put-me-in-the-ground": {$sum: "$songs.put-me-in-the-ground"},
  "everything-but-sorry": {$sum: "$songs.everything-but-sorry"},
  "oasis": {$sum: "$songs.oasis"},
  "tomorrows-not-a-thing": {$sum: "$songs.tomorrows-not-a-thing"},
  "when-is-when": {$sum: "$songs.when-is-when"},
  "cuz-i-love-you": {$sum: "$songs.cuz-i-love-you"},
  "feel-better": {$sum: "$songs.feel-better"},
  "how-many-times": {$sum: "$songs.how-many-times"},
  "fire-and-rain": {$sum: "$songs.fire-and-rain"},
  "old-again": {$sum: "$songs.old-again"},
  "catalogue-cabin": {$sum: "$songs.catalogue-cabin"},
  "only-god-knows": {$sum: "$songs.only-god-knows"}
}

export async function GET(req: NextRequest, res: NextResponse) {
    try {
      let city = req.nextUrl.searchParams.get("city") as Cities
      const client = await connectToDatabase();
      const db = client.db(DATABASE_NAME);

      const collection = db.collection(COLLECTION_NAME);

      let result;
      if (city === "steve") {
        city = "steve"
        result = await collection.aggregate([
          { $unwind: "$songs" },
          { $group: 
            {
              _id: "$songs.id",
              id: { $first: "$songs.id" },
              name: { $first: "$songs.name" },
              album: { $first: "$songs.album"},
              points: { $sum: "$songs.points"}
            }
          }
        ]).toArray()
      } else {
        result = await collection.aggregate([
          { $unwind: "$songs" },
          { $match: { city } },
          { $group: 
            {
              _id: "$songs.id",
              id: { $first: "$songs.id" },
              name: { $first: "$songs.name" },
              album: { $first: "$songs.album"},
              points: { $sum: "$songs.points"}
            }
          }
        ]).toArray()
      }
 
      if (result.length === 0) {
        let response: LeaderBoardResponse & {success: boolean} = {
          city,
          success: true,
          total: 0,
          songs: []
        }

        return NextResponse.json(response, { status: 200})
      }
      client.close();

      const total: number = Object.values(result[0]).reduce((acc, curr) => acc+curr, 0)

      let response: LeaderBoardResponse & {success: boolean} = {
        city,
        success: true,
        total,
        songs: result as SongScore[]
      }

      return NextResponse.json(response, { status: 200})
    } catch (error) {
      console.log(error)
      return NextResponse.json({success: false}, {status: 500})
    }
};

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
      const songs: LeaderboardSong[] = [
        {name: "he said she said", points: result[0]["he-said-she-said"], percent: (result[0]["he-said-she-said"] / total * 100).toFixed(2)},
        {name: "downtown", points: result[0]["downtown"], percent: (result[0]["downtown"] / total * 100).toFixed(2)},
        {name: "up again", points: result[0]["up-again"], percent: (result[0]["up-again"] / total * 100).toFixed(2)},
        {name: "backwoods", points: result[0]["backwoods"], percent: (result[0]["backwoods"] / total * 100).toFixed(2)},
        {name: "6am", points: result[0]["6am"], percent: (result[0]["6am"] / total * 100).toFixed(2)},
        {name: "sunfalls pm", points: result[0]["sunfalls-pm"], percent: (result[0]["sunfalls-pm"] / total * 100).toFixed(2)},
        {name: "swollen", points: result[0]["swollen"], percent: (result[0]["swollen"] / total * 100).toFixed(2)},
        {name: "someone make it stop", points: result[0]["someone-make-it-stop"], percent: (result[0]["someone-make-it-stop"] / total * 100).toFixed(2)},
        {name: "good day", points: result[0]["good-day"], percent: (result[0]["good-day"] / total * 100).toFixed(2)},
        {name: "dive bar", points: result[0]["dive-bar"], percent: (result[0]["dive-bar"] / total * 100).toFixed(2)},
        {name: "same guy", points: result[0]["same-guy"], percent: (result[0]["same-guy"] / total * 100).toFixed(2)},
        {name: "strawberry", points: result[0]["strawberry"], percent: (result[0]["strawberry"] / total * 100).toFixed(2)},
        {name: "same old me", points: result[0]["same-old-me"], percent: (result[0]["same-old-me"] / total * 100).toFixed(2)},
        {name: "public", points: result[0]["public"], percent: (result[0]["public"] / total * 100).toFixed(2)},
        {name: "another life", points: result[0]["another-life"], percent: (result[0]["another-life"] / total * 100).toFixed(2)},
        {name: "p street", points: result[0]["p-street"], percent: (result[0]["p-street"] / total * 100).toFixed(2)},
        {name: "skylight", points: result[0]["skylight"], percent: (result[0]["skylight"] / total * 100).toFixed(2)},
        {name: "i remember everything", points: result[0]["i-remember-everything"], percent: (result[0]["i-remember-everything"] / total * 100).toFixed(2)},
        {name: "head against the wall", points: result[0]["head-against-the-wall"], percent: (result[0]["head-against-the-wall"] / total * 100).toFixed(2)},
        {name: "coastin (night)", points: result[0]["coastin-(night)"], percent: (result[0]["coastin-(night)"] / total * 100).toFixed(2)},
        {name: "matching tattoo", points: result[0]["matching-tattoo"], percent: (result[0]["matching-tattoo"] / total * 100).toFixed(2)},
        {name: "woosah", points: result[0]["woosah"], percent: (result[0]["woosah"] / total * 100).toFixed(2)},
        {name: "malibu breeze", points: result[0]["malibu-breeze"], percent: (result[0]["malibu-breeze"] / total * 100).toFixed(2)},
        {name: "put me in the ground", points: result[0]["put-me-in-the-ground"], percent: (result[0]["put-me-in-the-ground"] / total * 100).toFixed(2)},
        {name: "everything but sorry", points: result[0]["everything-but-sorry"], percent: (result[0]["everything-but-sorry"] / total * 100).toFixed(2)},
        {name: "oasis", points: result[0]["oasis"], percent: (result[0]["oasis"] / total * 100).toFixed(2)},
        {name: "tomorrows not a thing", points: result[0]["tomorrows-not-a-thing"], percent: (result[0]["tomorrows-not-a-thing"] / total * 100).toFixed(2)},
        {name: "when is when", points: result[0]["when-is-when"], percent: (result[0]["when-is-when"] / total * 100).toFixed(2)},
        {name: "cuz i love you", points: result[0]["cuz-i-love-you"], percent: (result[0]["cuz-i-love-you"] / total * 100).toFixed(2)},
        {name: "feel better", points: result[0]["feel-better"], percent: (result[0]["feel-better"] / total * 100).toFixed(2)},
        {name: "how many times", points: result[0]["how-many-times"], percent: (result[0]["how-many-times"] / total * 100).toFixed(2)},
        {name: "fire and rain", points: result[0]["fire-and-rain"], percent: (result[0]["fire-and-rain"] / total * 100).toFixed(2)},
        {name: "old again", points: result[0]["old-again"], percent: (result[0]["old-again"] / total * 100).toFixed(2)},
        {name: "catalogue cabin", points: result[0]["catalogue-cabin"], percent: (result[0]["catalogue-cabin"] / total * 100).toFixed(2)},
        {name: "only god knows", points: result[0]["only-god-knows"], percent: (result[0]["only-god-knows"] / total * 100).toFixed(2)},
      ]

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

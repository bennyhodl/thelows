// pages/api/create.js
import { NextRequest, NextResponse } from "next/server";
import { ShareImageRequest } from "@/lib/types";
import { createCanvas, loadImage, registerFont } from "canvas";
import path from "path";

export async function POST(req: NextRequest) {
    try {
      const json: ShareImageRequest = await req.json()

      registerFont(path.join(process.cwd(), "/public/font/ArchivoBlack-Regular.ttf"), {family: "Archivo"})
      const width = 1080
      const height = 1920
      const canvas =   createCanvas(width, height)
      const context = canvas.getContext("2d")

      const image = await loadImage(path.join(process.cwd(), "/public/images/share-image-orange.png"))
      context.drawImage(image, 0, 0, width, height)
      
      context.textBaseline = "bottom"
      context.fillStyle = "#F25201"
      context.font = "bold 40pt Archivo"
      context.textAlign = "center"
      context.strokeStyle = "white"
      context.lineWidth = 5
      let topSongs = 550
      let lows = topSongs + 150
      context.strokeText("TOP 5 SONGS FROM", width/2, topSongs)
      context.fillText("TOP 5 SONGS FROM", width/2, topSongs)

      context.fillStyle = "#FFFFFF"
      context.font = "bold 110pt Archivo"
      context.fillText("THE LOWS.", width/2, lows)
      
      context.textAlign = "center"
      // let shift = height - 600
      context.lineWidth = 2
      let shift = height - 600
      context.fillStyle = "#FFFFFF"
      context.fillRect(width/8, shift - 120, width - width/4, 135)
      context.fillStyle = "#F25201"
      context.strokeStyle = "#FFFFFF"
      context.font = "bold 60pt Archivo"
      // context.fillText("1. ", width / 2 - 315, shift+10, width - 50)
      // context.strokeText("1. ", width/2 - 315, shift + 10, width - 50)
      context.fillText(json.songs[0], width/2, shift - 10, width - width / 3 + 20)
      context.strokeText(json.songs[0], width/2, shift - 10, width - width / 3 + 20)
      // shift += 250
      context.font = "bold 40pt Archivo"
      context.textAlign = "center"
      json.songs.forEach((song, i) => {
        if (i !== 0) {
          // context.fillText(i + 1 + ".  " + song, width/2, shift)
          context.fillStyle = "#f25201"
          context.fillRect(width/8, shift - 65, width - width/4, 75)
          context.fillStyle = "#FFFFFF"
          context.fillText(i+1 + ". ", width / 2 - 350, shift)
          let textX = width / 2
          if (song.length > 10) { textX += 15}
          context.fillText(song, textX, shift)
        }
        shift += 100
      })
      
      const buffer = canvas.toBuffer("image/png")
      const base64 = buffer.toString("base64")
      const dataUrl = `data:image/png;base64,${base64}`;
      
      const response = new NextResponse(dataUrl)
      return response
    } catch (error) {
      console.log(error)
      return NextResponse.json({success: false}, {status: 500})
    }
};

// pages/api/create.js
import { NextRequest, NextResponse } from "next/server";
import { ShareImageRequest } from "@/lib/types";
import { createCanvas, loadImage, registerFont } from "canvas";
import path from "path";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
      const json: ShareImageRequest = await req.json()

      registerFont(path.join(process.cwd(), "/public/font/ArchivoBlack-Regular.ttf"), {family: "Archivo"})
      const width = 1080
      const height = 1920
      const canvas =   createCanvas(width, height)
      const context = canvas.getContext("2d")

      const image = await loadImage(path.join(process.cwd(), "/public/images/share-image.png"))
      context.drawImage(image, 0, 0, width, height)
      
      context.textBaseline = "bottom"
      context.fillStyle = "#FFFFFF"
      context.font = "bold 40pt Archivo"
      context.textAlign = "center"
      context.fillText("TOP 5 SONGS FROM", width/2, 350)

      context.font = "bold 110pt Archivo"
      context.fillText("THE LOWS.", width/2, 495)
      
      let shift = height - 600
      context.font = "bold 75pt Archivo"
      context.fillText("1. " + json.songs[0], width/2, shift, width - 50)
      // shift += 25
      context.font = "bold 50pt Archivo"
      context.textAlign = "left"
      json.songs.forEach((song, i) => {
        if (i !== 0) {
          context.fillText(i + 1 + ".  " + song, 60, shift)
        }
        shift += 75
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

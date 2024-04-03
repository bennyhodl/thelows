"use client"
import TheLowsImg from "@/public/images/the-lows.jpeg"
import Image from "next/image"
import { Footer } from "@/components/Footer"
import { useEffect, useState } from "react"
import { TheLows } from "@/lib/types"
import { getSongList } from "@/lib/localStorage"
import { toJpeg } from "html-to-image"
import { Header } from "@/components/Header"
import { Share as ShareIcon } from "lucide-react"
import Link from "next/link"
import { useToJpeg, useToPng } from "@hugocxl/react-to-image"

export default function Share() {
  const [songs, setSongs] = useState<TheLows[]>([])
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [_, convert, ref] = useToPng<HTMLDivElement>({
    onSuccess: (data) => {
      let image: HTMLElement = document.getElementById("share-rank") || HTMLElement.prototype
      image.remove()
      setImageUrl(data)
    }
  })
  useEffect(() => {
    const list = getSongList([]).slice(0, 5)
    setSongs(list)
  }, [])

  useEffect(() => {
    if (!songs) return
    // makeImage()
    convert()
  }, [songs])

  const makeImage = async () => {
    let image: HTMLElement = document.getElementById("share-rank") || HTMLElement.prototype
    const save = await toJpeg(image)
    image.remove()
    setImageUrl(save)
  }
  return (
    <>
      <div className="flex flex-col justify-between items-center h-screen bg-gray-800 md:max-w-lg">
        <Header />
        <div className="w-full flex flex-col justify-center items-center mt-16 px-4">
          {songs && (
            <div className="w-full h-full flex flex-col justify-start" id="share-rank" ref={ref}>
              <Image className="relative" src={TheLowsImg} alt="The Lows Album Art" />
              <div className="absolute bottom-4 left-4 text-white">
                {songs && songs.map((s, i) => {
                  if (i === 0) {
                    return <div className="flex flex-row items-start pb-4 z-10 text-9xl" key={s}><p className="text-4xl">{s}</p></div>
                  } else {
                    return <div className="flex flex-row items-start z-10" key={s}><p className="text-xl">{s}</p></div>
                  }
                })}
              </div>
            </div>
          )}
          {imageUrl && <img className="w-full h-full" src={imageUrl} />}
          <p className="text-3xl mb-3 text-white pt-2">Share your list!</p>
          <div className="flex flex-col justify-around items-center text-white text-center h-1/2 pb-2 text-lg">
            <p>1. Press & hold to save image.</p>
            <p className="flex flex-row">2. Press the share icon (<ShareIcon width={20} height={20} className="mx-2" />).</p>
            <p>3. Share to Instagram.</p>
            <p>3. Post to your story and tag @onlysteves & @justmike.</p>
          </div>
          <Link href="/leaderboard" legacyBehavior>
            <a className="btn rounded-3xl w-3/4 bg-orange-700 py-3 my-4 px-4 text-white text-center">The Lows Song Leaderboard</a>
          </Link>
        </div >
        <Footer />
      </div>
    </>
  )
}

const SharedImage = ({ songs }: { songs: TheLows[] }) => {
  return (
    <div className="bg-black bg-opacity-50 relative w-full h-full flex flex-col justify-start" id="share-rank">
      <Image className="relative" src={TheLowsImg} alt="blah" />
      <div className="absolute bottom-4 left-4 text-white">
        {songs && songs.map((s, i) => {
          if (i === 0) {
            return <div className="flex flex-row items-start pb-4 z-10 text-9xl"><p className="text-4xl">{s}</p></div>
          } else {
            return <div className="flex flex-row items-start z-10"><p className="text-xl">{s}</p></div>
          }
        })}
      </div>
    </div>
  )
}
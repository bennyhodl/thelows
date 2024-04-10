"use client"
import { Footer } from "@/components/Footer"
import { useEffect, useState } from "react"
import { TheLows } from "@/lib/types"
import { getSongList } from "@/lib/localStorage"
import { Header } from "@/components/Header"
import { Share as ShareIcon } from "lucide-react"
import Link from "next/link"
import axios from "axios"
import { API_URL } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

export default function Share() {
  const [songs, setSongs] = useState<TheLows[]>([])
  const [image, setImage] = useState(null)

  useEffect(() => {
    const list = getSongList([]).slice(0, 5)
    setSongs(list)
  }, [])

  const makeImage = async () => {
    const res = await axios.post(API_URL + "/api/share", { songs })
    setImage(res.data)
  }
  useEffect(() => {
    if (songs.length === 0) return
    makeImage()
  }, [songs])

  return (
    <>
      <div className="flex flex-col justify-between items-center h-screen bg-gray-950 md:max-w-lg mx-auto">
        <Header />
        <div className="w-full flex flex-col justify-center items-center mt-16 px-4">
          {!image && <div className="">
            <Skeleton className="w-52 h-96 rounded-md" /></div>
          }
          {image && <img className="w-3/5" src={image} />}
          <p className="text-3xl mb-3 text-white pt-2">Share your list!</p>
          <div className="flex flex-col justify-around items-center text-white text-center h-1/2 pb-2 text-lg">
            <p>1. Press & hold to save image.</p>
            <p className="flex flex-row">2. Press the share icon (<ShareIcon width={20} height={20} className="mx-2" />).</p>
            <p>3. Share to Instagram.</p>
            <p>3. Post to your story and tag @onlysteves & @justmike.</p>
          </div>
          <Link href="/leaderboard" legacyBehavior>
            <a className="btn rounded-3xl w-3/4 bg-[#f25201] py-3 my-4 px-4 text-white text-center">The Lows Song Leaderboard</a>
          </Link>
        </div >
        <Footer />
      </div >
    </>
  )
}

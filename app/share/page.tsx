"use client"
import { Footer } from "@/components/Footer"
import { useEffect, useState } from "react"
import { TheLows } from "@/lib/types"
import { getSongList } from "@/lib/localStorage"
import { toJpeg } from "html-to-image"
import { Header } from "@/components/Header"

export default function Share() {
  const [songs, setSongs] = useState<TheLows[]>([])
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  useEffect(() => {
    const list = getSongList([]).slice(0, 5)
    setSongs(list)
  }, [])

  // useEffect(() => {
  //   if (!songs) return
  //   makeImage()
  // }, [songs])

  const makeImage = async () => {
    let image: HTMLElement = document.getElementById("share-rank") || HTMLElement.prototype
    const save = await toJpeg(image)
    image.remove()
    setImageUrl(save)
  }
  return (
    <div className="flex flex-col items-center h-screen bg-gray-800 md:max-w-lg m-auto">
      <Header />
      <div className="relative w-full overflow-hidden pt-4 flex flex-col justify-center items-center m-auto">
        <div className="w-80 h-96 text-white bg-[url(https://t2.genius.com/unsafe/1948x0/https%3A%2F%2Fimages.genius.com%2Fded447b9455dc138d3d1b88c6240e5fe.1000x1000x1.jpg)] bg-cover" id="share-rank">
          <div className="bg-black bg-opacity-50 relative py-8 px-3 w-full h-full flex flex-col justify-start">
            {songs && songs.map((s, i) => {
              if (i === 0) {
                return <div className="flex flex-row items-start pb-4 z-10"><p className="text-4xl">{s}</p></div>
              } else {
                return <div className="flex flex-row items-start z-10"><p className="text-xl">{s}</p></div>
              }
            })}
          </div>
        </div>
        {imageUrl && <img className="w-80 h-80" src={imageUrl} />}
      </div>
      <div className="flex flex-col justify-around items-center pb-12 text-white text-center h-1/2">
        still a work in progress g 🤙
      </div>
      <Footer />
    </div >
  )
}
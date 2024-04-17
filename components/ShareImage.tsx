"use client"
import { getSongList, getTopFive } from "@/lib/localStorage"
import { TheLows } from "@/lib/types"
import { API_URL } from "@/lib/utils"
import { Suspense } from "react"

export const ShareableImage = async ({ flavor }: { flavor: string | undefined }) => {
  let songs: TheLows[]
  if (flavor === "album") {
    songs = getSongList([]).slice(0, 5)
  } else {
    songs = getTopFive([])
  }

  const response = await fetch(API_URL + "/api/share", { method: "POST", body: JSON.stringify({ songs }) })
  const image = await response.text()
  if (!response.ok) {
    console.log("ERROR")
    return <h1 className="bg-white">error</h1>

  }

  return (
    <Suspense fallback={<p>heyhowareya</p>}>
      <img className="w-3/5" src={image} alt="Top 5 List" />
    </Suspense>
  )
}
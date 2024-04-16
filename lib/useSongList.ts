import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { getSongList, getTopFive, getTopTen } from "./localStorage"
import { theLows } from "./types"

export const useSongList = () => {
  const path = usePathname()
  const [fullAlbum, setFullAlbum] = useState<string[]>(theLows)
  const [topFive, setTopFive] = useState<string[]>([])
  const [topTen, setTopTen] = useState<string[]>([])

  // full album
  useEffect(() => {
    console.log("path", path)
    if (path !== "/album") return
    console.log("album!")
    const songs = getSongList(theLows)
    setFullAlbum(songs)
  }, [])

  // top 5
  useEffect(() => {
    if (path !== "/top5") return
    const songs = getTopFive([])
    setTopFive(songs)
  }, [])

  // top 10
  useEffect(() => {
    if (path !== "/top10") return
    const songs = getTopTen([])
    setTopTen(songs)
  }, [])

  if (path === "/album") {
    return [theLows, fullAlbum]
  } else if (path === "/top5") {
    return [theLows, topFive]
  } else {
    return [theLows, topTen]
  }
}
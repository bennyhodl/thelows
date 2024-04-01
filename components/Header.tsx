import Image from "next/image"
import TheLows from "@/public/the-lows.jpeg"
import { getSongList } from "@/lib/localStorage"

type DbList = {
  name: string,
  points: number
}

export const Header = () => {
  const submitList = () => {
    const songs = getSongList([])
    // TODO feedback
    if (songs.length === 0) return

    let point = songs.length
    const songsToSubmit = songs.map(song => {
      const ranking: DbList = {
        name: song.name,
        points: point
      }

      point -= 1
      return ranking
    })
    console.log(songsToSubmit)
  }
  return (
    <div className="h-12 bg-gray-800 fixed z-50 flex flex-row justify-between items-center w-full md:max-w-lg px-2">
      <Image src={TheLows} alt="The Lows Cover Art" width={35} height={35} />
      <a className="btn bg-orange-500 text-white py-1 px-3 rounded-xl" onClick={() => submitList()}>Submit</a>
    </div>
  )
}
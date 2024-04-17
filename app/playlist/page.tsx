"use server"
import { Suspense } from "react";
import { API_URL } from "@/lib/utils";
import { LeaderBoardResponse, LeaderboardSong, theLows } from "@/lib/types";
import TheLowsImage from "@/public/images/the-lows.jpeg"
import Image from "next/image"
import { Tag } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const getLeaderboard = async (): Promise<LeaderBoardResponse> => {
  const response = await fetch(`${API_URL}/api/leaderboard`)
  const leaderboard: LeaderBoardResponse = await response.json()
  leaderboard.songs.sort((a, b) => Number(b.percent) - Number(a.percent))
  return leaderboard
}

export default async function Leaderboard({ searchParams }: { searchParams: { city: string } }) {
  console.log(searchParams)
  const leaderboard = await getLeaderboard()

  return (
    <Suspense>
      <div className="flex flex-col text-white items-center bg-gray-950 md:max-w-lg font-bold pt-8">
        {/* <Header /> */}
        <ImageArt />
        <AlbumInformation city="cleveland" />
        <ColumnTitle />
        {leaderboard.songs.map((song, index) => (
          <PlaylistSong song={song.name} points={song.points} percentage={song.percent} index={index + 1} />
        ))}
      </div >
    </Suspense>
  );
}

const ImageArt = () => {
  return <Image src={TheLowsImage} alt="The Lows Album Art" className="px-12 mt-8" width={350} />
}

const AlbumInformation = ({ city }: { city: string }) => {
  return (
    <div className="flex flex-row justify-between items-center w-full px-8 mt-5 mb-5">
      <div className="flex-col">
        <p>upside down playlist</p>
        <p className="text-xs text-gray-400">{city}.</p>
      </div>
      <div className="bg-[#f25201] p-2 rounded-full">
        <Tag className=" rounded-full text-white w-6 h-6 m-1" />
      </div>
    </div>
  )
}

const PlaylistSong = ({ song, percentage, points, index }: { song: string, percentage: string, points: number, index: number }) => {
  return (
    <div className="flex flex-row justify-between items-center text-white w-full pr-8 my-1">
      <div className="flex items-center flex-row">
        <p className="px-4 text-gray-400">{index}</p>
        <div className="flex flex-col justify-center">
          <p>{song}</p>
          <p className="text-xs text-gray-400 font-light">mike.</p>
        </div>
      </div>
      <p className="ml-1 text-lg text-gray-400 font-normal">{points} votes</p>
    </div>
  )

}

const ColumnTitle = () => {
  return (
    <div className="w-full px-2 flex flex-col text-xs text-gray-400">
      <div className="flex flex-row justify-between mb-2">
        <div className="flex flex-row">
          <p className="ml-2">#</p>
          <p className="ml-3">Song</p>
        </div>
        <p className="mr-5">Votes</p>
      </div>
      <Separator className="bg-gray-700" orientation="horizontal" />
    </div>
  )
}
const SongBar = ({ song }: { song: LeaderboardSong }) => {
  return (
    <div className="w-80 flex flex-col">
      <p className="text-start">{song.name}</p>
      <div className="bg-gray-950 h-6 my-1 flex flex-row justify-between">
        <div className="bg-[#f25201] h-6 rounded-md" style={{ width: song.percent + "%" }}></div>
        <p>{song.percent}%</p>
      </div>
    </div>
  )
}

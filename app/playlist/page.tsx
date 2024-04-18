"use server"
import { Suspense } from "react";
import { API_URL } from "@/lib/utils";
import { Cities, LeaderBoardResponse, LeaderboardSong, theLows } from "@/lib/types";
import { Header } from "@/components/Header";
import { Tag, AudioLines } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { TourCityImage } from "@/components/CityImage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ColumnTitle } from "@/components/ColumnTitles";
import Link from "next/link";

const getLeaderboard = async (city: string): Promise<LeaderBoardResponse> => {
  const response = await fetch(`${API_URL}/api/leaderboard?city=${city}`)
  const leaderboard: LeaderBoardResponse = await response.json()
  leaderboard.songs.sort((a, b) => Number(b.percent) - Number(a.percent))
  return leaderboard
}

export default async function Leaderboard({ searchParams }: { searchParams: { city: Cities } }) {
  const leaderboard = await getLeaderboard(searchParams?.city)

  return (
    <Suspense>
      <Header center={true} city={searchParams.city} />
      <div className="flex flex-col text-white items-center justify-center bg-custom md:max-w-lg w-full font-garamond-bold font-bold pt-8">
        <Tabs defaultValue="the-lows" className="text-white pt-8 w-full px-2 flex flex-col items-center">
          <TabsList className="w-full bg-gray-950">
            <TabsTrigger className="w-1/2 bg-none" value="the-lows">The Lows</TabsTrigger>
            <TabsTrigger className="w-1/2 bg-none" value="other-songs">The Vibes</TabsTrigger>
          </TabsList>
          <TabsContent value="the-lows">
            <TourCityImage city={searchParams.city} />
            <AlbumInformation city={searchParams.city} playlistName="upside down tour" />
            <ColumnTitle />
            {leaderboard.songs.map((song, index) => (
              <PlaylistSong song={song.name} points={song.points} percentage={song.percent} index={index + 1} key={song.name} />
            ))}
          </TabsContent>
          <TabsContent value="other-songs">
            <TourCityImage city="steve" />
            <AlbumInformation city={searchParams.city} playlistName="ynk" />
            <ColumnTitle />
            {leaderboard.songs.map((song, index) => (
              <PlaylistSong song={song.name} points={song.points} percentage={song.percent} index={index + 1} key={song.name} />
            ))}
          </TabsContent>
        </Tabs>
      </div >
    </Suspense>
  );
}

const AlbumInformation = ({ city, playlistName }: { city: string, playlistName: "ynk" | "upside down tour" }) => {
  return (
    <div className="flex flex-row justify-between items-center w-full px-6 mt-5 mb-5">
      <div className="flex-col">
        <p className="text-xl">{playlistName} setlist</p>
        <p className="text-lg text-gray-400">{city}.</p>
      </div>
      <div className="bg-[#f25201] p-2 rounded-full">
        <Link href="https://ditto.fm/the-lows" target="_blank">
          <AudioLines className="text-white w-6 h-6 m-1" />
        </Link>
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
      <p className="ml-1 text-md pb-3 text-gray-400 font-normal">{points} votes</p>
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

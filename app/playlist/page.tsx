"use server"
import { Suspense } from "react";
import { API_URL } from "@/lib/utils";
import { Cities, LeaderBoardResponse } from "@/lib/types";
import { Header } from "@/components/Header";
import { AudioLines } from "lucide-react";
import { TourCityImage } from "@/components/CityImage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ColumnTitle } from "@/components/ColumnTitles";
import Link from "next/link";
import { Footer } from "@/components/Footer";

const getLowsLeaderboard = async (city: string): Promise<LeaderBoardResponse> => {
  const response = await fetch(`${API_URL}/api/leaderboard?city=${city}`, { cache: "no-cache" })
  const leaderboard: LeaderBoardResponse = await response.json()
  leaderboard.songs.sort((a, b) => Number(b.points) - Number(a.points))
  return leaderboard
}

const getVibesLeaderboard = async (city: string): Promise<LeaderBoardResponse> => {
  const response = await fetch(`${API_URL}/api/leaderboard/other?city=${city}`, { cache: "no-cache" })
  const leaderboard: LeaderBoardResponse = await response.json()
  leaderboard.songs.sort((a, b) => Number(b.points) - Number(a.points))
  return leaderboard
}

export default async function Leaderboard({ searchParams }: { searchParams: { city: Cities } }) {
  const vibesLeaderboard = await getVibesLeaderboard(searchParams?.city)
  const lowsLeaderboard = await getLowsLeaderboard(searchParams?.city)

  return (
    <Suspense>
      <Header center={true} city={searchParams.city} />
      <div className="flex flex-col text-white items-center justify-center  md:max-w-lg w-full font-serif font-bold pt-8">
        <Tabs defaultValue="the-lows" className="text-white pt-8 w-full px-2 flex flex-col items-center">
          <TabsList className="w-full bg-gray-950">
            <TabsTrigger className="w-1/2 ne" value="the-lows">The Lows</TabsTrigger>
            <TabsTrigger className="w-1/2 ne" value="other-songs">The Vibes</TabsTrigger>
          </TabsList>
          <TabsContent value="the-lows">
            <TourCityImage city={searchParams.city} />
            <AlbumInformation city={searchParams.city} playlistName="upside down tour" />
            <ColumnTitle />
            {lowsLeaderboard.songs.map((song, index) => (
              <PlaylistSong song={song.name} album={song.album} points={song.points} index={index + 1} key={song.name} />
            ))}
          </TabsContent>
          <TabsContent value="other-songs">
            <TourCityImage city="steve" />
            <AlbumInformation city={searchParams.city} playlistName="ynk" />
            <ColumnTitle />
            {vibesLeaderboard.songs.map((song, index) => (
              <PlaylistSong song={song.name} album={song.album} points={song.points} index={index + 1} key={song.name} />
            ))}
          </TabsContent>
        </Tabs>
      </div >
      <Footer full={false} />
    </Suspense>
  );
}

const AlbumInformation = ({ city, playlistName }: { city: string, playlistName: "ynk" | "upside down tour" }) => {
  return (
    <div className="flex flex-row justify-between items-center w-full px-4 mt-5 mb-5">
      <div className="flex-col">
        <p className="text-xl">{playlistName} playlist</p>
        <p className="text-lg text-gray-400">{city || "upside down tour"}.</p>
      </div>
      <div className="bg-[#02c7d4] p-2 rounded-full">
        <Link href="https://ditto.fm/the-lows" target="_blank">
          <AudioLines className="text-white w-6 h-6 m-1" />
        </Link>
      </div>
    </div>
  )
}

const PlaylistSong = ({ song, album, points, index }: { song: string, album: string, points: number, index: number }) => {
  return (
    <div className="flex flex-row justify-between items-center text-white w-full pr-8 my-1">
      <div className="flex items-center flex-row">
        <p className="px-4 text-gray-400">{index}</p>
        <div className="flex flex-col justify-center">
          <p>{song}</p>
          <div className="flex flex-row text-xs text-gray-400 font-light">
            <p>{album}</p>
            <p className="px-1">•</p>
            <p className="text-xs text-gray-400 font-light">mike.</p>
          </div>
        </div>
      </div>
      <p className="ml-1 text-md pb-3 text-gray-400 font-normal">{points}</p>
    </div>
  )

}

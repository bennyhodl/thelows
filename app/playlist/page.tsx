"use client"
import { Suspense, useEffect, useState } from "react";
import { API_URL } from "@/lib/utils";
import { Cities, LeaderBoardResponse } from "@/lib/types";
import { Header } from "@/components/Header";
import { AudioLines } from "lucide-react";
import { TourCityImage } from "@/components/CityImage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ColumnTitle } from "@/components/ColumnTitles";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { AlbumImage } from "@/components/AlbumImage";
import Image from "next/image"
import Smileys from "@/public/images/smileys-big.png"
import { getSubmittedAlready, saveSubmittedAlready } from "@/lib/localStorage";
import Confetti from "react-confetti"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


export default function Leaderboard({ searchParams }: { searchParams: { city: Cities } }) {
  const [sub, setSub] = useState("true")
  const [vibesLeaderboard, setVibesLeaderboard] = useState<LeaderBoardResponse | null>(null)
  const [lowsLeaderboard, setLowsLeaderboard] = useState<LeaderBoardResponse | null>(null)

  // const vibesLeaderboard = await getVibesLeaderboard(searchParams?.city)
  // const lowsLeaderboard = await getLowsLeaderboard(searchParams?.city)
  const getLowsLeaderboard = async (city: string): Promise<LeaderBoardResponse> => {
    const response = await fetch(`${API_URL}/api/leaderboard?city=${city}`, { cache: "no-cache" })
    const leaderboard: LeaderBoardResponse = await response.json()
    leaderboard.songs.sort((a, b) => Number(b.points) - Number(a.points))
    setLowsLeaderboard(leaderboard)
    return leaderboard
  }

  const getVibesLeaderboard = async (city: string): Promise<LeaderBoardResponse> => {
    const response = await fetch(`${API_URL}/api/leaderboard/other?city=${city}`, { cache: "no-cache" })
    const leaderboard: LeaderBoardResponse = await response.json()
    leaderboard.songs.sort((a, b) => Number(b.points) - Number(a.points))
    setVibesLeaderboard(leaderboard)
    return leaderboard
  }

  useEffect(() => {
    const submitted = getSubmittedAlready()
    console.log("use effect", submitted)
    setSub(submitted)
    console.log(sub)

    getLowsLeaderboard(searchParams.city)
    getVibesLeaderboard(searchParams.city)
  }, [])
  return (
    <>
      <Header center={true} city={searchParams.city} />
      <div className="flex flex-col text-white items-center justify-center  md:max-w-lg w-full font-serif font-bold pt-8">
        {sub === "false" && (
          <>
            <Confetti />
            <AlertDialog open={sub === "false"}>
              <AlertDialogContent className="w-5/6 bg-custom border-1 boorder-gray-400 text-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>i'll see you in {searchParams.city === "steve" ? "concert" : searchParams.city}!</AlertDialogTitle>
                  <AlertDialogDescription>
                    Your vote has been submitted for the <em>upside down playlist</em>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction onClick={() => {
                    setSub("true")
                    saveSubmittedAlready(true)
                  }}>Ok</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          </>
        )}
        <Tabs defaultValue="the-lows" className="text-white pt-8 w-full px-2 flex flex-col items-center">
          <TabsList className="w-full bg-gray-950">
            <TabsTrigger className="w-1/2 ne" value="the-lows">The Lows</TabsTrigger>
            <TabsTrigger className="w-1/2 ne" value="other-songs">The Vibes</TabsTrigger>
          </TabsList>
          <TabsContent value="the-lows">
            <TourCityImage city={searchParams.city} />
            <AlbumInformation city={searchParams.city} playlistName="upside down tour" />
            <ColumnTitle />
            {lowsLeaderboard?.songs.map((song, index) => (
              <PlaylistSong song={song.name} album={song.album} points={song.points} index={index + 1} key={song.name} />
            ))}
          </TabsContent>
          <TabsContent value="other-songs">
            <TourCityImage city="steve" />
            <AlbumInformation city={searchParams.city} playlistName="ynk" />
            <ColumnTitle />
            {vibesLeaderboard?.songs.map((song, index) => (
              <PlaylistSong song={song.name} album={song.album} points={song.points} index={index + 1} key={song.name} />
            ))}
          </TabsContent>
        </Tabs>
      </div >
      <Footer full={false} />
    </>
  );
}

const AlbumInformation = ({ city, playlistName }: { city: string, playlistName: "ynk" | "upside down tour" }) => {
  return (
    <div className="flex flex-row justify-between items-center w-full px-4 mt-5 mb-5">
      <div className="flex-col">
        <p className="text-xl">{playlistName} playlist</p>
        <p className="text-lg text-gray-400">{city || "upside down tour"}</p>
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
    <div className="flex flex-row justify-between items-center text-white w-full pr-8 my-3 h-12">
      <div className="flex items-center flex-row">
        <p className="px-4 text-gray-400">{index}</p>
        <div className="flex flex-col justify-center">
          <p>{song}</p>
          <div className="flex flex-row text-xs text-gray-400 font-light">
            <p>{album}</p>
            <p className="px-1">•</p>
            <p className="text-xs text-gray-400 font-light">{points} votes</p>
          </div>
        </div>
      </div>
      {album === "the lows." ? <Image src={Smileys} height={40} width={40} alt="keep going." /> : <AlbumImage album={album} width={50} height={50} />}
    </div>
  )

}

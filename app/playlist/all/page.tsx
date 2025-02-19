"use client"
import { useEffect } from "react";
import { LeaderBoardResponse } from "@/lib/types";
import { Header } from "@/components/Header";
import { AudioLines } from "lucide-react";
import { TourCityImage } from "@/components/CityImage";
import { ColumnTitle } from "@/components/ColumnTitles";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { AlbumImage } from "@/components/AlbumImage";
import Image from "next/image"
import { getCity } from "@/lib/localStorage";
import TheLows from "@/public/images/the-lows.jpeg"
import axios from "axios";
import useSwr from "swr"
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/lib/useUser";
import { ToastAction } from "@radix-ui/react-toast";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

const getVibesLeaderboard = async (city: string): Promise<LeaderBoardResponse> => {
  if (city === undefined) {
    city = getCity()
  }
  const response = await axios.get("/api/leaderboard/other")
  const leaderboard: LeaderBoardResponse = response.data
  leaderboard.songs.sort((a, b) => Number(b.points) - Number(a.points))
  return leaderboard
}
export default function Leaderboard() {
  const id = useUser()
  const { data: vibesLeaderboard, isLoading, error: vibesError } = useSwr(`vibes-leaderboard-${id}`, () => getVibesLeaderboard("steve"))
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (!vibesError) return
    toast({
      description: "Error getting playlist. Refresh the page to try again.",
      action: <ToastAction altText="Reload page" onClick={() => router.refresh()}>Reload</ToastAction>,
      variant: "destructive",
      duration: 1000
    })
  }, [vibesError])

  return (
    <div className="m-auto md:max-w-lg w-full">
      <Header center={false} />
      <div className="flex flex-col text-white items-center m-auto justify-center px-2 md:max-w-lg w-full font-serif font-bold pt-10">
        <TourCityImage city="steve" />
        <AlbumInformation city="mike." playlistName="upside down tour" />
        <ColumnTitle />
        {isLoading && [0, 1, 2, 3, 4].map(i => <Skeleton key={i} className="h-12 my-2 bg-black" />)}
        {vibesLeaderboard?.songs.map((song, index) => (
          <PlaylistSong song={song.name} album={song.album} points={song.points} index={index + 1} key={song.name} />
        ))}
      </div>
      <Footer full={false} />
    </div>
  );
}

const AlbumInformation = ({ city, playlistName }: { city: string, playlistName: "ynk" | "upside down tour" }) => {
  return (
    <div className="flex flex-row justify-between items-center w-full px-4 mt-5 mb-5">
      <div className="flex-col">
        <p className="text-xl text-black">{playlistName} playlist</p>
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
    <div className="flex flex-row justify-between items-center text-gray-800 w-full pr-2 my-2 h-12">
      <div className="flex items-center flex-row">
        <p className="pl-2 pr-4 text-gray-400">{index}</p>
        <div className="flex flex-col justify-center">
          <p>{song}</p>
          <div className="flex flex-row text-xs text-gray-400 font-light">
            <p>{album}</p>
            <p className="px-1">•</p>
            <p className="text-xs text-gray-400 font-light">{points} votes</p>
          </div>
        </div>
      </div>
      {album === "the lows." ? <Image src={TheLows} height={45} width={45} alt="keep going." /> : <AlbumImage album={album} width={45} height={45} />}
    </div>
  )

}

const Loading = () => {
  return (<div className="bg-custom h-full w-full mx-auto flex justify-center items-center"><AlbumImage album="smiley" width={150} height={150} /></div>)
}

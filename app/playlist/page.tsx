"use client"
import { useEffect, useId, useState } from "react";
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
import { getCity, getId, getSubmittedAlready, saveSubmittedAlready } from "@/lib/localStorage";
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
import TheLows from "@/public/images/the-lows.jpeg"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios";
import validator from "email-validator"
import useSwr, { useSWRConfig } from "swr"
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/lib/useUser";
import { ToastAction } from "@radix-ui/react-toast";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

const getLowsLeaderboard = async (): Promise<LeaderBoardResponse> => {
  const response = await axios.get("/api/leaderboard")
  const leaderboard: LeaderBoardResponse = response.data
  leaderboard.songs.sort((a, b) => Number(b.points) - Number(a.points))
  return leaderboard
}

export default function Leaderboard({ searchParams }: { searchParams: { city: Cities } }) {
  const { mutate } = useSWRConfig()
  const [sub, setSub] = useState("true")
  const id = useUser()
  const [email, setEmail] = useState("")
  const { data: lowsLeaderboard, isLoading, error: lowsError } = useSwr(`lows-leaderboard-${id}`, () => getLowsLeaderboard())
  const { data: vibesLeaderboard, error: vibesError } = useSwr(`vibes-leaderboard-${id}`, () => getLowsLeaderboard())
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    mutate(`lows-leaderboard-${id}`)
    mutate(`vibes-leaderboard-${id}`)
  }, [searchParams.city])

  const submitEmail = async () => {
    try {
      await axios.post("/api/email", { id, email })
    } catch (e) {
      toast({
        description: "Error sending email",
        variant: "destructive"
      })
    }
  }

  useEffect(() => {
    const submitted = getSubmittedAlready()
    setSub(submitted)
  }, [])

  useEffect(() => {
    if (!lowsError) return
    toast({
      description: "Error getting playlist. Refresh the page to try again.",
      variant: "destructive",
      duration: 1000
    })
  }, [lowsError])

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
      <div className="flex flex-col text-white items-center m-auto justify-center px-2 md:max-w-lg w-full font-serif font-bold pt-16">
        {sub === "false" && (
          <>
            <Confetti />
            <AlertDialog open={sub === "false"}>
              <AlertDialogContent className="w-5/6 bg-custom border-1 border-gray-800 text-gray-800 rounded-none">
                <AlertDialogHeader>
                  <AlertDialogTitle>i'll see you in concert!</AlertDialogTitle>
                  <AlertDialogDescription>
                    Your vote has been submitted for the <em>upside down playlist</em>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="grid w-full max-w-sm items-center gap-1.5 text-black">
                  <Label htmlFor="email" className="text-gray-400">Enter email to see song rankings</Label>
                  <Input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <AlertDialogFooter>
                  <AlertDialogAction className="bg-black text-white rounded-none" disabled={!validator.validate(email)} onClick={async () => {
                    setSub("true")
                    saveSubmittedAlready(true)
                    await submitEmail()
                  }}>Ok</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          </>
        )}
        <TourCityImage />
        <AlbumInformation city={searchParams.city} playlistName="upside down tour" />
        <ColumnTitle />
        {isLoading && [0, 1, 2, 3, 4].map(i => <Skeleton key={i} className="h-12 my-2 bg-gray-200" />)}
        {lowsLeaderboard?.songs.map((song, index) => (
          <PlaylistSong song={song.name} album={song.album} points={song.points} index={index + 1} key={song.name} />
          // <Skeleton className="h-12 my-2" />
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
            <p className="text-xs text-gray-400 font-light">{points.toLocaleString()} votes</p>
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

const getVibesLeaderboard = async (city: string): Promise<LeaderBoardResponse> => {
  if (city === undefined) {
    city = getCity()
  }
  const response = await fetch(`${API_URL}/api/leaderboard/other?city=${city}`, { cache: "no-cache" })
  const leaderboard: LeaderBoardResponse = await response.json()
  leaderboard.songs.sort((a, b) => Number(b.points) - Number(a.points))
  return leaderboard
}

const CityTabs = ({ searchParams, isLoading, lowsLeaderboard, vibesLeaderboard }: { searchParams: { city: Cities }, isLoading: boolean, lowsLeaderboard: LeaderBoardResponse, vibesLeaderboard: LeaderBoardResponse }) => {
  return (
    <Tabs defaultValue="the-lows" className="text-gray-800 pt-8 w-full px-2 flex flex-col items-center">
      {searchParams.city !== "steve" && <TabsList className="w-full bg-gray-200">
        <TabsTrigger className="w-1/2 ne" value="the-lows">{searchParams.city} list</TabsTrigger>
        <TabsTrigger className="w-1/2 ne" value="other-songs">all cities</TabsTrigger>
      </TabsList>}
      <TabsContent value="the-lows">
        <TourCityImage city={searchParams.city} />
        <AlbumInformation city={searchParams.city} playlistName="upside down tour" />
        <ColumnTitle />
        {isLoading && [0, 1, 2, 3, 4].map(i => <Skeleton key={i} className="h-12 my-2 bg-gray-200" />)}
        {lowsLeaderboard?.songs.map((song, index) => (
          <PlaylistSong song={song.name} album={song.album} points={song.points} index={index + 1} key={song.name} />
          // <Skeleton className="h-12 my-2" />
        ))}
      </TabsContent>
      <TabsContent value="other-songs">
        <TourCityImage city="steve" />
        <AlbumInformation city="all cities" playlistName="upside down tour" />
        <ColumnTitle />
        {isLoading && <Skeleton className="h-12 my-2 bg-gray-200" />}
        {vibesLeaderboard?.songs.map((song, index) => (
          <PlaylistSong song={song.name} album={song.album} points={song.points} index={index + 1} key={song.name} />
        ))}
      </TabsContent>
    </Tabs>
  )
}
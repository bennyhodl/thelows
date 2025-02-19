"use client";
import Image from "next/image";
import UpsideDownPlaylist from "@/public/images/playlist-logo-slim.png";
import TheLowsImage from "@/public/images/lows-playlist-logo.jpeg";
import { getCity, getTopOtherSongs, getTopTen } from "@/lib/localStorage";
import axios from "axios";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { API_URL } from "@/lib/utils";
import { useUser } from "@/lib/useUser";
import { Cities, SongScore, SubmitListRequest } from "@/lib/types";
import Link from "next/link";
import { Button } from "./ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useState, useEffect } from "react";
import { Drawer } from "@/components/ui/drawer"
import { useToast } from "./ui/use-toast";

export const Header = ({ center }: { center: boolean }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const pathname = usePathname();
  const router = useRouter()
  const id = useUser()
  const { toast } = useToast()

  const submitLowsList = async () => {
    setLoading(true)
    let songs: string[] = getTopTen([])

    let availablePoints = songs.length;
    const songsToSubmit = songs.map(s => {
      const song = JSON.parse(s)
      const ranking: SongScore = {
        name: song.name,
        id: song.id,
        album: song.album,
        points: availablePoints,
      };

      availablePoints -= 1;
      return ranking;
    });

    const postList: SubmitListRequest = {
      id,
      songs: songsToSubmit
    }

    try {
      await axios.post(
        `/api/submit-list`,
        postList
      );
    } catch (_) {
      setLoading(false)
      return toast({
        description: "Error submitting list. Refresh and submit again."
      })
    }

    router.push("/playlist");
    setLoading(false)
  };

  const submitOtherSongsList = async () => {
    setLoading(true)
    let list: string[] = getTopOtherSongs([])
    let parseSongs = list.map(s => JSON.parse(s))

    let songs: SongScore[] = parseSongs.map(s => { s["points"] = 100; return s })

    const postList: SubmitListRequest = {
      id,
      songs
    }

    try {
      await axios.post(
        `/api/submit-list/other`,
        postList
      );
    } catch (_) {
      setLoading(false)
      return toast({
        description: "Error submitting list. Refresh and submit again."
      })
    }
    // city
    router.push("/playlist/all");
    setLoading(false)
  };

  const HeaderButton = () => {
    switch (pathname) {
      case "/album":
        return (
          <Button
            className="btn bg-black text-white font-serif py-0 px-4 rounded-none cursor-pointer font-bold"
            onClick={async () => await submitLowsList()} // City
          >
            Submit
          </Button>
        )
      case "/list/other-songs":
        return (
          <Button
            className="btn bg-black text-white font-serif py-0 px-4 rounded-none cursor-pointer font-bold"
            onClick={async () => await submitOtherSongsList()} // City
          >
            Submit
          </Button>
        )
      case "/list/order":
        return (
          <div
            className="bg-black text-white font-serif py-2 px-4 rounded-none cursor-pointer font-bold"
            onClick={async () => await submitLowsList()}
          >
            {/* <DrawerTrigger className="w-full"> */}
            Submit
            {/* </DrawerTrigger> */}
          </div>
        )
      case "/list":
        return (
          <Button
            className="btn bg-black text-white font-serif py-0 px-4 rounded-none cursor-pointer font-bold"
            onClick={async () => {
              const songs = getTopTen([])
              if (songs.length === 0) {
                return toast({
                  description: "Pick songs before submitting",
                  duration: 1000
                })
              }
              router.push("/list/order")
            }}
          >
            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Next
          </Button>
        )
      case "/playlist":
        return <ReferButton />
      case "/playlist/all":
        return <ReferButton />
      default:
        return <></>
    }
  }

  const shareStuff = {
    title: "upside down playlist",
    text: `pick the setlist for my tour.\n\n\t- mike.`,
    url: "https://thelows.top"
  }

  const ReferButton = () => {
    const { toast } = useToast()
    useEffect(() => {
      // This code runs only on the client side
      if (!navigator.share) {
        console.log('Web Share API not supported');
      }
    }, []);

    async function showShareMenu() {
      try {
        await navigator.share(shareStuff)
      } catch (e) {
        console.log("erorr sharing: ", e)
        return toast({ description: "Your browser does not support sharable links." })
      }
    }
    return (
      <Button
        className="btn bg-black hover:bg-black text-white font-serif py-0 px-4 rounded-none cursor-pointer"
        onClick={async () => showShareMenu()}
      >
        Refer a friend
      </Button>
    )
  }

  const classes = !center ? "h-14 bg-custom m-auto fixed flex flex-row justify-between items-center w-full md:max-w-lg px-2 py-2" : "h-14 bg-custom m-auto fixed flex justify-center w-full md:max-w-lg px-2 py-2"
  const image = pathname === "/" ? TheLowsImage : UpsideDownPlaylist
  const width = pathname === "/" ? 40 : 85
  const height = pathname === "/" ? 40 : 85
  return (
    <Drawer>
      <div className={classes}>
        <Link href="/" legacyBehavior>
          <Image src={image} alt="The Lows Cover Art" className="cursor-pointer" width={width} height={height} />
        </Link>
        {loading ? (
          <Button
            className="btn bg-black text-white text-center font-serif py-0 px-1 rounded-none cursor-pointer font-bold w-28"
            onClick={async () => await submitLowsList()}
          >
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Loading
          </Button>
        )
          :
          <HeaderButton />
        }
        {/* <DrawerContent className="bg-gray-950 border-gray-800">
          <DrawerHeader>
            <DrawerTitle className="text-white"><p className="font-serif text-2xl">Would you like to pick songs from previous albums?</p></DrawerTitle>
          </DrawerHeader>
          <DrawerFooter>
            <Link href={`/list/other-songs?city=${city}`} legacyBehavior>
              <a className="btn rounded-none w-full text-center bg-black text-white py-3 px-4 mb-1 font-serif font-3xl"><p>Pick From All Songs</p></a>
            </Link>
            <Link href={`/playlist?city=${city}`} legacyBehavior>
              <a className="btn rounded-none w-full text-center text-white py-3 px-4 mb-3 bg-[#9CA3AF] font-serif">See Results for {city.slice(0, 1)[0].toUpperCase() + city.slice(1)}</a>
            </Link>
          </DrawerFooter>
        </DrawerContent> */}
      </div>
    </Drawer>
  );
};

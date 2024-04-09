"use client";
import Image from "next/image";
import TheLows from "@/public/images/the-lows.jpeg";
import { getSongList } from "@/lib/localStorage";
import axios from "axios";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { API_URL } from "@/lib/utils";
import { useUser } from "@/lib/useUser";
import { SongScore, SubmitListRequest, theLows } from "@/lib/types";
import Link from "next/link";
import { Button } from "./ui/button"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useState } from "react";

export const Header = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter();
  const pathname = usePathname();
  const id = useUser()

  const submitList = async () => {
    setLoading(true)
    const songs = getSongList(theLows);
    // TODO feedback
    if (songs.length === 0) return;

    let availablePoints = songs.length;
    const songsToSubmit = songs.map((song) => {
      const ranking: SongScore = {
        name: song,
        points: availablePoints,
      };

      availablePoints -= 1;
      return ranking;
    });

    const postList: SubmitListRequest = {
      id,
      songs: songsToSubmit
    }

    await axios.post(
      `${API_URL}/api/submit-list`,
      postList
    );

    router.push("share");
    setLoading(false)
  };

  const isCreateList = pathname === "/album";
  const path = pathname === "/leaderboard" ? { name: "Songs", path: "/album" } : { name: "Leaderboard", path: "/leaderboard" }

  return (
    <div className="h-14 bg-gray-950 fixed z-50 flex flex-row justify-between items-center w-full md:max-w-lg px-2 py-2">
      <Link href="/" legacyBehavior>
        <Image src={TheLows} alt="The Lows Cover Art" className="cursor-pointer" width={40} height={40} />
      </Link>
      {isCreateList ? (
        <Button
          className="btn bg-orange-600 text-white py-0 px-4 rounded-lg cursor-pointer"
          onClick={async () => await submitList()}
        >
          {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      ) : (
        <Button
          className="btn bg-orange-600 text-white py-0 px-4 rounded-xl cursor-pointer"
          onClick={() => { setLoading(true); router.push(path.path) }}
        >
          {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          {path.name}
        </Button>
      )}
    </div>
  );
};

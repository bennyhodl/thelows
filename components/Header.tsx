"use client";
import Image from "next/image";
import TheLows from "@/public/images/the-lows.jpeg";
import { getSongList } from "@/lib/localStorage";
import axios from "axios";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { API_URL } from "@/lib/utils";
import { useUser } from "@/lib/useUser";
import { SongScore, SubmitListRequest } from "@/lib/types";

export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const id = useUser()

  const submitList = async () => {
    const songs = getSongList([]);
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
  };

  const isCreateList = pathname === "/album";
  const path = pathname === "/leaderboard" ? { name: "List", path: "/album" } : { name: "Leaderboard", path: "/leaderboard" }

  return (
    <div className="h-12 bg-gray-800 fixed z-50 flex flex-row justify-between items-center w-full md:max-w-lg px-2">
      <Image src={TheLows} alt="The Lows Cover Art" width={35} height={35} />
      {isCreateList ? (
        <a
          className="btn bg-orange-500 text-white py-1 px-3 rounded-xl"
          onClick={async () => await submitList()}
        >
          Submit
        </a>
      ) : (
        <a
          className="btn bg-orange-500 text-white py-1 px-3 rounded-xl"
          onClick={() => router.push(path.path)}
        >
          {path.name}
        </a>
      )}
    </div>
  );
};

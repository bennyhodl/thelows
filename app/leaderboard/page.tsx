"use client"
import { Footer } from "@/components/Footer";
import { Suspense } from "react";
import { Header } from "@/components/Header";
import { API_URL } from "@/lib/utils";
import { LeaderBoardResponse, LeaderboardSong, theLows } from "@/lib/types";

const getLeaderboard = async (): Promise<LeaderBoardResponse> => {
  const response = await fetch(`${API_URL}/api/leaderboard`)
  const leaderboard: LeaderBoardResponse = await response.json()
  leaderboard.songs.sort((a, b) => Number(b.percent) - Number(a.percent))
  return leaderboard
}

export default async function Leaderboard() {
  const leaderboard = await getLeaderboard()

  return (
    <Suspense fallback={<p className="text-red text-3xl bg-blue-400">heyhowareya</p>}>
      <div className="flex flex-col justify-between items-center h-screen bg-gray-950 md:max-w-lg m-auto font-bold">
        <Header center={false} city="tampa" />
        <div className="w-full flex justify-center flex-col items-center text-white">
          <h1 className="pt-14 pb-6 text-3xl text-center">Leaderboard</h1>
          {leaderboard.songs.map(song => <SongBar key={song.name} song={song} />)}
        </div>
        <Footer full={false} />
      </div >
    </Suspense>
  );
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

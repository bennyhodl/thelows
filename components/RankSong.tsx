import { SongScore } from "@/lib/types"
import { Menu } from "lucide-react"

export const RankSong = ({ song, index }: { song: SongScore, index: number }) => {
  return (
    <div className="flex flex-row justify-between items-center h-16 w-full pr-2 py-2 px-2 my-1 text-white active:bg-custom border-2 rounded-lg border-gray-800 bg-custom">
      <div className="flex flex-row items-center justify-center">
        <p className="pr-4 pl-2 text-gray-400 text-sm font-bold">{index + 1}</p>
        <div className="fled flex-col">
          <p className="w-full mt-2 text-md text-left">{song.name}</p>
          <div className="flex flex-row text-xs text-gray-400">
            <p className="">{song.album}</p>
            <p className="px-1">•</p>
            <p className="mb-2">mike.</p>
          </div>
        </div>
      </div>
      <Menu color="#9CA3AF" />
    </div>)
}

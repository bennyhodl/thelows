import { SongScore } from "@/lib/types"
import { AlbumImage } from "./AlbumImage"

export const ToggleSong = ({ song }: { song: SongScore }) => {
  return (<div className="flex flex-row justify-between items-center h-8 w-full pl-2 pr-1">
    <div className="fled flex-col">
      <p className="w-full mt-2 text-sm text-left">{song.name}</p>
      <div className="flex flex-row text-xs text-gray-400">
        <p className="">{song.album}</p>
        <p className="px-1">•</p>
        <p className="mb-2">mike.</p>
      </div>
    </div>
    <AlbumImage album="smiley" width={35} height={35} paddingRight={0} />
  </div>)
}

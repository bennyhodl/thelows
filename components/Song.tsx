import { Draggable } from "@hello-pangea/dnd";
import { SongScore, TheLows } from "@/lib/types";
import { Menu } from "lucide-react"
import { RankSong } from "./RankSong";

export const Song = ({ song, index, id }: { song: SongScore, id: string, index: number }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <div
          // className="flex flex-row justify-between m-auto items-center ne border-2 border-gray-800 my-2 pl-2 py-3 pr-3 w-11/12 rounded-lg text-white font-serif text-2xl"
          className="w-full"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <RankSong song={song} index={index} />
        </div>
      )}
    </Draggable>
  );
}

export const SongList = ({ songs }: { songs: any }) => {
  return (
    <div className="flex flex-col items-center px-4">
      {songs.map((s: string, index: number) => {
        const song = JSON.parse(s)
        return <Song song={song} key={song.id} id={song.id} index={index} />
      })}
    </div>
  );
};

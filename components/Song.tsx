import { Draggable } from "@hello-pangea/dnd";
import { SongScore, TheLows } from "@/lib/types";
import { Menu } from "lucide-react"

export const Song = ({ song, index, id }: { song: TheLows, id: string, index: number }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <div
          className="flex flex-row justify-between m-auto items-center bg-none border-2 border-gray-800 my-2 pl-2 py-3 pr-3 w-11/12 rounded-lg text-white font-garamond-bold text-2xl"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex flex-row">
            <p className="w-8 text-center mr-1">{index + 1}.</p>
            <p className="pl-2">{song}</p>
          </div>
          <Menu color="#F97316" />
        </div>
      )}
    </Draggable>
  );
}

export const SongList = ({ songs }: { songs: any }) => {
  return (
    <div className="flex flex-col items-center">
      {songs.map((s: string, index: number) => {
        const song = JSON.parse(s)
        return <Song song={song.name} id={song.id} index={index} key={song.id} />
      })}
    </div>
  );
};

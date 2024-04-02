import { Draggable } from "@hello-pangea/dnd";
import { LowsSong, TheLows } from "@/lib/types";
import { Menu } from "lucide-react"

export const Song = ({ song, index, id }: { song: TheLows, id: string, index: number }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <div
          className="flex flex-row justify-between items-center bg-gray-500 my-2 pl-2 py-3 pr-3 text-xl w-3/4 rounded-xl text-white"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex flex-row">
            <p className="w-6 text-center">{index + 1}.</p>
            <p className="pl-2">{song}</p>
          </div>
          <Menu />
        </div>
      )}
    </Draggable>
  );
}

export const SongList = ({ songs }: { songs: TheLows[] }) => {
  return (
    <div className="flex flex-col items-center">
      {songs.map((song: TheLows, index: number) => {
        const id = song.replaceAll(" ", "-")
        return <Song song={song} id={id} index={index} key={id} />
      })}
    </div>
  );
};

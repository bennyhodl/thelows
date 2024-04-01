import { Draggable } from "@hello-pangea/dnd";

export type LowsSong = {
  name: string,
  id: string
}

export const Song = ({ song, index }: { song: LowsSong, index: number }) => {
  return (
    <Draggable draggableId={song.id} index={index}>
      {provided => (
        <div
          className="flex flex-row bg-gray-500 w-3/4 py-3 my-1 rounded-xl px-2 text-white"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p className="w-6 text-center">{index + 1}.</p>
          <p className="pl-2">{song.name}</p>
        </div>
      )}
    </Draggable>
  );
}

export const SongList = ({ songs }: { songs: LowsSong[] }) => {
  return (
    <div className="flex flex-col items-center">
      {songs.map((song: LowsSong, index: number) => (
        <Song song={song} index={index} key={song.id} />
      ))}
    </div>
  );
};

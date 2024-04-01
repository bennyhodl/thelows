"use client"
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useState } from "react";
import React from "react";
import { LowsSong, SongList } from "@/components/Song";
import { Header } from "@/components/Header";


let songs: LowsSong[] = [{ name: "real things", id: "1" }, { name: "rodman", id: "2" }, { name: "gang", id: "3" }, { name: "p street", id: "4" }, { name: "what i know", id: "5" }]

const reorder = (list: LowsSong[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function Album() {
  const [songList, setSongs] = useState<LowsSong[]>(songs);

  function onDragEnd(result: any) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const songs = reorder(
      songList,
      result.source.index,
      result.destination.index
    );

    setSongs(songs);
  }

  return (
    <>
      <Header />
      <div className="bg-[url(https://t2.genius.com/unsafe/1900x0/https%3A%2F%2Fimages.genius.com%2Fded447b9455dc138d3d1b88c6240e5fe.1000x1000x1.jpg)] bg-cover bg-center backdrop-blur-3xl h-screen w-full">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="pt-14">
                <SongList songs={songList} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
}

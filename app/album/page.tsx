"use client"
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import React from "react";
import { SongList } from "@/components/Song";
import { Header } from "@/components/Header";
import { getSongList, saveList } from "@/lib/localStorage";
import { Footer } from "@/components/Footer";
import { TheLows, theLows } from "@/lib/types";

const reorder = (list: TheLows[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function Album() {
  const [songList, setSongs] = useState<TheLows[]>([]);

  useEffect(() => {
    const list = getSongList(theLows)
    setSongs(list)
  }, [])

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

    saveList(songs)
    setSongs(songs);
  }

  // const ondragstart = () => console.log("heyhowareya")
  // const onDragUpdate = () => console.log("update")

  return (
    <>
      <div className="bg-gray-950 md:max-w-lg m-auto" >
        <Header />
        <p className="text-white pt-14 pb-3 text-center">Drag your favorite songs in order and submit to see other steve's favorites.</p>
        {/* <div className="bg-[url(https://t2.genius.com/unsafe/1900x0/https%3A%2F%2Fimages.genius.com%2Fded447b9455dc138d3d1b88c6240e5fe.1000x1000x1.jpg)] bg-cover bg-center backdrop-blur-3xl h-screen w-full"> */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="pb-4">
                <SongList songs={songList} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {/* </div> */}
      </div >
      <Footer />
    </>
  );
}

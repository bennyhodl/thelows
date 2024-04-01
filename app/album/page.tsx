"use client"
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import React from "react";
import { LowsSong, SongList } from "@/components/Song";
import { Header } from "@/components/Header";
import { getSongList, saveList } from "@/lib/localStorage";
import { Footer } from "@/components/Footer";

let songs: LowsSong[] = [
  { name: "what i know", id: "1" },
  { name: "upside down", id: "2" },
  { name: "life got crazy", id: "3" },
  { name: "like blood", id: "4" },
  { name: "2 birds", id: "5" },
  { name: "real things", id: "6" },
  { name: "g.o.d", id: "7" },
  { name: "still works", id: "8" },
  { name: "gang", id: "9" },
  { name: "keep being you", id: "10" },
  { name: "blue water", id: "11" },
  { name: "bar hoppin'", id: "12" },
  { name: "don't think", id: "13" },
  { name: "mountains", id: "14" },
  { name: "rodman", id: "15" },
  { name: "right now", id: "16" },
  { name: "ballgame", id: "17" },
  { name: "on 10", id: "18" },
  { name: "deja u", id: "19" },
  { name: "you can tell", id: "20" },
  { name: "say something", id: "21" },
  { name: "boyfriend jeans", id: "22" },
  { name: "days go bye", id: "23" }
]

const reorder = (list: LowsSong[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function Album() {
  const [songList, setSongs] = useState<LowsSong[]>([]);

  useEffect(() => {
    const list = getSongList(songs)
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

  return (
    <div className="bg-gray-800 md:max-w-lg m-auto" >
      <Header />
      <p className="text-white pt-14 px-3 pb-3 text-center">Drag your favorite songs in order and submit to see other steve's favorites.</p>
      {/* <div className="bg-[url(https://t2.genius.com/unsafe/1900x0/https%3A%2F%2Fimages.genius.com%2Fded447b9455dc138d3d1b88c6240e5fe.1000x1000x1.jpg)] bg-cover bg-center backdrop-blur-3xl h-screen w-full"> */}
      <DragDropContext onDragEnd={onDragEnd} >
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
      <div className="w-screen text-center">
        <Footer />
      </div>
    </div >
  );
}

"use client"
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { Suspense, useEffect, useState } from "react";
import React from "react";
import { SongList } from "@/components/Song";
import { Header } from "@/components/Header";
import { getTopTen, saveTopTen } from "@/lib/localStorage";
import { Footer } from "@/components/Footer";
import { Cities, SongScore, TheLows, theLows } from "@/lib/types";

const reorder = (list: TheLows[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function OrderList({ searchParams }: { searchParams: { city: Cities } }) {
  const [songList, setSongs] = useState<any>([]);

  useEffect(() => {
    const list = getTopTen([])
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

    saveTopTen(songs)
    setSongs(songs);
  }

  return (
    <Suspense>
      <Header center={false} city={searchParams.city} />
      <div className="md:max-w-lg m-auto pt-16 bg-custom" >
        <p className="text-white text-center px-4 font-garamond-bold text-2xl">Drag your favorite songs in order to vote for mike's set list.</p>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <SongList songs={songList} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Footer full={false} />
      </div >
    </Suspense>
  );
}

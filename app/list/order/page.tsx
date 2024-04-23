"use client"
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Suspense, useEffect, useState } from "react";
import React from "react";
import { Header } from "@/components/Header";
import { getTopTen, saveTopTen } from "@/lib/localStorage";
import { Footer } from "@/components/Footer";
import { Cities } from "@/lib/types";
import { RankSong } from "@/components/RankSong";

const reorder = (list: string[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function OrderList({ searchParams }: { searchParams: { city: Cities } }) {
  const [songList, setSongs] = useState<string[]>([]);

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
    <div className="md:max-w-lg m-auto w-full" >
      <Header center={false} city={searchParams.city} />
      <div className="flex flex-col justify-center items-center">
        <p className="text-white text-center px-4 pb-6 font-serif font-bold text-xl pt-20">Drag your favorite songs in order to vote for mike's set list.</p>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {provided => (
              <>
                <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col justify-center items-center w-11/12">
                  {songList?.map((song, index) => {
                    const s = JSON.parse(song)
                    return (<Draggable key={s.id} draggableId={s.id} index={index}>
                      {provided => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="w-full"
                          key={s.id}
                        >
                          <RankSong song={s} index={index} />
                        </div>
                      )}
                    </Draggable>
                    )
                  })})
                </div>
                {provided.placeholder}
              </>
            )}
          </Droppable>
        </DragDropContext>
        {songList.length < 6 ? <Footer full={true} /> : <Footer full={false} />}
      </div>
    </div >
  );
}

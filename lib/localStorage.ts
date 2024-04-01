import { LowsSong } from "@/components/Song"

export const getSongList = (songs: LowsSong[]): LowsSong[] => {
  const list = window.localStorage.getItem("songs");
  if (!list) {
    return songs
  }
  return JSON.parse(list)
}

export const saveList = (songs: LowsSong[]) => {
  return window.localStorage.setItem("songs", JSON.stringify(songs))
}
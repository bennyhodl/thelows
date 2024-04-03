import { TheLows } from "./types";

export const getSongList = (songs: TheLows[]): TheLows[] => {
  const list = window.localStorage.getItem("songs1");
  if (!list) {
    return songs
  }
  return JSON.parse(list)
}

export const saveList = (songs: TheLows[]) => {
  return window.localStorage.setItem("songs1", JSON.stringify(songs))
}

export const getId = () => {
  const stored = window.localStorage.getItem("id")
  if (!stored) {
    console.log("No id for visitor")
    const uuid = crypto.randomUUID()
    window.localStorage.setItem("id", uuid)
    return uuid
  } else {
    return stored
  }
}

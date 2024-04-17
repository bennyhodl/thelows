import { TheLows } from "./types";

export const getSongList = (songs: TheLows[]): TheLows[] => {
  const list = global?.localStorage?.getItem("songs2");
  if (!list) {
    saveList(songs)
    return songs
  }
  return JSON.parse(list)
}

export const saveList = (songs: TheLows[]) => {
  return global?.localStorage?.setItem("songs2", JSON.stringify(songs))
}

export const getTopFive = (songs: TheLows[]): TheLows[] => {
  const list = window.localStorage.getItem("top5");
  if (!list) {
    saveTopFive(songs)
    return songs
  }
  return JSON.parse(list)
}

export const saveTopFive = (songs: TheLows[]) => {
  return window.localStorage.setItem("top5", JSON.stringify(songs))
}

export const getTopTen = (songs: TheLows[]): TheLows[] => {
  const list = window.localStorage.getItem("top10");
  if (!list) {
    saveTopTen(songs)
    return songs
  }
  return JSON.parse(list)
}

export const saveTopTen = (songs: TheLows[]) => {
  return window.localStorage.setItem("top10", JSON.stringify(songs))
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

import { SongScore, TheLows } from "./types";

export const getSubmittedAlready = () => {
  const item = window?.localStorage?.getItem("submitted") ?? "false"
  return item
}

export const saveSubmittedAlready = (guy:boolean) => {
  window.localStorage.setItem("submitted", String(guy))
}

export const getTopOtherSongs = (songs: string[]): string[] => {
  const list = window.localStorage.getItem("other-songs");
  if (!list) {
    saveTopOtherSongs(songs)
    return songs
  }
  return JSON.parse(list)
}

export const saveTopOtherSongs = (songs: string[]) => {
  return window.localStorage.setItem("other-songs", JSON.stringify(songs))
}

export const getTopTen = (songs: string[]): string[] => {
  const list = window.localStorage.getItem("the-lows");
  if (!list) {
    saveTopTen(songs)
    return songs
  }
  return JSON.parse(list)
}

export const saveTopTen = (songs: string[]) => {
  return window.localStorage.setItem("the-lows", JSON.stringify(songs))
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

export const clearStorage = () => {
  saveTopOtherSongs([])
  saveTopTen([])
  window.localStorage.removeItem("id")
  window.localStorage.removeItem("submitted")
  window.localStorage.removeItem("city")
}

export const getCity = () => {
  return window?.localStorage?.getItem("city") ?? "steve"
}

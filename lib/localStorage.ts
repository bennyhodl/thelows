import { SongScore, TheLows } from "./types";

export const getSubmittedAlready = () => {
  const item = window?.localStorage?.getItem("submitted-new-tour") ?? "false";
  return item;
};

export const saveSubmittedAlready = (guy: boolean) => {
  window.localStorage.setItem("submitted-new-tour", String(guy));
};

export const getTopOtherSongs = (songs: string[]): string[] => {
  const list = window.localStorage.getItem("other-songs");
  if (!list) {
    saveTopOtherSongs(songs);
    return songs;
  }
  return JSON.parse(list);
};

export const saveTopOtherSongs = (songs: string[]) => {
  return window.localStorage.setItem("other-songs", JSON.stringify(songs));
};

export const getTopTen = (songs: string[]): string[] => {
  const list = window.localStorage.getItem("new-tour");
  if (!list) {
    saveTopTen(songs);
    return songs;
  }
  return JSON.parse(list);
};

export const saveTopTen = (songs: string[]) => {
  return window.localStorage.setItem("new-tour", JSON.stringify(songs));
};

export const getId = () => {
  const stored = window.localStorage.getItem("id-new-tour");
  if (!stored) {
    console.log("No id for visitor");
    const uuid = crypto.randomUUID();
    window.localStorage.setItem("id-new-tour", uuid);
    return uuid;
  } else {
    return stored;
  }
};

export const clearStorage = () => {
  saveTopOtherSongs([]);
  saveTopTen([]);
  window.localStorage.removeItem("id-new-tour");
  window.localStorage.removeItem("submitted");
};

export const getCity = () => {
  return window?.localStorage?.getItem("city") ?? "steve";
};

export type LowsSong = {
  name: string;
  id: string;
};

export type TheLows = string;

export type LeaderboardSong = {
  name: string;
  points: number;
  percent: string;
};

export type LeaderBoardResponse = {
  total: number;
  songs: SongScore[];
};

export type OtherLeaderboardResponse = {
  city: Cities;
  total: number;
  songs: SongScore[];
};

export type SongScore = {
  album: string;
  city?: string;
  name: string;
  year?: number;
  id: string;
  points: number;
};

export type SubmitListRequest = {
  id: string;
  songs: SongScore[];
};

export type SubmitEmail = {
  id: string;
  email: string;
};

export type ShareImageRequest = {
  songs: TheLows[];
};

export type SongDbEntry = {
  id: string;
  songs: SongScore[];
};

export type Cities =
  | "boston (night 1)"
  | "boston"
  | "chicago"
  | "cleveland"
  | "denver"
  | "irving"
  | "minneapolis"
  | "nyc"
  | "pittsburgh"
  | "tampa"
  | "toronto"
  | "steve"
  | "toronto (night 2)"
  | "nyc (night 2)";

export const cities: string[] = [
  "boston (night 1)",
  "boston",
  "denver",
  "minneapolis",
  "cleveland",
  "irving",
  "toronto",
  "toronto (night 2)",
  "nyc",
  "nyc (night 2)",
  "pittsburgh",
  "tampa",
  "chicago",
];

export const theLows: SongScore[] = [
  {
    album: "the lows.",
    name: "he said she said",
    id: "he-said-she-said",
    year: 2024,
    points: 0,
  },
  {
    album: "the lows.",
    year: 2024,
    name: "downtown",
    id: "downtown",
    points: 0,
  },
  {
    album: "the lows.",
    year: 2024,
    name: "up again",
    id: "up-again",
    points: 0,
  },
  {
    album: "the lows.",
    year: 2024,
    name: "backwoods",
    id: "backwoods",
    points: 0,
  },
  { album: "the lows.", year: 2024, name: "6am", id: "6am", points: 0 },
  {
    album: "the lows.",
    year: 2024,
    name: "sunfalls pm",
    id: "sunfalls-pm",
    points: 0,
  },
  { album: "the lows.", year: 2024, name: "swollen", id: "swollen", points: 0 },
  {
    album: "the lows.",
    year: 2024,
    name: "someone make it stop",
    id: "someone-make-it-stop",
    points: 0,
  },
  {
    album: "the lows.",
    year: 2024,
    name: "good day",
    id: "good-day",
    points: 0,
  },
  {
    album: "the lows.",
    year: 2024,
    name: "dive bar",
    id: "dive-bar",
    points: 0,
  },
  {
    album: "the lows.",
    year: 2024,
    name: "same guy",
    id: "same-guy",
    points: 0,
  },
  {
    album: "the lows.",
    year: 2024,
    name: "strawberry",
    id: "strawberry",
    points: 0,
  },
  {
    album: "the lows.",
    year: 2024,
    name: "same old me",
    id: "same-old-me",
    points: 0,
  },
  { album: "the lows.", year: 2024, name: "public", id: "public", points: 0 },
  {
    album: "the lows.",
    year: 2024,
    name: "another life",
    id: "another-life",
    points: 0,
  },
  {
    album: "the lows.",
    year: 2024,
    name: "p street",
    id: "p-street",
    points: 0,
  },
  {
    album: "the lows.",
    year: 2024,
    name: "skylight",
    id: "skylight",
    points: 0,
  },
  {
    album: "the lows.",
    year: 2024,
    name: "i remember everything",
    id: "i-remember-everything",
    points: 0,
  },
  {
    album: "the lows.",
    year: 2024,
    name: "head against the wall",
    id: "head-against-the-wall",
    points: 0,
  },
  {
    album: "the lows.",
    year: 2024,
    name: "coastin (night)",
    id: "coastin-night",
    points: 0,
  },
  {
    album: "the lows.",
    year: 2024,
    name: "matching tattoo",
    id: "matching-tattoo",
    points: 0,
  },
  { album: "the lows.", year: 2024, name: "woosah", id: "woosah", points: 0 },
  {
    album: "the lows.",
    year: 2024,
    name: "malibu breeze",
    id: "malibu-breeze",
    points: 0,
  },
  {
    album: "the lows.",
    year: 2024,
    name: "put me in the ground",
    id: "put-me-in-the-ground",
    points: 0,
  },
  {
    album: "the lows.",
    year: 2024,
    name: "everything but sorry",
    id: "everything-but-sorry",
    points: 0,
  },
  { album: "the lows.", year: 2024, name: "oasis", id: "oasis", points: 0 },
  {
    album: "the lows.",
    year: 2024,
    name: "tomorrows not a thing",
    id: "tomorrows-not-a-thing",
    points: 0,
  },
  {
    album: "the lows.",
    year: 2024,
    name: "when is when",
    id: "when-is-when",
    points: 0,
  },
  {
    album: "the lows.",
    year: 2024,
    name: "cuz i love you",
    id: "cuz-i-love-you",
    points: 0,
  },
  {
    album: "the lows.",
    year: 2024,
    name: "feel better",
    id: "feel-better",
    points: 0,
  },
  {
    album: "the lows.",
    year: 2024,
    name: "how many times",
    id: "how-many-times",
    points: 0,
  },
  {
    album: "the lows.",
    year: 2024,
    name: "fire and rain",
    id: "fire-and-rain",
    points: 0,
  },
  {
    album: "the lows.",
    year: 2024,
    name: "old again",
    id: "old-again",
    points: 0,
  },
  {
    album: "the lows.",
    year: 2024,
    name: "catalogue cabin",
    id: "catalogue-cabin",
    points: 0,
  },
  {
    album: "the lows.",
    year: 2024,
    name: "only god knows",
    id: "only-god-knows",
    points: 0,
  },
];

export const theHighs: SongScore[] = [
  {
    album: "the highs.",
    year: 2021,
    name: "what i know",
    id: "what-i-know",
    points: 0,
  },
  {
    album: "the highs.",
    year: 2021,
    name: "upside down",
    id: "upside-down",
    points: 0,
  },
  {
    album: "the highs.",
    year: 2021,
    name: "life got crazy",
    id: "life-got-crazy",
    points: 0,
  },
  {
    album: "the highs.",
    year: 2021,
    name: "like blood",
    id: "like-blood",
    points: 0,
  },
  {
    album: "the highs.",
    year: 2021,
    name: "2 birds",
    id: "2-birds",
    points: 0,
  },
  {
    album: "the highs.",
    year: 2021,
    name: "real things",
    id: "real-things",
    points: 0,
  },
  { album: "the highs.", year: 2021, name: "g.o.d", id: "g-o-d", points: 0 },
  {
    album: "the highs.",
    year: 2021,
    name: "still works",
    id: "still-works",
    points: 0,
  },
  { album: "the highs.", year: 2021, name: "gang", id: "gang", points: 0 },
  {
    album: "the highs.",
    year: 2021,
    name: "keep being you",
    id: "keep-being-you",
    points: 0,
  },
  {
    album: "the highs.",
    year: 2021,
    name: "blue water",
    id: "blue-water",
    points: 0,
  },
  {
    album: "the highs.",
    year: 2021,
    name: "bar hoppin'",
    id: "bar-hoppin'",
    points: 100,
  },
  {
    album: "the highs.",
    year: 2021,
    name: "don't think",
    id: "don't-think",
    points: 0,
  },
  {
    album: "the highs.",
    year: 2021,
    name: "mountains",
    id: "mountains",
    points: 0,
  },
  { album: "the highs.", year: 2021, name: "rodman", id: "rodman", points: 0 },
  {
    album: "the highs.",
    year: 2021,
    name: "right now",
    id: "right-now",
    points: 0,
  },
  {
    album: "the highs.",
    year: 2021,
    name: "ballgame",
    id: "ballgame",
    points: 0,
  },
  { album: "the highs.", year: 2021, name: "on 10", id: "on-10", points: 0 },
  { album: "the highs.", year: 2021, name: "deja u", id: "deja-u", points: 0 },
  {
    album: "the highs.",
    year: 2021,
    name: "you can tell",
    id: "you-can-tell",
    points: 0,
  },
  {
    album: "the highs.",
    year: 2021,
    name: "say something",
    id: "say-something",
    points: 0,
  },
  {
    album: "the highs.",
    year: 2021,
    name: "boyfriend jeans",
    id: "boyfriend-jeans",
    points: 0,
  },
  {
    album: "the highs.",
    year: 2021,
    name: "days go bye",
    id: "days-g-bye",
    points: 0,
  },
];
const loveSong: SongScore[] = [
  {
    album: "love,",
    year: 2023,
    name: "white dress",
    id: "white-dress",
    points: 0,
  },
  { album: "love,", name: "imagine", id: "imagine", points: 0 },
  { album: "love,", name: "you showed me", id: "you-showed-me", points: 0 },
  { album: "love,", name: "best man", id: "best-man", points: 0 },
  { album: "love,", name: "you 2", id: "you-2", points: 0 },
];

const beenThinking: SongScore[] = [
  {
    album: "been thinking",
    year: 2020,
    name: "been thinking",
    id: "been-thinking",
    points: 0,
  },
];

const coastin: SongScore[] = [
  {
    album: "coastin",
    year: 2023,
    name: "coastin (wavy)",
    id: "coastin-wavy",
    points: 0,
  },
  { album: "coastin", name: "coastin (day)", id: "coastin-day", points: 0 },
  { album: "coastin", name: "coastin (night)", id: "coastin-night", points: 0 },
];

const sunfalls: SongScore[] = [
  {
    album: "sunfalls",
    year: 2024,
    name: "sunfalls am",
    id: "sunfalls-am",
    points: 0,
  },
];

const weDie = [
  {
    album: "we die once",
    year: 2023,
    name: "we die once",
    id: "we-die-once",
    points: 0,
  },
];

const alcohol = [
  { album: "alcohol", year: 2024, name: "alcohol", id: "alcohol", points: 0 },
];

const longLegs = [
  {
    album: "long legs",
    year: 2023,
    name: "long legs",
    id: "long-legs",
    points: 0,
  },
];

const brideAtABar: SongScore[] = [
  {
    album: "BRIDE AT A BAR",
    name: "BRIDE AT A BAR",
    year: 2023,
    id: "bride-at-at-bar",
    points: 0,
  },
];

const whyNotUs: SongScore[] = [
  { album: "why not us?", year: 2022, name: "BNB", id: "bnd", points: 0 },
];

const imSorry: SongScore[] = [
  {
    album: "i'm sorry",
    year: 2022,
    name: "i'm sorry",
    id: "i'm sorry",
    points: 0,
  },
];

const actRight: SongScore[] = [
  {
    album: "act right",
    year: 2022,
    name: "act right",
    id: "act-right",
    points: 0,
  },
];

const lostMyBoat = [
  {
    album: "lost my boat",
    name: "lost my boat",
    id: "lost-my-boat",
    points: 0,
  },
];

const commas: SongScore[] = [
  { album: "commas", year: 2022, name: "commas", id: "commas", points: 0 },
];

const hailMary: SongScore[] = [
  {
    album: "hail mary",
    year: 2021,
    name: "hail mary",
    id: "hail-mary",
    points: 0,
  },
];

const soSick: SongScore[] = [
  { album: "so sick", year: 2021, name: "so sick", id: "so-sick", points: 0 },
];

const noParty: SongScore[] = [
  {
    album: "i don't wanna party",
    name: "i don't wanna party",
    year: 2021,
    id: "i-dont-wanna-party",
    points: 0,
  },
];

const inOut: SongScore[] = [
  {
    album: "in & out",
    year: 2021,
    name: "in & out",
    id: "in-and-out",
    points: 0,
  },
];

const littleMoreTime: SongScore[] = [
  {
    album: "little more time",
    year: 2020,
    name: "little more time",
    id: "little-more-time",
    points: 0,
  },
];

const uhYuh: SongScore[] = [
  {
    album: "Uhyuready?",
    year: 2019,
    name: "White Flag",
    id: "white-flag",
    points: 0,
  },
  { album: "Uhyuready?", name: "Nostalgia", id: "nostalgia", points: 0 },
  { album: "Uhyuready?", name: "The Mirage", id: "the-mirage", points: 0 },
  { album: "Uhyuready?", name: "Cabo", id: "cabo", points: 0 },
  { album: "Uhyuready?", name: "Picture", id: "picture", points: 0 },
  {
    album: "Uhyuready?",
    name: "Cheers2Tears",
    id: "cheers-2-tears",
    points: 0,
  },
  { album: "Uhyuready?", name: "Uhyuready?", id: "uhyuready", points: 0 },
];

const flyUtoTheMoon: SongScore[] = [
  {
    album: "Fly You To The Moon",
    name: "Fly You To The Moon",
    year: 2019,
    id: "fly-you-to-the-moon",
    points: 0,
  },
];

const fourThe: SongScore[] = [
  { album: "4THEHOMIES", year: 2018, name: "W.I.N.", id: "w-i-in", points: 0 },
  {
    album: "4THEHOMIES",
    name: "Saved from the City",
    id: "saved-from-the-city",
    points: 0,
  },
  { album: "4THEHOMIES", name: "Big Mood", id: "big-mood", points: 0 },
  { album: "4THEHOMIES", name: "Glass Heart", id: "glass-heart", points: 0 },
  { album: "4THEHOMIES", name: "Can't Say No", id: "cant-say-no", points: 0 },
  { album: "4THEHOMIES", name: "It Ain't Safe", id: "it-aint-safe", points: 0 },
  { album: "4THEHOMIES", name: "21 Sadness", id: "21-sadness", points: 0 },
  { album: "4THEHOMIES", name: "Why?", id: "why", points: 0 },
  { album: "4THEHOMIES", name: "Lost Me", id: "lost-me", points: 0 },
  { album: "4THEHOMIES", name: "Timeout", id: "timeout", points: 0 },
  {
    album: "4THEHOMIES",
    name: "Mirrors on the Ceiling",
    id: "mirrors-on-the-ceiling",
    points: 0,
  },
  {
    album: "4THEHOMIES",
    name: "Sooner or Later",
    id: "sooner-or-later",
    points: 0,
  },
  { album: "4THEHOMIES", name: "High Hopes", id: "high-hopes", points: 0 },
  { album: "4THEHOMIES", name: "Honolulu", id: "honolulu", points: 0 },
  { album: "4THEHOMIES", name: "Play'round", id: "playround", points: 0 },
  { album: "4THEHOMIES", name: "Do It", id: "do-it", points: 0 },
  { album: "4THEHOMIES", name: "Back Off", id: "back-off", points: 0 },
  {
    album: "4THEHOMIES",
    name: "Things I Like",
    id: "things-i-like",
    points: 0,
  },
  { album: "4THEHOMIES", name: "The End", id: "the-end", points: 0 },
  {
    album: "4THEHOMIES",
    name: "Forget About You",
    id: "forget-about-you",
    points: 0,
  },
  { album: "4THEHOMIES", name: "Common", id: "common", points: 0 },
  { album: "4THEHOMIES", name: "Frio", id: "frio", points: 0 },
  { album: "4THEHOMIES", name: "KEEPGOING", id: "keepgoing", points: 0 },
];
const swish: SongScore[] = [
  { album: "Swish", year: 2016, name: "swish", id: "swish", points: 0 },
];

const otherSongs: SongScore[] = [
  {
    album: "other",
    year: 2024,
    name: "i'm alright",
    id: "im-alright",
    points: 0,
  },
  {
    album: "other",
    year: 2025,
    name: "good as you look",
    id: "good-as-you-look",
    points: 0,
  },
  {
    album: "other",
    year: 2021,
    name: "i don't wanna party",
    id: "i-dont-wanna-party",
    points: 0,
  },
  {
    album: "other",
    year: 2023,
    name: "white dress",
    id: "white-dress",
    points: 0,
  },
];

export const songList = [theLows, otherSongs, theHighs];

export const ynkSongs = [
  ...soSick,
  ...theHighs,
  ...loveSong,
  ...beenThinking,
  ...coastin,
  ...sunfalls,
  ...weDie,
  ...alcohol,
  ...longLegs,
  ...brideAtABar,
  ...whyNotUs,
  ...imSorry,
  ...actRight,
  ...lostMyBoat,
  ...commas,
  ...hailMary,
  ...noParty,
  ...inOut,
  ...littleMoreTime,
  ...uhYuh,
  ...flyUtoTheMoon,
  ...fourThe,
  ...swish,
];

export const orderSongs: Array<SongScore[]> = [
  // theLows,
  theHighs,
  loveSong,
  soSick,
  coastin,
  sunfalls,
  actRight,
  noParty,
  brideAtABar,
  littleMoreTime,
  alcohol,
  commas,
  inOut,
  whyNotUs,
  beenThinking,
  weDie,
  longLegs,
  imSorry,
  lostMyBoat,
  hailMary,
  flyUtoTheMoon,
  swish,
  uhYuh,
  fourThe,
];

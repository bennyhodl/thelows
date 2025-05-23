import { MongoClient } from "mongodb";

// Replace the following with your MongoDB connection string
const MONGO_URI = process.env.MONGO_URI || "";
export const DATABASE_NAME = "thelows";
export const COLLECTION_NAME = "next-tour";
export const OTHER_SONGS_COLLECTION = "vibes";

export async function connectToDatabase() {
  const client = await MongoClient.connect(MONGO_URI);
  return client;
}

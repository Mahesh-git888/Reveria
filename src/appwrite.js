// appwrite.js
import { Client, Databases, ID, Query } from "appwrite";

// Environment variables
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const ENDPOINT = "https://syd.cloud.appwrite.io/v1"; // Sydney region
const API_KEY = import.meta.env.VITE_APPWRITE_API_KEY; // <-- added

// Initialize client with API key for frontend access
const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)
  .setKey(API_KEY); // <-- ensures trending movies work on Vercel

const databases = new Databases(client);

// ----------------------------
// Update search count function
export const updateSearchCount = async (searchTerm, movie) => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", searchTerm),
    ]);

    if (result.documents.length > 0) {
      const doc = result.documents[0];
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
      });
      console.log(`Updated count for "${searchTerm}"`);
    } else {
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "./No-Poster.png",
      });
      console.log(`Created new entry for "${searchTerm}"`);
    }
  } catch (error) {
    console.error("Error updating search count:", error);
  }
};

// ----------------------------
// Fetch top trending movies from Appwrite
export const getTrendingMovies = async () => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.orderDesc("count"),
      Query.limit(5),
    ]);
    return result.documents;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};

// ----------------------------
// Optional: Test Appwrite connection
export const testAppwrite = async () => {
  try {
    const res = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      { test: "Hello from React" }
    );
    console.log("Test document created:", res);
  } catch (err) {
    console.error("Appwrite test failed:", err);
  }
};

export { client, databases };

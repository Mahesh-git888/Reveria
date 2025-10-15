// appwrite.js
import { Client, Databases, ID, Query, Permission, Role } from "appwrite";

// Environment variables (these are safe to expose for frontend)
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const ENDPOINT = "https://syd.cloud.appwrite.io/v1"; // Appwrite endpoint

// Initialize client (no API key here — safe for frontend)
const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID);

const databases = new Databases(client);

// ----------------------------
// Update search count function
export const updateSearchCount = async (searchTerm, movie) => {
  try {
    // 1️ Check if searchTerm exists
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", searchTerm),
    ]);

    if (result.documents.length > 0) {
      // 2️ If exists, increment count
      const doc = result.documents[0];
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
      });
      console.log(`Updated count for "${searchTerm}"`);
    } else {
      // 3️ If not, create a new document (with public read permission)
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          searchTerm,
          count: 1,
          movie_id: movie.id,
          poster_url: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "./No-Poster.png",
        },
        [
          Permission.read(Role.any()), // Public read access
          Permission.write(Role.any()), // Optional: allow overwrites
        ]
      );
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
      { test: "Hello from React" },
      [Permission.read(Role.any())]
    );
    console.log("Test document created:", res);
  } catch (err) {
    console.error("Appwrite test failed:", err);
  }
};

export { client, databases };

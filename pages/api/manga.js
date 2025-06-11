// pages/api/manga.js
import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.get("https://api.mangadex.org/manga", {
      headers: {
        "User-Agent": "mangadex-vercel-app",
      },
      params: {
        originalLanguage: ["ko"],
        limit: 10,
        includes: ["cover_art"],
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error from MangaDex API:", error.message);
    res.status(500).json({ error: "Failed to fetch manhwa" });
  }
}

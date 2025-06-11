// /pages/api/manga/[id].js
import axios from "axios";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const response = await axios.get(`https://api.mangadex.org/manga/${id}`, {
      headers: {
        "User-Agent": "mangadex-vercel-proxy-app",
      },
      params: {
        includes: ["cover_art"],
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "Error fetching manga by ID:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to fetch manga by ID" });
  }
}

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const [manhwa, setManhwa] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchManhwa = async () => {
      try {
        const res = await axios.get("/api/manga");
        setManhwa(res.data.data);
      } catch (error) {
        console.error("Error fetching manhwa:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchManhwa();
  }, []);

  const getCoverImage = (manga) => {
    const cover = manga.relationships.find((rel) => rel.type === "cover_art");
    return cover
      ? `https://uploads.mangadex.org/covers/${manga.id}/${cover.attributes.fileName}.256.jpg`
      : null;
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Korean Manhwa (from MangaDex)</h1>
      {loading && <p>Loading...</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {manhwa.map((manga) => (
          <Link
            key={manga.id}
            href={`/manga/${manga.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div style={{ width: 200, cursor: "pointer" }}>
              <img
                src={getCoverImage(manga)}
                alt={manga.attributes.title.en || "No title"}
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <p>{manga.attributes.title.en || "Untitled"}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

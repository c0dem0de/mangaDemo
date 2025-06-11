// /pages/manga/[id].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MangaDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [manga, setManga] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      try {
        const res = await axios.get(`https://api.mangadex.org/manga/${id}`, {
          params: {
            includes: ["cover_art"],
          },
        });
        setManga(res.data.data);
      } catch (error) {
        console.error("Failed to load manga details:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const getCoverImage = (manga) => {
    const cover = manga.relationships.find((rel) => rel.type === "cover_art");
    return cover
      ? `https://uploads.mangadex.org/covers/${manga.id}/${cover.attributes.fileName}.512.jpg`
      : null;
  };

  if (loading) return <p>Loading...</p>;
  if (!manga) return <p>Not found.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{manga.attributes.title.en || "Untitled"}</h1>
      <img
        src={getCoverImage(manga)}
        alt="Cover"
        style={{ width: 300, borderRadius: "10px" }}
      />
      <p style={{ maxWidth: 600, marginTop: "1rem" }}>
        {manga.attributes.description.en || "No description available."}
      </p>
    </div>
  );
}

// /api/spotify/currently-playing.js (vercel api route)
import cookie from "cookie";

export default async function handler(req, res) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const accessToken = cookies.access_token;

  if (!accessToken) {
    return res.status(401).json({ error: "not authenticated" });
  }

  const response = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status === 204) {
    // no content - user is not currently playing anything
    return res.status(200).json(null);
  }

  if (!response.ok) {
    return res
      .status(response.status)
      .json({ error: "failed to fetch currently playing track" });
  }

  const data = await response.json();

  if (!data.item) {
    return res.status(200).json(null);
  }

  return res.status(200).json({
    name: data.item.name,
    artist: data.item.artists.map((artist) => artist.name).join(", "),
    album: data.item.album.name,
    image: data.item.album.images[0]?.url,
    isPlaying: data.is_playing,
    progress: data.progress_ms,
    duration: data.item.duration_ms,
    trackId: data.item.id,
    albumId: data.item.album.id,
    artistIds: data.item.artists.map((artist) => artist.id),
  });
}

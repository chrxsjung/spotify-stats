// /api/spotify/tracks.js (vercel api route)
import cookie from "cookie";

export default async function handler(req, res) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const accessToken = cookies.access_token;

  if (!accessToken) {
    return res.status(401).json({ error: "not authenticated" });
  }

  const timeRange = req.query.time_range || "long_term";

  const response = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=50`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    return res
      .status(response.status)
      .json({ error: "failed to fetch user's top tracks" });
  }

  const data = await response.json();

  return res.status(200).json({ tracks: data.items });
}

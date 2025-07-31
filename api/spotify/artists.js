// /api/spotify/artists.js (Vercel API route)
import cookie from "cookie";

export default async function handler(req, res) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const accessToken = cookies.access_token;

  if (!accessToken) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const timeRange = req.query.time_range || "long_term";

  const response = await fetch(
    `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=50`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },  
    }
  );

  if (!response.ok) {
    return res
      .status(response.status)
      .json({ error: "Failed to fetch user's top artists" });
  }

  const data = await response.json();

  return res.status(200).json({ artists: data.items });
}

// /api/spotify/recent.js (vercel api route)
import cookie from "cookie";

export default async function handler(req, res) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const accessToken = cookies.access_token;

  if (!accessToken) {
    return res.status(401).json({ error: "not authenticated" });
  }

  const limit = req.query.limit || 50;
  const filterDuplicates = req.query.filter_duplicates === "true";

  const response = await fetch(
    `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    return res
      .status(response.status)
      .json({ error: "failed to fetch user's recently played tracks" });
  }

  const data = await response.json();

  let items = data.items;

  // filter duplicates by track id
  if (filterDuplicates) {
    const seen = new Set();
    items = items.filter((item) => {
      const trackId = item.track?.id;
      if (seen.has(trackId)) return false;
      seen.add(trackId);
      return true;
    });
  }

  return res.status(200).json(items);
}

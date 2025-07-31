// /api/spotify/profile.js (vercel api route)
import cookie from "cookie";

export default async function handler(req, res) {
  const cookies = cookie.parse(req.headers.cookie || "");
  const accessToken = cookies.access_token;

  if (!accessToken) {
    return res.status(401).json({ error: "not authenticated" });
  }

  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    return res
      .status(response.status)
      .json({ error: "failed to fetch user profile" });
  }

  const data = await response.json();

  return res.status(200).json({
    display_name: data.display_name,
    country: data.country,
    followers: data.followers?.total,
    images: data.images,
  });
}

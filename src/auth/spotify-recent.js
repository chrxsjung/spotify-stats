export async function getRecentlyPlayed(limit = 50, filterDuplicates = false) {
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    throw new Error("Missing access token");
  }

  const response = await fetch(
    `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user's recently played tracks");
  }

  const data = await response.json();

  let items = data.items;

  //filter duplicates by track ID
  if (filterDuplicates) {
    const seen = new Set();
    items = items.filter((item) => {
      const trackId = item.track?.id;
      if (seen.has(trackId)) return false;
      seen.add(trackId);
      return true;
    });
  }

  return items;
}

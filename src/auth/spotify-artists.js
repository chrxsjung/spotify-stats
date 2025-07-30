export async function getSpotifyArtists(timeRange = "long_term") {
  const accessToken = localStorage.getItem("access_token");
  const response = await fetch(
    `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=50`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user's top artists");
  }

  const data = await response.json();

  return {
    artists: data.items,
  };
}

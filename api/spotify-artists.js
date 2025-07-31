export async function getSpotifyArtists(timeRange = "long_term") {
  const res = await fetch(`/api/spotify/artists?time_range=${timeRange}`, {
    credentials: "include", //sends the cookie
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to fetch artists");
  }

  return await res.json(); // should be { artists: [...] }
}

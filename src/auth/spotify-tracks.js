export async function getSpotifyTracks(timeRange = "long_term") {
  const accessToken = localStorage.getItem("access_token");
  const response = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=50`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user's top tracks");
  }

  const data = await response.json();

  return {
    tracks: data.items,
  };
}

export async function getCurrentlyPlaying() {
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    throw new Error("No access token found");
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
    // No content - user is not currently playing anything
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch currently playing track");
  }

  const data = await response.json();

  if (!data.item) {
    return null;
  }

  return {
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
  };
}

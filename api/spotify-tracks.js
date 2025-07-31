export async function getSpotifyTracks(timeRange = "long_term") {
  const res = await fetch(`/api/spotify/tracks?time_range=${timeRange}`, {
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "failed to fetch tracks");
  }

  return await res.json();
}

export async function getCurrentlyPlaying() {
  const res = await fetch("/api/spotify/currently-playing", {
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.error || "failed to fetch currently playing track"
    );
  }

  return await res.json();
}

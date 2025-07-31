export async function getUserGenres(timeRange = "medium_term") {
  const res = await fetch(`/api/spotify/genres?time_range=${timeRange}`, {
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "failed to fetch user genres");
  }

  return await res.json();
}

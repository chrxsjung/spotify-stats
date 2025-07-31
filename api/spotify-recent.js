export async function getRecentlyPlayed(limit = 50, filterDuplicates = false) {
  const params = new URLSearchParams({
    limit: limit.toString(),
    filter_duplicates: filterDuplicates.toString(),
  });

  const res = await fetch(`/api/spotify/recent?${params}`, {
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.error || "failed to fetch recently played tracks"
    );
  }

  return await res.json();
}

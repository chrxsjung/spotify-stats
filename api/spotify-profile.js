// spotify-profile.js
/**
 * Fetches the current user's Spotify profile using a valid access token.
 *
 * @returns {Promise<object>} Profile information including display name, country, followers, and images
 */
export async function getUserProfile() {
  const res = await fetch("/api/spotify/profile", {
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "failed to fetch user profile");
  }

  return await res.json();
}

// spotify-profile.js
/**
 * Fetches the current user's Spotify profile using a valid access token.
 *
 * @returns {Promise<object>} Profile information including display name, country, followers, and images
 */
export async function getUserProfile() {
  const accessToken = localStorage.getItem("access_token");
  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }

  const data = await response.json();

  return {
    display_name: data.display_name,
    country: data.country,
    followers: data.followers?.total,
    images: data.images,
  };
}

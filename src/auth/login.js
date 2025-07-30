/*
call generateCodeVerifier()

call generateCodeChallenge(verifier)

save the code_verifier in localStorage

return a URL string to redirect the user to Spotify's login

Spotify Authorization Parameters:

Param                    | Value
-------------------------|------------------
client_id                | CLIENT_ID
response_type            | "code"
redirect_uri             | REDIRECT_URI
scope                    | "user-top-read user-read-recently-played"
code_challenge_method    | "S256"
code_challenge           | codeChallenge

*/

import { generateCodeVerifier, generateCodeChallenge } from "./pcke.js";

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

export async function getSpotifyLoginUrl() {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  localStorage.setItem("code_verifier", codeVerifier);

  

  const authUrl = new URL("https://accounts.spotify.com/authorize");

  authUrl.searchParams.append("client_id", CLIENT_ID);
  authUrl.searchParams.append("response_type", "code");
  authUrl.searchParams.append("redirect_uri", REDIRECT_URI);
  authUrl.searchParams.append(
    "scope",
    "user-read-private user-top-read user-read-recently-played user-read-playback-state user-read-currently-playing user-modify-playback-state"
  );

  authUrl.searchParams.append("code_challenge_method", "S256");
  authUrl.searchParams.append("code_challenge", codeChallenge);
  authUrl.searchParams.append("show_dialog", "true");

  return authUrl.toString();
}

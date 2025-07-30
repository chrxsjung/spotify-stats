/*

runs useEffect() on page load

extracts the code from the URL

gets the code_verifier from localStorage

sends a POST request to Spotify to get the access token

saves the token in localStorage

redirects the user to /dashboard

*/

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;

function Callback() {
  const navigate = useNavigate();

  //useEffect() lets you run side effects in React function components.
  // inside useEffect:
  // - extract the code from the URL
  // - use the code + code_verifier to request an access token from spotify
  // - save the access token in localStorage
  // - then redirect the user to the dashboard

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    const codeVerifier = localStorage.getItem("code_verifier");

    if (!code || !codeVerifier) {
      console.error("Missing code or code_verifier");
      return;
    }

    /*
     * Spotify Token Request Parameters:
     *
     * Field           | Value (example)
     * ----------------|------------------
     * client_id       | your VITE_SPOTIFY_CLIENT_ID
     * grant_type      | "authorization_code"
     * code            | the code from URL
     * redirect_uri    | your redirect URI
     * code_verifier   | from localStorage
     */

    const body = new URLSearchParams();
    body.append("client_id", CLIENT_ID);
    body.append("grant_type", "authorization_code");
    body.append("code", code);
    body.append("redirect_uri", REDIRECT_URI);
    body.append("code_verifier", codeVerifier);

    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          localStorage.setItem("access_token", data.access_token);
        }

        navigate("/dashboard");
      });
  }, []);

  return <div className="text-white text-center mt-20">Logging you in...</div>;
}

export default Callback;

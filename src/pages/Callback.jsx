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
    const error = new URLSearchParams(window.location.search).get("error");
    if (error) {
      localStorage.removeItem("code_verifier");
      navigate("/");
      return;
    }

    const code = new URLSearchParams(window.location.search).get("code");
    const codeVerifier = localStorage.getItem("code_verifier");

    if (!code || !codeVerifier) {
      navigate("/");
      return;
    }

    // 👉 Move code_verifier to cookie so server can access it
    document.cookie = `code_verifier=${codeVerifier}; path=/; secure`;

    // Redirect to API callback (server handles token exchange)
    window.location.href = `/api/callback?code=${code}`;
  }, []);

  return <div className="text-white text-center mt-20">Logging you in...</div>;
}

export default Callback;

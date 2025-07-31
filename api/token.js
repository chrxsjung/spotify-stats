import cookie from "cookie";

export default async function handler(req, res) {
  const code = req.query.code;

  // ❗ Parse cookies manually
  const cookies = cookie.parse(req.headers.cookie || "");
  const codeVerifier = cookies.code_verifier;

  if (!code || !codeVerifier) {
    return res.status(400).send("Missing code or code_verifier");
  }

  const body = new URLSearchParams({
    client_id: process.env.VITE_SPOTIFY_CLIENT_ID,
    grant_type: "authorization_code",
    code,
    redirect_uri: process.env.VITE_SPOTIFY_REDIRECT_URI,
    code_verifier: codeVerifier,
  });

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const tokenData = await tokenRes.json();

  if (!tokenData.access_token) {
    return res.status(401).json({ error: "Failed to get token" });
  }

  res.setHeader("Set-Cookie", [
    cookie.serialize("access_token", tokenData.access_token, {
      httpOnly: true,
      secure: true,
      maxAge: tokenData.expires_in, // ~3600
      path: "/",
      sameSite: "Lax",
    }),
    cookie.serialize("code_verifier", "", {
      httpOnly: true,
      secure: true,
      maxAge: 0, // delete it
      path: "/",
    }),
  ]);

  res.redirect("/dashboard");
}

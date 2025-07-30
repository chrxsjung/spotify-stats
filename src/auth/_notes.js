// SPOTIFY OAUTH FLOW WITH PKCE - COMPLETE IMPLEMENTATION
// ======================================================
//
// This app implements Spotify OAuth 2.0 with PKCE (Proof Key for Code Exchange)
// for secure client-side authentication without requiring a backend server.
//
// File Structure:
// - src/auth/pkce.js: PKCE code generation and challenge creation
// - src/auth/login.js: Login URL construction and verifier storage
// - src/auth/spotify-profile.js: API calls to fetch user data
// - src/pages/Callback.jsx: Token exchange handling
// - src/App.jsx: Main app routing and login button
//
// step-by-step of what i've built so far and where each part lives:
//
// 1. generate a secure code verifier
//    - file: src/auth/pkce.js
//    - function: generateCodeVerifier()
//    - creates a high-entropy random string (used later to prove app identity)
//
// 2. convert the verifier into a code challenge (sha-256 + base64url)
//    - file: src/auth/pkce.js
//    - function: generateCodeChallenge()
//    - securely hashes the verifier into a format Spotify can compare later
//
// 3. build the spotify login url using client_id, redirect_uri, scopes, and code_challenge
//    - file: src/auth/login.js
//    - function: getSpotifyLoginUrl()
//    - constructs the full authorization URL to send the user to Spotify login
//
// 4. save the code_verifier in localStorage to use later in the token exchange
//    - file: src/auth/login.js
//    - inside: getSpotifyLoginUrl()
//    - saves the verifier so we can validate the redirect later
//
// 5. create a button that runs the login flow and redirects the user to spotify
//    - file: src/App.jsx (in Home component)
//    - function: handleLogin()
//    - triggers: getSpotifyLoginUrl() → then window.location.href = loginUrl
//    - starts the OAuth process by sending user to Spotify's auth screen
//
// 6. handle spotify redirect and exchange code for access token
//    - file: src/pages/Callback.jsx
//    - function: useEffect() inside Callback()
//    - responsibilities:
//        • extract the `code` from the redirected URL (e.g. ?code=...)
//        • retrieve the saved code_verifier from localStorage
//        • send a POST request to Spotify's /api/token to exchange the code for an access_token
//        • if successful, store access_token in localStorage
//        • navigate the user to the dashboard so they can now access Spotify data
//
// 7. token exchange implementation details:
//    - file: src/pages/Callback.jsx
//    - POST request to: https://accounts.spotify.com/api/token
//    - headers: { "Content-Type": "application/x-www-form-urlencoded" }
//    - body parameters:
//        • client_id: VITE_SPOTIFY_CLIENT_ID
//        • grant_type: "authorization_code"
//        • code: extracted from URL query params
//        • redirect_uri: VITE_SPOTIFY_REDIRECT_URI
//        • code_verifier: retrieved from localStorage
//    - response handling:
//        • stores access_token in localStorage
//        • navigates to /dashboard on success
//    - error handling: logs error if code or code_verifier missing
//
// 8. fetch user profile data using the access token
//    - file: src/auth/spotify-profile.js
//    - function: getUserProfile()
//    - GET request to: https://api.spotify.com/v1/me
//    - headers: { Authorization: "Bearer ${access_token}" }
//    - returns: user display name, country, followers count, profile images
//    - used by: src/components/Profile.jsx to display user info in dashboard

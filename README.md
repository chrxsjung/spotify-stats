## 🔐 Authentication Flow

This app implements **Spotify OAuth 2.0 with PKCE** (Proof Key for Code Exchange) for secure client-side authentication without requiring a backend server.

### 📁 File Structure

```
src/
├── auth/
│   ├── pkce.js              # PKCE code generation and challenge creation
│   ├── login.js             # Login URL construction and verifier storage
│   ├── spotify-profile.js   # API calls to fetch user data
│   └── _notes.js            # Detailed implementation notes
├── pages/
│   ├── Callback.jsx         # Token exchange handling
│   └── Dashboard.jsx        # Main dashboard interface
├── components/              # UI components for displaying data
└── App.jsx                  # Main app routing and login button
```

## 🚀 Implementation Steps

### 1. Generate Secure Code Verifier

- **File:** `src/auth/pkce.js`
- **Function:** `generateCodeVerifier()`
- **Purpose:** Creates a high-entropy random string used later to prove app identity

### 2. Create Code Challenge

- **File:** `src/auth/pkce.js`
- **Function:** `generateCodeChallenge()`
- **Purpose:** Securely hashes the verifier into a format Spotify can compare later

### 3. Build Spotify Login URL

- **File:** `src/auth/login.js`
- **Function:** `getSpotifyLoginUrl()`
- **Purpose:** Constructs the full authorization URL with all required parameters

### 4. Store Code Verifier

- **File:** `src/auth/login.js`
- **Purpose:** Saves the verifier in localStorage for later token exchange validation

### 5. Handle User Login

- **File:** `src/App.jsx` (Home component)
- **Function:** `handleLogin()`
- **Purpose:** Initiates the OAuth flow by redirecting user to Spotify

### 6. Process Spotify Redirect

- **File:** `src/pages/Callback.jsx`
- **Function:** `useEffect()` inside Callback component
- **Purpose:** Handles the redirect from Spotify and exchanges code for access token

**Responsibilities:**

- Extract the `code` from the redirected URL
- Retrieve the saved `code_verifier` from localStorage
- Send POST request to Spotify's `/api/token` endpoint
- Store the `access_token` in localStorage
- Navigate user to dashboard

### 7. Token Exchange Details

**Endpoint:** `https://accounts.spotify.com/api/token`

**Headers:**

```javascript
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

**Body Parameters:**

```javascript
{
  client_id: VITE_SPOTIFY_CLIENT_ID,
  grant_type: "authorization_code",
  code: extracted_from_url,
  redirect_uri: VITE_SPOTIFY_REDIRECT_URI,
  code_verifier: from_localStorage
}
```

**Response Handling:**

- Store `access_token` in localStorage
- Navigate to `/dashboard` on success
- Log errors if code or code_verifier missing

### 8. Fetch User Profile Data

- **File:** `src/auth/spotify-profile.js`
- **Function:** `getUserProfile()`
- **Endpoint:** `https://api.spotify.com/v1/me`
- **Headers:** `Authorization: Bearer ${access_token}`

**Returns:**

- User display name
- Country
- Followers count
- Profile images

**Used by:** `src/components/Profile.jsx` to display user info in dashboard

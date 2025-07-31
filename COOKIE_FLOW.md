# Cookie-Based Authentication Flow

## Overview

This application uses a secure cookie-based authentication system instead of storing access tokens in localStorage. The flow ensures tokens are protected on the server side.

## Authentication Flow

### 1. Login Process

**File: `src/auth/login.js`**

- generates code verifier and challenge for PKCE
- saves code_verifier in localStorage temporarily
- redirects user to spotify authorization

### 2. Callback Handling

**File: `src/pages/Callback.jsx`**

- extracts authorization code from URL
- moves code_verifier from localStorage to cookie
- redirects to `/api/callback` for server-side token exchange

### 3. Token Exchange (Server)

**File: `api/callback.js` (not shown - needs to be created)**

- receives authorization code and code_verifier from cookie
- exchanges code for access token with spotify
- saves access_token as httpOnly cookie
- redirects to dashboard

## API Architecture

### Frontend Functions (Client-Side Wrappers)

These files act as middlemen between your React components and the secure API routes:

**File: `api/spotify-artists.js`**

- function: `getSpotifyArtists(timeRange)`
- calls: `/api/spotify/artists?time_range=${timeRange}`
- includes: `credentials: "include"` to send cookies
- returns: `{ artists: [...] }`

**File: `api/spotify-tracks.js`**

- function: `getSpotifyTracks(timeRange)`
- calls: `/api/spotify/tracks?time_range=${timeRange}`
- includes: `credentials: "include"` to send cookies
- returns: `{ tracks: [...] }`

**File: `api/spotify-profile.js`**

- function: `getUserProfile()`
- calls: `/api/spotify/profile`
- includes: `credentials: "include"` to send cookies
- returns: `{ display_name, country, followers, images }`

**File: `api/spotify-recent.js`**

- function: `getRecentlyPlayed(limit, filterDuplicates)`
- calls: `/api/spotify/recent?limit=${limit}&filter_duplicates=${filterDuplicates}`
- includes: `credentials: "include"` to send cookies
- returns: `[...]` (array of recently played tracks)

**File: `api/spotify-genre.js`**

- function: `getUserGenres(timeRange)`
- calls: `/api/spotify/genres?time_range=${timeRange}`
- includes: `credentials: "include"` to send cookies
- returns: `{ genres: [...] }`

### Secure API Routes (Server-Side)

These Vercel API routes handle the actual Spotify API calls with cookie authentication:

**File: `api/spotify/artists.js`**

- reads: `access_token` from cookies
- calls: spotify `/me/top/artists` endpoint
- returns: `{ artists: [...] }`

**File: `api/spotify/tracks.js`**

- reads: `access_token` from cookies
- calls: spotify `/me/top/tracks` endpoint
- returns: `{ tracks: [...] }`

**File: `api/spotify/profile.js`**

- reads: `access_token` from cookies
- calls: spotify `/me` endpoint
- returns: user profile data

**File: `api/spotify/recent.js`**

- reads: `access_token` from cookies
- calls: spotify `/me/player/recently-played` endpoint
- handles: duplicate filtering on server side
- returns: array of recently played tracks

**File: `api/spotify/genres.js`**

- reads: `access_token` from cookies
- calls: spotify `/me/top/artists` endpoint
- processes: extracts and deduplicates genres
- returns: `{ genres: [...] }`

**File: `api/spotify/currently-playing.js`**

- reads: `access_token` from cookies
- calls: spotify `/me/player/currently-playing` endpoint
- handles: 204 no content responses
- returns: currently playing track data or null

## Data Flow Example

```
1. User clicks "All Time" button in ArtistCard.jsx
2. ArtistCard calls getSpotifyArtists("long_term")
3. api/spotify-artists.js makes fetch("/api/spotify/artists?time_range=long_term", { credentials: "include" })
4. api/spotify/artists.js (server) reads access_token from cookies
5. Server calls spotify API with the token
6. Server returns { artists: [...] } to frontend
7. api/spotify-artists.js returns the data
8. ArtistCard.jsx receives and displays the data
```

## Security Benefits

- **No localStorage exposure**: access tokens never stored in browser localStorage
- **HttpOnly cookies**: tokens protected from XSS attacks
- **Server-side validation**: all API calls validated on server
- **Automatic token refresh**: can be handled server-side
- **Vercel compatible**: works with serverless functions

## Cookie Structure

- `code_verifier`: temporary PKCE verifier (deleted after token exchange)
- `access_token`: spotify access token (httpOnly, secure)
- `refresh_token`: spotify refresh token (httpOnly, secure) - if implemented

### spotify authorization code flow with pkce

1. first i generate a code that is 64 letters long.
2. then i hash it using sha256 and base64 url encode it.  
   - this = `code_challenge`
3. then i redirect my user to spotify auth url and i append:
   - `client_id`
   - `response_type=code`
   - `redirect_uri`
   - `code_challenge`
   - `code_challenge_method=S256`
   - `scope` (optional)
4. then the user approves and spotify directs me to `redirect_uri` which is the callback.
5. then there is where i extract the `code` from url and make the post request to get the token with:
   - `grant_type=authorization_code`
   - `code` (from url)
   - `redirect_uri`
   - `client_id`
   - `code_verifier` (the original one, not hashed)
6. then spotify verifies the code and if it's good they send me a token i can make api requests with.
7. it's stored in local storage and deleted when user logs out.


### react 

### 🔄 step 1: component initialization and first render

- the function component is called by react  
- **`usestate()` initializes state variables** like: `loading`, `error`, and `data` (e.g. `currenttrack`, `usergenres`, `recentlyplayed`)  
- the component returns jsx based on initial state:  
  - **spinner is shown if `loading` is `true`**  
  - **no content is rendered if `data` is `null` or empty**  
  - no error is shown initially  

---

### ⚙️ step 2: `useeffect` runs after first render

- **react runs the `useeffect` hook after the first render**  
- if a dependency array is provided, `useeffect` only runs when those values change (or once on mount)  
- inside `useeffect`:  
  - optionally calls **`setloading(true)`** to show spinner  
  - **calls async fetch function** (e.g. `getusergenres`, `getcurrentlyplaying`)  
  - on success: **`setstate()` is called with new data**, and error is cleared  
  - on failure: **`seterror()` is called with error message**  
  - **`setloading(false)`** is always called at the end (via `finally` or after `try/catch`)  

---

### 🔁 step 3: state update triggers re-render

- **when `data`, `loading`, or `error` changes, react re-renders the component**  
- the component re-evaluates based on updated state:  
  - **if `loading` is false, spinner is hidden**  
  - **if `error` exists, show the error message**  
  - **if `data` exists, map over it or render values**  
  - **if `data` is empty, show a fallback message** (e.g. `"no genres found"`, `"not playing"`)  

---

### 🔄 step 4: polling or manual refresh (if used)

- some components use `setinterval()` to **automatically refetch data every few seconds/minutes**  
- some components provide a **refresh button that manually triggers the fetch function**  
- both methods repeat steps 2 and 3  

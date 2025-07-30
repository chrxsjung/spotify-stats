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

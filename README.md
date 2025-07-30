first i generate a code that is 64 letters long. 
then i hash it using SHA256 and base64 url encode it. this = code_challange.

then i redirect my user to spotify auth url and i append 
  client_id
  response_type=code
  redirect_uri
  code_challenge
  code_challenge_method=S256
  scope (optional)

then the user approves and spotify directs me to redirect uri which is callback.

then there is where i extract the code from url and make the POST req to get the token with 

  grant_type=authorization_code
  code (from URL)  
  redirect_uri
  client_id
  code_verifier (the original one, not hashed)

then spotify verifies the code and if its good they send me a token i can make api requests with. 

its stored in local storage and deleted when user logs out.

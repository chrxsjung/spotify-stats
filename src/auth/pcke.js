//this function generates a random code using charset 64 long. 
//it makkes a 64 long array and maps it using the charset random choose.
export function generateCodeVerifier() {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';

  const code = crypto.getRandomValues(new Uint8Array(64))
    .map(byte => charset[byte % charset.length])
    .join("");

  return code;
}


//convert the code into bytes 
//then hash it with SHA-256 using crypto.subtle.digest
//convert the hash into a string
//base64url encode the string
export async function generateCodeChallenge(codeVerifier) {
  const codeVerifierBytes = new TextEncoder().encode(codeVerifier);
  const hash = await crypto.subtle.digest("SHA-256", codeVerifierBytes);

  //base64url encode the hash
  const base64Url = btoa(String.fromCharCode(...new Uint8Array(hash)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return base64Url; 
}

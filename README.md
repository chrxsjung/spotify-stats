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

i use useNavigate to navigate through routes through my Routes setup.  navigate("/dashboard")

the ArtistCard, GenreCard, RecentlyPlayedCard, and TrackCard is called by Dashboard.jsx

all 4 cards are pretty much the same in terms of useState and useEffect implementation. 
   
basically it goes like this 

useState is like this:
const [thing, setThing] = useState("initial");

so thing is the actual state value
and setThing is a function that is called which changes the state with the value it was called with 
	
   1. timeRange is stored in useState (starts as "long_term")
   2. when a button is clicked, setTimeRange() is called
   3. this changes the timeRange state value
   4. because timeRange is in the useEffect dependency array [timeRange]
   5. the useEffect automatically runs again with the new timeRange value
   6. this triggers a new API call with new param and re-renders the component with fresh data
   
   flow: button click → setTimeRange() → state change → useEffect runs → new data

useEffect is this. it has a dependency array and if that value is changed the api calls again and updates ArtistCard (or other cards) with new info 

useEffect runs one time when the page runs then can be run again.

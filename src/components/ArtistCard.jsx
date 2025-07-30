import Artist from "./Artist.jsx";
import { getSpotifyArtists } from "../auth/spotify-artists";
import { useState, useEffect } from "react";

function ArtistCard() {
  const [userArtists, setUserArtists] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSpotifyArtists()
      .then((data) => {
        setUserArtists(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to load artists:", err.message);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-gray-800 text-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Top Artists</h2>
        <div className="flex space-x-2">
          <button className="bg-green-500 hover:bg-green-400 text-black font-bold text-sm px-3 py-2 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
            All Time
          </button>
          <button className="bg-green-500 hover:bg-green-400 text-black font-bold text-sm px-3 py-2 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Last Month
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col max-h-96 overflow-y-auto space-y-1 pr-4">
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          </div>
        )}

        {error && (
          <div className="text-red-400 text-center py-4">
            Failed to load artists: {error}
          </div>
        )}

        {userArtists?.artists?.map((artist, index) => (
          <Artist key={artist.id} artist={artist} index={index} />
        ))}
      </div>
    </div>
  );
}

export default ArtistCard;

/*

COMPONENT RELATIONSHIP:
          ArtistCard (Parent) fetches artist data and maps through the array.
          For each artist, it renders an Artist component (Child) passing:
          - artist: individual artist object with name, images, genres, popularity
          - index: position in the list (0, 1, 2, etc.)
          
          Artist component then displays:
          - Rank number (index + 1)
          - Artist image from artist.images[0].url
          - Artist name from artist.name  
          - Top 2 genres from artist.genres
          - Popularity percentage from artist.popularity

*/

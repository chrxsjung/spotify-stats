import Track from "./Track.jsx";
import { getSpotifyTracks } from "../auth/spotify-tracks";
import { useState, useEffect } from "react";

function TrackCard() {
  const [userTracks, setUserTracks] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSpotifyTracks()
      .then((data) => {
        setUserTracks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to load tracks:", err.message);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Top Tracks</h2>
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
            Failed to load tracks: {error}
          </div>
        )}

        {userTracks?.tracks?.map((track, index) => (
          <Track key={track.id} track={track} index={index} />
        ))}
      </div>
    </div>
  );
}

export default TrackCard;

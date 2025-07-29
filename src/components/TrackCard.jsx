import Track from "./Track.jsx";

function TrackCard() {
  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
      <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-400 text-sm">Top Tracks</p>
        <div className="flex space-x-2">
          <button className="bg-green-500 hover:bg-green-400 text-black font-bold text-sm px-3 py-2 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
            All Time
          </button>
          <button className="bg-green-500 hover:bg-green-400 text-black font-bold text-sm px-3 py-2 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Last Month
          </button>
        </div>
      </div>
        <div className="flex flex-col max-h-96 overflow-y-auto space-y-2">
          <Track />
          <Track />
          <Track />
          <Track />
          <Track />
          <Track />
          <Track />
          <Track />
          <Track />
          <Track />
        </div>
      </div>
    </div>
  );
}

export default TrackCard;

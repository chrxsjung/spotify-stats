function GenreCard() {
  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
      <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-400 text-sm">Top Genres</p>
        <div className="flex space-x-2">
          <button className="bg-green-500 hover:bg-green-400 text-black font-bold text-sm px-3 py-2 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
            All Time
          </button>
          <button className="bg-green-500 hover:bg-green-400 text-black font-bold text-sm px-3 py-2 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Last Month
          </button>
        </div>
      </div>        
        <p className="text-xl font-semibold mt-4">Loading...</p>
      </div>
    </div>
  );
}

export default GenreCard;

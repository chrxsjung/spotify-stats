function Track() {
  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
      <div className="flex items-center space-x-4">
        <img
          src="https://picsum.photos/60/60"
          alt="Track"
          className="w-15 h-15 rounded object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">Track Name</h3>
        </div>
      </div>
    </div>
  );
}

export default Track;

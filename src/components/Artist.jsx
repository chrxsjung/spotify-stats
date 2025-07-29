function Artist() {
  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
      <div className="flex items-center space-x-4">
        <img
          src="https://picsum.photos/60/60"
          alt="Artist"
          className="w-15 h-15 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">Artist Name</h3>
        </div>
      </div>
    </div>
  );
}

export default Artist;

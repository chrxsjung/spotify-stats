function Profile() {
  return (
    <div className="bg-black/20 backdrop-blur-sm border border-gray-800 rounded-lg p-8 text-white">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
        <div className="relative">
          <img
            src="https://picsum.photos/400"
            alt="Profile"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-gray-700 shadow-lg"
          />
          <div className="absolute -bottom-2 -right-2 bg-green-500 text-black text-xs font-bold px-2 py-1 rounded-full">
            PREMIUM
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mt-6">
            Your Name...
          </h2>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
            <div className="bg-black/30 rounded-lg p-3">
              <p className="text-2xl font-bold text-green-400">...</p>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Followers
              </p>
            </div>
            <div className="bg-black/30 rounded-lg p-3">
              <p className="text-2xl font-bold text-green-400">...</p>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Following
              </p>
            </div>
            <div className="bg-black/30 rounded-lg p-3 col-span-2 md:col-span-1">
              <p className="text-2xl font-bold text-green-400">...</p>
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Country
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

const SearchBar = ({ onSearchName, onSearchTitle }) => {
  return (
    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-4 md:mb-6">
      <input
        type="text"
        placeholder="🔍 Search by name..."
        onChange={(e) => onSearchName(e.target.value)}
        className="flex-1 p-2 md:p-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 hover:border-blue-300 shadow-md text-sm md:text-base"
      />
      <input
        type="text"
        placeholder="🔍 Search by title..."
        onChange={(e) => onSearchTitle(e.target.value)}
        className="flex-1 p-2 md:p-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 hover:border-blue-300 shadow-md text-sm md:text-base"
      />
    </div>
  );
};

export default SearchBar;
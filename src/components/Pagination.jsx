const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 mt-6 md:mt-8">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed hover:from-blue-600 hover:to-purple-600 hover:scale-105 transition-all duration-300 shadow-lg font-semibold text-sm md:text-base"
      >
        ⬅️ Prev
      </button>
      <span className="text-gray-700 font-medium bg-white px-3 md:px-4 py-2 rounded-lg shadow-md text-sm md:text-base">Page {currentPage} of {totalPages}</span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed hover:from-blue-600 hover:to-purple-600 hover:scale-105 transition-all duration-300 shadow-lg font-semibold text-sm md:text-base"
      >
        Next ➡️
      </button>
    </div>
  );
};

export default Pagination;
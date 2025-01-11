import React from 'react';
import { useSelector } from 'react-redux';

const SearchResults = () => {
  const { searchResults, isLoading, error, search } = useSelector(state => state.navBar);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <h2 className="text-red-500 text-xl">Error: {error}</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Search Results for "{search}"</h1>
      {searchResults.length === 0 ? (
        <p className="text-gray-600">No results found</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {searchResults.map((result) => (
            <div key={result.id} className="border rounded-lg p-4 shadow-sm">
              <h2 className="text-xl font-semibold mb-2">{result.title}</h2>
              <p className="text-gray-600">{result.description}</p>
              {/* Add more result details as needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;

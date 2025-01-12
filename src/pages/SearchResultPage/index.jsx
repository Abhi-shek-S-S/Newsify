import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EmptyScreen from '../../components/EmptyScreen';
import { searchArticles } from '../../redux/navbarSlice';

const SearchResults = () => {
  const dispatch = useDispatch();
  const { searchResults, isLoading, error, search, fromDate, toDate } = useSelector(state => state.navBar);
  const [initialLoad, setInitialLoad] = useState(true);

  // Re-fetch results on component mount if there's a saved search
  useEffect(() => {
    if (search && !searchResults.length) {
      dispatch(searchArticles({ searchTerm: search, fromDate, toDate }))
        .finally(() => setInitialLoad(false));
    } else {
      setInitialLoad(false);
    }
  }, [dispatch, search, fromDate, toDate]);

  // Show loading state during initial load or when explicitly loading
  if (initialLoad || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <EmptyScreen message={`Failed to fetch articles: ${error}`} height={'h-customh12'} />
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-900">
      {search && (
        <p className="sm:text-2xl text-lg font-bold mb-6 text-white">
          Search Results for <span className='text-red-600'>&quot;{search}&quot;</span>
        </p>
      )}
      {!search && searchResults.length === 0 ? (
        <EmptyScreen message="Enter a search term to find articles" height={'h-customh12'} />
      ) : searchResults.length === 0 ? (
        <EmptyScreen message="No results found" height={'h-customh12'} />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {searchResults.map((result, index) => (
            <div key={`${result.title}-${index}`} className="border rounded-lg p-4 shadow-sm">
              <a href={result?.url} target="_blank" rel="noopener noreferrer">
                <h2 className="text-lg font-medium mb-2 text-white underline cursor-pointer">
                  {result.title}
                </h2>
              </a>
              <p className="text-gray-400">{result.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
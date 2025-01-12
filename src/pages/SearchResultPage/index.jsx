import { useSelector } from 'react-redux';
import EmptyScreen from '../../components/EmptyScreen';

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
      <EmptyScreen message={`Failed to fetch articles: ${error}`} height={'h-customh12'} />
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-900">
      <p className="sm:text-2xl text-lg font-bold mb-6 text-white">Search Results for <span className='text-red-600'>&quot;{search}&quot;</span></p>
      {searchResults.length === 0 ? (
        <p className="text-gray-600">No results found</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {searchResults.map((result) => (
            <div key={result.id} className="border rounded-lg p-4 shadow-sm">
              <a href={result?.url} target="_blank" rel="noopener noreferrer">
              <h2 className="text-lg font-normal mb-2 text-white underline cursor-pointer">{result.title}</h2>
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

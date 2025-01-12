import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HorizontalArticle from './Components/HorizontalArticle';
import { fetchArticles, resetArticles } from '../../redux/articleForAllPagesSlice';
import { useLocation } from 'react-router-dom';
import EmptyScreen from '../../components/EmptyScreen';

const MainPage = () => {
  const dispatch = useDispatch();
  const { articles, loading, hasMore, error } = useSelector((state) => state.articlesForAllPages);

  const location = useLocation();
  const menuType = location.pathname.split('/')[1]; // Get menuType from URL
  const [resetComplete, setResetComplete] = useState(false);

  // Trigger reset and fetch on menuType change
  useEffect(() => {
    setResetComplete(false); // Reset the flag
    dispatch(resetArticles()); // Reset articles and page to 1
    setResetComplete(true); // Set the flag to true after reset
  }, [dispatch, menuType]);

  // Fetch articles after reset is complete
  useEffect(() => {
    if (resetComplete) {
      dispatch(fetchArticles(menuType)); // Initial fetch when reset is done
    }
  }, [dispatch, menuType, resetComplete]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      dispatch(fetchArticles(menuType)); // Fetch more articles
    }
  };

  // Filter out removed content
  const filteredArticles = articles.filter((article) => article.content !== "[Removed]");

  return (
    <div className="article-list xl:w-[70%] sm:w-[95%] w-full mx-auto" style={{ padding: '20px' }}>
      {/* Dynamically display the menuType */}
      <p className="text-3xl font-semibold text-white mb-3 capitalize">
        {menuType || 'Home'} {/* Capitalize the menuType */}
      </p>

      {/* Failed state */}
      {error && <EmptyScreen message={`Failed to fetch articles: ${error}`} />}

      {/* No articles found */}
      {!error && !loading && filteredArticles.length === 0 && (
        <EmptyScreen message={`No articles found for "${menuType}".`} />
      )}

      {/* Articles */}
      {!error && filteredArticles.length > 0 && (
        <>
          {filteredArticles.map((article, index) => (
            <HorizontalArticle key={index} article={article} index={index} />
          ))}
          {loading && <div className="text-center py-4">Loading...</div>}
          {!loading && hasMore && (
            <div className="text-center py-4">
              <button
                onClick={handleLoadMore}
                className="load-more-button"
                style={{
                  padding: '10px 20px',
                  background: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Load More
              </button>
            </div>
          )}
          {!hasMore && <div className="text-center py-4">No more articles</div>}
        </>
      )}

      {/* Loading state */}
      {loading && articles.length === 0 && !error && (
        <div className="text-white text-lg">
          Loading...
        </div>
      )}
    </div>
  );
};

export default MainPage;

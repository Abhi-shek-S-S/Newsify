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
  const menuType = location.pathname.split('/')[1];
  const [resetComplete, setResetComplete] = useState(false);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      dispatch(fetchArticles(menuType));
    }
  };

  const filteredArticles = articles.filter((article) => article.content !== "[Removed]");

  // Trigger reset and fetch on menuType change
  /* The `useEffect` hook in the provided code snippet is responsible for triggering a reset and fetch
  action when the `menuType` changes. Here's a breakdown of what it does: */
  useEffect(() => {
    setResetComplete(false);
    dispatch(resetArticles());
    setResetComplete(true);
  }, [dispatch, menuType]);

  // Fetch articles after reset is complete
  useEffect(() => {
    if (resetComplete) {
      dispatch(fetchArticles(menuType));
    }
  }, [dispatch, menuType, resetComplete]);


  return (
    <div className="article-list xl:w-[70%] sm:w-[95%] w-full mx-auto bg-gray-900" style={{ padding: '20px' }}>
      <p className="text-3xl font-semibold text-white mb-3 capitalize">
        {menuType || 'Home'}
      </p>

      {error && <EmptyScreen message={`Failed to fetch articles: ${error}`} />}

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
        <div className="flex justify-center items-center h-customh11">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      )}
    </div>
  );
};

export default MainPage;

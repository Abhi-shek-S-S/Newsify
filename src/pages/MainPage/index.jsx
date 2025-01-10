import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HorizontalArticle from './Components/HorizontalArticle';
import { fetchArticles, resetArticles } from '../../redux/articleForAllPagesSlice';
import { useLocation } from 'react-router-dom'; // Import useLocation

const MainPage = () => {
  const dispatch = useDispatch();
  const { articles, loading, hasMore, error } = useSelector(
    (state) => state.articlesForAllPages
  );

  const location = useLocation(); // Use to track route changes
  const menuType = location.pathname.split('/')[1]; // Dynamic menu type based on route

  const [resetComplete, setResetComplete] = useState(false); // Track if resetArticles is complete

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

  if (loading && articles.length === 0) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredArticles = articles.filter((article) => article.content !== "[Removed]");

  return (
    <div className="article-list" style={{ padding: '20px' }}>
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
    </div>
  );
};

export default MainPage;

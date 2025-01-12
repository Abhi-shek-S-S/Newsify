/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../../redux/newsShowcaseSlice';
import { motion } from 'framer-motion';
import { formatDate } from '../../components/CommonMethods/dateFormat';
import { fetchRecentArticles } from '../../redux/recentArticlesSlice';

const NewsShowCase = () => {
  const dispatch = useDispatch();
  const { articles, isLoading, error } = useSelector((state) => state.newsShowcase);
  const { 
    list: recentArticles, 
    isLoading: recentLoading, 
    error: recentError 
  } = useSelector((state) => state.recentArticles);

  useEffect(() => {
    dispatch(fetchNews());
    dispatch(fetchRecentArticles());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900">
      <p className="text-4xl font-extrabold text-start mb-12 text-white">
        Most Viwed Articles
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <motion.div
            key={article.uri}
            whileHover={{ scale: 1.0 }}
            // whileTap={{ scale: 0.65 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            {article.media?.[0]?.['media-metadata']?.[2]?.url && (
              <img
                src={article.media[0]['media-metadata'][2].url}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6 bg-gray-800 flex flex-col justify-between h-[300px]">
              <div>
              <h2 className="sm:text-2xl text-lg font-bold text-white mb-3">
                {article.title}
              </h2>
              <p className="text-white mb-4 line-clamp-3">{article.abstract}</p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  <p className="text-sm text-gray-500">
                    {formatDate(article.published_date)}
                  </p>
                </span>
                <a
                  href={article?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-200"
                >
                  Read More →
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>


      <div className="container mx-auto px-4 py-8 border-t border-gray-800">
        <p className="text-4xl font-extrabold text-start mb-12 text-white">
          Recent Articles
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentArticles.map((article) => (
            <motion.div
              key={article.id}
              whileHover={{ scale: 1.0 }}
              // whileTap={{ scale: 0.65 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={`/api/placeholder/400/320`}
                alt={article.webTitle}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 bg-gray-800 flex flex-col justify-between h-[300px]">
                <div>
                  <h2 className="sm:text-2xl text-lg font-bold text-white mb-3">
                    {article.webTitle}
                  </h2>
                  <p className="text-white mb-4 line-clamp-3">
                    {`${article.sectionName} - ${article.pillarName}`}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    <p className="text-sm text-gray-500">
                      {formatDate(article.webPublicationDate)}
                    </p>
                  </span>
                  <a
                    href={article.webUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-200"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsShowCase;

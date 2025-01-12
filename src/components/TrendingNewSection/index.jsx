import React from 'react';
import LoadingShimmer from '../../components/LoadingIndicator';
import EmptyScreen from '../../components/EmptyScreen';
import { formatDate } from '../CommonMethods/dateFormat';

const TrendingNewsSection = ({ status, error, trendingNews }) => {
  return (
    <div className="w-full p-3 bg-[#5d687973] mb-3 max-h-[40%] overflow-auto scrollbar_gray rounded-xl">
      <p className="text-white pb-2 mb-4 border-b border-white text-2xl font-bold">Trending Now</p>
      {status === 'loading' && <LoadingShimmer />}
      {status === 'failed' && <EmptyScreen message={error} />}
      {status === 'succeeded' && trendingNews.length === 0 && (
        <EmptyScreen message="No trending news found." />
      )}
      {status === 'succeeded' &&
        trendingNews
          .filter((news) => news.title)
          .map((news, index) => (
            <div key={index} className="mb-4">
              <div className="flex space-x-4">
                {news.multimedia?.[0]?.url && (
                  <img
                    src={news.multimedia[0].url}
                    alt={news.title}
                    className="w-[70px] h-[70px] object-cover rounded"
                  />
                )}
                <div className="text-white">
                  <p className="text-red-600 font-semibold text-lg">
                    {news.section}
                  </p>
                  <a href={news.url} target="_blank" rel="noopener noreferrer">
                    <h3 className="font-semibold text-xl hover:underline cursor-pointer">
                      {news.title}
                    </h3>
                  </a>
                  <p className="mt-2 text-[#3B82F6] font-normal text-sm">
                    Published at - {formatDate(news.published_date)}
                  </p>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default TrendingNewsSection;
// HomePage.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopHeadlines, fetchLocalNews, fetchTrendingNews } from '../../redux/topHeadlinesSlice';
import { fetchSources } from '../../redux/sourcesSlice';
import Source from '../../components/SourceCarousel/Source';
import LoadingShimmer from '../../components/LoadingIndicator';
import EmptyScreen from '../../components/EmptyScreen';
import { formatDate } from '../../components/CommonMethods/dateFormat';
import PageHeader from '../../components/PageHeader/PageHeader';
import { today } from '../../components/CommonMethods/today';
import TrendingNewsSection from '../../components/TrendingNewSection';

const HomePage = () => {
  const dispatch = useDispatch();
  const { headlines, localNews, status, error } = useSelector((state) => state.topHeadlines);
  const { trendingNews } = useSelector((state) => state.topHeadlines);
  const { list: sources, isLoading, error: sourcesError } = useSelector((state) => state.sources);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTopHeadlines());
      dispatch(fetchLocalNews('latest'));
      dispatch(fetchTrendingNews());
      dispatch(fetchSources());
    }
  }, [status, dispatch]);



  return (
    <div className='bg-gray-900'>
      <PageHeader today={today} />
      <div className="flex lg:flex-row flex-col xl:w-[80%] lg:w-[95%] w-[90%] mx-auto py-5 lg:h-customh6 lg:overflow-hidden">
        
        {/* Top Stories Section */}
        <div className="lg:w-[60%] w-full p-3 bg-[#5d687973] h-full overflow-auto scrollbar_gray rounded-xl">
          <p className="text-white pb-2 mb-4 border-b border-white sm:text-2xl text-lg font-bold">Top Stories</p>
          <div>
            {status === 'loading' && <LoadingShimmer count={4} />}
            {status === 'failed' && <EmptyScreen message={error} />}
            {status === 'succeeded' && headlines.length === 0 && <EmptyScreen message="No headlines found." />}
            {status === 'succeeded' &&
              headlines
                .filter((headline) => headline.content !== "[Removed]")
                .map((headline, index) => (
                  <div key={index} className="mb-4">
                    <div className="sm:flex-row flex-col flex sm:space-x-4 space-x-2 rounded-lg p-3 bg-gray-900">
                      {headline.urlToImage && (
                        <div className="flex flex-col w-full">
                          <img
                            src={headline?.urlToImage}
                            alt={headline?.title}
                            className="object-cover rounded"
                          />
                        </div>
                      )}
                      <div className="text-white">
                        <p className='bg-[#38373d] px-3 py-1 rounded-full w-fit text-red-600 font-medium mb-1 sm:mt-0 mt-2'>{headline?.source?.name}</p>
                        <a href={headline?.url} target="_blank" rel="noopener noreferrer">
                          <h3 className="font-semibold sm:text-xl text-lg hover:underline cursor-pointer">{headline.title}</h3>
                        </a>
                        <p className='text-sm font-normal text-white mt-0.5'>{headline.description}</p>
                        <p className="mt-2 text-[#3B82F6] font-normal text-sm">
                          Published at - {formatDate(headline?.publishedAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        {/* Local News Section */}
        <div className="lg:max-w-[40%] w-full text-white lg:pl-3 pl-0 lg:mt-0 mt-3">  
          <div className="w-full p-3 bg-[#5d687973] mb-3 max-h-[60%] overflow-auto scrollbar_gray rounded-xl">
            <p className="text-white pb-2 mb-4 border-b border-white sm:text-2xl text-lg font-bold">Latest News</p>
            {status === 'loading' && <LoadingShimmer />}
            {status === 'failed' && <EmptyScreen message={error} height={'h-[550px]'} />}
            {status === 'succeeded' && localNews.length === 0 && <EmptyScreen message="No local news found." />}
            {status === 'succeeded' &&
              localNews
                .filter((news) => news.content !== "[Removed]")
                .map((news, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex space-x-4">
                      {news.urlToImage && (
                        <img
                          src={news.urlToImage}
                          alt={news.title}
                          className="w-[70px] h-[70px] object-cover rounded"
                        />
                      )}
                      <div className="text-white">
                        <a href={news?.url} target="_blank" rel="noopener noreferrer">
                          <h3 className="font-semibold text-base hover:underline cursor-pointer">{news.title}</h3>
                        </a>
                        <p className='mt-2 text-[#3B82F6] font-normal text-sm'>
                          Published at - {formatDate(news?.publishedAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
          </div>

          <TrendingNewsSection
            status={status}
            error={error}
            trendingNews={trendingNews}
          />

        </div>
      </div>
      
      {/* Sources Section */}
      <div className="w-full h-[40%] p-3 rounded">
        {isLoading && <LoadingShimmer />}
        {sourcesError && <EmptyScreen message={sourcesError} />}
        {(sources && sources.length === 0 && !sourcesError) && <EmptyScreen message="No sources available." />}
        {sources && <Source sources={sources} />}
      </div>
    </div>
  );
};

export default HomePage;
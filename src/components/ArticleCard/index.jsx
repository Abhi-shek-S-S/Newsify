/* eslint-disable react/prop-types */

const ArticleCard = ({ article }) => {
    return (
      <div className="bg-gray-800 dark:bg-gray-700 text-white dark:text-gray-300 rounded-lg p-4 shadow-md flex flex-col">
        <img
          src={article.urlToImage || "https://via.placeholder.com/150"}
          alt={article.title}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
        <div className="flex flex-col justify-between flex-grow">
          <div>
            <h2 className="text-lg font-semibold">{article.title}</h2>
            <p className="text-sm text-gray-400 my-2">
              {article.author ? `By ${article.author}` : "Unknown Author"}
            </p>
          </div>
          <div>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline text-sm"
            >
              Read more
            </a>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Published at: {new Date(article.publishedAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    );
  };
  

export default ArticleCard;

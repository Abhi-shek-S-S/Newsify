import React from "react";
import { motion } from "framer-motion";

const CategoryHeadlines = ({ articles, section }) => {
  if (!articles || articles.length === 0) {
    return <p>No headlines available for the selected category.</p>;
  }

  console.log(articles, "articles");

  return (
    <div className="category-headlines">
      <h2 className="text-2xl font-bold text-white mb-4">{section}</h2> {/* Display the section name */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article, index) => {
          // Check if multimedia exists and is an array with at least one item
          const hasMultimedia = article.multimedia && Array.isArray(article.multimedia) && article.multimedia.length > 0;

          return (
            <motion.div
              key={index}
              className="p-4 bg-[#f3f4f624] rounded-lg shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }} // Delay animation for each card
            >
              {/* Render image if multimedia exists */}
              {hasMultimedia && (
                <img
                  src={article.multimedia[0].url}
                  alt={article.multimedia[0].caption}
                  className="w-full h-auto rounded-md mb-4"
                />
              )}

              <div className="flex flex-col justify-between">
                <h3 className="text-lg font-semibold mb-2 text-white">{article.title}</h3>
                <p className="text-sm text-white mb-2">{article.abstract}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm"
                >
                  Full Article
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryHeadlines;

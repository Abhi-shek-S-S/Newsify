import React from "react";

const CategoryHeadlines = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return <p>No headlines available for selected categories.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map((article, index) => (
        <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
          <p className="text-sm text-gray-700 mb-2">{article.description}</p>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline text-sm"
          >
            Read More
          </a>
        </div>
      ))}
    </div>
  );
};

export default CategoryHeadlines;

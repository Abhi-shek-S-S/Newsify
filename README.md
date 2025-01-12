# 📰 News Aggregator

A modern news aggregation web application built with React + Vite that combines multiple news sources including NewsAPI and New York Times API into a single, seamless interface.

## 🚀 Features

- Real-time news aggregation from multiple trusted sources
- Clean and responsive user interface
- Advanced search and filtering capabilities
- Article categorization and sorting
- Docker containerization for easy deployment
- Optimized performance with API response caching
- Lazy loading for improved user experience

## 🛠️ Tech Stack

- *Frontend:* React + Vite
- *APIs:* 
  - NewsAPI
  - New York Times API
- *Containerization:* Docker

## 📋 Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (v14 or higher)
- npm or yarn package manager
- Docker (for containerized deployment)
- API keys for:
  - NewsAPI
  - New York Times API

## ⚙️ Installation and Setup

### Local Development

1. Clone the repository:
bash
git clone https://github.com/yourusername/news-aggregator.git
cd news-aggregator


2. Install dependencies:
bash
npm install


3. Create a .env file in the root directory and add your API keys:
env
VITE_NEWS_API_KEY=your_news_api_key
VITE_NYT_API_KEY=your_nyt_api_key


4. Start the development server:
bash
npm run dev


### Docker Deployment

1. Build the Docker image:
bash
docker build -t news-aggregator .


2. Run the container:
bash
docker run -p 3000:3000 news-aggregator


## 🔧 Configuration

The application can be configured through environment variables:

env
VITE_PORT=3000                    # Application port
VITE_NEWS_API_KEY=your_key        # NewsAPI key
VITE_NYT_API_KEY=your_key         # NYT API key
VITE_API_CACHE_DURATION=3600      # Cache duration in seconds


## 🔍 Usage

1. Access the application at http://localhost:3000
2. Use the search bar to find specific news
3. Filter news by category using the dropdown menu
4. Click on articles to read full content
5. Use the pagination controls to navigate through results


## 🔄 Contributing

1. Fork the repository
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add some AmazingFeature')
4. Push to the branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

## 🚀 Future Improvements

- [ ] User authentication system
- [ ] Additional news sources
- [ ] Enhanced filtering options
- [ ] Mobile application
- [ ] Personalized news recommendations

## ❗ Troubleshooting

Common issues and solutions:

1. *API Rate Limiting*
   - Implement proper error handling
   - Use retry mechanisms

2. *Docker Issues*
   - Verify environment variables
   - Check port mappings

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.


Don't forget to give the project a star! ⭐ Thanks for visiting!

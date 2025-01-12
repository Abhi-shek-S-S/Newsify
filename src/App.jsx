import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import ForYouPage from './pages/ForYouPage';
import SearchResults from './pages/SearchResultPage';
import NewShowCase from './pages/NewsShowCasePage';

function App() {
  const [search, setSearch] = useState('');

  return (
    <Router>
      <div className="App">
        <NavBar
          search={search}
          onSearchChange={setSearch}
        />

        <div className="main-content bg-gray-900">
          {/* Routes for your pages */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/main-page" element={<MainPage />} />
            <Route path="/for-you" element={<ForYouPage />} />
            <Route path="/news-showcase" element={<NewShowCase />} />
            <Route path="/india" element={<MainPage />} />
            <Route path="/world" element={<MainPage />} />
            <Route path="/local" element={<MainPage />} />
            <Route path="/business" element={<MainPage />} />
            <Route path="/technology" element={<MainPage />} />
            <Route path="/entertainment" element={<MainPage />} />
            <Route path="/sports" element={<MainPage />} />
            <Route path="/science" element={<MainPage />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

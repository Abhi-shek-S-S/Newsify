import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import ForYouPage from './pages/ForYouPage';
import SearchResults from './pages/SearchResultPage';

function App() {
  const [search, setSearch] = useState('');
  // const [darkMode, setDarkMode] = useState(() => {
  //   if (typeof window !== 'undefined') {
  //     return localStorage.getItem('darkMode') === 'true';
  //   }
  //   return false;
  // });

  // useEffect(() => {
  //   if (darkMode) {
  //     document.documentElement.classList.add('dark');
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //   }
  //   localStorage.setItem('darkMode', String(darkMode));
  // }, [darkMode]);

  // const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <Router>
      <div className="App">
        {/* The NavBar will be visible on all routes */}
        <NavBar
          // onDarkModeChange={toggleDarkMode} 
          // darkMode={darkMode} 
          search={search}
          onSearchChange={setSearch}
        />

        <div className="main-content bg-gray-900 h-customh10">
          {/* Routes for your pages */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/main-page" element={<MainPage />} />
            <Route path="/for-you" element={<ForYouPage />} />
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

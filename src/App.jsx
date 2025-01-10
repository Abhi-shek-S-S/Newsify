import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';

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

        <div className="main-content">
          {/* Routes for your pages */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/" element={<MainPage onDarkModeChange={toggleDarkMode} darkMode={darkMode} search={search} onSearchChange={setSearch} />} /> */}
            {/* Add more routes here as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

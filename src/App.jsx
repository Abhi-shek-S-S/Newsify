import './App.css'
import { useEffect, useState } from 'react'
import MainPage from './pages/MainPage'
// import NavBar from './components/NavBar';

function App() {
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <>
      <div>
        {/* <NavBar onDarkModeChange={toggleDarkMode} darkMode={darkMode} search={search} onSearchChange={setSearch} /> */}
        <MainPage onDarkModeChange={toggleDarkMode} darkMode={darkMode} search={search} onSearchChange={setSearch}/>
      </div>
    </>
  )
}

export default App

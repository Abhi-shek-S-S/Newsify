import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { MENU_ITEMS } from '../../constants/constant';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearSearchResults,
    handleMenuClick,
    searchArticles,
    setIsPreferenceModalOpen,
    setSearch,
} from '../../redux/navbarSlice';
import Preference from '../PreferenceModal/Preference';
import { useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { fetchSources } from '../../redux/sourcesSlice';

function NavBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { search, isPreferenceModalOpen, active } = useSelector((state) => state.navBar);
    const [menuOpen, setMenuOpen] = useState(false);

    // Handle menu item click
    const handleMenuItemClick = (item) => {
        dispatch(handleMenuClick(item));

        if (item === 'Home') {
            navigate('/');
        } else if (item === 'For you') {
            navigate('/for-you');
        } else if (item === 'New Showcase') {
            navigate('/news-showcase');
        } else {
            navigate(`/${item.toLowerCase().replace(' ', '-')}`);
        }
    };



    // Handle preference modal open
    const handlePreferenceModalOpen = () => {
        dispatch(fetchSources());
        dispatch(setIsPreferenceModalOpen(true));
    };

    // Handle search change with URL updates
    const handleSearchChange = (value) => {
        dispatch(setSearch(value));

        if (value.trim()) {
            // Update URL with search query and navigate to search page
            navigate(`/search?q=${encodeURIComponent(value.trim())}`);
        } else {
            // Clear search and redirect to home
            navigate('/');
            dispatch(clearSearchResults());
        }
    };

    // Handle initial load and URL search parameter
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const queryParam = params.get('q');

        // If there's a search query in the URL
        if (queryParam) {
            dispatch(setSearch(queryParam));
            dispatch(searchArticles(queryParam));
        } else if (location.pathname === '/search' && !queryParam) {
            // If we're on search page but no query parameter, go home
            navigate('/');
        }
    }, [location.pathname, dispatch, navigate]);

    // Debounced search effect
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if (search.trim()) {
                dispatch(searchArticles(search.trim()));
            }
        }, 500); // 500ms debounce delay

        // Cleanup timeout on component unmount or when search changes
        return () => clearTimeout(debounceTimer);
    }, [search, dispatch]);

    // Update the active menu item based on the current path
    useEffect(() => {
        const path = location.pathname;
        const activeItem =
            MENU_ITEMS.find((item) => {
                if (path === '/' && item === 'Home') return true;
                if (path === '/for-you' && item === 'For you') return true;
                if (path === '/news-showcase' && item === 'New Showcase') return true;
                return path.includes(item.toLowerCase().replace(' ', '-'));
            }) || 'Home';
        dispatch(handleMenuClick(activeItem));
    }, [location, dispatch]);


    return (
        <div className="sticky top-0 mx-auto p-6 shadow-lg bg-gray-800 w-full">
            <div className="w-full flex xl:flex-row flex-col xl:items-center xl:justify-between">
                <div className="w-[25%] flex items-center">
                    <img src="/Images/logo .webp" className="w-20 h-20 mr-4" alt="logo" />
                    <p className="text-white font-extrabold text-[37px] break-words flex flex-col">Newsify</p>
                </div>
                <div className="flex items-center xl:justify-end justify-between xl:w-[75%] w-full">
                    <div className="md:w-[60%] w-full md:mb-0 my-3">
                        <div className="flex w-full p-[13px] items-center justify-end gap-2 flex-1 dark:bg-gray-700 dark:border-gray-600 border rounded-md">
                            <Search className="w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search articles, locations and sources..."
                                value={search}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                className="w-full focus:outline-none dark:bg-gray-700 text-white"
                            />
                        </div>
                    </div>
                    <div className="md:w-[25%] w-full  items-center justify-end lg:block flex">
                        <button
                            type="button"
                            onClick={handlePreferenceModalOpen}
                            className="ml-3 px-6 py-1 mt-3 rounded-lg flex items-center justify-between text-white text-lg font-normal border-white border"
                        >
                            Preferences
                            <img src="/Images/filter.png" alt="Preference" className="p-2 rounded-full w-10 h-10 ml-2" />
                        </button>
                    </div>
                </div>

            </div>
            <div className="items-center mt-10 xl:w-[70%] lg:w-[98%] lg:flex hidden mx-auto sticky top-0">
                <ul className="flex items-center justify-between w-full">
                    {MENU_ITEMS.map((item) => (
                        <motion.li
                            key={item}
                            onClick={() => handleMenuItemClick(item)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`text-base font-normal cursor-pointer transition duration-300 ease-in-out ${active === item ? 'border-b-4 rounded border-blue-500 text-blue-500' : 'text-white border-transparent'
                                }`}
                        >
                            {item}
                        </motion.li>
                    ))}
                </ul>
            </div>
            <div className='flex justify-between items-center w-full'>
                <div className="md:w-[20%] w-full lg:hidden block">
                    <button
                        type="button"
                        onClick={handlePreferenceModalOpen}
                        className="lg:ml-3 ml-0 px-3 py-1 rounded-lg flex items-center justify-between text-white text-lg font-normal border-white border"
                    >
                        Preferences
                        <img src="/Images/filter.png" alt="Preference" className="p-2 rounded-full w-10 h-10 ml-2" />
                    </button>
                </div>
                <div className="lg:hidden">
                    <button
                        className="text-white focus:outline-none"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {/* Hamburger Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </button>
                    {menuOpen && (
                        <ul className="mt-4 space-y-4">
                            {MENU_ITEMS.map((item) => (
                                <motion.li
                                    key={item}
                                    onClick={() => handleMenuClick(item)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`text-base font-normal cursor-pointer transition duration-300 ease-in-out ${state.active === item
                                        ? "border-b-4 rounded border-blue-500 text-blue-500"
                                        : "text-white border-transparent"
                                        }`}
                                >
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            {isPreferenceModalOpen && <Preference />}
        </div>
    );
}

export default NavBar;
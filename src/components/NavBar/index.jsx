/* eslint-disable react/prop-types */
import { Search, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { MENU_ITEMS } from '../../constants/constant';
import { useDispatch, useSelector } from 'react-redux';
import { clearSearchResults, handleMenuClick, searchArticles, setIsPreferenceModalOpen, setSearch } from '../../redux/navbarSlice';
import Preference from '../PreferenceModal/Preference';
import { useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { fetchArticles } from '../../redux/articleForAllPagesSlice';

function NavBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();  // Get the current location (route)
    const { search, isPreferenceModalOpen, isFilterModalOpen, active } = useSelector(state => state.navBar);
    const [menuOpen, setMenuOpen] = useState(false);
    // const darkMode = useSelector(state => state.theme.darkMode); // Assuming darkMode is stored in a `theme` slice

    // // Handle search change
    // const handleSearchChange = (value) => {
    //     dispatch(setSearch(value));
    // };

    // // Handle dark mode toggle
    // const onDarkModeChange = () => {
    //     dispatch(setDarkMode(!darkMode)); // Assuming you have a darkMode action in the theme slice
    // };


    // Handle menu item click
    // src/components/NavBar.jsx
    const handleMenuItemClick = (item) => {
        dispatch(handleMenuClick(item));  // Handle active menu state

        // Only fetch articles if the item is not "For You" or "New Showcase"
        if (item !== "For you" && item !== "New Showcase") {
            dispatch(fetchArticles(item.toLowerCase())); // Fetch articles based on the clicked menu type
        }

        // Navigate to the appropriate page
        if (item === "Home") {
            navigate('/');  // Navigate to Home route
        } else if (item === "For you") {
            navigate('/for-you');  // Navigate to For you page
        } else if (item === "New Showcase") {
            navigate('/new-showcase');  // Navigate to New Showcase page
        } else {
            // Navigate to the dynamic route based on the menu item
            navigate(`/${item.toLowerCase().replace(' ', '')}`);
        }
    };

    // Handle modals
    const handleFilterModalOpen = () => {
        dispatch(setIsFilterModalOpen(true));
    };

    const handlePreferenceModalOpen = () => {
        dispatch(setIsPreferenceModalOpen(true));
    };

    const handleSearchChange = (value) => {
        dispatch(setSearch(value));

        if (!value.trim()) {
            dispatch(clearSearchResults());
            navigate('/');
            return;
        }
    };

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if (search.trim()) {
                dispatch(searchArticles(search));
                navigate('/search');
            }
        }, 500);

        return () => clearTimeout(debounceTimer);
    }, [search, dispatch, navigate]);

    // Update the active menu item based on the current path
    useEffect(() => {
        const path = location.pathname;
        const activeItem = MENU_ITEMS.find(item => {
            // Match exact path or the route fragment
            if (path === '/' && item === 'Home') return true;
            if (path === '/for-you' && item === 'For you') return true;
            return path.includes(item.toLowerCase()); // Match the route fragment
        }) || "Home";  // Default to "Home" if no match
        dispatch(handleMenuClick(activeItem)); // Set the active item based on the path
    }, [location, dispatch]);


    return (
        <div className='sticky top-0 mx-auto p-6 shadow-lg bg-gray-800 w-full'>
            <div className="w-full flex xl:flex-row flex-col xl:tems-center xl:justify-between ">
                <div className="w-[25%] flex items-center">
                    <img src="/public/Images/logo .webp" className='w-20 h-20 mr-4 ' alt="logo" />
                    <p className="text-white font-extrabold text-[37px] break-words flex flex-col">Newsify</p>
                </div>
                <div className='flex items-center xl:justify-end justify-between xl:w-[75%] w-full'>
                    <div className="w-[60%]">
                        <div className="flex w-full p-[13px] items-center justify-end gap-2 flex-1 dark:bg-gray-700 dark:border-gray-600 border rounded-md">
                            <Search className="w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search articles, locations and sources..."
                                value={search}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                className="w-full focus:outline-none dark:bg-gray-700"
                            />
                        </div>
                    </div>
                </div>
                <div className="w-[20%] flex items-center justify-end">
                    <button type='button'
                        title='Preference'
                        onClick={handleFilterModalOpen}
                        className='cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" alt="Preference" className='bg-white rounded-full p-3 cursor-pointer w-12 h-12 '>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                        </svg>
                    </button>
                    <button type='button' onClick={handlePreferenceModalOpen} className=' ml-3 px-6 py-1 rounded-lg flex items-center justify-between text-white text-lg font-normal border-white border'>
                        Preference
                        <img src="/Images/filter.png" alt="Preference" className="p-2 rounded-full w-10 h-10 ml-2" />
                    </button>
                    {/* <button
                        onClick={onDarkModeChange}
                        className="ml-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        {darkMode ? (
                            <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        ) : (
                            <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        )}
                    </button> */}
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
                            className={`text-base font-normal cursor-pointer transition duration-300 ease-in-out ${active === item
                                ? "border-b-4 rounded border-blue-500 text-blue-500"
                                : "text-white border-transparent"
                                }`}
                        >
                            {item}
                        </motion.li>
                    ))}
                </ul>
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

            {
                isPreferenceModalOpen && <Preference />
            }
        </div>
    );
}

export default NavBar;

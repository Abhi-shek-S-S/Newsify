import { motion } from 'framer-motion';
import { MENU_ITEMS } from '../../constants/constant';
import { useDispatch, useSelector } from 'react-redux';
import {
    clearSearchResults,
    handleMenuClick,
    searchArticles,
    setFromDate,
    setIsPreferenceModalOpen,
    setSearch,
    setToDate,
} from '../../redux/navbarSlice';
import Preference from '../PreferenceModal/Preference';
import { useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { fetchSources } from '../../redux/sourcesSlice';
import EnhancedSearchBar from '../SearchBar';

function NavBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { search, isPreferenceModalOpen, active } = useSelector((state) => state.navBar);
    const [menuOpen, setMenuOpen] = useState(false);

    /**
     * The function `handleMenuItemClick` handles menu item clicks by closing the menu, dispatching an
     * action, and navigating to different routes based on the selected item.
     */
    const handleMenuItemClick = (item) => {
        if (setMenuOpen) setMenuOpen(false);
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

    /**
     * The function `handlePreferenceModalOpen` dispatches actions to fetch sources and set a preference
     * modal open state.
     */
    const handlePreferenceModalOpen = () => {
        dispatch(fetchSources());
        dispatch(setIsPreferenceModalOpen(true));
    };

    /**
     * The handleSearch function takes search term, from date, and to date as parameters, constructs a
     * URL query string based on the parameters, navigates to the search page with the query string, and
     * dispatches a searchArticles action.
     */
    const handleSearch = ({ searchTerm, fromDate, toDate }) => {
        if (searchTerm.trim()) {
            const params = new URLSearchParams();
            params.set('q', searchTerm);
            if (fromDate) params.set('from', fromDate);
            if (toDate) params.set('to', toDate);

            navigate(`/search?${params.toString()}`);
            dispatch(searchArticles({ searchTerm, fromDate, toDate }));
        }
    };


    /**
     * The handleClear function dispatches an action to clear search results and navigates to the home page.
     */
    const handleClear = () => {
        dispatch(clearSearchResults());
        navigate('/');
    };

    /* This `useEffect` hook is responsible for handling the initial load and URL search parameters in the NavBar component.*/
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const queryParam = params.get('q');
        const fromDate = params.get('from');
        const toDate = params.get('to');

        if (queryParam) {
            dispatch(setSearch(queryParam));
            if (fromDate) dispatch(setFromDate(fromDate));
            if (toDate) dispatch(setToDate(toDate));
            dispatch(searchArticles({
                searchTerm: queryParam,
                fromDate,
                toDate
            }));
        } else if (location.pathname === '/search' && !queryParam) {
            navigate('/');
        }
    }, [location.pathname, dispatch, navigate, location.search]);


    /* The `useEffect` hook you provided is implementing a debounced search effect. */
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if (search.trim()) {
                dispatch(searchArticles(search.trim()));
            }
        }, 500);
        return () => clearTimeout(debounceTimer);
    }, [search, dispatch]);


    /* This `useEffect` hook is responsible for updating the active menu item based on the current path
    in the NavBar component. It first retrieves the current path from `location.pathname`. Then, it
    searches for the corresponding menu item in the `MENU_ITEMS` array based on the path. */
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
        <div className="sticky top-[-1px] mx-auto p-6 shadow-lg bg-gray-800 w-full">
            <div className="xl:w-[90%] md:w-[95%] w-full mx-auto flex xl:flex-row flex-col xl:items-center xl:justify-between">
                <div className="w-[25%] flex items-center">
                    <img src="/Images/logo .webp" className="w-20 h-20 mr-4 rounded-full" alt="logo" />
                    <p className="text-white font-extrabold text-[37px] break-words flex flex-col">Newsify</p>
                </div>
                <div className="flex items-center xl:justify-end justify-between xl:w-[75%] w-full">
                    <div className="md:w-[70%] w-full md:mb-0 my-3">
                        <div className="flex w-full xl:p-[13px] py-2.5 items-center justify-end gap-2 flex-1 dark:bg-gray-700 dark:border-gray-600 rounded-md">
                            <EnhancedSearchBar
                                value={search}
                                onChange={(value) => dispatch(setSearch(value))}
                                onSearch={handleSearch}
                                onClear={handleClear}
                                initialDates={{
                                    fromDate: location.search ? new URLSearchParams(location.search).get('from') : '',
                                    toDate: location.search ? new URLSearchParams(location.search).get('to') : ''
                                }}
                            />
                        </div>
                    </div>
                    <div className="md:w-[18%] w-full items-center justify-end sm:flex hidden">
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
                            className={`text-base font-normal cursor-pointer transition duration-300 ease-in-out ${active === item ? 'border-b-4 rounded border-blue-500 text-blue-500' : 'text-white border-transparent'}`}
                        >
                            {item}
                        </motion.li>
                    ))}
                </ul>
            </div>
            <div className='flex justify-between items-center w-full'>
                <div className="lg:hidden">
                    <button
                        className="text-white focus:outline-none py-3"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <img src="/Images/hamburger.svg" alt="hamburger" className='w-8 h-8' />
                    </button>
                    {menuOpen && (
                        <ul className="mt-4 space-y-4 absolute top-[-15px] left-0 w-[80%] bg-[#333d4b] shadow-lg p-4 rounded-tl-lg rounded-bl-lg h-screen pointer-events-auto">
                            {MENU_ITEMS.map((item) => (
                                <motion.li
                                    key={item}
                                    onClick={() => handleMenuItemClick(item)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`text-base font-normal cursor-pointer transition duration-300 ease-in-out ${active === item
                                        ? "border-b-4 w-[80%] rounded border-blue-500 text-blue-500"
                                        : "text-white border-transparent"
                                        }`}
                                >
                                    {item}
                                </motion.li>
                            ))}
                            <img
                                onClick={() => setMenuOpen(false)}
                                src="/Images/close.svg"
                                className="w-5 h-5 absolute right-3 top-1 cursor-pointer bg-white p-0.5 rounded-full"
                                alt="Close"
                            />
                        </ul>
                    )}
                </div>
                <div className="md:w-[20%] sm:hidden block">
                    <button
                        type="button"
                        onClick={handlePreferenceModalOpen}
                        className="lg:ml-3 ml-0 px-3 py-1 rounded-lg flex items-center justify-between text-white text-lg font-normal border-white border"
                    >
                        Preferences
                        <img src="/Images/filter.png" alt="Preference" className="p-2 rounded-full w-10 h-10 ml-2" />
                    </button>
                </div>
            </div>
            {isPreferenceModalOpen && <Preference />}
        </div>
    );
}

export default NavBar;
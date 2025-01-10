import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from '../../components/NavBar';
import Preference from '../../components/PreferenceModal/Preference';
import Source from '../../components/SourceCarousel/Source';
import Footer from '../../components/Footer';
import Filter from '../../components/FilterModal/Filter';
import axios from 'axios';
import ArticleCard from '../../components/ArticleCard';
import EmptyScreen from '../../components/EmptyScreen';
import HorizontalLoader from './Components/HorizontalLoader';
import GridLoader from './Components/GridLoader';
import ContentContainer from './Components/ContentContainer';
import HorizontalArticle from './Components/HorizontalArticle';
import { HORIZONTAL_CATEGORIES, MENU_ITEMS } from '../../constants/constant';
import PageHeader from './Components/PageHeader';


const API_KEY = '97eeb08966a144549cba90c1085983e5'; //newsapi.org API key nnn

function MainPage({ darkMode }) {

    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const [state, setState] = useState({
        articles: [],
        sources: [],
        isPreferenceModalOpen: false,
        isFilterModelOpen: false,
        isLoading: true,
        isLoadingMore: false,
        error: null,
        active: searchParams.get('category') || "Home",
        search: "",
        currentPage: 1,
        hasMore: true,
        userPreferences: JSON.parse(localStorage.getItem('userPreferences')) || {
            sources: [],
            categories: [],
            authors: []
        }
    });


    const today = new Date().toLocaleDateString('en-US',
        {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });


    const fetchSources = useCallback(async () => {
        try {
            const { data } = await axios.get(
                `https://newsapi.org/v2/top-headlines/sources?apiKey=${API_KEY}`
            );
            setState(prev => ({ ...prev, sources: data.sources }));
        } catch (error) {
            setState(prev => ({ ...prev, error: 'Failed to fetch sources' }));
        }
    }, []);


    const fetchArticles = useCallback(async (category, searchQuery = "", page = 1, isLoadMore = false) => {
        setState(prev => ({
            ...prev,
            isLoading: !isLoadMore,
            isLoadingMore: isLoadMore,
            error: null
        }));
        try {
            const isHome = category.toLowerCase() === 'home';
            const isForYou = category.toLowerCase() === 'for you';
            const endpoint = isHome || isForYou ? 'top-headlines' : 'everything';

            let params = new URLSearchParams({
                apiKey: API_KEY,
                pageSize: 20,
                page: page,
            });

            if (isForYou) {
                if (state.userPreferences.sources.length > 0) {
                    params.append('sources', state.userPreferences.sources.join(','));
                }

                const searchTerms = [
                    ...state.userPreferences.categories,
                    ...state.userPreferences.authors
                ];

                if (searchTerms.length > 0) {
                    params.append('q', searchTerms.join(' OR '));
                }

                if (!params.has('sources') && !params.has('q')) {
                    params.append('q', 'headlines');
                }
            } else if (searchQuery) {
                params.append('q', searchQuery);
            } else if (isHome) {
                params.append('q', 'everything');
            } else {
                params.append('q', category.toLowerCase());
            }

            const { data } = await axios.get(
                `https://newsapi.org/v2/${endpoint}?${params}`
            );

            setState(prev => ({
                ...prev,
                articles: isLoadMore ? [...prev.articles, ...data.articles] : data.articles,
                isLoading: false,
                isLoadingMore: false,
                currentPage: page,
                hasMore: data.articles.length === 20
            }));

        } catch (error) {
            console.error('API Error:', error);
            setState(prev => ({
                ...prev,
                error: `Failed to fetch articles: ${error.message}`,
                isLoading: false,
                isLoadingMore: false,
                hasMore: false
            }));
        }
    }, [state.userPreferences]);


    const handleLoadMore = useCallback(() => {
        const nextPage = state.currentPage + 1;
        fetchArticles(state.active, state.search, nextPage, true);
    }, [state.currentPage, state.active, state.search, fetchArticles]);


    const updateUserPreferences = useCallback((preferences) => {
        // Organize preferences by type
        const organizedPreferences = {
            sources: preferences.filter(pref =>
                state.sources.some(source => source.name === pref)
            ),
            categories: preferences.filter(pref =>
                ["Business", "Entertainment", "Sports", "Technology", "Science"].includes(pref)
            ),
            authors: preferences.filter(pref =>
                !state.sources.some(source => source.name === pref) &&
                !["Business", "Entertainment", "Sports", "Technology", "Science"].includes(pref)
            )
        };

        setState(prev => ({
            ...prev,
            userPreferences: organizedPreferences,
            isPreferenceModalOpen: false
        }));

        localStorage.setItem('userPreferences', JSON.stringify(organizedPreferences));

        // If currently on "For you" tab, refresh the articles
        if (state.active === "For you") {
            fetchArticles("For you");
        }
    }, [fetchArticles, state.active, state.sources]);

    const handleMenuClick = useCallback((item) => {
        setState(prev => ({
            ...prev,
            active: item,
            currentPage: 1, // Reset page when changing category
            articles: [] // Clear existing articles
        }));
        navigate(`?category=${item}`);
        fetchArticles(item, "", 1, false); // Reset to first page
    }, [fetchArticles, navigate]);

    const searchTimeout = useRef(null);

    const handleSearch = useCallback((value) => {
        setState(prev => ({
            ...prev,
            search: value,
            currentPage: 1 // Reset page on new search
        }));

        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }

        searchTimeout.current = setTimeout(() => {
            if (value.length >= 3) {
                fetchArticles(state.active, value, 1, false);
            } else if (!value) {
                fetchArticles(state.active, "", 1, false);
            }
        }, 500);
    }, [state.active, fetchArticles]);



    useEffect(() => {
        return () => {
            if (searchTimeout.current) {
                clearTimeout(searchTimeout.current);
            }
        };
    }, []);


    useEffect(() => {
        const category = searchParams.get('category');
        if (category) {
            setState(prev => ({ ...prev, active: category }));
            fetchArticles(category);
        }
    }, [location.search, fetchArticles]);


    useEffect(() => {
        Promise.all([
            fetchArticles(state.active),
            fetchSources()
        ]);
    }, [fetchArticles, fetchSources, state.active]);


    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        localStorage.setItem('darkMode', String(darkMode));
    }, [darkMode]);


    const renderLoader = () => {
        if (HORIZONTAL_CATEGORIES.has(state.active)) {
            return (
                <div className="w-full">
                    <HorizontalLoader />
                </div>
            );
        } else {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                        <GridLoader key={index} />
                    ))}
                </div>
            );
        }
    };


    const renderContent = () => {
        if (state.error) {
            return <EmptyScreen message={state.error} />;
        }

        if (state.isLoading) {
            return renderLoader();
        }

        const validArticles = state.articles?.filter(article => article?.content !== "[Removed]") || [];

        if (!validArticles.length) {
            return <EmptyScreen message={`No articles found for ${state.active}`} />;
        }

        return (
            <div>
                <AnimatePresence mode="wait" initial={false}>
                    <ContentContainer
                        key={`${state.active}-${state.currentPage}`}
                        isHorizontal={HORIZONTAL_CATEGORIES.has(state.active)}
                    >
                        {validArticles.map((article, index) => (
                            HORIZONTAL_CATEGORIES.has(state.active) ? (
                                <HorizontalArticle
                                    key={`${article.url}-${index}`}
                                    article={article}
                                />
                            ) : (
                                <motion.div
                                    key={`${article.url}-${index}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2, delay: index * 0.05 }}
                                >
                                    <ArticleCard article={article} />
                                </motion.div>
                            )
                        ))}
                    </ContentContainer>
                </AnimatePresence>

                {state.isLoadingMore && (
                    <div className="mt-8">
                        {renderLoader()}
                    </div>
                )}
                
                {state.hasMore && !state.error && !state.isLoadingMore && (
                    <div className="flex justify-center mt-8 mb-8">
                        <button
                            onClick={handleLoadMore}
                            disabled={state.isLoadingMore}
                            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50"
                        >
                            Load More
                        </button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            <NavBar
                search={state.search}
                onSearchChange={handleSearch}
                setIsPreferenceModalOpen={(val) =>
                    setState(prev => ({ ...prev, isPreferenceModalOpen: val }))}
                setIsFilterModelOpen={(val) =>
                    setState(prev => ({ ...prev, isFilterModelOpen: val }))}
            />
            <div className="flex items-center mt-10 w-[70%] mx-auto">
                <ul className="flex items-center justify-between w-full">
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
            </div>
            <div className="w-full bg-gray-900 min-h-screen text-white">
                <div className="w-[80%] mx-auto flex justify-between items-center pt-7">
                    <PageHeader today={today} />
                </div>
                <motion.div
                    className="rounded-[10px] bg-gray-800 mt-10 w-[80%] p-6 mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-xl font-semibold mb-4">{state.active} News</h2>
                    {renderContent()}
                </motion.div>
                <Source sources={state.sources} />
            </div>

            {state.isPreferenceModalOpen && (
                <Preference
                    sources={state.sources}
                    setIsPreferenceModalOpen={(val) =>
                        setState(prev => ({ ...prev, isPreferenceModalOpen: val }))}
                    onSavePreferences={updateUserPreferences}
                    initialPreferences={state.userPreferences}
                    setState={setState}
                />
            )}
            {state.isFilterModelOpen && (
                <Filter
                    isFilterModelOpen={state.isFilterModelOpen}
                    setIsFilterModelOpen={(val) =>
                        setState(prev => ({ ...prev, isFilterModelOpen: val }))}
                />
            )}
            <Footer />
        </>
    );
}

export default MainPage;
import { useEffect, useRef, useState } from "react";
import { PREFERENCE_CATEGORY_ITEMS } from "../../constants/constant";
import { useDispatch, useSelector } from "react-redux";
import { setIsPreferenceModalOpen } from "../../redux/navbarSlice";
import { motion, AnimatePresence } from "framer-motion";

function Preference() {
    const dispatch = useDispatch();
    const modalRef = useRef();
    const [selectedTopics, setSelectedTopics] = useState([]);

    const isPreferenceModalOpen = useSelector((state) => state.navBar.isPreferenceModalOpen);

    const { list: sources, isLoading, error } = useSelector((state) => state.sources);

    const categories = [
        {
            title: "Sources",
            icon: "🌍",
            topics: sources.length ? sources.map((source) => source.name) : ["BBC News"],
        },
        {
            title: "Categories",
            icon: "🎭",
            topics: PREFERENCE_CATEGORY_ITEMS
        },
    ];

    const toggleTopic = (topic) => {
        setSelectedTopics((prevSelected) =>
            prevSelected.includes(topic)
                ? prevSelected.filter((t) => t !== topic)
                : [...prevSelected, topic]
        );
    };

    const handleClose = () => {
        dispatch(setIsPreferenceModalOpen(!isPreferenceModalOpen));
    };

    const handleSaveAndClose = () => {
        onSavePreferences(selectedTopics);
        setState(prev => ({ ...prev, active: "For you" }));
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                handleClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <AnimatePresence>
            {isPreferenceModalOpen && (
                <motion.div
                    className='bg-[#3931313b] pointer-events-auto w-full h-screen absolute top-0 flex flex-col items-center justify-center z-[999]'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        ref={modalRef}
                        className='w-[800px] h-auto mx-auto bg-[#4d505c] rounded-[14px] relative p-6'
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                        transition={{
                            duration: 0.6,  // Increase duration for smoother closing
                        }}
                    >
                        <img
                            src="/public/Images/close.svg"
                            className="absolute top-5 right-5 w-5 h-5 cursor-pointer bg-white rounded-full"
                            data-testid="close-btn"
                            onClick={handleClose}
                        />
                        <p className='text-left text-3xl text-[#FFFFFF] font-semibold'>Customise your topics</p>
                        <p className='font-normal text-lg text-[#FFFFFF] mt-2 text-left break-words'>
                            Choose and manage up to 12 topics for your homepage. They'll also appear under topics that you follow.
                        </p>
                        <div className="border-y border-white w-full flex items-start">
                            <div className="w-[60%] broder-r border-white pr-4 py-4">
                                <div className="space-y-6 pr-2 overflow-auto h-customh1 scrollbar_gray">
                                    {categories.map((category) => (
                                        <div key={category.title} className="p-4 bg-gray-700 rounded-lg shadow-md">
                                            <h3 className="flex items-center mb-4 font-semibold">
                                                <span className="text-xl mr-2">{category.icon}</span>
                                                {category.title}
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {category.topics.map((topic) => (
                                                    <button
                                                        key={topic}
                                                        onClick={() => toggleTopic(topic)}
                                                        className={`px-3 py-1 text-sm rounded-lg ${selectedTopics.includes(topic)
                                                            ? "bg-blue-600 text-white"
                                                            : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                                                            }`}
                                                    >
                                                        {topic}
                                                        {selectedTopics.includes(topic) && (
                                                            <span className="ml-2 text-gray-100">×</span>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="w-[40%] py-4">
                                <div className="w-full p-4 bg-gray-700 rounded-lg shadow-md">
                                    <h2 className="text-lg font-bold mb-4">Selected Topics</h2>
                                    <ul className="space-y-2">
                                        {selectedTopics.length > 0 ? (
                                            selectedTopics.map((topic) => (
                                                <li key={topic} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                                                    {topic}
                                                </li>
                                            ))
                                        ) : (
                                            <p className="text-gray-400">No topics selected</p>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-between w-full items-center">
                            <button
                                onClick={() => setSelectedTopics([])}
                                className="text-sm text-gray-300 hover:text-white"
                            >
                                Reset to default
                            </button>
                            <div className="flex space-x-2">
                                <button
                                    onClick={handleClose}
                                    className="bg-gray-600 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveAndClose}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
                                >
                                    Save and close
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default Preference;

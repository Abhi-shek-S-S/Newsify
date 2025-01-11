import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  setSelectedCategories,
  setSelectedSources,
  fetchEverythingByCategory,
  fetchTopHeadlinesBySource,
  resetSelections,
} from "../../redux/preferenceSlice.js";
import { setIsPreferenceModalOpen } from "../../redux/navbarSlice";
import { PREFERENCE_CATEGORY_ITEMS } from "../../constants/constant";

function Preference() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalRef = useRef();

  // Get state from Redux
  const selectedCategories = useSelector((state) => state.preferences.selectedCategories);
  const selectedSources = useSelector((state) => state.preferences.selectedSources);
  const isPreferenceModalOpen = useSelector((state) => state.navBar.isPreferenceModalOpen);
  const { list: sources } = useSelector((state) => state.sources);

  // Local state for tracking temporary selections
  const [tempCategories, setTempCategories] = useState(selectedCategories);
  const [tempSources, setTempSources] = useState(selectedSources);
  const [loading, setLoading] = useState(false);

  // Reset temporary selections when modal opens
  useEffect(() => {
    if (isPreferenceModalOpen) {
      setTempCategories(selectedCategories);
      setTempSources(selectedSources);
    }
  }, [isPreferenceModalOpen]);

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Define categories and sources for the modal
  const categories = [
    {
      title: "Sources",
      icon: "🌍",
      topics: sources.length ? sources.map((source) => source.name) : ["BBC News"],
      type: "sources"
    },
    {
      title: "Categories",
      icon: "🎭",
      topics: PREFERENCE_CATEGORY_ITEMS,
      type: "categories"
    },
  ];

  const toggleTopic = (topic, type) => {
    if (type === "categories") {
      setTempCategories(prev => 
        prev.includes(topic)
          ? prev.filter(t => t !== topic)
          : [...prev, topic]
      );
    } else {
      setTempSources(prev =>
        prev.includes(topic)
          ? prev.filter(t => t !== topic)
          : [...prev, topic]
      );
    }
  };

  const handleSaveAndClose = async () => {
    setLoading(true);
    try {
      // Only make API calls if there are selections
      const promises = [];
      
      if (tempCategories.length > 0) {
        promises.push(dispatch(fetchEverythingByCategory(tempCategories)).unwrap());
      }
      
      if (tempSources.length > 0) {
        promises.push(dispatch(fetchTopHeadlinesBySource(tempSources)).unwrap());
      }

      // Wait for all API calls to complete
      if (promises.length > 0) {
        await Promise.all(promises);
      }

      // Update Redux state with new selections
      dispatch(setSelectedCategories(tempCategories));
      dispatch(setSelectedSources(tempSources));

      // Navigate and close modal
      navigate("/for-you");
      dispatch(setIsPreferenceModalOpen(false));
    } catch (error) {
      console.error("Error saving preferences:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTempCategories([]);
    setTempSources([]);
    dispatch(resetSelections());
    dispatch(setIsPreferenceModalOpen(false));
  };

  const handleClose = () => {
    // Reset temp selections to current selections when closing without saving
    setTempCategories(selectedCategories);
    setTempSources(selectedSources);
    dispatch(setIsPreferenceModalOpen(false));
  };

  return (
    <AnimatePresence>
      {isPreferenceModalOpen && (
        <motion.div
          className="bg-[#3931313b] pointer-events-auto fixed w-full h-screen top-0 left-0 flex items-center justify-center z-[999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            ref={modalRef}
            className="w-[800px] max-h-[90vh] bg-[#4d505c] rounded-[14px] relative p-6 overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              onClick={handleClose}
              aria-label="Close modal"
            >
              <img
                src="/public/Images/close.svg"
                className="w-5 h-5"
                alt="Close"
              />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <h2 className="text-3xl text-white font-semibold">
                Customize your topics
              </h2>
              <p className="text-lg text-white/80 mt-2">
                Choose and manage up to 12 topics for your homepage. They'll also appear under topics that you follow.
              </p>
            </div>

            {/* Modal Content */}
            <div className="flex border-t border-b border-white/20">
              {/* Selection Section */}
              <div className="w-[60%] border-r border-white/20 pr-4 py-4">
                <div className="space-y-6 pr-2 overflow-y-auto max-h-[50vh] scrollbar-thin scrollbar-thumb-white/20">
                  {categories.map((category) => (
                    <div
                      key={category.title}
                      className="p-4 bg-gray-700/50 rounded-lg"
                    >
                      <h3 className="flex items-center mb-4 text-white font-semibold">
                        <span className="text-xl mr-2">{category.icon}</span>
                        {category.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {category.topics.map((topic) => (
                          <button
                            key={topic}
                            onClick={() => toggleTopic(topic, category.type)}
                            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                              (category.type === "categories" 
                                ? tempCategories.includes(topic)
                                : tempSources.includes(topic))
                                ? "bg-blue-600 text-white"
                                : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                            }`}
                          >
                            {topic}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selected Topics Section */}
              <div className="w-[40%] p-4">
                <div className="bg-gray-700/50 rounded-lg p-4 h-full">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Selected Topics
                  </h3>
                  <div className="space-y-6">
                    {/* Selected Categories */}
                    {tempCategories.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-white/80 mb-2">
                          Categories
                        </h4>
                        <div className="space-y-2">
                          {tempCategories.map((category) => (
                            <div
                              key={category}
                              className="flex items-center justify-between bg-blue-600 text-white px-3 py-2 rounded-lg"
                            >
                              <span>{category}</span>
                              <button
                                onClick={() => toggleTopic(category, "categories")}
                                className="text-white/80 hover:text-white"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Selected Sources */}
                    {tempSources.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-white/80 mb-2">
                          Sources
                        </h4>
                        <div className="space-y-2">
                          {tempSources.map((source) => (
                            <div
                              key={source}
                              className="flex items-center justify-between bg-blue-600 text-white px-3 py-2 rounded-lg"
                            >
                              <span>{source}</span>
                              <button
                                onClick={() => toggleTopic(source, "sources")}
                                className="text-white/80 hover:text-white"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {tempCategories.length === 0 && tempSources.length === 0 && (
                      <p className="text-gray-400 text-center py-4">
                        No topics selected
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={handleReset}
                className="text-sm text-white/60 hover:text-white transition-colors"
                disabled={loading}
              >
                Reset to default
              </button>
              <div className="flex space-x-3">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 rounded-lg bg-gray-600 text-white/80 hover:bg-gray-500 transition-colors disabled:opacity-50"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAndClose}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    "Save and close"
                  )}
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
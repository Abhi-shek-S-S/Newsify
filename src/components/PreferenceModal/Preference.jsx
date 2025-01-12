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



  /**
   * The `toggleTopic` function toggles a topic in either categories or sources based on the type provided.
   */
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


  /**
   * The function `handleSaveAndClose` asynchronously saves user preferences, fetches data based on
   * selected categories and sources, updates state, and navigates to a new page.
   */
  const handleSaveAndClose = async () => {
    setLoading(true);
    try {
      const promises = [];

      if (tempCategories.length > 0) {
        promises.push(dispatch(fetchEverythingByCategory(tempCategories)).unwrap());
      }

      if (tempSources.length > 0) {
        promises.push(dispatch(fetchTopHeadlinesBySource(tempSources)).unwrap());
      }

      if (promises.length > 0) {
        await Promise.all(promises);
      }

      dispatch(setSelectedCategories(tempCategories));
      dispatch(setSelectedSources(tempSources));

      navigate("/for-you");
      dispatch(setIsPreferenceModalOpen(false));
    } catch (error) {
      console.error("Error saving preferences:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * The `handleReset` function resets certain state variables, dispatches actions, closes a modal, and
   * navigates to a specific page.
   */
  const handleReset = () => {
    setTempCategories([]);
    setTempSources([]);
    dispatch(resetSelections());
    dispatch(setIsPreferenceModalOpen(false));
    navigate("/for-you");
  };

  /**
   * The `handleClose` function saves the selected categories and sources, then closes the preference
   * modal.
   */
  const handleClose = () => {
    setTempCategories(selectedCategories);
    setTempSources(selectedSources);
    dispatch(setIsPreferenceModalOpen(false));
  };


  /* The above code is a React useEffect hook that is used to manage the overflow style of the document
  body based on the state variable `isPreferenceModalOpen`. When the `isPreferenceModalOpen` state
  is true, it sets the body's overflow style to "hidden" to prevent scrolling. When the state is
  false, it resets the body's overflow style to its default value. The useEffect hook is triggered
  whenever the `isPreferenceModalOpen` state changes. */
  useEffect(() => {
    if (isPreferenceModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isPreferenceModalOpen]);


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
            className="lg:w-[800px] md:w-[680px] sm:w-[600px] w-[400px] max-h-[90vh] bg-[#4d505c] rounded-[14px] relative lg:p-6 p-3"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              onClick={handleClose}
              aria-label="Close modal"
            >
              <img
                src="/Images/close.svg"
                className="w-5 h-5"
                alt="Close"
              />
            </button>
            <div className="mb-6">
              <h2 className="text-3xl text-white font-semibold">
                Customize your topics
              </h2>
              <p className="text-lg text-white/80 mt-2">
                Choose and manage topics for your page.
              </p>
            </div>

            <div className="flex md:flex-row flex-col border-t border-b border-white/20 overflow-auto sm:h-customh8 h-customh9 scrollbar-gray">
              <div className="md:w-[60%] w-full border-r border-white/20 pr-4 py-4">
                <div className="space-y-6 pr-2 overflow-y-auto h-customh7 scrollbar_gray">
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
                            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${(category.type === "categories"
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
              <div className="md:w-[40%] w-full md:p-4 p-0">
                <div className="bg-gray-700/50 rounded-lg p-4 h-full">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Selected Topics
                  </h3>
                  <div className="space-y-6">
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
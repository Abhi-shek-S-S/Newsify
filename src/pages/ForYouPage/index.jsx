import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryHeadlines from "./Components/CategoryHeadlines";
import SourceHeadlines from "./Components/SourcesHeadlines";
import { 
  fetchEverythingByCategory, 
  fetchTopHeadlinesBySource 
} from "../../redux/preferenceSlice";

const ForYouPage = () => {
  const dispatch = useDispatch();

  // Get category and source data from the Redux store using the new state structure
  const categoryResults = useSelector((state) => state.preferences.categoryResults);
  const sourceResults = useSelector((state) => state.preferences.sourceResults);
  const selectedCategories = useSelector((state) => state.preferences.selectedCategories);
  const selectedSources = useSelector((state) => state.preferences.selectedSources);

  useEffect(() => {
    // Reset results if no selections
    if (selectedCategories.length === 0 && selectedSources.length === 0) {
      dispatch({ type: 'preferences/resetCategoryResults' });
      dispatch({ type: 'preferences/resetSourceResults' });
      return;
    }

    // Function to fetch data
    const fetchData = async () => {
      try {
        // Fetch category results if categories are selected
        if (selectedCategories.length > 0) {
          await dispatch(fetchEverythingByCategory(selectedCategories)).unwrap();
        }

        // Fetch source results if sources are selected
        if (selectedSources.length > 0) {
          await dispatch(fetchTopHeadlinesBySource(selectedSources)).unwrap();
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchData();
  }, [dispatch, selectedCategories, selectedSources]);

  // Check if any content is selected
  const hasSelections = selectedCategories.length > 0 || selectedSources.length > 0;
  
  // Check if we have any results
  const hasCategoryResults = categoryResults && categoryResults.length > 0;
  const hasSourceResults = sourceResults && sourceResults.length > 0;

  return (
    <div className="p-4 xl:w-[70%] w-[95%] mx-auto">
      <p className="text-3xl font-bold mb-3 text-white">For You</p>

      {!hasSelections ? (
        <p className="text-xl text-white">
          No topics selected. Please choose topics to see relevant stories.
        </p>
      ) : (
        <div className="space-y-8">
          {/* Category Headlines */}
          {selectedCategories.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 text-white">Top Stories by Category</h2>
              {hasCategoryResults ? (
                <CategoryHeadlines articles={categoryResults} />
              ) : (
                <p className="text-gray-500">Loading category headlines...</p>
              )}
            </div>
          )}

          {/* Source Headlines */}
          {selectedSources.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-white">Top Stories by Source</h2>
              {hasSourceResults ? (
                <SourceHeadlines articles={sourceResults} />
              ) : (
                <p className="text-gray-500">Loading source headlines...</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ForYouPage;
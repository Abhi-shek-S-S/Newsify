import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryHeadlines from "./Components/CategoryHeadlines";
import SourceHeadlines from "./Components/SourcesHeadlines";
import EmptyScreen from "../../components/EmptyScreen";
import { 
  fetchEverythingByCategory, 
  fetchTopHeadlinesBySource 
} from "../../redux/preferenceSlice";

const ForYouPage = () => {
  const dispatch = useDispatch();

  const categoryResults = useSelector((state) => state.preferences.categoryResults);
  const sourceResults = useSelector((state) => state.preferences.sourceResults);
  const selectedCategories = useSelector((state) => state.preferences.selectedCategories);
  const selectedSources = useSelector((state) => state.preferences.selectedSources);
  const error = useSelector((state) => state.preferences.error);
  const loading = useSelector((state) => state.preferences.loading);

  useEffect(() => {
    if (selectedCategories.length === 0 && selectedSources.length === 0) {
      dispatch({ type: 'preferences/resetCategoryResults' });
      dispatch({ type: 'preferences/resetSourceResults' });
      return;
    }

    const fetchData = async () => {
      try {
        if (selectedCategories.length > 0) {
          await dispatch(fetchEverythingByCategory(selectedCategories)).unwrap();
        }

        if (selectedSources.length > 0) {
          await dispatch(fetchTopHeadlinesBySource(selectedSources)).unwrap();
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchData();
  }, [dispatch, selectedCategories, selectedSources]);

  const hasSelections = selectedCategories.length > 0 || selectedSources.length > 0;
  const hasCategoryResults = categoryResults && categoryResults.length > 0;
  const hasSourceResults = sourceResults && sourceResults.length > 0;


  // Function to render content based on state
  const renderContent = () => {
    if (!hasSelections) {
      return (
        <p className="text-xl text-white">
          No topics selected. Please choose topics to see relevant stories.
        </p>
      );
    }

    if (error) {
      return (
        <EmptyScreen message={`Failed to fetch articles: ${error}`}/>
      );
    }

    if (loading) {
      return (
        <div className="text-white text-lg">
          Loading your personalized news feed...
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {/* Category Headlines */}
        {selectedCategories.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Top Stories by Category</h2>
            {hasCategoryResults ? (
              <CategoryHeadlines articles={categoryResults} />
            ) : (
              <p className="text-gray-500">No category headlines available.</p>
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
              <p className="text-gray-500">No source headlines available.</p>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 xl:w-[70%] w-[95%] mx-auto">
      <p className="text-3xl font-bold mb-3 text-white">For You</p>
      {renderContent()}
    </div>
  );
};

export default ForYouPage;
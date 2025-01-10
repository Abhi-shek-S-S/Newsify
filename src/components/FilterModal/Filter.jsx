import { useState } from "react";

function Filter({ isFilterModelOpen, setIsFilterModelOpen, applyFilters }) {
  const [dateChecked, setDateChecked] = useState(false);
  const [categoriesChecked, setCategoriesChecked] = useState(false);
  const [sourcesChecked, setSourcesChecked] = useState(false);
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    categories: [],
    sources: [],
  });

  const handleCheckboxChange = (type, value) => {
    setFilters((prev) => {
      const list = prev[type];
      return {
        ...prev,
        [type]: list.includes(value)
          ? list.filter((item) => item !== value)
          : [...list, value],
      };
    });
  };

  const handleCloseFilter = () => {
    setIsFilterModelOpen(false);
  };

  const handleApplyFilters = () => {
    applyFilters(filters);
    handleCloseFilter();
  };

  return (
    isFilterModelOpen && (
      <div className="fixed top-0 right-0 w-[25%] h-full bg-gray-100 shadow-lg p-6 z-50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Filter By</h2>
          <img
            src="/public/Images/close.svg"
            alt="close"
            className="w-8 h-8 cursor-pointer"
            onClick={handleCloseFilter}
          />
        </div>

        {/* Date Filter */}
        <div className="mb-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={dateChecked}
              onChange={() => setDateChecked(!dateChecked)}
              className="form-checkbox"
            />
            <span>Date</span>
          </label>
          {dateChecked && (
            <div className="mt-2 space-y-2">
              <input
                type="date"
                value={filters.from}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, from: e.target.value }))
                }
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
              <input
                type="date"
                value={filters.to}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, to: e.target.value }))
                }
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>
          )}
        </div>

        {/* Categories Filter */}
        <div className="mb-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={categoriesChecked}
              onChange={() => setCategoriesChecked(!categoriesChecked)}
              className="form-checkbox"
            />
            <span>Categories</span>
          </label>
          {categoriesChecked && (
            <div className="mt-2 space-y-2">
              {["News", "Sports", "Entertainment"].map((category) => (
                <label
                  key={category}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    onChange={() =>
                      handleCheckboxChange("categories", category.toLowerCase())
                    }
                    className="form-checkbox"
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Sources Filter */}
        <div className="mb-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={sourcesChecked}
              onChange={() => setSourcesChecked(!sourcesChecked)}
              className="form-checkbox"
            />
            <span>Source</span>
          </label>
          {sourcesChecked && (
            <div className="mt-2 space-y-2">
              {["BBC", "CNN", "Reuters"].map((source) => (
                <label
                  key={source}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    onChange={() =>
                      handleCheckboxChange("sources", source.toLowerCase())
                    }
                    className="form-checkbox"
                  />
                  <span>{source}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={handleCloseFilter}
            className="px-6 py-3 rounded-lg bg-white text-black font-medium border border-black hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleApplyFilters}
            className="px-6 py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800"
          >
            Apply Filter
          </button>
        </div>
      </div>
    )
  );
}

export default Filter;

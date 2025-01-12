import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, Calendar, X } from 'lucide-react';

const EnhancedSearchBar = ({ onSearch, value, onChange, onClear, initialDates = {} }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [fromDate, setFromDate] = useState(initialDates.fromDate || '');
  const [toDate, setToDate] = useState(initialDates.toDate || '');
  const dropdownRef = useRef(null);
  
  // Update dates when initialDates changes (e.g., from URL)
  useEffect(() => {
    setFromDate(initialDates.fromDate || '');
    setToDate(initialDates.toDate || '');
  }, [initialDates]);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (inputValue) => {
    onChange(inputValue);
    if (inputValue.trim() && !isDropdownOpen) {
      setIsDropdownOpen(true);
    }
    // If search input is cleared, trigger onClear
    if (!inputValue.trim()) {
      handleClear();
    }
  };

  const handleDateChange = (dateType, value) => {
    if (dateType === 'from') {
      setFromDate(value);
      if (toDate && new Date(value) > new Date(toDate)) {
        setToDate(value);
      }
    } else {
      setToDate(value);
      if (fromDate && new Date(value) < new Date(fromDate)) {
        setFromDate(value);
      }
    }
  };

  const handleClear = () => {
    onChange('');
    setFromDate('');
    setToDate('');
    setIsDropdownOpen(false);
    onClear();
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="flex w-full p-3 items-center gap-2 dark:bg-gray-700 dark:border-gray-600 border rounded-md">
        <input
          type="text"
          placeholder="Search articles, locations and sources..."
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          className="w-full focus:outline-none dark:bg-gray-700 text-white"
        />
        {value && (
          <button
            className="p-1 hover:bg-gray-600 rounded-md"
            onClick={handleClear}
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        )}
        <button
          className="p-1 hover:bg-gray-600 rounded-md"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {isDropdownOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>
      </div>

      {isDropdownOpen && (
        <div className="absolute top-full left-0 w-full mt-2 p-4 bg-gray-700 border border-gray-600 rounded-md shadow-lg z-50">
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="text-white text-sm">From Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => handleDateChange('from', e.target.value)}
                  max={toDate || undefined}
                  className="w-full pl-10 p-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-white text-sm">To Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => handleDateChange('to', e.target.value)}
                  min={fromDate || undefined}
                  className="w-full pl-10 p-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onSearch({
                    searchTerm: value,
                    fromDate,
                    toDate
                  });
                  setIsDropdownOpen(false);
                }}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200 flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
              <button
                onClick={handleClear}
                className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded-md transition duration-200 flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedSearchBar;
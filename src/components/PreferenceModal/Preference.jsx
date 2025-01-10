import { useEffect, useRef, useState } from "react";

function Preference({ setIsPreferenceModalOpen, sources, onSavePreferences, initialPreferences, setState }) {
    const modalRef = useRef();
    const initialSelectedTopics = [
        ...(initialPreferences.sources || []),
        ...(initialPreferences.categories || []),
        ...(initialPreferences.authors || [])
    ];
    const [selectedTopics, setSelectedTopics] = useState(initialSelectedTopics);
    const categories = [
        {
            title: "Sources",
            icon: "🌍",
            topics: ["BBC News"],
        },
        {
            title: "Categories",
            icon: "🎭",
            topics: ["Entertainment", "Celebrities", "TV", "Music", "Movies", "Theatre"],
        },
        {
            title: "Authors",
            icon: "⚽",
            topics: [
                "Sports",
                "Football",
                "Cycling",
                "Motor sports",
                "Tennis",
                "Combat sports",
                "Basketball",
                "Baseball",
                "American football",
                "Sports betting",
                "Water sports",
                "Hockey",
                "Golf",
                "Cricket",
                "Rugby",
            ],
        },
    ];

    // Fixed toggleTopic function
    const toggleTopic = (topic) => {
        setSelectedTopics((prevSelected) =>
            prevSelected.includes(topic)
                ? prevSelected.filter((t) => t !== topic) // Fixed: Using filter instead of Preference
                : [...prevSelected, topic]
        );
    };

    const handleClose = () => {
        setIsPreferenceModalOpen(false);
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
        <div className='bg-[#3931313b] pointer-events-auto w-full h-screen absolute top-0 flex flex-col items-center justify-center z-[999]'>
            <div ref={modalRef} className='w-[800px] h-auto mx-auto bg-[#4d505c] rounded-[14px] relative p-6 '>
                <img src="/public/Images/close.svg" className="absolute top-5 right-5 w-5 h-5 cursor-pointer bg-white rounded-full" data-testid="close-btn" onClick={handleClose} />
                <p className='text-left text-3xl text-[#FFFFFF] font-semibold'>Customise your topics</p>
                <p className='font-normal text-lg text-[#FFFFFF] mt-2 text-left break-words'>Choose and manage up to 12 topics for your homepage. They'll also appear under topics that you follow.</p>
                <div className="border-y border-white w-full flex items-start">
                    <div className="w-[60%] broder-r border-white pr-4 py-4">
                        <div className="space-y-6 pr-2 overflow-auto h-customh1 scrollbar_gray">
                            {categories.map((category) => (
                                <div
                                    key={category.title}
                                    className="p-4 bg-gray-700 rounded-lg shadow-md"
                                >
                                    <h3 className="flex items-center mb-4 font-semibold">
                                        <span className="text-xl mr-2">{category.icon}</span>
                                        {category.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {category.topics.map((topic) => (
                                            <button
                                                key={topic}
                                                onClick={() => toggleTopic(topic)}
                                                className={`px-3 py-1 text-sm rounded-lg ${
                                                    selectedTopics.includes(topic)
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
                                        <li
                                            key={topic}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                                        >
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
                            onClick={() => setIsPreferenceModalOpen(false)}
                            className="bg-gray-600 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-500">
                            Cancel
                        </button>
                        <button 
                            onClick={handleSaveAndClose}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500">
                            Save and close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Preference;
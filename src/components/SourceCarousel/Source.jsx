import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Source = ({ sources = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerView = 4;
    const maxIndex = Math.max(0, Math.ceil(sources.length / itemsPerView) - 1);

    const handlePrev = useCallback(() => {
        setCurrentIndex(prev => Math.max(0, prev - 1));
    }, []);

    const handleNext = useCallback(() => {
        setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
    }, [maxIndex]);

    const SourceCard = useCallback(({ source }) => (
        <div className="flex-shrink-0 lg:w-1/4 max-w-[260px] m-2 p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-300">
            <div className="h-48 flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-bold text-white mb-2">{source.name}</h3>
                    <p className="text-sm text-gray-300 line-clamp-3">{source.description}</p>
                </div>
                <div className="mt-4">
                    <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                        {source.category}
                    </span>
                    <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 text-blue-400 hover:text-blue-300 text-sm block"
                    >
                        Visit Source →
                    </a>
                </div>
            </div>
        </div>
    ), []);

    if (!sources.length) return null;

    return (
        <div className="relative xl:w-[80%] w-full mx-auto bg-gray-900 p-4 rounded-lg mt-8">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h2 className="text-white sm:text-2xl text-lg font-bold">Sources</h2>
                    <p className="text-gray-400 text-sm">Top news sources for you</p>
                </div>
            </div>

            <div className="relative overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{
                        transform: `translateX(-${currentIndex * 25}%)`
                    }}
                >
                    {sources.map((source, index) => (
                        <SourceCard key={source.id || index} source={source} />
                    ))}
                </div>
            </div>

            {currentIndex > 0 && (
                <button
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
                    aria-label="Previous"
                >
                    <ChevronLeft size={24} />
                </button>
            )}

            {currentIndex < maxIndex && (
                <button
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
                    aria-label="Next"
                >
                    <ChevronRight size={24} />
                </button>
            )}
        </div>
    );
};

export default Source;
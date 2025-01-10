// Grid loader component
const GridLoader = () => (
    <div className="bg-gray-700 rounded-lg p-4 animate-pulse">
        <div className="h-48 bg-gray-600 rounded-lg mb-4"></div>
        <div className="space-y-3">
            <div className="h-6 bg-gray-600 rounded"></div>
            <div className="h-4 bg-gray-600 rounded w-5/6"></div>
            <div className="h-4 bg-gray-600 rounded w-4/6"></div>
        </div>
    </div>
);

export default GridLoader;
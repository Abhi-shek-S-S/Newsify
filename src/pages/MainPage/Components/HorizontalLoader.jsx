// Horizontal shimmer loader component
const HorizontalLoader = () => (
    <div className="flex gap-6 bg-gray-700 rounded-lg p-4 animate-pulse">
        <div className="w-1/3 h-48 bg-gray-600 rounded-lg"></div>
        <div className="w-2/3 flex flex-col justify-between">
            <div className="space-y-4">
                <div className="h-6 bg-gray-600 rounded w-3/4"></div>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-600 rounded"></div>
                    <div className="h-4 bg-gray-600 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-600 rounded w-4/6"></div>
                </div>
            </div>
            <div className="flex justify-between items-center mt-4">
                <div className="h-4 bg-gray-600 rounded w-24"></div>
                <div className="h-8 bg-gray-600 rounded w-24"></div>
            </div>
        </div>
    </div>
);

export default HorizontalLoader;
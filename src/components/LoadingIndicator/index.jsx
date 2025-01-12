
const LoadingShimmer = ({ count = 1 }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="bg-gray-800 rounded-lg p-4 shadow-md animate-pulse mb-4"
                >
                    <div className="flex space-x-4">
                        <div className="w-1/3 h-48 bg-gray-700 rounded"></div>
                        <div className="flex-1 space-y-3">
                            <div className="h-6 bg-gray-700 rounded w-1/2"></div>
                            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-700 rounded w-full"></div>
                            <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                            <div className="h-3 bg-gray-700 rounded w-1/4"></div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default LoadingShimmer;

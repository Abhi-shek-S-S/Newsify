
const LoadingShimmer = () => {
    return (
        <div className="bg-gray-800 rounded-lg p-4 shadow-md animate-pulse">
            <div className="h-48 bg-gray-700 rounded mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-3"></div>
            <div className="h-3 bg-gray-700 rounded w-1/2"></div>
        </div>
    )
}

export default LoadingShimmer

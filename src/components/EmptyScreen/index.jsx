/* eslint-disable react/prop-types */

const EmptyScreen = ({message}) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="w-24 h-24 mb-4 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2" />
                </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-400 mb-2">No articles found</h3>
            <p className="text-gray-500">{message}</p>
        </div>
    )
}

export default EmptyScreen

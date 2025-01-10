/* eslint-disable react/prop-types */
import { Search, Sun, Moon } from 'lucide-react';

function NavBar({ search, onSearchChange, onDarkModeChange, darkMode, setIsPreferenceModalOpen, setIsFilterModelOpen }) {

    return (
        <div className='sticky top-0 mx-auto p-6 shadow-lg bg-gray-800 w-full'>
            <div className="w-full flex items-center justify-between">
                <div className="w-[25%] flex items-center">
                    <img src="/public/Images/logo .webp" className='w-20 h-20 mr-4 ' alt="logo" />
                    <p className="text-white font-extrabold text-[37px] break-words flex flex-col">INSIGHT TIMES </p>
                </div>
                <div className="w-[55%]">
                    <div className="flex w-full p-[13px] items-center justify-end gap-2 flex-1 dark:bg-gray-700 dark:border-gray-600 border rounded-md">
                        <Search className="w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search articles, locations and sources..."
                            value={search}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className=" w-full focus:outline-none dark:bg-gray-700 "
                        />
                    </div>
                </div>
                <div className="w-[20%] flex items-center justify-end">
                    <button type='button'
                        title='Preference'
                        onClick={() => { setIsFilterModelOpen(true) }}
                        className='cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" alt="Preference" className='bg-white rounded-full p-3 cursor-pointer w-12 h-12 '>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                        </svg>
                    </button>
                    <button type='button' onClick={() => { setIsPreferenceModalOpen(true) }} className=' ml-3 px-6 py-1 rounded-lg flex items-center justify-between text-white text-lg font-normal border-white border'>
                        Preference
                        <img src="/Images/filter.png" alt="Preference" className="p-2 rounded-full w-10 h-10 ml-2" />
                    </button>
                    <button
                        onClick={onDarkModeChange}
                        className="ml-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        {darkMode ? (
                            <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        ) : (
                            <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        )}
                    </button>
                </div>
            </div>
            {/* <div className='flex items-center mt-10 w-[70%] mx-auto'>
                <ul className='flex items-center justify-between w-full'>
                    {menuItems.map((item) => (
                        <li
                            key={item}
                            className={`text-base font-normal cursor-pointer transition duration-300 ease-in-out ${active === item ? "border-b-4 rounded border-blue-500 text-blue-500" : "text-white border-transparent"
                                }`}
                            onClick={() => setActive(item)}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div> */}
        </div>
    )
}

export default NavBar

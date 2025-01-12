import WeatherWidget from '../WeatherWidget';

const PageHeader = ({ today }) => {
    return (
        <div className='flex justify-between items-center sm:w-[80%] w-[90%] mx-auto sm:py-0 py-4 h-[110px]'>
            <div>
                <p className="sm:text-2xl text-lg font-medium text-white">Brief Overview</p>
                <p className="text-sm text-[#DDDDDD] font-normal">{today}</p>
            </div>

            <div>
                <WeatherWidget />
            </div>

        </div>
    )
}

export default PageHeader

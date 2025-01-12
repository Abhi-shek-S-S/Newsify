import { motion } from 'framer-motion';
import WeatherWidget from '../WeatherWidget';

const PageHeader = ({ today }) => {
    return (
        <div className='flex justify-between items-center w-[80%] mx-auto'>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <p className="text-2xl font-medium text-white">Brief Overview</p>
                <p className="text-sm text-[#DDDDDD] font-normal">{today}</p>
            </motion.div>

            <div>
                <WeatherWidget />
            </div>

        </div>
    )
}

export default PageHeader

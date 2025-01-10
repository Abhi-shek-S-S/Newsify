import { motion } from 'framer-motion';

const PageHeader = ({ today }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
    >
        <p className="text-2xl font-medium text-white">Brief Overview</p>
        <p className="text-sm text-[#DDDDDD] font-normal">{today}</p>
    </motion.div>
);

export default PageHeader;
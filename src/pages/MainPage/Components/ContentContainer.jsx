import { motion } from 'framer-motion';


const containerVariants = {
    hidden: { 
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            when: "beforeChildren",
            staggerChildren: 0.1
        }
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.4
        }
    }
};


const ContentContainer = ({ children, isHorizontal }) => (
    <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={isHorizontal ? "space-y-6" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}
    >
        {children}
    </motion.div>
);

export default ContentContainer;

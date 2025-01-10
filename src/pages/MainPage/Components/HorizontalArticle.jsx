import { motion } from 'framer-motion';

const articleVariants = {
    hidden: { 
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: {
            duration: 0.3
        }
    }
};

const HorizontalArticle = ({ article, index }) => (
    <motion.div
        variants={articleVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        custom={index}
        className="w-full bg-gray-700 rounded-lg overflow-hidden hover:bg-gray-600 transition-colors"
    >
        <div className="flex gap-6 p-4">
            <motion.div 
                className="w-1/3 h-48 flex-shrink-0"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
            >
                <img
                    src={article.urlToImage || '/placeholder.jpg'}
                    alt={article.title}
                    className="w-full h-full object-cover rounded-lg"
                    loading="lazy"
                />
            </motion.div>
            <div className="w-2/3 flex flex-col justify-between">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                >
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-gray-300 line-clamp-3">{article.description}</p>
                </motion.div>
                <motion.div 
                    className="flex justify-between items-center mt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                >
                    <span className="text-sm text-gray-400">{article.source?.name}</span>
                    <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Read More
                    </a>
                </motion.div>
            </div>
        </div>
    </motion.div>
);

export default HorizontalArticle;
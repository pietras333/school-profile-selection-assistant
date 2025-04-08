import { motion } from "framer-motion";

const QuestionCard = ({ question, answers, onAnswer, questionKey }) => (
  <motion.div
    key={questionKey} // This ensures the entire question card component remounts and restarts animations
    className="p-8 mt-16 w-1/2 flex flex-col justify-center items-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
  >
    <motion.h2
      className="text-4xl text-center font-bold w-full mb-12 text-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.75, // Slower transition for a smoother effect
        ease: [0.42, 0, 0.58, 1], // Ease out cubic curve for smoothness
      }}
    >
      {question}
    </motion.h2>

    {answers.map((option, idx) => (
      <motion.button
        key={option.text} // Key on the button ensures it triggers animations every time an option is rendered
        className="w-fit p-3 my-2 bg-gray-200 hover:bg-yellow-500 transition-colors duration-200 text-gray-800 font-medium text-xl rounded-2xl hover:cursor-pointer"
        onClick={() => onAnswer(option.points)}
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, delay: idx * 0.1 }} // Staggered animation for answers
      >
        {option.text}
      </motion.button>
    ))}
  </motion.div>
);

export default QuestionCard;

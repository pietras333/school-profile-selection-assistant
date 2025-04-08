import { motion } from "framer-motion";

const ProgressBar = ({ currentQuestionIndex, totalQuestions }) => {
  return (
    <div className="w-full fixed top-0 left-0 py-4 px-4">
      <div className="flex w-full gap-x-2">
        {Array.from({ length: totalQuestions }, (_, idx) => (
          <motion.div
            key={idx}
            className="h-2 bg-blue-500 rounded-xl"
            style={{
              flexGrow: 1,
              margin: "0 1px",
              backgroundColor:
                currentQuestionIndex > idx ? "#ecc94b" : "#e5e7eb",
            }}
            initial={{ backgroundColor: "#e5e7eb" }}
            animate={{
              backgroundColor:
                currentQuestionIndex > idx ? "#ecc94b" : "#e5e7eb",
            }}
            transition={{ duration: 0.5 }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;

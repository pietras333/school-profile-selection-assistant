import { motion } from "framer-motion";

const resultCardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -40,
    scale: 0.95,
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

const ResultCard = ({ result }) => (
  <motion.div
    className="p-8 rounded-lg mt-16 text-center"
    variants={resultCardVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    <h2 className="text-4xl mb-4 font-medium tracking-wide">
      Twój wynik: {result}
    </h2>
    <p className="text-lg">
      Dziękujemy za udział w teście predyspozycji zawodowych!
    </p>
  </motion.div>
);

export default ResultCard;

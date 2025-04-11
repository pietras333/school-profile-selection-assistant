import { useState, useEffect } from "react";
import ProgressBar from "./components/ProgressBar";
import QuestionCard from "./components/QuestionCard";
import ResultCard from "./components/ResultCard";
import questionsData from "./data/questions.json";
import professionsData from "./data/professions.json";
import { FaArrowLeft } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [professions, setProfessions] = useState([]);
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  useEffect(() => {
    setQuestions(questionsData);
    setProfessions(professionsData);
  }, []);

  const handleAnswer = (points) => {
    const updatedAnswers = { ...answers };
    for (let profession in points) {
      updatedAnswers[profession] =
        (updatedAnswers[profession] || 0) + points[profession];
    }
    setAnswers(updatedAnswers);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const getResult = () => {
    if (Object.keys(answers).length === 0) return "";
    const sortedAnswers = professions
      .map((profession) => ({
        profession,
        points: answers[profession] || 0,
      }))
      .sort((a, b) => b.points - a.points);
    return sortedAnswers[0].profession;
  };

  const startQuiz = () => {
    setIsQuizStarted(true);
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const exitQuiz = () => {
    setIsQuizStarted(false);
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  const goBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-gray-100">
      {isQuizStarted && (
        <div className="absolute top-12 left-8">
          {/* Przycisk do cofnięcia się w pytaniu */}
          <button
            onClick={goBack}
            className="p-2 flex gap-x-2 items-center bg-gray-200 text-gray-400 hover:text-gray-600 hover:bg-yellow-500 hover:cursor-pointer transition-colors duration-200 rounded-full"
          >
            <FaArrowLeft size={20} />
            <p className="font-bold max-xl:text-medium max-xl:text-sm tracking-wide uppercase">
              Poprzednie
            </p>
          </button>
        </div>
      )}
      <img
        src="./logo.png"
        alt="Logo"
        className="w-48 h-48 max-xl:w-24 max-xl:h-24 max-xl:opacity-15 opacity-25 absolute top-12 right-8 z-0"
      />
      <img
        src="./logo.png"
        alt="Logo"
        className="w-48 h-48 max-xl:w-24 max-xl:h-24 max-xl:opacity-15 opacity-25 absolute bottom-12 left-8 z-0"
      />
      {/* Pasek postępu */}
      {isQuizStarted && (
        <ProgressBar
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
        />
      )}

      {isQuizStarted && (
        <AnimatePresence mode="wait">
          {currentQuestionIndex < questions.length ? (
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="p-8 mt-16 w-3/4 max-xl:w-full max-xl:mt-0 flex flex-col justify-center items-center"
            >
              <QuestionCard
                question={questions[currentQuestionIndex].question}
                answers={questions[currentQuestionIndex].answers}
                onAnswer={handleAnswer}
              />
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ResultCard result={getResult()} />
            </motion.div>
          )}
        </AnimatePresence>
      )}
      <AnimatePresence mode="wait">
        {!isQuizStarted && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <h1 className="mb-8 max-xl:mb-4 max-xl:p-4 max-xl:text-3xl text-4xl font-medium text-gray-800 text-center">
              Pomocnik Wyboru Profilu Szkolnego - ZST Piła
            </h1>
            <button
              onClick={startQuiz}
              className="w-fit p-3 my-2 bg-gray-200 hover:bg-yellow-500 transition-colors duration-200 text-gray-800 font-medium text-xl rounded-2xl hover:cursor-pointer"
            >
              Rozpocznij quiz
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {currentQuestionIndex === questions.length && isQuizStarted && (
        // Przycisk zakończenia quizu
        <button
          onClick={exitQuiz}
          className="w-fit p-3 MA my-2 bg-gray-200 hover:bg-yellow-500 transition-colors duration-200 text-gray-800 font-medium text-xl rounded-2xl hover:cursor-pointer"
        >
          Zakończ
        </button>
      )}
      <footer className="absolute bottom-0 left-0 w-full max-xl:opacity-25 p-4 text-center">
        <p className="text-gray-500 text-sm max-xl:text-xs mt-4">
          © 2025 Zespół Szkół Technicznych w Pile
        </p>
        <p className="text-gray-500 text-sm max-xl:text-xs">
          Wszelkie prawa zastrzeżone.
        </p>
        <p className="text-gray-500 text-sm max-xl:text-xs">
          Stworzone przez: Lewanda Tomasz, <a href="">Wendt Piotr</a>
        </p>
      </footer>
    </div>
  );
}

export default App;

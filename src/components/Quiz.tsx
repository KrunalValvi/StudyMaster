import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Check, 
  X, 
  Clock, 
  Trophy, 
  Target,
  ChevronRight,
  Brain,
  Zap,
  Award
} from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  subject: string;
}

interface QuizResult {
  questionId: string;
  selectedAnswer: number | null;
  isCorrect: boolean;
  timeSpent: number;
}

const Quiz: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState('Psychology');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  const subjects = ['Psychology', 'Biology', 'History', 'Mathematics', 'Physics'];

  const questions: Question[] = [
    {
      id: '1',
      question: 'What is cognitive dissonance?',
      options: [
        'Mental discomfort from conflicting beliefs',
        'A type of memory disorder',
        'Enhanced cognitive ability',
        'Rapid information processing'
      ],
      correctAnswer: 0,
      explanation: 'Cognitive dissonance occurs when a person holds contradictory beliefs, ideas, or values simultaneously, causing psychological discomfort.',
      difficulty: 'medium',
      subject: 'Psychology'
    },
    {
      id: '2',
      question: 'Which part of the brain processes emotions and fear?',
      options: [
        'Cerebellum',
        'Amygdala',
        'Hippocampus',
        'Frontal cortex'
      ],
      correctAnswer: 1,
      explanation: 'The amygdala is an almond-shaped structure in the limbic system that plays a key role in processing emotions, particularly fear and threat detection.',
      difficulty: 'easy',
      subject: 'Psychology'
    },
    {
      id: '3',
      question: 'What is the process by which plants convert light energy into chemical energy?',
      options: [
        'Cellular respiration',
        'Photosynthesis',
        'Fermentation',
        'Osmosis'
      ],
      correctAnswer: 1,
      explanation: 'Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to produce glucose and oxygen.',
      difficulty: 'easy',
      subject: 'Biology'
    },
    {
      id: '4',
      question: 'Which event triggered World War I?',
      options: [
        'Invasion of Poland',
        'Assassination of Archduke Franz Ferdinand',
        'Attack on Pearl Harbor',
        'Sinking of the Lusitania'
      ],
      correctAnswer: 1,
      explanation: 'The assassination of Archduke Franz Ferdinand of Austria-Hungary on June 28, 1914, was the immediate trigger that led to the outbreak of World War I.',
      difficulty: 'medium',
      subject: 'History'
    },
    {
      id: '5',
      question: 'What is the function of mitochondria in cells?',
      options: [
        'Protein synthesis',
        'DNA storage',
        'Energy production',
        'Waste removal'
      ],
      correctAnswer: 2,
      explanation: 'Mitochondria are known as the powerhouses of the cell because they produce ATP (adenosine triphosphate), which provides energy for cellular processes.',
      difficulty: 'medium',
      subject: 'Biology'
    }
  ];

  const currentQuestions = questions.filter(q => q.subject === selectedSubject);
  const currentQuestion = currentQuestions[currentQuestionIndex];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (quizStarted && !quizCompleted) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizStarted, quizCompleted]);

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizCompleted(false);
    setResults([]);
    setTimeElapsed(0);
    setQuestionStartTime(Date.now());
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);

    const result: QuizResult = {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect,
      timeSpent
    };

    setResults(prev => [...prev, result]);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setQuestionStartTime(Date.now());
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizCompleted(false);
    setResults([]);
    setTimeElapsed(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateScore = () => {
    const correct = results.filter(r => r.isCorrect).length;
    return Math.round((correct / results.length) * 100);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400';
      case 'hard': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-400';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (!quizStarted) {
    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Interactive Quizzes</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Test your knowledge with AI-generated questions
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400">
            <Zap className="w-4 h-4" />
            <span>AI-Powered</span>
          </div>
        </div>

        {/* Subject Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Choose Subject</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {subjects.map((subject) => (
              <button
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedSubject === subject
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="font-medium">{subject}</div>
                <div className="text-sm opacity-75">
                  {currentQuestions.filter(q => q.subject === subject).length} questions
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quiz Preview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {selectedSubject} Quiz Preview
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <Brain className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <div className="font-semibold text-gray-900 dark:text-white">{currentQuestions.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Questions</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <Clock className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
              <div className="font-semibold text-gray-900 dark:text-white">~{currentQuestions.length * 2} min</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Estimated Time</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
              <Target className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
              <div className="font-semibold text-gray-900 dark:text-white">Mixed</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Difficulty</div>
            </div>
          </div>

          <button
            onClick={startQuiz}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 font-medium"
          >
            <Play className="w-5 h-5" />
            Start Quiz
          </button>
        </div>

        {/* Study Tips */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Quiz Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium mb-1">Read Carefully</h4>
              <p className="text-sm text-green-100">Take time to understand each question fully</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Eliminate Options</h4>
              <p className="text-sm text-green-100">Rule out obviously wrong answers first</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Learn from Mistakes</h4>
              <p className="text-sm text-green-100">Review explanations to improve understanding</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const score = calculateScore();
    const averageTime = Math.round(results.reduce((sum, r) => sum + r.timeSpent, 0) / results.length);

    return (
      <div className="p-6 space-y-6">
        {/* Results Header */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Trophy className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Quiz Complete!</h1>
          <p className="text-gray-600 dark:text-gray-400">Great job on completing the {selectedSubject} quiz</p>
        </div>

        {/* Score Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{score}%</div>
            <div className="text-gray-600 dark:text-gray-400">Final Score</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {results.filter(r => r.isCorrect).length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Correct Answers</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {formatTime(timeElapsed)}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Total Time</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              {averageTime}s
            </div>
            <div className="text-gray-600 dark:text-gray-400">Avg per Question</div>
          </div>
        </div>

        {/* Performance Badge */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center">
            <div className={`px-6 py-3 rounded-full flex items-center gap-2 ${
              score >= 90 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' :
              score >= 80 ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
              score >= 70 ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
              'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
            }`}>
              <Award className="w-5 h-5" />
              <span className="font-medium">
                {score >= 90 ? 'Excellent!' : score >= 80 ? 'Great Job!' : score >= 70 ? 'Good Work!' : 'Keep Practicing!'}
              </span>
            </div>
          </div>
        </div>

        {/* Question Review */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Question Review</h3>
          <div className="space-y-4">
            {currentQuestions.map((question, index) => {
              const result = results[index];
              return (
                <div key={question.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">{question.question}</h4>
                    <div className={`flex items-center gap-1 ${result.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                      {result.isCorrect ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <strong>Correct Answer:</strong> {question.options[question.correctAnswer]}
                  </div>
                  {result.selectedAnswer !== null && result.selectedAnswer !== question.correctAnswer && (
                    <div className="text-sm text-red-600 dark:text-red-400 mb-2">
                      <strong>Your Answer:</strong> {question.options[result.selectedAnswer]}
                    </div>
                  )}
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    {question.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={resetQuiz}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 font-medium"
          >
            <RotateCcw className="w-5 h-5" />
            Take Another Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Quiz Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={resetQuiz}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">{selectedSubject} Quiz</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Question {currentQuestionIndex + 1} of {currentQuestions.length}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span className="font-mono">{formatTime(timeElapsed)}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentQuestion.difficulty)}`}>
            {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ID: {currentQuestion.id}
          </span>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-8">
          {currentQuestion.question}
        </h2>

        <div className="space-y-3 mb-8">
          {currentQuestion.options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                selectedAnswer === index
                  ? showResult
                    ? index === currentQuestion.correctAnswer
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      : 'border-red-500 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                    : 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  : showResult && index === currentQuestion.correctAnswer
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-900 dark:text-white'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                  selectedAnswer === index
                    ? showResult
                      ? index === currentQuestion.correctAnswer
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-red-500 bg-red-500 text-white'
                      : 'border-blue-500 bg-blue-500 text-white'
                    : showResult && index === currentQuestion.correctAnswer
                      ? 'border-green-500 bg-green-500 text-white'
                      : 'border-gray-300 dark:border-gray-600'
                }`}>
                  {showResult && (selectedAnswer === index || index === currentQuestion.correctAnswer) ? (
                    index === currentQuestion.correctAnswer ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <X className="w-3 h-3" />
                    )
                  ) : (
                    String.fromCharCode(65 + index)
                  )}
                </div>
                <span>{option}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg mb-6"
            >
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Explanation:</h4>
              <p className="text-blue-800 dark:text-blue-200">{currentQuestion.explanation}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex gap-4">
          {!showResult ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 font-medium"
            >
              <Check className="w-5 h-5" />
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200 flex items-center justify-center gap-2 font-medium"
            >
              {currentQuestionIndex < currentQuestions.length - 1 ? (
                <>
                  Next Question
                  <ChevronRight className="w-5 h-5" />
                </>
              ) : (
                <>
                  View Results
                  <Trophy className="w-5 h-5" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
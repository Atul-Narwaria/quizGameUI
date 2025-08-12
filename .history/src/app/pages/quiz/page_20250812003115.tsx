'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  timeLimit: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface QuizState {
  currentQuestion: number;
  answers: (number | null)[];
  timeLeft: number;
  score: number;
  isCompleted: boolean;
  bookmarked: boolean[];
  reviewMode: boolean;
}

const QuizPage = () => {
  const router = useRouter();
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: [],
    timeLeft: 30,
    score: 0,
    isCompleted: false,
    bookmarked: [],
    reviewMode: false,
  });

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showQuestionPalette, setShowQuestionPalette] = useState(false);
  const [quizConfig, setQuizConfig] = useState({
    totalQuestions: 10, // Can be 10, 25, 50, or 100
    timePerQuestion: 30,
    category: 'general',
  });

  // Generate questions based on config
  const questions: Question[] = useMemo(() => {
    const questionPool = [
      // Science Questions
      {
        id: 1, question: "Which planet is known as the 'Red Planet'?", 
        options: ["Venus", "Mars", "Jupiter", "Saturn"], correctAnswer: 1, timeLimit: 30, 
        category: 'science', difficulty: 'easy' as const
      },
      {
        id: 2, question: "What is the chemical symbol for Gold?", 
        options: ["Go", "Au", "Ag", "Gd"], correctAnswer: 1, timeLimit: 30, 
        category: 'science', difficulty: 'medium' as const
      },
      {
        id: 3, question: "What is the speed of light in vacuum?", 
        options: ["299,792,458 m/s", "300,000,000 m/s", "299,000,000 m/s", "301,000,000 m/s"], correctAnswer: 0, timeLimit: 30, 
        category: 'science', difficulty: 'hard' as const
      },
      // Geography Questions
      {
        id: 4, question: "What is the capital of Australia?", 
        options: ["Sydney", "Melbourne", "Canberra", "Perth"], correctAnswer: 2, timeLimit: 30, 
        category: 'geography', difficulty: 'medium' as const
      },
      {
        id: 5, question: "Which is the longest river in the world?", 
        options: ["Amazon", "Nile", "Mississippi", "Yangtze"], correctAnswer: 1, timeLimit: 30, 
        category: 'geography', difficulty: 'easy' as const
      },
      // History Questions
      {
        id: 6, question: "In which year did World War II end?", 
        options: ["1944", "1945", "1946", "1947"], correctAnswer: 1, timeLimit: 30, 
        category: 'history', difficulty: 'easy' as const
      },
      {
        id: 7, question: "Who painted the Mona Lisa?", 
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"], correctAnswer: 2, timeLimit: 30, 
        category: 'history', difficulty: 'medium' as const
      },
      // Sports Questions
      {
        id: 8, question: "How many players are there in a basketball team on court?", 
        options: ["4", "5", "6", "7"], correctAnswer: 1, timeLimit: 30, 
        category: 'sports', difficulty: 'easy' as const
      },
      {
        id: 9, question: "In which sport would you perform a slam dunk?", 
        options: ["Volleyball", "Basketball", "Tennis", "Baseball"], correctAnswer: 1, timeLimit: 30, 
        category: 'sports', difficulty: 'easy' as const
      },
      {
        id: 10, question: "What does FIFA stand for?", 
        options: ["Federation of International Football Associations", "Fédération Internationale de Football Association", "Football International Federation Association", "Federation International Football Association"], correctAnswer: 1, timeLimit: 30, 
        category: 'sports', difficulty: 'hard' as const
      }
    ];

    // Generate more questions to reach the target count
    const generatedQuestions = [];
    for (let i = 0; i < quizConfig.totalQuestions; i++) {
      const baseQuestion = questionPool[i % questionPool.length];
      generatedQuestions.push({
        ...baseQuestion,
        id: i + 1,
        question: `${baseQuestion.question} ${i >= questionPool.length ? `(Question ${i + 1})` : ''}`.trim(),
      });
    }
    
    return generatedQuestions;
  }, [quizConfig.totalQuestions]);

  // Initialize quiz state
  useEffect(() => {
    setQuizState(prev => ({
      ...prev,
      answers: new Array(questions.length).fill(null),
      bookmarked: new Array(questions.length).fill(false),
    }));
  }, [questions.length]);

  // Timer effect
  useEffect(() => {
    if (quizState.timeLeft > 0 && !quizState.isCompleted && !quizState.reviewMode) {
      const timer = setTimeout(() => {
        setQuizState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (quizState.timeLeft === 0 && !quizState.reviewMode) {
      handleNextQuestion(true); // Auto-submit when time runs out
    }
  }, [quizState.timeLeft, quizState.isCompleted, quizState.reviewMode]);

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('quizGameUser');
    if (!storedUser) {
      router.push('/pages/login');
    }
  }, [router]);

  // Initialize quiz config from URL parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const questions = parseInt(searchParams.get('questions') || '10');
    const category = searchParams.get('category') || 'general';
    const difficulty = searchParams.get('difficulty') || 'medium';
    
    setQuizConfig({
      totalQuestions: Math.min(Math.max(questions, 10), 100), // Clamp between 10-100
      timePerQuestion: 30,
      category,
    });
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = (autoSubmit = false) => {
    const newAnswers = [...quizState.answers];
    newAnswers[quizState.currentQuestion] = autoSubmit ? null : selectedAnswer;
    
    const currentQ = questions[quizState.currentQuestion];
    const isCorrect = (autoSubmit ? null : selectedAnswer) === currentQ.correctAnswer;
    const newScore = isCorrect ? quizState.score + 1 : quizState.score;

    if (quizState.currentQuestion === questions.length - 1) {
      // Quiz completed
      const finalResults = {
        totalQuestions: questions.length,
        correctAnswers: newScore,
        answers: newAnswers,
        questions: questions,
        timeSpent: questions.length * quizConfig.timePerQuestion - quizState.timeLeft,
        quizConfig: quizConfig,
      };

      localStorage.setItem('quizResults', JSON.stringify(finalResults));
      
      // Update wallet with winnings
      const passingScore = Math.ceil(questions.length * 0.6); // 60% to pass
      if (newScore >= passingScore) {
        const winnings = newScore * (questions.length <= 10 ? 10 : questions.length <= 25 ? 5 : questions.length <= 50 ? 3 : 2);
        
        const storedWallet = localStorage.getItem('quizGameWallet');
        if (storedWallet) {
          const walletData = JSON.parse(storedWallet);
          const newTransaction = {
            id: `txn${Date.now()}`,
            type: 'contest_winning',
            amount: winnings,
            status: 'completed',
            timestamp: new Date().toISOString(),
            description: `Quiz winnings - ${newScore}/${questions.length} correct (${questions.length}Q)`,
          };
          
          walletData.balance += winnings;
          walletData.transactions.unshift(newTransaction);
          localStorage.setItem('quizGameWallet', JSON.stringify(walletData));
        }
      }

      router.push('/pages/result');
    } else {
      // Next question
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        answers: newAnswers,
        timeLeft: quizConfig.timePerQuestion,
        score: newScore,
      }));
      setSelectedAnswer(newAnswers[quizState.currentQuestion + 1]);
    }
  };

  const handlePreviousQuestion = () => {
    if (quizState.currentQuestion > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1,
        timeLeft: quizConfig.timePerQuestion,
      }));
      setSelectedAnswer(quizState.answers[quizState.currentQuestion - 1]);
    }
  };

  const handleQuestionJump = (questionIndex: number) => {
    setQuizState(prev => ({
      ...prev,
      currentQuestion: questionIndex,
      timeLeft: quizConfig.timePerQuestion,
    }));
    setSelectedAnswer(quizState.answers[questionIndex]);
    setShowQuestionPalette(false);
  };

  const handleBookmark = () => {
    const newBookmarked = [...quizState.bookmarked];
    newBookmarked[quizState.currentQuestion] = !newBookmarked[quizState.currentQuestion];
    setQuizState(prev => ({ ...prev, bookmarked: newBookmarked }));
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setIsSubmitting(true);
    setTimeout(() => {
      handleNextQuestion();
      setIsSubmitting(false);
    }, 500);
  };

  const getQuestionStatus = (index: number) => {
    if (index === quizState.currentQuestion) return 'current';
    if (quizState.answers[index] !== null) return 'answered';
    if (quizState.bookmarked[index]) return 'bookmarked';
    return 'unanswered';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'bg-purple-500 text-white';
      case 'answered': return 'bg-green-500 text-white';
      case 'bookmarked': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-600 text-gray-300';
    }
  };

  const currentQuestion = questions[quizState.currentQuestion];
  const progress = ((quizState.currentQuestion + 1) / questions.length) * 100;
  const answeredCount = quizState.answers.filter(a => a !== null).length;
  const bookmarkedCount = quizState.bookmarked.filter(b => b).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-black/70 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 text-2xl font-extrabold">
              QuizGame
            </Link>
            <div className="flex items-center space-x-6">
              <div className="text-sm text-gray-400">
                Question {quizState.currentQuestion + 1} of {questions.length}
              </div>
              <button
                onClick={() => setShowQuestionPalette(!showQuestionPalette)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors"
              >
                Question Palette
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Quiz Area */}
          <div className="lg:col-span-3">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Progress</span>
                <span className="text-sm text-gray-400">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-8 border border-gray-700 shadow-2xl mb-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-purple-400">Question {quizState.currentQuestion + 1}</div>
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    currentQuestion.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                    currentQuestion.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-400">
                    {currentQuestion.category.charAt(0).toUpperCase() + currentQuestion.category.slice(1)}
                  </span>
                </div>
                <button
                  onClick={handleBookmark}
                  className={`p-2 rounded-lg transition-colors ${
                    quizState.bookmarked[quizState.currentQuestion]
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-400'
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                  </svg>
                </button>
              </div>

              <h2 className="text-2xl font-bold leading-relaxed mb-8">{currentQuestion.question}</h2>

              {/* Answer Options */}
              <div className="space-y-4 mb-8">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 text-left rounded-xl border transition-all duration-200 ${
                      selectedAnswer === index
                        ? 'border-purple-500 bg-purple-900/20 text-purple-300'
                        : 'border-gray-600 bg-gray-700/50 hover:bg-gray-600/50 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                        selectedAnswer === index
                          ? 'border-purple-500 bg-purple-500'
                          : 'border-gray-500'
                      }`}>
                        <span className="text-sm font-bold">
                          {String.fromCharCode(65 + index)}
                        </span>
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={quizState.currentQuestion === 0}
                  className={`px-6 py-3 rounded-xl font-bold transition-all duration-200 ${
                    quizState.currentQuestion === 0
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  Previous
                </button>

                <div className="flex space-x-4">
                  <button
                    onClick={handleSubmit}
                    disabled={selectedAnswer === null || isSubmitting}
                    className={`px-8 py-3 rounded-xl font-bold text-lg transition-all duration-200 ${
                      selectedAnswer !== null && !isSubmitting
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transform hover:scale-105 shadow-lg hover:shadow-purple-500/30'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </div>
                    ) : quizState.currentQuestion === questions.length - 1 ? (
                      'Finish Quiz'
                    ) : (
                      'Next Question'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Timer and Stats */}
            <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-2xl mb-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-red-400 mb-1">{quizState.timeLeft}</div>
                <div className="text-xs text-gray-400">seconds left</div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Answered:</span>
                  <span className="text-green-400 font-bold">{answeredCount}/{questions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Bookmarked:</span>
                  <span className="text-yellow-400 font-bold">{bookmarkedCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Current Score:</span>
                  <span className="text-purple-400 font-bold">{quizState.score}</span>
                </div>
              </div>
            </div>

            {/* Question Palette */}
            <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-2xl">
              <h3 className="text-lg font-bold mb-4">Question Palette</h3>
              <div className="grid grid-cols-5 gap-2 mb-4">
                {questions.map((_, index) => {
                  const status = getQuestionStatus(index);
                  return (
                    <button
                      key={index}
                      onClick={() => handleQuestionJump(index)}
                      className={`w-8 h-8 rounded text-xs font-bold transition-all duration-200 ${getStatusColor(status)} hover:scale-110`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
              
              <div className="space-y-2 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-purple-500"></div>
                  <span className="text-gray-400">Current</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-green-500"></div>
                  <span className="text-gray-400">Answered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-yellow-500"></div>
                  <span className="text-gray-400">Bookmarked</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-gray-600"></div>
                  <span className="text-gray-400">Not Visited</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Question Palette Modal (Mobile) */}
      {showQuestionPalette && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowQuestionPalette(false)}></div>
          <div className="fixed bottom-0 left-0 right-0 bg-gray-800 rounded-t-xl p-6 max-h-[70vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Question Palette</h3>
              <button
                onClick={() => setShowQuestionPalette(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-8 gap-2 mb-4">
              {questions.map((_, index) => {
                const status = getQuestionStatus(index);
                return (
                  <button
                    key={index}
                    onClick={() => handleQuestionJump(index)}
                    className={`w-10 h-10 rounded text-sm font-bold transition-all duration-200 ${getStatusColor(status)}`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;

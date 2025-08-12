'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  timeLimit: number;
}

interface QuizState {
  currentQuestion: number;
  answers: number[];
  timeLeft: number;
  score: number;
  isCompleted: boolean;
}

const QuizPage = () => {
  const router = useRouter();
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: [],
    timeLeft: 30,
    score: 0,
    isCompleted: false,
  });

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock quiz data
  const questions: Question[] = [
    {
      id: 1,
      question: "Which planet is known as the 'Red Planet'?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: 1,
      timeLimit: 30,
    },
    {
      id: 2,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Perth"],
      correctAnswer: 2,
      timeLimit: 30,
    },
    {
      id: 3,
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
      correctAnswer: 2,
      timeLimit: 30,
    },
    {
      id: 4,
      question: "Which element has the chemical symbol 'Au'?",
      options: ["Silver", "Gold", "Aluminum", "Argon"],
      correctAnswer: 1,
      timeLimit: 30,
    },
    {
      id: 5,
      question: "In which year did World War II end?",
      options: ["1944", "1945", "1946", "1947"],
      correctAnswer: 1,
      timeLimit: 30,
    },
  ];

  // Timer effect
  useEffect(() => {
    if (quizState.timeLeft > 0 && !quizState.isCompleted) {
      const timer = setTimeout(() => {
        setQuizState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (quizState.timeLeft === 0) {
      handleNextQuestion();
    }
  }, [quizState.timeLeft, quizState.isCompleted]);

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('quizGameUser');
    if (!storedUser) {
      router.push('/pages/login');
    }
  }, [router]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    const currentQ = questions[quizState.currentQuestion];
    const isCorrect = selectedAnswer === currentQ.correctAnswer;
    const newScore = isCorrect ? quizState.score + 1 : quizState.score;
    
    const newAnswers = [...quizState.answers, selectedAnswer ?? -1];

    if (quizState.currentQuestion === questions.length - 1) {
      // Quiz completed
      const finalResults = {
        totalQuestions: questions.length,
        correctAnswers: newScore,
        answers: newAnswers,
        questions: questions,
        timeSpent: questions.length * 30 - quizState.timeLeft,
      };

      // Store results
      localStorage.setItem('quizResults', JSON.stringify(finalResults));
      
      // Update wallet with winnings if score is good
      if (newScore >= 3) {
        const winnings = newScore * 100; // 100 per correct answer
        const storedWallet = localStorage.getItem('quizGameWallet');
        if (storedWallet) {
          const walletData = JSON.parse(storedWallet);
          const newTransaction = {
            id: `txn${Date.now()}`,
            type: 'contest_winning',
            amount: winnings,
            status: 'completed',
            timestamp: new Date().toISOString(),
            description: `Quiz winnings - ${newScore}/${questions.length} correct`,
          };
          
          walletData.balance += winnings;
          walletData.transactions.unshift(newTransaction);
          localStorage.setItem('quizGameWallet', JSON.stringify(walletData));
        }
      }

      router.push('/pages/result');
    } else {
      // Next question
      setQuizState({
        currentQuestion: quizState.currentQuestion + 1,
        answers: newAnswers,
        timeLeft: 30,
        score: newScore,
        isCompleted: false,
      });
      setSelectedAnswer(null);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    setIsSubmitting(true);
    setTimeout(() => {
      handleNextQuestion();
      setIsSubmitting(false);
    }, 500);
  };

  const currentQuestion = questions[quizState.currentQuestion];
  const progress = ((quizState.currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-black/70 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 text-2xl font-extrabold">
            QuizGame
          </Link>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">
              Question {quizState.currentQuestion + 1} of {questions.length}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Progress</span>
            <span className="text-sm text-gray-400">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Timer and Score */}
        <div className="flex justify-between items-center mb-8">
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl px-6 py-4 border border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{quizState.timeLeft}</div>
              <div className="text-xs text-gray-400">seconds left</div>
            </div>
          </div>
          
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl px-6 py-4 border border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{quizState.score}</div>
              <div className="text-xs text-gray-400">correct answers</div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-8 border border-gray-700 shadow-2xl mb-8">
          <div className="mb-6">
            <div className="text-sm text-purple-400 mb-2">Question {quizState.currentQuestion + 1}</div>
            <h2 className="text-2xl font-bold leading-relaxed">{currentQuestion.question}</h2>
          </div>

          {/* Answer Options */}
          <div className="space-y-4">
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
                    {selectedAnswer === index && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">
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

        {/* Question Navigation */}
        <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-center space-x-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  index < quizState.currentQuestion
                    ? 'bg-green-500 text-white'
                    : index === quizState.currentQuestion
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-600 text-gray-400'
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;

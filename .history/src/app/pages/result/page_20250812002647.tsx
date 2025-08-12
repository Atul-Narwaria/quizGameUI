'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface QuizResults {
  totalQuestions: number;
  correctAnswers: number;
  answers: number[];
  questions: Array<{
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
  }>;
  timeSpent: number;
}

const ResultPage = () => {
  const router = useRouter();
  const [results, setResults] = useState<QuizResults | null>(null);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    const storedResults = localStorage.getItem('quizResults');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      router.push('/pages/contests');
    }
  }, [router]);

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const percentage = Math.round((results.correctAnswers / results.totalQuestions) * 100);
  const isPassed = percentage >= 60;
  const winnings = results.correctAnswers * 100;

  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Outstanding! You're a quiz master! 🏆";
    if (percentage >= 80) return "Excellent work! Great knowledge! 🎉";
    if (percentage >= 70) return "Good job! Well done! 👏";
    if (percentage >= 60) return "Not bad! Keep practicing! 👍";
    return "Don't worry, practice makes perfect! 💪";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-black/70 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 text-2xl font-extrabold">
            QuizGame
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Result Card */}
        <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-8 border border-gray-700 shadow-2xl mb-8 text-center">
          {/* Celebration Animation */}
          <div className="mb-6">
            {isPassed ? (
              <div className="text-6xl mb-4 animate-bounce">🎉</div>
            ) : (
              <div className="text-6xl mb-4">😅</div>
            )}
            <h1 className="text-3xl font-bold mb-2">
              {isPassed ? (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                  Congratulations!
                </span>
              ) : (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  Quiz Completed!
                </span>
              )}
            </h1>
            <p className="text-gray-400 text-lg">{getPerformanceMessage()}</p>
          </div>

          {/* Score Circle */}
          <div className="flex justify-center mb-8">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-700"
                />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - percentage / 100)}`}
                  className={isPassed ? "text-green-500" : "text-yellow-500"}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${isPassed ? 'text-green-400' : 'text-yellow-400'}`}>
                    {percentage}%
                  </div>
                  <div className="text-gray-400 text-sm">Score</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-400">{results.correctAnswers}</div>
              <div className="text-gray-400 text-sm">Correct</div>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-400">{results.totalQuestions - results.correctAnswers}</div>
              <div className="text-gray-400 text-sm">Incorrect</div>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-400">{Math.floor(results.timeSpent / 60)}m {results.timeSpent % 60}s</div>
              <div className="text-gray-400 text-sm">Time Spent</div>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-400">₹{winnings}</div>
              <div className="text-gray-400 text-sm">Earned</div>
            </div>
          </div>

          {/* Winnings Message */}
          {results.correctAnswers >= 3 && (
            <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-700/30 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center mb-2">
                <svg className="w-6 h-6 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-green-400 font-bold">Winnings Added to Wallet!</span>
              </div>
              <p className="text-green-300 text-sm">
                Great job! ₹{winnings} has been added to your wallet for getting {results.correctAnswers} correct answers.
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={() => setShowReview(!showReview)}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200"
          >
            {showReview ? 'Hide Review' : 'Review Answers'}
          </button>
          <Link
            href="/pages/contests"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 text-center"
          >
            Take Another Quiz
          </Link>
          <Link
            href="/pages/wallet"
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 text-center"
          >
            View Wallet
          </Link>
        </div>

        {/* Answer Review */}
        {showReview && (
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-8 border border-gray-700 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Answer Review</h2>
            <div className="space-y-6">
              {results.questions.map((question, index) => {
                const userAnswer = results.answers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <div key={question.id} className="border-b border-gray-700 pb-6">
                    <div className="flex items-start mb-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4 ${
                        isCorrect ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-3">{question.question}</h3>
                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className={`p-3 rounded-lg ${
                                optionIndex === question.correctAnswer
                                  ? 'bg-green-900/30 border border-green-700/50 text-green-300'
                                  : optionIndex === userAnswer && userAnswer !== question.correctAnswer
                                  ? 'bg-red-900/30 border border-red-700/50 text-red-300'
                                  : 'bg-gray-700/50'
                              }`}
                            >
                              <div className="flex items-center">
                                {optionIndex === question.correctAnswer && (
                                  <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                                {optionIndex === userAnswer && userAnswer !== question.correctAnswer && (
                                  <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                )}
                                <span>{option}</span>
                                {optionIndex === question.correctAnswer && (
                                  <span className="ml-auto text-green-400 text-sm font-semibold">Correct</span>
                                )}
                                {optionIndex === userAnswer && userAnswer !== question.correctAnswer && (
                                  <span className="ml-auto text-red-400 text-sm font-semibold">Your Answer</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultPage;

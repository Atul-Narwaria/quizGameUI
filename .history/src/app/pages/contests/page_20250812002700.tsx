'use client';

import React from 'react';
import Link from 'next/link';

// Mock contests data
const contests = [
  {
    id: 'contest1',
    title: 'Sports Quiz Championship',
    entryFee: 50,
    totalPrize: 5000,
    participants: 100,
    maxParticipants: 500,
    startTime: '2023-07-15T18:00:00',
    endTime: '2023-07-15T20:00:00',
    category: 'sports',
    difficulty: 'medium',
    status: 'upcoming',
    description: 'Test your sports knowledge in this exciting championship. Cover all major sports including cricket, football, tennis, and more!',
  },
  {
    id: 'contest2',
    title: 'Movies & Entertainment Quiz',
    entryFee: 30,
    totalPrize: 3000,
    participants: 80,
    maxParticipants: 300,
    startTime: '2023-07-16T19:00:00',
    endTime: '2023-07-16T21:00:00',
    category: 'entertainment',
    difficulty: 'easy',
    status: 'live',
    description: 'Dive into the world of cinema and entertainment. From Bollywood to Hollywood, test your movie knowledge!',
  },
  {
    id: 'contest3',
    title: 'General Knowledge Master',
    entryFee: 20,
    totalPrize: 2000,
    participants: 120,
    maxParticipants: 400,
    startTime: '2023-07-17T20:00:00',
    endTime: '2023-07-17T22:00:00',
    category: 'general',
    difficulty: 'hard',
    status: 'upcoming',
    description: 'Challenge yourself with questions from history, geography, science, current affairs, and more!',
  },
  {
    id: 'contest4',
    title: 'Science & Technology Quiz',
    entryFee: 40,
    totalPrize: 4000,
    participants: 65,
    maxParticipants: 250,
    startTime: '2023-07-18T17:00:00',
    endTime: '2023-07-18T19:00:00',
    category: 'science',
    difficulty: 'hard',
    status: 'upcoming',
    description: 'Explore the fascinating world of science and technology with cutting-edge questions.',
  },
];

const ContestsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header with Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-black/70 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 text-2xl font-extrabold">
            QuizGame
          </Link>
          <nav className="flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Home</Link>
            <Link href="/pages/contests" className="text-purple-400 transition-colors duration-200 font-medium">Contests</Link>
            <Link href="/pages/wallet" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Wallet</Link>
            <Link href="/pages/profile" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Profile</Link>
            <div className="flex items-center space-x-4">
              <Link href="/pages/login" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Sign In</Link>
              <Link href="/pages/register" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-purple-500/30">
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-blue-900/30" />
        <div className="container relative mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Live</span> Contests
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Join exciting quiz contests and compete with players worldwide to win amazing cash prizes!</p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button className="px-6 py-3 rounded-full bg-purple-600 text-white font-medium transition-all duration-200 shadow-lg">
              All Contests
            </button>
            <button className="px-6 py-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white font-medium transition-all duration-200">
              Sports
            </button>
            <button className="px-6 py-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white font-medium transition-all duration-200">
              Entertainment
            </button>
            <button className="px-6 py-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white font-medium transition-all duration-200">
              General Knowledge
            </button>
            <button className="px-6 py-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white font-medium transition-all duration-200">
              Science
            </button>
          </div>
        </div>
      </section>

      {/* Contests Grid */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {contests.map((contest) => (
              <div key={contest.id} className="bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 group-hover:opacity-80 transition-opacity duration-300" />
                  
                  {/* Contest Status Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    {contest.status === 'live' && (
                      <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-bold animate-pulse">LIVE</span>
                    )}
                    {contest.status === 'upcoming' && (
                      <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-bold">UPCOMING</span>
                    )}
                  </div>

                  <div className="p-6 relative z-10">
                    {/* Category and Difficulty Tags */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-2">
                        <span className={`text-xs px-3 py-1 rounded-full ${contest.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' : contest.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                          {contest.difficulty.charAt(0).toUpperCase() + contest.difficulty.slice(1)}
                        </span>
                        <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-400">
                          {contest.category.charAt(0).toUpperCase() + contest.category.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span className="text-sm">{contest.participants}/{contest.maxParticipants}</span>
                      </div>
                    </div>

                    {/* Contest Title */}
                    <h3 className="font-bold text-xl mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-600 transition-all duration-300">
                      {contest.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{contest.description}</p>

                    {/* Prize and Entry Fee */}
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <p className="text-gray-400 text-xs mb-1">Entry Fee</p>
                        <p className="font-bold text-lg">₹{contest.entryFee}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs mb-1">Prize Pool</p>
                        <p className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                          ₹{contest.totalPrize.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Participants</span>
                        <span>{contest.participants}/{contest.maxParticipants}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(contest.participants / contest.maxParticipants) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Countdown Timer */}
                    <div className="mb-6">
                      <p className="text-gray-400 text-xs mb-2">
                        {contest.status === 'live' ? 'Ends In' : 'Starts In'}
                      </p>
                      <div className="flex space-x-2">
                        <div className="bg-gray-900 rounded-md px-3 py-2 text-center min-w-[50px]">
                          <p className="font-mono font-bold text-lg">02</p>
                          <p className="text-gray-500 text-xs">HRS</p>
                        </div>
                        <div className="bg-gray-900 rounded-md px-3 py-2 text-center min-w-[50px]">
                          <p className="font-mono font-bold text-lg">45</p>
                          <p className="text-gray-500 text-xs">MIN</p>
                        </div>
                        <div className="bg-gray-900 rounded-md px-3 py-2 text-center min-w-[50px]">
                          <p className="font-mono font-bold text-lg">30</p>
                          <p className="text-gray-500 text-xs">SEC</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-bold transition-all duration-200 transform group-hover:scale-105 shadow-lg group-hover:shadow-purple-500/30">
                      {contest.status === 'live' ? (
                        <Link href="/pages/quiz" className="block">
                          Start Quiz
                        </Link>
                      ) : (
                        'Register'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContestsPage;

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// This would typically come from your JSON file in a static site
const upcomingContests = [
  {
    id: 'contest1',
    title: 'Sports Quiz Championship',
    entryFee: 50,
    totalPrize: 5000,
    participants: 100,
    startTime: '2023-07-15T18:00:00',
    endTime: '2023-07-15T20:00:00',
    category: 'sports',
    difficulty: 'medium',
  },
  {
    id: 'contest2',
    title: 'Movies & Entertainment Quiz',
    entryFee: 30,
    totalPrize: 3000,
    participants: 80,
    startTime: '2023-07-16T19:00:00',
    endTime: '2023-07-16T21:00:00',
    category: 'entertainment',
    difficulty: 'easy',
  },
  {
    id: 'contest3',
    title: 'General Knowledge Master',
    entryFee: 20,
    totalPrize: 2000,
    participants: 120,
    startTime: '2023-07-17T20:00:00',
    endTime: '2023-07-17T22:00:00',
    category: 'general',
    difficulty: 'hard',
  },
];

const userWallet = {
  balance: 500,
  recentTransactions: [
    { id: 'tx1', type: 'deposit', amount: 200, timestamp: '2023-07-10T14:30:00' },
    { id: 'tx2', type: 'contest_entry', amount: -50, timestamp: '2023-07-15T17:45:00' },
  ],
};

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header with Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-black/70 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 text-2xl font-extrabold">QuizGame</div>
          </div>
          <nav className="flex items-center space-x-8">
            <Link href="/pages/contests" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Contests</Link>
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
      <section className="relative py-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-blue-900/30" />
        
        <div className="container relative mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-12 md:mb-0 z-10">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Quiz. Compete.</span>
              <br />
              <span>Win Big.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-lg">Join thousands of quiz enthusiasts and compete for amazing rewards in real-time competitive matches.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/pages/contests" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-purple-500/30 text-center">
                Play Now
              </Link>
              <Link href="/pages/how-it-works" className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-xl border border-gray-700 transition-all duration-200 text-center">
                How It Works
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center z-10">
            {/* Quiz Dashboard Card */}
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 w-full max-w-md border border-gray-700 transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
              {/* Card Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold">Quiz Dashboard</h3>
                  </div>
                  <span className="text-xs px-3 py-1 bg-green-500/20 text-green-400 rounded-full">Live</span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-4 border border-gray-700">
                    <p className="text-gray-400 text-xs mb-1">Active Contests</p>
                    <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">{upcomingContests.length}</p>
                    <p className="text-xs text-green-400 flex items-center mt-1">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      +2 today
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-4 border border-gray-700">
                    <p className="text-gray-400 text-xs mb-1">Total Prize Pool</p>
                    <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                      ₹{upcomingContests.reduce((sum, contest) => sum + contest.totalPrize, 0).toLocaleString()}
                    </p>
                    <p className="text-xs text-blue-400 flex items-center mt-1">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                      Available now
                    </p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-3">
                  <p className="text-sm text-gray-400 font-medium">Quick Actions</p>
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/pages/contests" className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-3 px-4 rounded-lg font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/30 transform hover:scale-105">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Play Quiz
                    </Link>
                    <Link href="/pages/wallet" className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 rounded-lg font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      My Wallet
                    </Link>
                  </div>
                </div>

                {/* Featured Contest */}
                <div className="mt-6 p-4 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-lg border border-indigo-500/30">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-sm">Featured Contest</h4>
                    <span className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded-full animate-pulse">Live</span>
                  </div>
                  <p className="text-lg font-bold mb-1">{upcomingContests[0]?.title}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Prize: ₹{upcomingContests[0]?.totalPrize}</span>
                    <span className="text-green-400 font-medium">{upcomingContests[0]?.participants} playing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Contests Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Live</span> Contests
            </h2>
            <div className="flex space-x-2">
              <button className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200 text-sm font-medium">All</button>
              <button className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200 text-sm font-medium">Sports</button>
              <button className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200 text-sm font-medium">Entertainment</button>
              <button className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200 text-sm font-medium">General</button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingContests.map((contest) => (
              <div key={contest.id} className="bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/10 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 group-hover:opacity-80 transition-opacity duration-300" />
                  <div className="p-5 relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className={`text-xs px-3 py-1 rounded-full ${contest.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' : contest.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                          {contest.difficulty.charAt(0).toUpperCase() + contest.difficulty.slice(1)}
                        </span>
                        <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 ml-2">
                          {contest.category.charAt(0).toUpperCase() + contest.category.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <span className="text-sm text-gray-400">{contest.participants}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-xl mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-600 transition-all duration-300">{contest.title}</h3>
                    <div className="flex justify-between mb-4">
                      <div>
                        <p className="text-gray-400 text-xs mb-1">Entry Fee</p>
                        <p className="font-bold text-lg">₹{contest.entryFee}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs mb-1">Prize Pool</p>
                        <p className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">₹{contest.totalPrize}</p>
                      </div>
                    </div>
                    <div className="mb-6">
                      <p className="text-gray-400 text-xs mb-1">Starts In</p>
                      <div className="flex space-x-2">
                        <div className="bg-gray-900 rounded-md px-2 py-1 text-center min-w-[40px]">
                          <p className="font-mono font-bold">12</p>
                          <p className="text-gray-500 text-xs">HRS</p>
                        </div>
                        <div className="bg-gray-900 rounded-md px-2 py-1 text-center min-w-[40px]">
                          <p className="font-mono font-bold">45</p>
                          <p className="text-gray-500 text-xs">MIN</p>
                        </div>
                        <div className="bg-gray-900 rounded-md px-2 py-1 text-center min-w-[40px]">
                          <p className="font-mono font-bold">30</p>
                          <p className="text-gray-500 text-xs">SEC</p>
                        </div>
                      </div>
                    </div>
                    <Link href={`/pages/contest/${contest.id}`} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-bold transition-all duration-200 transform group-hover:scale-105 shadow-lg group-hover:shadow-purple-500/30">
                      Join Contest
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/pages/contests" className="inline-flex items-center text-purple-400 font-bold hover:text-purple-300 transition-colors duration-200">
              View All Contests
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Winners Showcase Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-blue-900/10" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/30 rounded-full filter blur-3xl opacity-20" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/30 rounded-full filter blur-3xl opacity-20" />
        
        <div className="container relative mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Recent</span> Winners
            </h2>
            <div className="mt-4 md:mt-0">
              <Link href="/pages/winners" className="inline-flex items-center text-purple-400 font-bold hover:text-purple-300 transition-colors duration-200">
                View All Winners
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Winner Card 1 */}
            <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/10 group">
              <div className="relative">
                <div className="absolute top-0 right-0 bg-yellow-500 text-black font-bold text-xs px-3 py-1 rounded-bl-lg">
                  ₹10,000
                </div>
                <div className="p-5">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-black font-bold">RS</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg group-hover:text-yellow-400 transition-colors duration-300">Rahul Singh</h3>
                      <p className="text-gray-400 text-sm">Sports Quiz Champion</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-400 text-xs">Contest</p>
                      <p className="font-medium text-sm">IPL Trivia Master</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Score</p>
                      <p className="font-medium text-sm">9/10</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Date</p>
                      <p className="font-medium text-sm">Jun 15</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Winner Card 2 */}
            <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/10 group">
              <div className="relative">
                <div className="absolute top-0 right-0 bg-yellow-500 text-black font-bold text-xs px-3 py-1 rounded-bl-lg">
                  ₹8,500
                </div>
                <div className="p-5">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-black font-bold">AP</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg group-hover:text-yellow-400 transition-colors duration-300">Ananya Patel</h3>
                      <p className="text-gray-400 text-sm">Movies Expert</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-400 text-xs">Contest</p>
                      <p className="font-medium text-sm">Bollywood Quiz</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Score</p>
                      <p className="font-medium text-sm">10/10</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Date</p>
                      <p className="font-medium text-sm">Jun 12</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Winner Card 3 */}
            <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/10 group">
              <div className="relative">
                <div className="absolute top-0 right-0 bg-yellow-500 text-black font-bold text-xs px-3 py-1 rounded-bl-lg">
                  ₹7,200
                </div>
                <div className="p-5">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-black font-bold">VK</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg group-hover:text-yellow-400 transition-colors duration-300">Vikram Kumar</h3>
                      <p className="text-gray-400 text-sm">Science Whiz</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-400 text-xs">Contest</p>
                      <p className="font-medium text-sm">Science Quiz</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Score</p>
                      <p className="font-medium text-sm">8/10</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Date</p>
                      <p className="font-medium text-sm">Jun 10</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Winner Card 4 */}
            <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/10 group">
              <div className="relative">
                <div className="absolute top-0 right-0 bg-yellow-500 text-black font-bold text-xs px-3 py-1 rounded-bl-lg">
                  ₹6,800
                </div>
                <div className="p-5">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-black font-bold">SM</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg group-hover:text-yellow-400 transition-colors duration-300">Sanya Mehta</h3>
                      <p className="text-gray-400 text-sm">GK Master</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-400 text-xs">Contest</p>
                      <p className="font-medium text-sm">GK Challenge</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Score</p>
                      <p className="font-medium text-sm">9/10</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs">Date</p>
                      <p className="font-medium text-sm">Jun 8</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-50" />
        <div className="container relative mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Top</span> Players
            </h2>
            <div className="mt-4 md:mt-0">
              <Link href="/pages/leaderboard" className="inline-flex items-center text-purple-400 font-bold hover:text-purple-300 transition-colors duration-200">
                View Full Leaderboard
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
          
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900/80">
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Rank</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Player</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Contests Won</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total Winnings</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Avg. Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {/* Player 1 */}
                  <tr className="hover:bg-gray-700/50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-black font-bold">1</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white font-bold">RS</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Rahul Singh</div>
                          <div className="text-sm text-gray-400">@quizmaster</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">24</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">₹42,500</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">9.2/10</td>
                  </tr>
                  
                  {/* Player 2 */}
                  <tr className="hover:bg-gray-700/50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-black font-bold">2</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white font-bold">AP</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Ananya Patel</div>
                          <div className="text-sm text-gray-400">@quizwhiz</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">21</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">₹38,200</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">8.9/10</td>
                  </tr>
                  
                  {/* Player 3 */}
                  <tr className="hover:bg-gray-700/50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 bg-gradient-to-r from-amber-700 to-amber-800 rounded-full flex items-center justify-center text-white font-bold">3</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white font-bold">VK</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Vikram Kumar</div>
                          <div className="text-sm text-gray-400">@sciencepro</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">19</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">₹35,800</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">8.7/10</td>
                  </tr>
                  
                  {/* Player 4 */}
                  <tr className="hover:bg-gray-700/50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-white font-bold">4</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white font-bold">SM</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Sanya Mehta</div>
                          <div className="text-sm text-gray-400">@gkchamp</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">17</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">₹32,100</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">8.5/10</td>
                  </tr>
                  
                  {/* Player 5 */}
                  <tr className="hover:bg-gray-700/50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-white font-bold">5</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white font-bold">RJ</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium">Raj Joshi</div>
                          <div className="text-sm text-gray-400">@historyking</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">15</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">₹28,500</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">8.3/10</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-50" />
        <div className="container relative mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">How</span> It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                <span className="text-2xl font-bold group-hover:text-white transition-colors duration-300">1</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Choose a Contest</h3>
              <p className="text-gray-400 text-center">Browse through our wide range of quiz contests and select one that matches your interests and skill level.</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                <span className="text-2xl font-bold group-hover:text-white transition-colors duration-300">2</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Answer Questions</h3>
              <p className="text-gray-400 text-center">Test your knowledge by answering quiz questions within the time limit.</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                <span className="text-2xl font-bold group-hover:text-white transition-colors duration-300">3</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Win Prizes</h3>
              <p className="text-gray-400 text-center">Score high and win exciting cash prizes that go directly to your wallet. Compete in multiple contests to maximize your earnings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-sm border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 text-2xl font-extrabold mb-2">QuizGame</div>
              <p className="text-gray-400">Test your knowledge, win rewards</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/pages/about" className="text-gray-400 hover:text-white transition-colors duration-200">About</Link>
              <Link href="/pages/terms" className="text-gray-400 hover:text-white transition-colors duration-200">Terms</Link>
              <Link href="/pages/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy</Link>
              <Link href="/pages/contact" className="text-gray-400 hover:text-white transition-colors duration-200">Contact</Link>
              <Link href="/pages/faq" className="text-gray-400 hover:text-white transition-colors duration-200">FAQ</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">© 2023 QuizGame. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
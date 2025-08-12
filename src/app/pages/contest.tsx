import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

interface Contest {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  entryFee: number;
  prizePool: number;
  startTime: string;
  endTime: string;
  participants: number;
  maxParticipants: number;
  status: 'upcoming' | 'live' | 'completed';
  questions: number;
  duration: number; // in minutes
  image?: string;
  rules?: string[];
  prizes?: { rank: number; amount: number }[];
  leaderboard?: { username: string; score: number; rank: number }[];
}

const ContestPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const contestId = searchParams?.get('id');
  
  const [contest, setContest] = useState<Contest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userBalance, setUserBalance] = useState(0);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('quizGameUser');
    if (storedUser) {
      setIsLoggedIn(true);
      try {
        const userData = JSON.parse(storedUser);
        // Get wallet balance from localStorage
        const walletData = localStorage.getItem('quizGameWallet');
        if (walletData) {
          const wallet = JSON.parse(walletData);
          setUserBalance(wallet.balance || 0);
        }
      } catch (err) {
        console.error('Error parsing user data:', err);
      }
    } else {
      // Redirect to login if not logged in
      router.push('/pages/login');
    }

    // Fetch contest data
    const fetchContestData = async () => {
      if (!contestId) {
        setError('Contest ID is missing');
        setIsLoading(false);
        return;
      }

      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock contest data - in a real app, this would be fetched from an API
        const mockContests: Contest[] = [
          {
            id: 'c1',
            title: 'Sports Quiz Championship',
            description: 'Test your knowledge of sports history, rules, and famous athletes in this exciting quiz contest. From Olympic history to modern sports stars, this quiz covers it all. Join now to compete with sports enthusiasts from around the world!',
            category: 'Sports',
            difficulty: 'medium',
            entryFee: 100,
            prizePool: 5000,
            startTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
            endTime: new Date(Date.now() + 7200000).toISOString(), // 2 hours from now
            participants: 120,
            maxParticipants: 200,
            status: 'upcoming',
            questions: 20,
            duration: 30,
            image: '/images/sports-quiz.jpg',
            rules: [
              'Each question must be answered within the time limit',
              'No external resources allowed during the quiz',
              'Points are awarded based on accuracy and speed',
              'Ties will be broken by the fastest completion time',
              'Participants must complete all questions to qualify for prizes'
            ],
            prizes: [
              { rank: 1, amount: 2500 },
              { rank: 2, amount: 1500 },
              { rank: 3, amount: 1000 }
            ],
            leaderboard: []
          },
          {
            id: 'c2',
            title: 'Movie Buffs Challenge',
            description: 'From classics to new releases, test your film knowledge in this comprehensive movie quiz. Challenge yourself with questions about directors, actors, iconic scenes, and movie trivia across all genres and eras of cinema.',
            category: 'Entertainment',
            difficulty: 'hard',
            entryFee: 200,
            prizePool: 10000,
            startTime: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
            endTime: new Date(Date.now() + 1800000).toISOString(), // 30 minutes from now
            participants: 85,
            maxParticipants: 100,
            status: 'live',
            questions: 25,
            duration: 40,
            image: '/images/movie-quiz.jpg',
            rules: [
              'Each question must be answered within the time limit',
              'No external resources allowed during the quiz',
              'Points are awarded based on accuracy and speed',
              'Ties will be broken by the fastest completion time',
              'Participants must complete all questions to qualify for prizes'
            ],
            prizes: [
              { rank: 1, amount: 5000 },
              { rank: 2, amount: 3000 },
              { rank: 3, amount: 2000 }
            ],
            leaderboard: [
              { username: 'filmfanatic', score: 95, rank: 1 },
              { username: 'moviemaster', score: 92, rank: 2 },
              { username: 'cinephile', score: 88, rank: 3 },
              { username: 'directorsdream', score: 85, rank: 4 },
              { username: 'scenequeen', score: 82, rank: 5 }
            ]
          },
          {
            id: 'c3',
            title: 'Science & Technology Trivia',
            description: 'Explore the wonders of science and technology in this educational and challenging quiz. From physics and chemistry to computer science and space exploration, test your knowledge across the scientific spectrum.',
            category: 'Science',
            difficulty: 'hard',
            entryFee: 150,
            prizePool: 7500,
            startTime: new Date(Date.now() + 86400000).toISOString(), // 24 hours from now
            endTime: new Date(Date.now() + 90000000).toISOString(), // 25 hours from now
            participants: 50,
            maxParticipants: 300,
            status: 'upcoming',
            questions: 30,
            duration: 45,
            image: '/images/science-quiz.jpg',
            rules: [
              'Each question must be answered within the time limit',
              'No external resources allowed during the quiz',
              'Points are awarded based on accuracy and speed',
              'Ties will be broken by the fastest completion time',
              'Participants must complete all questions to qualify for prizes'
            ],
            prizes: [
              { rank: 1, amount: 3500 },
              { rank: 2, amount: 2500 },
              { rank: 3, amount: 1500 }
            ],
            leaderboard: []
          },
          {
            id: 'c4',
            title: 'History Masters',
            description: 'Journey through time with this comprehensive history quiz. Test your knowledge of ancient civilizations, world wars, famous leaders, and historical events that shaped our world.',
            category: 'History',
            difficulty: 'medium',
            entryFee: 120,
            prizePool: 6000,
            startTime: new Date(Date.now() - 86400000).toISOString(), // 24 hours ago
            endTime: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
            participants: 200,
            maxParticipants: 200,
            status: 'completed',
            questions: 25,
            duration: 35,
            image: '/images/history-quiz.jpg',
            rules: [
              'Each question must be answered within the time limit',
              'No external resources allowed during the quiz',
              'Points are awarded based on accuracy and speed',
              'Ties will be broken by the fastest completion time',
              'Participants must complete all questions to qualify for prizes'
            ],
            prizes: [
              { rank: 1, amount: 3000 },
              { rank: 2, amount: 2000 },
              { rank: 3, amount: 1000 }
            ],
            leaderboard: [
              { username: 'historybuff', score: 98, rank: 1 },
              { username: 'timemachine', score: 95, rank: 2 },
              { username: 'pastmaster', score: 92, rank: 3 },
              { username: 'chronicler', score: 90, rank: 4 },
              { username: 'antiquarian', score: 87, rank: 5 }
            ]
          }
        ];
        
        const foundContest = mockContests.find(c => c.id === contestId);
        
        if (foundContest) {
          setContest(foundContest);
        } else {
          setError('Contest not found');
        }
      } catch (err) {
        console.error('Error fetching contest:', err);
        setError('Failed to load contest data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchContestData();
  }, [contestId, router]);

  // Update countdown timer
  useEffect(() => {
    if (!contest) return;

    const calculateTimeLeft = () => {
      let targetTime;
      
      if (contest.status === 'upcoming') {
        targetTime = new Date(contest.startTime).getTime();
      } else if (contest.status === 'live') {
        targetTime = new Date(contest.endTime).getTime();
      } else {
        setTimeLeft('Contest ended');
        return;
      }
      
      const now = new Date().getTime();
      const difference = targetTime - now;
      
      if (difference <= 0) {
        // Should refresh contest status here in a real app
        setTimeLeft(contest.status === 'upcoming' ? 'Starting now!' : 'Ending now!');
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      let timeString = '';
      if (days > 0) timeString += `${days}d `;
      if (hours > 0 || days > 0) timeString += `${hours}h `;
      if (minutes > 0 || hours > 0 || days > 0) timeString += `${minutes}m `;
      timeString += `${seconds}s`;
      
      setTimeLeft(contest.status === 'upcoming' ? `Starts in: ${timeString}` : `Ends in: ${timeString}`);
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, [contest]);

  const handleJoinContest = async () => {
    if (!isLoggedIn) {
      router.push('/pages/login');
      return;
    }
    
    if (!contest) return;
    
    setIsJoining(true);
    
    try {
      // Check if user has enough balance
      if (userBalance < contest.entryFee) {
        throw new Error(`Insufficient balance. You need ${contest.entryFee} coins to join this contest.`);
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, we would make an API call to join the contest
      // For this static site, we'll simulate joining by updating localStorage
      
      // Update wallet balance
      const walletData = localStorage.getItem('quizGameWallet');
      if (walletData) {
        const wallet = JSON.parse(walletData);
        wallet.balance = wallet.balance - contest.entryFee;
        localStorage.setItem('quizGameWallet', JSON.stringify(wallet));
        setUserBalance(wallet.balance);
      }
      
      // Redirect to questions page
      router.push(`/pages/questions?contestId=${contest.id}`);
    } catch (err: any) {
      setError(err.message || 'Failed to join contest');
      console.error(err);
    } finally {
      setIsJoining(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error || !contest) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
        <div className="text-red-500 text-xl mb-4">{error || 'Contest not found'}</div>
        <Link href="/pages/contests" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          Back to Contests
        </Link>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'live': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'completed': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return 'Upcoming';
      case 'live': return 'Live Now';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
            QuizGame
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link href="/pages/contests" className="text-gray-300 hover:text-white transition-colors">
              <span className="hidden sm:inline">All Contests</span>
              <span className="sm:hidden">Back</span>
            </Link>
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <div className="hidden sm:block text-sm text-gray-400">
                  Balance: <span className="text-purple-400 font-medium">{userBalance} coins</span>
                </div>
                <Link href="/pages/wallet" className="px-4 py-2 rounded-lg bg-purple-600/30 border border-purple-600/50 text-purple-400 hover:bg-purple-600/40 transition-colors">
                  <span className="hidden sm:inline">Add Funds</span>
                  <span className="sm:hidden">Wallet</span>
                </Link>
              </div>
            ) : (
              <Link href="/pages/login" className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Contest Hero */}
      <div className="relative bg-gray-800 border-b border-gray-700">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20"></div>
        <div className="container mx-auto px-4 py-8 relative z-1">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Contest Image */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-700 border border-gray-600 shadow-xl">
                <div className="w-full h-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center">
                  <div className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    {contest.category}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contest Info */}
            <div className="w-full md:w-2/3 lg:w-3/4">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(contest.status)}`}>
                  {getStatusText(contest.status)}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-700 border border-gray-600 text-gray-300">
                  {contest.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gray-700 border border-gray-600 ${getDifficultyColor(contest.difficulty)}`}>
                  {contest.difficulty.charAt(0).toUpperCase() + contest.difficulty.slice(1)}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{contest.title}</h1>
              
              <p className="text-gray-300 mb-6">{contest.description}</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
                  <div className="text-sm text-gray-400 mb-1">Entry Fee</div>
                  <div className="text-xl font-bold">{contest.entryFee} coins</div>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
                  <div className="text-sm text-gray-400 mb-1">Prize Pool</div>
                  <div className="text-xl font-bold text-purple-400">{contest.prizePool} coins</div>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
                  <div className="text-sm text-gray-400 mb-1">Questions</div>
                  <div className="text-xl font-bold">{contest.questions}</div>
                </div>
                
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
                  <div className="text-sm text-gray-400 mb-1">Duration</div>
                  <div className="text-xl font-bold">{contest.duration} min</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="w-full sm:w-auto">
                  {contest.status === 'upcoming' && (
                    <button
                      onClick={handleJoinContest}
                      disabled={isJoining}
                      className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg shadow-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isJoining ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>Register Now • {contest.entryFee} coins</>
                      )}
                    </button>
                  )}
                  
                  {contest.status === 'live' && (
                    <button
                      onClick={handleJoinContest}
                      disabled={isJoining}
                      className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-medium rounded-lg shadow-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isJoining ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>Join Now • {contest.entryFee} coins</>
                      )}
                    </button>
                  )}
                  
                  {contest.status === 'completed' && (
                    <button
                      disabled
                      className="w-full sm:w-auto px-8 py-3 bg-gray-700 text-gray-300 font-medium rounded-lg cursor-not-allowed"
                    >
                      Contest Ended
                    </button>
                  )}
                </div>
                
                <div className="text-center sm:text-left">
                  <div className="text-sm text-gray-400 mb-1">
                    {contest.status === 'upcoming' ? 'Starting Soon' : contest.status === 'live' ? 'In Progress' : 'Ended'}
                  </div>
                  <div className="text-xl font-bold text-purple-400">{timeLeft}</div>
                </div>
                
                <div className="text-center sm:text-left ml-0 sm:ml-auto">
                  <div className="text-sm text-gray-400 mb-1">Participants</div>
                  <div className="text-xl font-bold">{contest.participants} / {contest.maxParticipants}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contest Details Tabs */}
      <div className="container mx-auto px-4 py-6">
        <div className="border-b border-gray-700 mb-6">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${activeTab === 'overview' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-gray-300'}`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${activeTab === 'rules' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-gray-300'}`}
            >
              Rules
            </button>
            <button
              onClick={() => setActiveTab('prizes')}
              className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${activeTab === 'prizes' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-gray-300'}`}
            >
              Prizes
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${activeTab === 'leaderboard' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-gray-300'}`}
            >
              Leaderboard
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-12">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Contest Overview</h2>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mb-6">
                <p className="text-gray-300 mb-4">{contest.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Contest Details</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex justify-between">
                        <span className="text-gray-400">Category:</span>
                        <span>{contest.category}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-400">Difficulty:</span>
                        <span className={getDifficultyColor(contest.difficulty)}>
                          {contest.difficulty.charAt(0).toUpperCase() + contest.difficulty.slice(1)}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-400">Questions:</span>
                        <span>{contest.questions}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-400">Duration:</span>
                        <span>{contest.duration} minutes</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-400">Entry Fee:</span>
                        <span>{contest.entryFee} coins</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-400">Prize Pool:</span>
                        <span className="text-purple-400">{contest.prizePool} coins</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Schedule</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span className={getDifficultyColor(contest.status)}>
                          {getStatusText(contest.status)}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-400">Start Time:</span>
                        <span>{new Date(contest.startTime).toLocaleString()}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-400">End Time:</span>
                        <span>{new Date(contest.endTime).toLocaleString()}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-400">Participants:</span>
                        <span>{contest.participants} / {contest.maxParticipants}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-900/20 backdrop-blur-sm rounded-xl p-6 border border-purple-900/30">
                <h3 className="text-xl font-bold mb-4 text-purple-400">How to Participate</h3>
                <ol className="list-decimal list-inside space-y-3 text-gray-300">
                  <li>Register for the contest by clicking the "Register Now" button</li>
                  <li>Ensure you have enough coins in your wallet for the entry fee</li>
                  <li>Wait for the contest to start at the scheduled time</li>
                  <li>Answer all questions within the time limit</li>
                  <li>Check the leaderboard after the contest ends to see your ranking</li>
                  <li>Prizes will be automatically credited to winners' accounts</li>
                </ol>
              </div>
            </div>
          )}

          {/* Rules Tab */}
          {activeTab === 'rules' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Contest Rules</h2>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <ul className="space-y-4">
                  {contest.rules?.map((rule, index) => (
                    <li key={index} className="flex">
                      <div className="mr-4 mt-1 flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-sm font-medium">
                        {index + 1}
                      </div>
                      <p className="text-gray-300">{rule}</p>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <h4 className="text-yellow-400 font-medium mb-2">Important Notice</h4>
                  <p className="text-gray-300 text-sm">
                    Violation of any contest rules may result in disqualification and forfeiture of any potential prizes.
                    The QuizGame team reserves the right to make final decisions on all contest-related matters.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Prizes Tab */}
          {activeTab === 'prizes' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Prize Distribution</h2>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <div className="text-center mb-8">
                  <div className="text-sm text-gray-400 mb-1">Total Prize Pool</div>
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    {contest.prizePool} coins
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {contest.prizes?.map((prize) => (
                    <div key={prize.rank} className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg mb-4">
                        {prize.rank}
                      </div>
                      <div className="text-2xl font-bold mb-1">{prize.amount} coins</div>
                      <div className="text-sm text-gray-400">
                        {prize.rank === 1 ? '1st Place' : prize.rank === 2 ? '2nd Place' : prize.rank === 3 ? '3rd Place' : `${prize.rank}th Place`}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-purple-900/20 backdrop-blur-sm rounded-xl p-6 border border-purple-900/30">
                  <h3 className="text-xl font-bold mb-4 text-purple-400">Prize Eligibility</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-purple-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Participants must complete all questions to be eligible for prizes</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-purple-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Prizes are awarded based on highest scores and fastest completion times</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-purple-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>In case of a tie, the participant who completed the quiz faster will be ranked higher</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-purple-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Prizes will be automatically credited to winners' accounts within 24 hours of contest completion</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Leaderboard Tab */}
          {activeTab === 'leaderboard' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
              {contest.leaderboard && contest.leaderboard.length > 0 ? (
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Rank</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Player</th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Score</th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-gray-400">Prize</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contest.leaderboard.map((entry, index) => {
                          const prize = contest.prizes?.find(p => p.rank === entry.rank);
                          return (
                            <tr key={index} className="border-b border-gray-700/50 hover:bg-gray-700/20">
                              <td className="px-4 py-4">
                                <div className="flex items-center">
                                  {entry.rank <= 3 ? (
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${entry.rank === 1 ? 'bg-yellow-500' : entry.rank === 2 ? 'bg-gray-400' : 'bg-amber-700'}`}>
                                      {entry.rank}
                                    </div>
                                  ) : (
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-medium text-gray-300 bg-gray-700">
                                      {entry.rank}
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td className="px-4 py-4">
                                <div className="font-medium">{entry.username}</div>
                              </td>
                              <td className="px-4 py-4 text-right font-medium">
                                {entry.score}
                              </td>
                              <td className="px-4 py-4 text-right">
                                {prize ? (
                                  <span className="text-purple-400 font-medium">{prize.amount} coins</span>
                                ) : (
                                  <span className="text-gray-500">-</span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 text-center">
                  {contest.status === 'completed' ? (
                    <div>
                      <div className="text-gray-400 mb-2">No results available</div>
                      <p className="text-sm text-gray-500">The leaderboard for this contest is not available.</p>
                    </div>
                  ) : (
                    <div>
                      <div className="text-gray-400 mb-2">Contest not yet completed</div>
                      <p className="text-sm text-gray-500">The leaderboard will be available after the contest ends.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center mb-12">
          {contest.status === 'upcoming' && (
            <button
              onClick={handleJoinContest}
              disabled={isJoining}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg shadow-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center"
            >
              {isJoining ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>Register Now • {contest.entryFee} coins</>
              )}
            </button>
          )}
          
          {contest.status === 'live' && (
            <button
              onClick={handleJoinContest}
              disabled={isJoining}
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-medium rounded-lg shadow-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center"
            >
              {isJoining ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>Join Now • {contest.entryFee} coins</>
              )}
            </button>
          )}
          
          {contest.status === 'completed' && (
            <Link href="/pages/contests" className="px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg shadow-lg transition-all duration-200 inline-flex items-center">
              Browse More Contests
            </Link>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                QuizGame
              </Link>
              <p className="text-gray-400 text-sm mt-2">Test your knowledge and win prizes!</p>
            </div>
            
            <div className="flex space-x-6">
              <Link href="/pages/contests" className="text-gray-400 hover:text-white transition-colors">
                Contests
              </Link>
              <Link href="/pages/wallet" className="text-gray-400 hover:text-white transition-colors">
                Wallet
              </Link>
              <Link href="/pages/profile" className="text-gray-400 hover:text-white transition-colors">
                Profile
              </Link>
              <Link href="/help" className="text-gray-400 hover:text-white transition-colors">
                Help
              </Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} QuizGame. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Error Modal */}
      {error && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 border border-red-500/30">
            <div className="text-red-400 text-lg font-medium mb-4">{error}</div>
            <div className="flex justify-end">
              <button
                onClick={() => setError('')}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContestPage;
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
}

const ContestsPage = () => {
  const router = useRouter();
  const [contests, setContests] = useState<Contest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null);
  
  useEffect(() => {
    // In a real app, we would fetch this data from an API
    // For this static site, we'll use mock data
    const fetchContests = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Check if user is logged in via localStorage
        const storedUser = localStorage.getItem('quizGameUser');
        
        if (!storedUser) {
          // Redirect to login if not logged in
          router.push('/pages/login');
          return;
        }
        
        // Mock contests data
        const mockContests: Contest[] = [
          {
            id: 'c1',
            title: 'Sports Quiz Championship',
            description: 'Test your knowledge of sports history, rules, and famous athletes in this exciting quiz contest.',
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
            image: '/images/sports-quiz.jpg'
          },
          {
            id: 'c2',
            title: 'Movie Buffs Challenge',
            description: 'From classics to new releases, test your film knowledge in this comprehensive movie quiz.',
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
            image: '/images/movie-quiz.jpg'
          },
          {
            id: 'c3',
            title: 'Science & Technology Trivia',
            description: 'Explore the wonders of science and technology in this educational and challenging quiz.',
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
            image: '/images/science-quiz.jpg'
          },
          {
            id: 'c4',
            title: 'General Knowledge Master',
            description: 'A mix of questions from various categories to test your overall knowledge and quick thinking.',
            category: 'General Knowledge',
            difficulty: 'easy',
            entryFee: 50,
            prizePool: 2500,
            startTime: new Date(Date.now() - 86400000).toISOString(), // 24 hours ago
            endTime: new Date(Date.now() - 82800000).toISOString(), // 23 hours ago
            participants: 250,
            maxParticipants: 250,
            status: 'completed',
            questions: 15,
            duration: 20,
            image: '/images/gk-quiz.jpg'
          },
          {
            id: 'c5',
            title: 'History Through Ages',
            description: 'Journey through time with questions about ancient civilizations, world wars, and modern history.',
            category: 'History',
            difficulty: 'medium',
            entryFee: 120,
            prizePool: 6000,
            startTime: new Date(Date.now() + 172800000).toISOString(), // 48 hours from now
            endTime: new Date(Date.now() + 176400000).toISOString(), // 49 hours from now
            participants: 30,
            maxParticipants: 200,
            status: 'upcoming',
            questions: 25,
            duration: 35,
            image: '/images/history-quiz.jpg'
          },
          {
            id: 'c6',
            title: 'Pop Culture Mania',
            description: `From music to social media trends, test your knowledge of what's hot in pop culture.`,
            category: 'Entertainment',
            difficulty: 'easy',
            entryFee: 80,
            prizePool: 4000,
            startTime: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
            endTime: new Date(Date.now() - 39600000).toISOString(), // 11 hours ago
            participants: 180,
            maxParticipants: 200,
            status: 'completed',
            questions: 20,
            duration: 25,
            image: '/images/pop-culture-quiz.jpg'
          },
          {
            id: 'c7',
            title: 'Geography Explorer',
            description: 'Test your knowledge of countries, capitals, landmarks, and geographical features.',
            category: 'Geography',
            difficulty: 'medium',
            entryFee: 100,
            prizePool: 5000,
            startTime: new Date(Date.now() + 7200000).toISOString(), // 2 hours from now
            endTime: new Date(Date.now() + 10800000).toISOString(), // 3 hours from now
            participants: 75,
            maxParticipants: 150,
            status: 'upcoming',
            questions: 20,
            duration: 30,
            image: '/images/geography-quiz.jpg'
          },
          {
            id: 'c8',
            title: 'Tech Titans Challenge',
            description: 'For tech enthusiasts: questions about coding, gadgets, and the latest in technology.',
            category: 'Technology',
            difficulty: 'hard',
            entryFee: 250,
            prizePool: 12500,
            startTime: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
            endTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
            participants: 60,
            maxParticipants: 100,
            status: 'live',
            questions: 30,
            duration: 45,
            image: '/images/tech-quiz.jpg'
          },
        ];
        
        setContests(mockContests);
      } catch (error) {
        console.error('Error fetching contests:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchContests();
  }, [router]);
  
  const handleViewContest = (contestId: string) => {
    router.push(`/pages/contest?id=${contestId}`);
  };
  
  const handleJoinContest = (contest: Contest) => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('quizGameUser');
    if (!storedUser) {
      router.push('/pages/login');
      return;
    }
    
    // Check wallet balance
    const storedWallet = localStorage.getItem('quizGameWallet');
    if (!storedWallet) {
      alert('Wallet not found. Please add money to your wallet first.');
      router.push('/pages/wallet');
      return;
    }
    
    const walletData = JSON.parse(storedWallet);
    if (walletData.balance < contest.entryFee) {
      alert(`Insufficient balance. You need ${contest.entryFee} coins to join this contest.`);
      router.push('/pages/wallet');
      return;
    }
    
    setSelectedContest(contest);
    setShowJoinModal(true);
  };
  
  const confirmJoinContest = async () => {
    if (!selectedContest) return;
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Deduct entry fee from wallet
      const storedWallet = localStorage.getItem('quizGameWallet');
      if (storedWallet) {
        const walletData = JSON.parse(storedWallet);
        
        const newTransaction = {
          id: `txn${Date.now()}`,
          type: 'contest_entry',
          amount: -selectedContest.entryFee,
          status: 'completed',
          timestamp: new Date().toISOString(),
          description: `Entry fee for ${selectedContest.title}`,
        };
        
        const updatedWalletData = {
          balance: walletData.balance - selectedContest.entryFee,
          transactions: [newTransaction, ...walletData.transactions],
        };
        
        localStorage.setItem('quizGameWallet', JSON.stringify(updatedWalletData));
      }
      
      // Store joined contest in localStorage
      const joinedContests = JSON.parse(localStorage.getItem('joinedContests') || '[]');
      joinedContests.push({
        contestId: selectedContest.id,
        joinedAt: new Date().toISOString(),
      });
      localStorage.setItem('joinedContests', JSON.stringify(joinedContests));
      
      // Close modal and show success message
      setShowJoinModal(false);
      alert(`Successfully joined ${selectedContest.title}!`);
      
      // Update contest participants count
      setContests(prevContests => 
        prevContests.map(c => 
          c.id === selectedContest.id 
            ? { ...c, participants: c.participants + 1 } 
            : c
        )
      );
    } catch (error) {
      console.error('Error joining contest:', error);
      alert('Failed to join contest. Please try again.');
    }
  };
  
  const filteredContests = contests.filter(contest => {
    // Filter by status
    if (activeFilter !== 'all' && contest.status !== activeFilter) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        contest.title.toLowerCase().includes(query) ||
        contest.description.toLowerCase().includes(query) ||
        contest.category.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  const getDifficultyColor = (difficulty: Contest['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'hard':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };
  
  const getStatusColor = (status: Contest['status']) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'live':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'completed':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };
  
  const getTimeRemaining = (contest: Contest) => {
    const now = new Date();
    let targetTime: Date;
    
    if (contest.status === 'upcoming') {
      targetTime = new Date(contest.startTime);
      if (targetTime <= now) return 'Starting soon';
    } else if (contest.status === 'live') {
      targetTime = new Date(contest.endTime);
      if (targetTime <= now) return 'Ending soon';
    } else {
      return 'Completed';
    }
    
    const diffMs = targetTime.getTime() - now.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHrs > 0) {
      return `${diffHrs}h ${diffMins}m ${contest.status === 'upcoming' ? 'to start' : 'remaining'}`;
    } else {
      return `${diffMins}m ${contest.status === 'upcoming' ? 'to start' : 'remaining'}`;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white pb-20">
      {/* Header with Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-black/70 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 text-2xl font-extrabold">QuizGame</div>
          </Link>
          <nav className="flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Home</Link>
            <Link href="/pages/contests" className="text-purple-400 transition-colors duration-200 font-medium">Contests</Link>
            <Link href="/pages/wallet" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Wallet</Link>
            <Link href="/pages/profile" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Profile</Link>
          </nav>
        </div>
      </header>

      {/* Contests Header */}
      <div className="relative pt-16 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <div className="h-1/3 bg-gradient-to-b from-purple-900/30 to-transparent sm:h-2/3"></div>
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Quiz Contests</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Join exciting quiz contests, test your knowledge, and win amazing prizes!
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl border border-gray-700 mb-8">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-900/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Search contests..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setActiveFilter('all')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${activeFilter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setActiveFilter('upcoming')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${activeFilter === 'upcoming' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  >
                    Upcoming
                  </button>
                  <button
                    onClick={() => setActiveFilter('live')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${activeFilter === 'live' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  >
                    Live
                  </button>
                  <button
                    onClick={() => setActiveFilter('completed')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${activeFilter === 'completed' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  >
                    Completed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contests Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredContests.length === 0 ? (
          <div className="text-center py-12 bg-gray-800/50 rounded-xl border border-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-gray-300">No contests found</h3>
            <p className="mt-2 text-gray-400">Try changing your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContests.map(contest => (
              <div 
                key={contest.id} 
                className="bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10"
              >
                <div className="h-48 bg-gray-700 relative overflow-hidden">
                  {contest.image ? (
                    <img 
                      src={contest.image} 
                      alt={contest.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/50 to-pink-900/50">
                      <span className="text-2xl font-bold text-white">{contest.category}</span>
                    </div>
                  )}
                  <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(contest.status)} border`}>
                      {contest.status.charAt(0).toUpperCase() + contest.status.slice(1)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(contest.difficulty)} border`}>
                      {contest.difficulty.charAt(0).toUpperCase() + contest.difficulty.slice(1)}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium bg-gray-800/80 px-2 py-1 rounded-md">
                        {contest.category}
                      </span>
                      <span className="text-xs font-medium bg-gray-800/80 px-2 py-1 rounded-md flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {getTimeRemaining(contest)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2">{contest.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{contest.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-700/50 p-3 rounded-lg">
                      <p className="text-xs text-gray-400">Entry Fee</p>
                      <p className="text-lg font-bold">{contest.entryFee} coins</p>
                    </div>
                    <div className="bg-gray-700/50 p-3 rounded-lg">
                      <p className="text-xs text-gray-400">Prize Pool</p>
                      <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">{contest.prizePool} coins</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span className="text-sm text-gray-400">{contest.participants}/{contest.maxParticipants}</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-gray-400">{contest.questions} Questions</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-gray-400">{contest.duration} min</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleViewContest(contest.id)}
                      className="py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-200 flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Details
                    </button>
                    
                    {contest.status === 'upcoming' && (
                      <button
                        onClick={() => handleJoinContest(contest)}
                        className="py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-purple-500/30 flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Join
                      </button>
                    )}
                    {contest.status === 'live' && (
                      <button
                        onClick={() => handleJoinContest(contest)}
                        className="py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-green-500/30 flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Play
                      </button>
                    )}
                    {contest.status === 'completed' && (
                      <button
                        onClick={() => handleViewContest(contest.id)}
                        className="py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Results
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Join Contest Modal */}
      {showJoinModal && selectedContest && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-gray-700">
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-white mb-4">Join Contest</h3>
                    <div className="mt-2">
                      <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
                        <h4 className="text-xl font-bold mb-2">{selectedContest.title}</h4>
                        <p className="text-gray-300 text-sm mb-4">{selectedContest.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="bg-gray-800/70 p-3 rounded-lg">
                            <p className="text-xs text-gray-400">Entry Fee</p>
                            <p className="text-lg font-bold">{selectedContest.entryFee} coins</p>
                          </div>
                          <div className="bg-gray-800/70 p-3 rounded-lg">
                            <p className="text-xs text-gray-400">Prize Pool</p>
                            <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">{selectedContest.prizePool} coins</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedContest.status)} border`}>
                            {selectedContest.status.charAt(0).toUpperCase() + selectedContest.status.slice(1)}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedContest.difficulty)} border`}>
                            {selectedContest.difficulty.charAt(0).toUpperCase() + selectedContest.difficulty.slice(1)}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-600/50 text-gray-300 border border-gray-500/30">
                            {selectedContest.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="bg-gray-700/50 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-300 mb-2">Contest Details</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex justify-between">
                            <span className="text-gray-400">Questions:</span>
                            <span className="text-white font-medium">{selectedContest.questions}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-400">Duration:</span>
                            <span className="text-white font-medium">{selectedContest.duration} minutes</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-400">Starts:</span>
                            <span className="text-white font-medium">{new Date(selectedContest.startTime).toLocaleString()}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-gray-400">Participants:</span>
                            <span className="text-white font-medium">{selectedContest.participants}/{selectedContest.maxParticipants}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900/50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={confirmJoinContest}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Confirm & Pay {selectedContest.entryFee} coins
                </button>
                <button
                  type="button"
                  onClick={() => setShowJoinModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-700 shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContestsPage;
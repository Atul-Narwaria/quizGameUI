import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface UserProfile {
  name: string;
  email: string;
  joinedDate: string;
  totalContests: number;
  contestsWon: number;
  totalEarnings: number;
  avatarUrl?: string;
  level: number;
  xp: number;
  badges: Badge[];
  recentActivity: Activity[];
}

interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedOn: string;
}

interface Activity {
  id: string;
  type: 'contest_joined' | 'contest_won' | 'badge_earned' | 'level_up';
  title: string;
  description: string;
  timestamp: string;
  metadata?: any;
}

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    // In a real app, we would fetch this data from an API
    // For this static site, we'll use localStorage and mock data
    const fetchUserData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Check if user is logged in via localStorage
        const storedUser = localStorage.getItem('quizGameUser');
        
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          
          // Combine with mock profile data
          setUser({
            name: parsedUser.name || 'Demo User',
            email: parsedUser.email || 'user@example.com',
            joinedDate: '2023-01-15',
            totalContests: 24,
            contestsWon: 7,
            totalEarnings: 12500,
            level: 8,
            xp: 7600,
            badges: [
              {
                id: 'badge1',
                name: 'Quiz Master',
                icon: '🏆',
                description: 'Won 5 contests',
                earnedOn: '2023-03-20'
              },
              {
                id: 'badge2',
                name: 'Streak Keeper',
                icon: '🔥',
                description: 'Participated in contests for 7 consecutive days',
                earnedOn: '2023-02-10'
              },
              {
                id: 'badge3',
                name: 'Perfect Score',
                icon: '⭐',
                description: 'Achieved 100% in a quiz',
                earnedOn: '2023-04-05'
              },
            ],
            recentActivity: [
              {
                id: 'act1',
                type: 'contest_won',
                title: 'Won Sports Quiz Championship',
                description: 'Ranked 1st place and won ₹2000',
                timestamp: '2023-07-10T14:30:00'
              },
              {
                id: 'act2',
                type: 'badge_earned',
                title: 'Earned Perfect Score Badge',
                description: 'Achieved 100% in Science Quiz',
                timestamp: '2023-07-05T18:45:00'
              },
              {
                id: 'act3',
                type: 'level_up',
                title: 'Reached Level 8',
                description: 'Gained 500 XP and unlocked new contests',
                timestamp: '2023-06-28T12:15:00'
              },
              {
                id: 'act4',
                type: 'contest_joined',
                title: 'Joined Movies & Entertainment Quiz',
                description: 'Entry fee: ₹50',
                timestamp: '2023-06-20T19:30:00'
              },
            ]
          });
        } else {
          // Redirect to login if not logged in
          router.push('/pages/login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [router]);
  
  const handleLogout = () => {
    localStorage.removeItem('quizGameUser');
    router.push('/');
  };
  
  const getProgressBarWidth = () => {
    if (!user) return '0%';
    const xpForCurrentLevel = user.level * 1000;
    const xpForNextLevel = (user.level + 1) * 1000;
    const xpRange = xpForNextLevel - xpForCurrentLevel;
    const xpProgress = user.xp - xpForCurrentLevel;
    const progressPercentage = (xpProgress / xpRange) * 100;
    return `${progressPercentage}%`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Router will redirect to login
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
            <Link href="/contests" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Contests</Link>
            <Link href="/wallet" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Wallet</Link>
            <button 
              onClick={handleLogout}
              className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      {/* Profile Header */}
      <div className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <div className="h-1/3 bg-gradient-to-b from-purple-900/30 to-transparent sm:h-2/3"></div>
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl border border-gray-700">
            <div className="px-4 py-5 sm:px-6 flex flex-col md:flex-row justify-between items-center">
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-3xl font-bold">
                    {user.avatarUrl ? (
                      <img src={user.avatarUrl} alt={user.name} className="h-24 w-24 rounded-full object-cover" />
                    ) : (
                      user.name.charAt(0)
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-green-500 h-5 w-5 rounded-full border-2 border-gray-800"></div>
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-gray-400 text-sm">Member since {new Date(user.joinedDate).toLocaleDateString()}</p>
                  <div className="mt-2 flex items-center justify-center md:justify-start space-x-2">
                    <div className="flex items-center space-x-1 bg-purple-900/30 px-2 py-1 rounded-full">
                      <span className="text-purple-400 text-xs font-medium">Level {user.level}</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-yellow-900/30 px-2 py-1 rounded-full">
                      <span className="text-yellow-400 text-xs font-medium">{user.totalContests} Contests</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-green-900/30 px-2 py-1 rounded-full">
                      <span className="text-green-400 text-xs font-medium">{user.contestsWon} Wins</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 md:mt-0 flex flex-col items-center md:items-end">
                <div className="text-center md:text-right">
                  <p className="text-gray-400 text-sm">Total Earnings</p>
                  <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">₹{user.totalEarnings}</p>
                </div>
                <div className="mt-4 w-full max-w-xs">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Level {user.level}</span>
                    <span>Level {user.level + 1}</span>
                  </div>
                  <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" 
                      style={{ width: getProgressBarWidth() }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 text-center">{user.xp} XP</p>
                </div>
              </div>
            </div>
            
            {/* Profile Navigation */}
            <div className="border-t border-gray-700">
              <nav className="flex overflow-x-auto">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${activeTab === 'overview' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'}`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('badges')}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${activeTab === 'badges' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'}`}
                >
                  Badges
                </button>
                <button
                  onClick={() => setActiveTab('activity')}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${activeTab === 'activity' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'}`}
                >
                  Activity
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${activeTab === 'settings' ? 'text-purple-400 border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'}`}
                >
                  Settings
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700 transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Contests Played</h3>
                    <div className="p-2 bg-purple-900/30 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-3xl font-bold">{user.totalContests}</p>
                  <p className="text-sm text-gray-400 mt-2">Across all categories</p>
                </div>
                
                <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700 transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Win Rate</h3>
                    <div className="p-2 bg-green-900/30 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-3xl font-bold">{Math.round((user.contestsWon / user.totalContests) * 100)}%</p>
                  <p className="text-sm text-gray-400 mt-2">{user.contestsWon} wins out of {user.totalContests}</p>
                </div>
                
                <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700 transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Earnings</h3>
                    <div className="p-2 bg-yellow-900/30 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">₹{user.totalEarnings}</p>
                  <p className="text-sm text-gray-400 mt-2">Avg ₹{Math.round(user.totalEarnings / user.contestsWon)} per win</p>
                </div>
              </div>
              
              {/* Recent Activity */}
              <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Recent Activity</h3>
                  <button 
                    onClick={() => setActiveTab('activity')}
                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {user.recentActivity.slice(0, 3).map(activity => (
                    <div key={activity.id} className="flex items-start p-4 bg-gray-700/50 rounded-lg border border-gray-600/50">
                      <div className={`p-2 rounded-lg mr-4 ${activity.type === 'contest_won' ? 'bg-green-900/30' : activity.type === 'badge_earned' ? 'bg-yellow-900/30' : activity.type === 'level_up' ? 'bg-purple-900/30' : 'bg-blue-900/30'}`}>
                        {activity.type === 'contest_won' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        {activity.type === 'badge_earned' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        )}
                        {activity.type === 'level_up' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        )}
                        {activity.type === 'contest_joined' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{activity.title}</h4>
                        <p className="text-sm text-gray-400">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{new Date(activity.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Badges Section */}
            <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Badges</h3>
                <button 
                  onClick={() => setActiveTab('badges')}
                  className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                >
                  View All
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {user.badges.map(badge => (
                  <div key={badge.id} className="flex items-center p-4 bg-gray-700/50 rounded-lg border border-gray-600/50 hover:border-yellow-500/30 transition-colors">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-yellow-900/30 text-2xl mr-4">
                      {badge.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{badge.name}</h4>
                      <p className="text-sm text-gray-400">{badge.description}</p>
                      <p className="text-xs text-gray-500 mt-1">Earned on {new Date(badge.earnedOn).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'badges' && (
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-6">Your Badges</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {user.badges.map(badge => (
                <div key={badge.id} className="flex items-center p-6 bg-gray-700/50 rounded-lg border border-gray-600/50 hover:border-yellow-500/30 transition-colors">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-yellow-900/30 text-3xl mr-6">
                    {badge.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">{badge.name}</h4>
                    <p className="text-gray-400">{badge.description}</p>
                    <p className="text-xs text-gray-500 mt-2">Earned on {new Date(badge.earnedOn).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
              
              {/* Locked badges */}
              <div className="flex items-center p-6 bg-gray-700/20 rounded-lg border border-gray-600/30 opacity-60">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-800/50 text-3xl mr-6">
                  🎯
                </div>
                <div>
                  <h4 className="font-medium text-lg">Sharpshooter</h4>
                  <p className="text-gray-400">Answer 50 questions correctly in a row</p>
                  <p className="text-xs text-gray-500 mt-2">Not earned yet</p>
                </div>
              </div>
              
              <div className="flex items-center p-6 bg-gray-700/20 rounded-lg border border-gray-600/30 opacity-60">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-800/50 text-3xl mr-6">
                  💰
                </div>
                <div>
                  <h4 className="font-medium text-lg">Big Winner</h4>
                  <p className="text-gray-400">Win a total of ₹25,000</p>
                  <p className="text-xs text-gray-500 mt-2">Not earned yet</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'activity' && (
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-6">Activity History</h3>
            <div className="space-y-6">
              {user.recentActivity.map(activity => (
                <div key={activity.id} className="flex items-start p-6 bg-gray-700/50 rounded-lg border border-gray-600/50">
                  <div className={`p-3 rounded-lg mr-6 ${activity.type === 'contest_won' ? 'bg-green-900/30' : activity.type === 'badge_earned' ? 'bg-yellow-900/30' : activity.type === 'level_up' ? 'bg-purple-900/30' : 'bg-blue-900/30'}`}>
                    {activity.type === 'contest_won' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {activity.type === 'badge_earned' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    )}
                    {activity.type === 'level_up' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    )}
                    {activity.type === 'contest_joined' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-lg">{activity.title}</h4>
                    <p className="text-gray-400">{activity.description}</p>
                    <p className="text-sm text-gray-500 mt-2">{new Date(activity.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-6">Account Settings</h3>
            <div className="space-y-8">
              {/* Profile Information */}
              <div>
                <h4 className="text-lg font-medium mb-4">Profile Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      defaultValue={user.name}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-500 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      defaultValue={user.email}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-500 transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
              
              {/* Password Change */}
              <div>
                <h4 className="text-lg font-medium mb-4">Change Password</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-300 mb-2">
                      Current Password
                    </label>
                    <input
                      id="current-password"
                      name="current-password"
                      type="password"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-500 transition-all duration-200"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-300 mb-2">
                      New Password
                    </label>
                    <input
                      id="new-password"
                      name="new-password"
                      type="password"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-500 transition-all duration-200"
                      placeholder="Enter new password"
                    />
                  </div>
                </div>
              </div>
              
              {/* Notification Settings */}
              <div>
                <h4 className="text-lg font-medium mb-4">Notification Settings</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                    <div>
                      <h5 className="font-medium">Email Notifications</h5>
                      <p className="text-sm text-gray-400">Receive emails about contest results and winnings</p>
                    </div>
                    <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full bg-gray-600">
                      <label htmlFor="email-notifications" className="absolute left-0 w-6 h-6 mb-2 transition duration-100 ease-in-out transform bg-white rounded-full cursor-pointer">
                        <input type="checkbox" id="email-notifications" name="email-notifications" className="absolute w-0 h-0 opacity-0" />
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                    <div>
                      <h5 className="font-medium">Contest Reminders</h5>
                      <p className="text-sm text-gray-400">Get notified before contests you've registered for</p>
                    </div>
                    <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full bg-purple-600">
                      <label htmlFor="contest-reminders" className="absolute left-6 w-6 h-6 mb-2 transition duration-100 ease-in-out transform bg-white rounded-full cursor-pointer">
                        <input type="checkbox" id="contest-reminders" name="contest-reminders" className="absolute w-0 h-0 opacity-0" checked />
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                    <div>
                      <h5 className="font-medium">Marketing Communications</h5>
                      <p className="text-sm text-gray-400">Receive updates about new features and promotions</p>
                    </div>
                    <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full bg-gray-600">
                      <label htmlFor="marketing-comms" className="absolute left-0 w-6 h-6 mb-2 transition duration-100 ease-in-out transform bg-white rounded-full cursor-pointer">
                        <input type="checkbox" id="marketing-comms" name="marketing-comms" className="absolute w-0 h-0 opacity-0" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-700">
                <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200">
                  Cancel
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-purple-500/30">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
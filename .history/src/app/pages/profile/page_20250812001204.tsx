import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: string;
  totalContests: number;
  contestsWon: number;
  totalWinnings: number;
  currentStreak: number;
  bestStreak: number;
  averageScore: number;
  rank: number;
  badges: string[];
}

const ProfilePage = () => {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const storedUser = localStorage.getItem('quizGameUser');
        
        if (storedUser) {
          // Mock profile data
          const mockProfile: UserProfile = {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            joinDate: '2023-01-15',
            totalContests: 45,
            contestsWon: 12,
            totalWinnings: 15750,
            currentStreak: 3,
            bestStreak: 7,
            averageScore: 8.3,
            rank: 42,
            badges: ['First Win', 'Speed Demon', 'Knowledge Seeker', 'Perfect Score'],
          };
          
          setUserProfile(mockProfile);
        } else {
          router.push('/pages/login');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!userProfile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white pb-20">
      {/* Header with Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-black/70 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 text-2xl font-extrabold">
            QuizGame
          </Link>
          <nav className="flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Home</Link>
            <Link href="/pages/contests" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Contests</Link>
            <Link href="/pages/wallet" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Wallet</Link>
            <Link href="/pages/profile" className="text-purple-400 transition-colors duration-200 font-medium">Profile</Link>
          </nav>
        </div>
      </header>

      {/* Profile Header */}
      <div className="relative pt-16 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <div className="h-2/3 bg-gradient-to-b from-purple-900/30 via-pink-900/20 to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto">
          {/* Profile Card */}
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl border border-gray-700">
            <div className="p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-4xl font-bold shadow-2xl">
                    {userProfile.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold mb-2">{userProfile.name}</h1>
                  <p className="text-gray-400 mb-4">{userProfile.email}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                    <div className="bg-purple-600/20 px-3 py-1 rounded-full text-sm">
                      Rank #{userProfile.rank}
                    </div>
                    <div className="bg-green-600/20 px-3 py-1 rounded-full text-sm">
                      {userProfile.contestsWon} Wins
                    </div>
                    <div className="bg-yellow-600/20 px-3 py-1 rounded-full text-sm">
                      {userProfile.currentStreak} Win Streak
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">
                    Joined {new Date(userProfile.joinDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                      ₹{userProfile.totalWinnings.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400">Total Winnings</div>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-400">
                      {userProfile.averageScore}/10
                    </div>
                    <div className="text-xs text-gray-400">Avg Score</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-t border-gray-700">
              <nav className="flex overflow-x-auto">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-all duration-200 ${activeTab === 'overview' ? 'text-purple-400 border-b-2 border-purple-500 bg-purple-500/10' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'}`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('achievements')}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-all duration-200 ${activeTab === 'achievements' ? 'text-purple-400 border-b-2 border-purple-500 bg-purple-500/10' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'}`}
                >
                  Achievements
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-all duration-200 ${activeTab === 'history' ? 'text-purple-400 border-b-2 border-purple-500 bg-purple-500/10' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'}`}
                >
                  Contest History
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-all duration-200 ${activeTab === 'settings' ? 'text-purple-400 border-b-2 border-purple-500 bg-purple-500/10' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'}`}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stats Cards */}
            <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Total Contests</h3>
                <div className="p-2 bg-blue-900/30 rounded-lg">
                  <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold">{userProfile.totalContests}</p>
            </div>

            <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Win Rate</h3>
                <div className="p-2 bg-green-900/30 rounded-lg">
                  <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-green-400">
                {Math.round((userProfile.contestsWon / userProfile.totalContests) * 100)}%
              </p>
            </div>

            <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Best Streak</h3>
                <div className="p-2 bg-yellow-900/30 rounded-lg">
                  <svg className="h-5 w-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-yellow-400">{userProfile.bestStreak}</p>
            </div>

            <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Badges Earned</h3>
                <div className="p-2 bg-purple-900/30 rounded-lg">
                  <svg className="h-5 w-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-purple-400">{userProfile.badges.length}</p>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-6">Achievements & Badges</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userProfile.badges.map((badge, index) => (
                <div key={index} className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg p-4 border border-purple-500/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-yellow-900" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">{badge}</h4>
                      <p className="text-sm text-gray-400">Earned recently</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-6">Contest History</h3>
            <div className="space-y-4">
              {/* Mock contest history */}
              {[
                { name: 'Sports Quiz Championship', date: '2023-07-15', score: '9/10', prize: '₹500', status: 'won' },
                { name: 'Movies Quiz Battle', date: '2023-07-12', score: '7/10', prize: '₹100', status: 'lost' },
                { name: 'General Knowledge Master', date: '2023-07-10', score: '10/10', prize: '₹1000', status: 'won' },
              ].map((contest, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg border border-gray-600/50">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${contest.status === 'won' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div>
                      <h4 className="font-medium">{contest.name}</h4>
                      <p className="text-sm text-gray-400">{new Date(contest.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Score: {contest.score}</p>
                    <p className={`text-sm ${contest.status === 'won' ? 'text-green-400' : 'text-red-400'}`}>
                      {contest.status === 'won' ? `+${contest.prize}` : 'No prize'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-6">Account Settings</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Display Name</label>
                <input
                  type="text"
                  defaultValue={userProfile.name}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={userProfile.email}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-lg font-medium">Email Notifications</h4>
                  <p className="text-sm text-gray-400">Receive notifications about contests and results</p>
                </div>
                <button className="bg-purple-600 relative inline-flex h-6 w-11 items-center rounded-full">
                  <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition"></span>
                </button>
              </div>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105">
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

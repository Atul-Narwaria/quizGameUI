import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'contest_entry' | 'contest_winning';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  timestamp: string;
  description: string;
  metadata?: any;
}

interface WalletData {
  balance: number;
  transactions: Transaction[];
}

const WalletPage = () => {
  const router = useRouter();
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  
  useEffect(() => {
    // In a real app, we would fetch this data from an API
    // For this static site, we'll use localStorage and mock data
    const fetchWalletData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Check if user is logged in via localStorage
        const storedUser = localStorage.getItem('quizGameUser');
        
        if (storedUser) {
          // Get wallet data from localStorage or use mock data
          const storedWallet = localStorage.getItem('quizGameWallet');
          
          if (storedWallet) {
            setWalletData(JSON.parse(storedWallet));
          } else {
            // Mock wallet data
            const mockWalletData: WalletData = {
              balance: 1250,
              transactions: [
                {
                  id: 'txn1',
                  type: 'deposit',
                  amount: 500,
                  status: 'completed',
                  timestamp: '2023-07-15T10:30:00',
                  description: 'Added money via UPI',
                },
                {
                  id: 'txn2',
                  type: 'contest_entry',
                  amount: -100,
                  status: 'completed',
                  timestamp: '2023-07-14T18:45:00',
                  description: 'Entry fee for Sports Quiz Championship',
                },
                {
                  id: 'txn3',
                  type: 'contest_winning',
                  amount: 850,
                  status: 'completed',
                  timestamp: '2023-07-10T20:15:00',
                  description: 'Won 1st place in Movies Quiz',
                },
                {
                  id: 'txn4',
                  type: 'withdrawal',
                  amount: -500,
                  status: 'completed',
                  timestamp: '2023-07-05T14:20:00',
                  description: 'Withdrawal to bank account',
                },
                {
                  id: 'txn5',
                  type: 'deposit',
                  amount: 1000,
                  status: 'completed',
                  timestamp: '2023-07-01T09:10:00',
                  description: 'Added money via Credit Card',
                },
              ],
            };
            
            setWalletData(mockWalletData);
            localStorage.setItem('quizGameWallet', JSON.stringify(mockWalletData));
          }
        } else {
          // Redirect to login if not logged in
          router.push('/pages/login');
        }
      } catch (error) {
        console.error('Error fetching wallet data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchWalletData();
  }, [router]);
  
  const handleAddMoney = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const amountNum = Number(amount);
      
      if (walletData) {
        const newTransaction: Transaction = {
          id: `txn${Date.now()}`,
          type: 'deposit',
          amount: amountNum,
          status: 'completed',
          timestamp: new Date().toISOString(),
          description: `Added money via ${paymentMethod.toUpperCase()}`,
        };
        
        const updatedWalletData = {
          balance: walletData.balance + amountNum,
          transactions: [newTransaction, ...walletData.transactions],
        };
        
        setWalletData(updatedWalletData);
        localStorage.setItem('quizGameWallet', JSON.stringify(updatedWalletData));
        setShowAddMoneyModal(false);
        setAmount('');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleWithdraw = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    
    const amountNum = Number(amount);
    
    if (walletData && amountNum > walletData.balance) {
      alert('Insufficient balance');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Simulate withdrawal processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (walletData) {
        const newTransaction: Transaction = {
          id: `txn${Date.now()}`,
          type: 'withdrawal',
          amount: -amountNum,
          status: 'completed',
          timestamp: new Date().toISOString(),
          description: `Withdrawal to ${paymentMethod === 'bank' ? 'bank account' : 'UPI'}`,
        };
        
        const updatedWalletData = {
          balance: walletData.balance - amountNum,
          transactions: [newTransaction, ...walletData.transactions],
        };
        
        setWalletData(updatedWalletData);
        localStorage.setItem('quizGameWallet', JSON.stringify(updatedWalletData));
        setShowWithdrawModal(false);
        setAmount('');
      }
    } catch (error) {
      console.error('Error processing withdrawal:', error);
      alert('Withdrawal processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit':
        return (
          <div className="p-3 bg-green-900/30 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
        );
      case 'withdrawal':
        return (
          <div className="p-3 bg-red-900/30 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
        );
      case 'contest_entry':
        return (
          <div className="p-3 bg-blue-900/30 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
          </div>
        );
      case 'contest_winning':
        return (
          <div className="p-3 bg-yellow-900/30 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!walletData) {
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
            <Link href="/pages/contests" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Contests</Link>
            <Link href="/pages/wallet" className="text-purple-400 transition-colors duration-200 font-medium">Wallet</Link>
            <Link href="/pages/profile" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Profile</Link>
          </nav>
        </div>
      </header>

      {/* Attractive Wallet Card Section */}
      <div className="relative pt-16 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <div className="h-2/3 bg-gradient-to-b from-purple-900/30 via-pink-900/20 to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto">
          {/* Main Wallet Card */}
          <div className="flex justify-center mb-10">
            <div className="relative group">
              {/* Card Background with Animations */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 rounded-3xl blur opacity-30 group-hover:opacity-50 animate-pulse"></div>
              
              {/* Main Card */}
              <div className="relative w-96 h-56 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
                {/* Card Pattern/Texture */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                <div className="absolute top-4 right-4 w-12 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded opacity-80"></div>
                <div className="absolute top-4 right-20 w-12 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded opacity-60"></div>
                
                {/* Card Content */}
                <div className="relative h-full flex flex-col justify-between p-8 text-white">
                  {/* Top Section */}
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
                        </svg>
                        <span className="text-sm font-semibold opacity-90">QuizGame Wallet</span>
                      </div>
                      <div className="text-xs opacity-70">Digital Wallet</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs opacity-70 mb-1">Available Balance</div>
                      <div className="text-2xl font-bold tracking-wide">₹{walletData.balance.toFixed(2)}</div>
                    </div>
                  </div>

                  {/* Middle Section - Card Number Style */}
                  <div className="flex justify-center">
                    <div className="text-lg font-mono tracking-widest opacity-80">
                      •••• •••• •••• {String(Math.floor(walletData.balance)).slice(-4).padStart(4, '0')}
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-xs opacity-70">Valid Thru</div>
                      <div className="text-sm font-semibold">∞</div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setShowAddMoneyModal(true)}
                        className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-xs font-semibold transition-all duration-200 border border-white/30 hover:border-white/50 transform hover:scale-105"
                      >
                        + Add Money
                      </button>
                      <button
                        onClick={() => setShowWithdrawModal(true)}
                        className="px-4 py-2 bg-black/20 hover:bg-black/30 backdrop-blur-sm rounded-lg text-xs font-semibold transition-all duration-200 border border-white/20 hover:border-white/40 transform hover:scale-105"
                      >
                        ↗ Withdraw
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs Card */}
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl border border-gray-700">
            <div className="border-b border-gray-700">
              <nav className="flex overflow-x-auto">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-all duration-200 ${activeTab === 'overview' ? 'text-purple-400 border-b-2 border-purple-500 bg-purple-500/10' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'}`}
                >
                  <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('transactions')}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-all duration-200 ${activeTab === 'transactions' ? 'text-purple-400 border-b-2 border-purple-500 bg-purple-500/10' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'}`}
                >
                  <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Transactions
                </button>
                <button
                  onClick={() => setActiveTab('payment-methods')}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-all duration-200 ${activeTab === 'payment-methods' ? 'text-purple-400 border-b-2 border-purple-500 bg-purple-500/10' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'}`}
                >
                  <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Payment Methods
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700 transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Total Added</h3>
                  <div className="p-2 bg-green-900/30 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </div>
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
                  ₹{walletData.transactions
                    .filter(t => t.type === 'deposit')
                    .reduce((sum, t) => sum + t.amount, 0)
                    .toFixed(2)}
                </p>
                <p className="text-sm text-gray-400 mt-2">Total money added to wallet</p>
              </div>
              
              <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700 transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Total Winnings</h3>
                  <div className="p-2 bg-yellow-900/30 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                  ₹{walletData.transactions
                    .filter(t => t.type === 'contest_winning')
                    .reduce((sum, t) => sum + t.amount, 0)
                    .toFixed(2)}
                </p>
                <p className="text-sm text-gray-400 mt-2">Total contest winnings</p>
              </div>
              
              <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700 transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Contest Entries</h3>
                  <div className="p-2 bg-blue-900/30 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                  </div>
                </div>
                <p className="text-3xl font-bold">
                  ₹{Math.abs(walletData.transactions
                    .filter(t => t.type === 'contest_entry')
                    .reduce((sum, t) => sum + t.amount, 0))
                    .toFixed(2)}
                </p>
                <p className="text-sm text-gray-400 mt-2">Total spent on contests</p>
              </div>
            </div>
            
            {/* Recent Transactions */}
            <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Recent Transactions</h3>
                <button 
                  onClick={() => setActiveTab('transactions')}
                  className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                >
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {walletData.transactions.slice(0, 5).map(transaction => (
                  <div key={transaction.id} className="flex items-start p-4 bg-gray-700/50 rounded-lg border border-gray-600/50">
                    {getTransactionIcon(transaction.type)}
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{transaction.description}</h4>
                        <p className={`font-bold ${transaction.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex justify-between mt-1">
                        <p className="text-xs text-gray-500">{new Date(transaction.timestamp).toLocaleString()}</p>
                        <p className="text-xs px-2 py-1 rounded-full bg-gray-600/50">{transaction.status}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'transactions' && (
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-6">All Transactions</h3>
            
            {/* Transaction Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
              <button className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-medium">
                All Transactions
              </button>
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full text-sm font-medium">
                Deposits
              </button>
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full text-sm font-medium">
                Withdrawals
              </button>
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full text-sm font-medium">
                Contest Entries
              </button>
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full text-sm font-medium">
                Contest Winnings
              </button>
            </div>
            
            {/* Transactions List */}
            <div className="space-y-4">
              {walletData.transactions.map(transaction => (
                <div key={transaction.id} className="flex items-start p-4 bg-gray-700/50 rounded-lg border border-gray-600/50 hover:border-gray-500 transition-colors">
                  {getTransactionIcon(transaction.type)}
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{transaction.description}</h4>
                      <p className={`font-bold ${transaction.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-gray-500">{new Date(transaction.timestamp).toLocaleString()}</p>
                      <p className={`text-xs px-2 py-1 rounded-full ${transaction.status === 'completed' ? 'bg-green-900/30 text-green-400' : transaction.status === 'pending' ? 'bg-yellow-900/30 text-yellow-400' : 'bg-red-900/30 text-red-400'}`}>
                        {transaction.status}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'payment-methods' && (
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold mb-6">Payment Methods</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* UPI */}
              <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600/50 hover:border-purple-500/30 transition-colors">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium">UPI</h4>
                  <div className="p-2 bg-purple-900/30 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-400 mb-4">Make instant payments using UPI</p>
                <div className="flex space-x-2">
                  <img src="/images/upi-icon.png" alt="UPI" className="h-8" />
                  <img src="/images/gpay-icon.png" alt="Google Pay" className="h-8" />
                  <img src="/images/phonepe-icon.png" alt="PhonePe" className="h-8" />
                  <img src="/images/paytm-icon.png" alt="Paytm" className="h-8" />
                </div>
              </div>
              
              {/* Credit/Debit Card */}
              <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600/50 hover:border-purple-500/30 transition-colors">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium">Credit/Debit Card</h4>
                  <div className="p-2 bg-blue-900/30 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-400 mb-4">Add money using credit or debit card</p>
                <div className="flex space-x-2">
                  <img src="/images/visa-icon.png" alt="Visa" className="h-8" />
                  <img src="/images/mastercard-icon.png" alt="Mastercard" className="h-8" />
                  <img src="/images/rupay-icon.png" alt="RuPay" className="h-8" />
                </div>
              </div>
              
              {/* Net Banking */}
              <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600/50 hover:border-purple-500/30 transition-colors">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium">Net Banking</h4>
                  <div className="p-2 bg-green-900/30 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-400 mb-4">Transfer money using net banking</p>
                <div className="flex space-x-2">
                  <img src="/images/sbi-icon.png" alt="SBI" className="h-8" />
                  <img src="/images/hdfc-icon.png" alt="HDFC" className="h-8" />
                  <img src="/images/icici-icon.png" alt="ICICI" className="h-8" />
                  <img src="/images/axis-icon.png" alt="Axis" className="h-8" />
                </div>
              </div>
              
              {/* Wallet */}
              <div className="bg-gray-700/50 rounded-lg p-6 border border-gray-600/50 hover:border-purple-500/30 transition-colors">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium">Wallets</h4>
                  <div className="p-2 bg-yellow-900/30 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <p className="text-gray-400 mb-4">Use digital wallets for quick payments</p>
                <div className="flex space-x-2">
                  <img src="/images/paytm-icon.png" alt="Paytm" className="h-8" />
                  <img src="/images/amazon-pay-icon.png" alt="Amazon Pay" className="h-8" />
                  <img src="/images/mobikwik-icon.png" alt="MobiKwik" className="h-8" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Money Modal */}
      {showAddMoneyModal && (
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
                    <h3 className="text-lg leading-6 font-medium text-white mb-4">Add Money to Wallet</h3>
                    <div className="mt-2">
                      <div className="mb-4">
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-2">
                          Amount (₹)
                        </label>
                        <input
                          type="number"
                          name="amount"
                          id="amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-500 transition-all duration-200"
                          placeholder="Enter amount"
                          min="1"
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="payment-method" className="block text-sm font-medium text-gray-300 mb-2">
                          Payment Method
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('upi')}
                            className={`flex items-center justify-center px-4 py-3 rounded-lg border ${paymentMethod === 'upi' ? 'border-purple-500 bg-purple-900/20' : 'border-gray-700 bg-gray-900/50 hover:bg-gray-700/50'}`}
                          >
                            <span className="text-sm font-medium">UPI</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('card')}
                            className={`flex items-center justify-center px-4 py-3 rounded-lg border ${paymentMethod === 'card' ? 'border-purple-500 bg-purple-900/20' : 'border-gray-700 bg-gray-900/50 hover:bg-gray-700/50'}`}
                          >
                            <span className="text-sm font-medium">Card</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('netbanking')}
                            className={`flex items-center justify-center px-4 py-3 rounded-lg border ${paymentMethod === 'netbanking' ? 'border-purple-500 bg-purple-900/20' : 'border-gray-700 bg-gray-900/50 hover:bg-gray-700/50'}`}
                          >
                            <span className="text-sm font-medium">Net Banking</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('wallet')}
                            className={`flex items-center justify-center px-4 py-3 rounded-lg border ${paymentMethod === 'wallet' ? 'border-purple-500 bg-purple-900/20' : 'border-gray-700 bg-gray-900/50 hover:bg-gray-700/50'}`}
                          >
                            <span className="text-sm font-medium">Wallet</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900/50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleAddMoney}
                  disabled={isProcessing}
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : 'Add Money'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddMoneyModal(false)}
                  disabled={isProcessing}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-700 shadow-sm px-4 py-2 bg-gray-800 text-base font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
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
                    <h3 className="text-lg leading-6 font-medium text-white mb-4">Withdraw Money</h3>
                    <div className="mt-2">
                      <div className="mb-4">
                        <label htmlFor="withdraw-amount" className="block text-sm font-medium text-gray-300 mb-2">
                          Amount (₹)
                        </label>
                        <input
                          type="number"
                          name="withdraw-amount"
                          id="withdraw-amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-500 transition-all duration-200"
                          placeholder="Enter amount"
                          min="1"
                          max={walletData.balance}
                        />
                        <p className="text-sm text-gray-400 mt-1">Available balance: ₹{walletData.balance.toFixed(2)}</p>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="withdraw-method" className="block text-sm font-medium text-gray-300 mb-2">
                          Withdraw To
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('bank')}
                            className={`flex items-center justify-center px-4 py-3 rounded-lg border ${paymentMethod === 'bank' ? 'border-purple-500 bg-purple-900/20' : 'border-gray-700 bg-gray-900/50 hover:bg-gray-700/50'}`}
                          >
                            <span className="text-sm font-medium">Bank Account</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('upi')}
                            className={`flex items-center justify-center px-4 py-3 rounded-lg border ${paymentMethod === 'upi' ? 'border-purple-500 bg-purple-900/20' : 'border-gray-700 bg-gray-900/50 hover:bg-gray-700/50'}`}
                          >
                            <span className="text-sm font-medium">UPI</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900/50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleWithdraw}
                  disabled={isProcessing}
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : 'Withdraw'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowWithdrawModal(false)}
                  disabled={isProcessing}
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

export default WalletPage;
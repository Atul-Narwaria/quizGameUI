import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

interface ContestDetails {
  id: string;
  title: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: number;
  duration: number;
  entryFee: number;
  prizePool: number;
}

const QuestionsPage = () => {
  const router = useRouter();
  const [contestId, setContestId] = useState<string | null>(null);
  const [contestDetails, setContestDetails] = useState<ContestDetails | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('quizGameUser');
    if (!storedUser) {
      router.push('/pages/login');
      return;
    }
    
    // Get contest ID from URL or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const contestIdFromUrl = urlParams.get('contestId');
    
    if (contestIdFromUrl) {
      setContestId(contestIdFromUrl);
      
      // Fetch contest details and questions
      fetchContestDetails(contestIdFromUrl);
    } else {
      // No contest ID, redirect to contests page
      router.push('/pages/contests');
    }
  }, [router]);
  
  const fetchContestDetails = async (id: string) => {
    try {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, we would fetch this data from an API
      // For this static site, we'll use mock data
      
      // Mock contest details
      const mockContestDetails: ContestDetails = {
        id,
        title: id === 'c1' ? 'Sports Quiz Championship' : 
               id === 'c2' ? 'Movie Buffs Challenge' : 
               id === 'c3' ? 'Science & Technology Trivia' : 
               'General Knowledge Quiz',
        category: id === 'c1' ? 'Sports' : 
                  id === 'c2' ? 'Entertainment' : 
                  id === 'c3' ? 'Science' : 
                  'General Knowledge',
        difficulty: id === 'c1' ? 'medium' : 
                    id === 'c2' ? 'hard' : 
                    id === 'c3' ? 'hard' : 
                    'easy',
        questions: id === 'c1' ? 20 : 
                   id === 'c2' ? 25 : 
                   id === 'c3' ? 30 : 
                   15,
        duration: id === 'c1' ? 30 : 
                  id === 'c2' ? 40 : 
                  id === 'c3' ? 45 : 
                  20,
        entryFee: id === 'c1' ? 100 : 
                  id === 'c2' ? 200 : 
                  id === 'c3' ? 150 : 
                  50,
        prizePool: id === 'c1' ? 5000 : 
                   id === 'c2' ? 10000 : 
                   id === 'c3' ? 7500 : 
                   2500,
      };
      
      setContestDetails(mockContestDetails);
      setTimeRemaining(mockContestDetails.duration * 60); // Convert minutes to seconds
      
      // Mock questions based on contest category
      let mockQuestions: Question[] = [];
      
      if (mockContestDetails.category === 'Sports') {
        mockQuestions = [
          {
            id: 's1',
            text: 'Which country won the FIFA World Cup in 2018?',
            options: ['Brazil', 'Germany', 'France', 'Argentina'],
            correctAnswer: 2,
            explanation: 'France defeated Croatia 4-2 in the final to win the 2018 FIFA World Cup.',
            category: 'Sports',
            difficulty: 'easy',
            points: 10
          },
          {
            id: 's2',
            text: 'In which sport would you perform a slam dunk?',
            options: ['Tennis', 'Basketball', 'Football', 'Swimming'],
            correctAnswer: 1,
            explanation: 'A slam dunk is a basketball play in which a player jumps and forcefully puts the ball through the basket.',
            category: 'Sports',
            difficulty: 'easy',
            points: 10
          },
          {
            id: 's3',
            text: 'How many players are there in a standard cricket team?',
            options: ['9', '10', '11', '12'],
            correctAnswer: 2,
            explanation: 'A standard cricket team consists of 11 players.',
            category: 'Sports',
            difficulty: 'easy',
            points: 10
          },
          {
            id: 's4',
            text: 'Which tennis player has won the most Grand Slam titles in men\'s singles?',
            options: ['Roger Federer', 'Rafael Nadal', 'Novak Djokovic', 'Pete Sampras'],
            correctAnswer: 2,
            explanation: 'As of 2023, Novak Djokovic has won the most Grand Slam titles in men\'s singles tennis.',
            category: 'Sports',
            difficulty: 'medium',
            points: 20
          },
          {
            id: 's5',
            text: 'In which year were the first modern Olympic Games held?',
            options: ['1886', '1896', '1900', '1904'],
            correctAnswer: 1,
            explanation: 'The first modern Olympic Games were held in Athens, Greece, in 1896.',
            category: 'Sports',
            difficulty: 'medium',
            points: 20
          },
          // Add more sports questions as needed
        ];
      } else if (mockContestDetails.category === 'Entertainment') {
        mockQuestions = [
          {
            id: 'e1',
            text: 'Which actor played Iron Man in the Marvel Cinematic Universe?',
            options: ['Chris Evans', 'Robert Downey Jr.', 'Chris Hemsworth', 'Mark Ruffalo'],
            correctAnswer: 1,
            explanation: 'Robert Downey Jr. played Tony Stark/Iron Man in the Marvel Cinematic Universe.',
            category: 'Entertainment',
            difficulty: 'easy',
            points: 10
          },
          {
            id: 'e2',
            text: 'Which film won the Academy Award for Best Picture in 2020?',
            options: ['1917', 'Joker', 'Parasite', 'Once Upon a Time in Hollywood'],
            correctAnswer: 2,
            explanation: 'Parasite, directed by Bong Joon-ho, won the Academy Award for Best Picture in 2020.',
            category: 'Entertainment',
            difficulty: 'medium',
            points: 20
          },
          {
            id: 'e3',
            text: 'Who directed the film "Inception"?',
            options: ['Christopher Nolan', 'Steven Spielberg', 'James Cameron', 'Quentin Tarantino'],
            correctAnswer: 0,
            explanation: 'Christopher Nolan directed the 2010 science fiction action film "Inception".',
            category: 'Entertainment',
            difficulty: 'easy',
            points: 10
          },
          {
            id: 'e4',
            text: 'Which band released the album "Abbey Road"?',
            options: ['The Rolling Stones', 'The Beatles', 'Led Zeppelin', 'Pink Floyd'],
            correctAnswer: 1,
            explanation: 'The Beatles released the album "Abbey Road" in 1969, which was the last album they recorded together.',
            category: 'Entertainment',
            difficulty: 'medium',
            points: 20
          },
          {
            id: 'e5',
            text: 'Who played the character of Harry Potter in the film series?',
            options: ['Daniel Radcliffe', 'Rupert Grint', 'Tom Felton', 'Matthew Lewis'],
            correctAnswer: 0,
            explanation: 'Daniel Radcliffe played the title character of Harry Potter in all eight films of the series.',
            category: 'Entertainment',
            difficulty: 'easy',
            points: 10
          },
          // Add more entertainment questions as needed
        ];
      } else if (mockContestDetails.category === 'Science') {
        mockQuestions = [
          {
            id: 'sc1',
            text: 'What is the chemical symbol for gold?',
            options: ['Go', 'Gd', 'Au', 'Ag'],
            correctAnswer: 2,
            explanation: 'The chemical symbol for gold is Au, derived from the Latin word "aurum".',
            category: 'Science',
            difficulty: 'easy',
            points: 10
          },
          {
            id: 'sc2',
            text: 'Which planet is known as the Red Planet?',
            options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
            correctAnswer: 1,
            explanation: 'Mars is known as the Red Planet due to the reddish appearance given by iron oxide (rust) on its surface.',
            category: 'Science',
            difficulty: 'easy',
            points: 10
          },
          {
            id: 'sc3',
            text: 'What is the hardest natural substance on Earth?',
            options: ['Platinum', 'Diamond', 'Titanium', 'Quartz'],
            correctAnswer: 1,
            explanation: 'Diamond is the hardest known natural material on Earth, scoring 10 on the Mohs scale of mineral hardness.',
            category: 'Science',
            difficulty: 'easy',
            points: 10
          },
          {
            id: 'sc4',
            text: 'What is the process by which plants make their own food using sunlight?',
            options: ['Photosynthesis', 'Respiration', 'Fermentation', 'Digestion'],
            correctAnswer: 0,
            explanation: 'Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with carbon dioxide and water.',
            category: 'Science',
            difficulty: 'easy',
            points: 10
          },
          {
            id: 'sc5',
            text: 'Which of these is NOT a fundamental force in physics?',
            options: ['Gravity', 'Electromagnetism', 'Nuclear force', 'Centrifugal force'],
            correctAnswer: 3,
            explanation: 'Centrifugal force is not a fundamental force but rather a fictitious or apparent force that appears to act on objects moving in a circular path.',
            category: 'Science',
            difficulty: 'medium',
            points: 20
          },
          // Add more science questions as needed
        ];
      } else {
        // General Knowledge
        mockQuestions = [
          {
            id: 'gk1',
            text: 'What is the capital of France?',
            options: ['London', 'Berlin', 'Paris', 'Madrid'],
            correctAnswer: 2,
            explanation: 'Paris is the capital and most populous city of France.',
            category: 'General Knowledge',
            difficulty: 'easy',
            points: 10
          },
          {
            id: 'gk2',
            text: 'Who painted the Mona Lisa?',
            options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Michelangelo'],
            correctAnswer: 1,
            explanation: 'The Mona Lisa was painted by Italian artist Leonardo da Vinci between 1503 and 1519.',
            category: 'General Knowledge',
            difficulty: 'easy',
            points: 10
          },
          {
            id: 'gk3',
            text: 'Which planet is closest to the Sun?',
            options: ['Venus', 'Earth', 'Mars', 'Mercury'],
            correctAnswer: 3,
            explanation: 'Mercury is the closest planet to the Sun in our solar system.',
            category: 'General Knowledge',
            difficulty: 'easy',
            points: 10
          },
          {
            id: 'gk4',
            text: 'What is the largest ocean on Earth?',
            options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
            correctAnswer: 3,
            explanation: 'The Pacific Ocean is the largest and deepest ocean on Earth, covering more than 30% of the Earth\'s surface.',
            category: 'General Knowledge',
            difficulty: 'easy',
            points: 10
          },
          {
            id: 'gk5',
            text: 'Who wrote "Romeo and Juliet"?',
            options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
            correctAnswer: 1,
            explanation: '"Romeo and Juliet" is a tragedy written by William Shakespeare early in his career.',
            category: 'General Knowledge',
            difficulty: 'easy',
            points: 10
          },
          // Add more general knowledge questions as needed
        ];
      }
      
      // Shuffle questions and limit to contest question count
      const shuffledQuestions = shuffleArray(mockQuestions);
      setQuestions(shuffledQuestions.slice(0, mockContestDetails.questions));
      
      // Initialize selected answers array with -1 (no selection)
      setSelectedAnswers(new Array(mockContestDetails.questions).fill(-1));
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching contest details:', error);
      setIsLoading(false);
    }
  };
  
  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array: any[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  
  useEffect(() => {
    // Timer countdown
    if (!isLoading && timeRemaining > 0 && !quizCompleted) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            submitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [isLoading, timeRemaining, quizCompleted]);
  
  const handleAnswerSelect = (answerIndex: number) => {
    if (quizCompleted) return;
    
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
  };
  
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowExplanation(false);
    }
  };
  
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setShowExplanation(false);
    }
  };
  
  const submitQuiz = () => {
    if (quizCompleted) return;
    
    // Calculate score
    let totalScore = 0;
    selectedAnswers.forEach((selectedAnswer, index) => {
      if (index < questions.length && selectedAnswer === questions[index].correctAnswer) {
        totalScore += questions[index].points;
      }
    });
    
    setScore(totalScore);
    setQuizCompleted(true);
    
    // Save result to localStorage
    if (contestDetails) {
      const quizResult = {
        contestId: contestDetails.id,
        contestTitle: contestDetails.title,
        score: totalScore,
        maxScore: questions.reduce((sum, q) => sum + q.points, 0),
        completedAt: new Date().toISOString(),
      };
      
      const storedResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
      localStorage.setItem('quizResults', JSON.stringify([quizResult, ...storedResults]));
      
      // Add to wallet if score is good
      if (totalScore > (questions.reduce((sum, q) => sum + q.points, 0) * 0.7)) {
        const storedWallet = localStorage.getItem('quizGameWallet');
        if (storedWallet) {
          const walletData = JSON.parse(storedWallet);
          
          const winnings = Math.floor(contestDetails.prizePool / 10); // Simplified prize calculation
          
          const newTransaction = {
            id: `txn${Date.now()}`,
            type: 'contest_winning',
            amount: winnings,
            status: 'completed',
            timestamp: new Date().toISOString(),
            description: `Prize for ${contestDetails.title}`,
          };
          
          const updatedWalletData = {
            balance: walletData.balance + winnings,
            transactions: [newTransaction, ...walletData.transactions],
          };
          
          localStorage.setItem('quizGameWallet', JSON.stringify(updatedWalletData));
        }
      }
    }
  };
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
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
          <div className="flex items-center space-x-4">
            {!quizCompleted && (
              <div className="bg-gray-800 px-4 py-2 rounded-full flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-mono font-bold">{formatTime(timeRemaining)}</span>
              </div>
            )}
            <div className="bg-gray-800 px-4 py-2 rounded-full">
              <span className="font-medium">Question {currentQuestionIndex + 1}/{questions.length}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {quizCompleted ? (
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 p-8 max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-block p-4 rounded-full bg-purple-500/20 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-2">Quiz Completed!</h2>
              <p className="text-gray-400">You've completed the {contestDetails?.title}</p>
            </div>
            
            <div className="bg-gray-700/50 rounded-xl p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium">Your Score</span>
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  {score} / {questions.reduce((sum, q) => sum + q.points, 0)}
                </span>
              </div>
              
              <div className="w-full bg-gray-800 rounded-full h-4 mb-4">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full" 
                  style={{ width: `${(score / questions.reduce((sum, q) => sum + q.points, 0)) * 100}%` }}
                ></div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-800/70 p-3 rounded-lg">
                  <p className="text-xs text-gray-400">Correct Answers</p>
                  <p className="text-lg font-bold">
                    {selectedAnswers.filter((ans, idx) => ans === questions[idx]?.correctAnswer).length} / {questions.length}
                  </p>
                </div>
                <div className="bg-gray-800/70 p-3 rounded-lg">
                  <p className="text-xs text-gray-400">Accuracy</p>
                  <p className="text-lg font-bold">
                    {Math.round((selectedAnswers.filter((ans, idx) => ans === questions[idx]?.correctAnswer).length / questions.length) * 100)}%
                  </p>
                </div>
              </div>
              
              {score > (questions.reduce((sum, q) => sum + q.points, 0) * 0.7) && contestDetails && (
                <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-lg p-4 mb-4">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-yellow-400">Congratulations! You won a prize!</p>
                      <p className="text-sm text-gray-300 mt-1">
                        ₹{Math.floor(contestDetails.prizePool / 10)} has been added to your wallet.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/pages/contests"
                className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                Back to Contests
              </Link>
              <button
                onClick={() => setQuizCompleted(false)}
                className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Review Answers
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            {/* Question Card */}
            <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 mb-6">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${questions[currentQuestionIndex].difficulty === 'easy' ? 'bg-green-500/20 text-green-400 border-green-500/30' : questions[currentQuestionIndex].difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'} border`}>
                      {questions[currentQuestionIndex].difficulty.charAt(0).toUpperCase() + questions[currentQuestionIndex].difficulty.slice(1)}
                    </span>
                    <span className="ml-2 px-3 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                      {questions[currentQuestionIndex].category}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-purple-400">{questions[currentQuestionIndex].points} points</span>
                </div>
                
                <h3 className="text-xl font-bold mb-6">{questions[currentQuestionIndex].text}</h3>
                
                <div className="space-y-3">
                  {questions[currentQuestionIndex].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 rounded-lg border text-left transition-all duration-200 ${quizCompleted ? 
                        index === questions[currentQuestionIndex].correctAnswer ? 
                          'bg-green-500/20 border-green-500/50 text-white' : 
                          selectedAnswers[currentQuestionIndex] === index ? 
                            'bg-red-500/20 border-red-500/50 text-white' : 
                            'bg-gray-700/50 border-gray-600 text-gray-300' :
                        selectedAnswers[currentQuestionIndex] === index ? 
                          'bg-purple-500/20 border-purple-500/50 text-white' : 
                          'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500'}`}
                    >
                      <div className="flex items-center">
                        <span className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 ${selectedAnswers[currentQuestionIndex] === index ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-300'}`}>
                          {String.fromCharCode(65 + index)}
                        </span>
                        {option}
                      </div>
                    </button>
                  ))}
                </div>
                
                {(quizCompleted || showExplanation) && questions[currentQuestionIndex].explanation && (
                  <div className="mt-6 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                    <h4 className="font-medium mb-2 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Explanation
                    </h4>
                    <p className="text-gray-300 text-sm">{questions[currentQuestionIndex].explanation}</p>
                  </div>
                )}
              </div>
              
              <div className="bg-gray-900/50 px-6 py-4 flex justify-between items-center">
                <button
                  onClick={goToPreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${currentQuestionIndex === 0 ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                
                <div className="flex space-x-2">
                  {!quizCompleted && (
                    <button
                      onClick={() => setShowExplanation(!showExplanation)}
                      className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {showExplanation ? 'Hide Hint' : 'Show Hint'}
                    </button>
                  )}
                  
                  {currentQuestionIndex === questions.length - 1 ? (
                    <button
                      onClick={submitQuiz}
                      className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Submit Quiz
                    </button>
                  ) : (
                    <button
                      onClick={goToNextQuestion}
                      className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white flex items-center"
                    >
                      Next
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Question Navigation */}
            <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 p-6">
              <h4 className="text-sm font-medium text-gray-300 mb-4">Question Navigation</h4>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestionIndex(index)}
                    className={`w-full aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-200 ${currentQuestionIndex === index ? 'bg-purple-600 text-white' : selectedAnswers[index] !== -1 ? 'bg-gray-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              
              <div className="mt-6 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-purple-600 mr-2"></div>
                    <span className="text-xs text-gray-400">Current</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-gray-600 mr-2"></div>
                    <span className="text-xs text-gray-400">Answered</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-gray-700 mr-2"></div>
                    <span className="text-xs text-gray-400">Unanswered</span>
                  </div>
                </div>
                
                <button
                  onClick={submitQuiz}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Submit Quiz
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionsPage;
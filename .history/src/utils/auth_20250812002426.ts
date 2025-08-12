// Sample user credentials for demo purposes
export const SAMPLE_USERS = [
  {
    id: '1',
    email: 'demo@quizgame.com',
    password: 'demo123',
    name: 'Demo User',
    avatar: null,
  },
  {
    id: '2', 
    email: 'john@example.com',
    password: 'john123',
    name: 'John Doe',
    avatar: null,
  },
  {
    id: '3',
    email: 'jane@example.com', 
    password: 'jane123',
    name: 'Jane Smith',
    avatar: null,
  },
  {
    id: '4',
    email: 'admin@quizgame.com',
    password: 'admin123',
    name: 'Admin User',
    avatar: null,
  }
];

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string | null;
}

export const authenticateUser = (email: string, password: string): User | null => {
  const user = SAMPLE_USERS.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  
  return null;
};

export const getUserById = (id: string): User | null => {
  const user = SAMPLE_USERS.find(u => u.id === id);
  
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  
  return null;
};

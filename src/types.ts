export interface User {
  id: number;
  email: string;
  password: string;
}

export interface Expense {
  id: number;
  userId: number;
  category: string;
  amount: number;
  date: string;
  description: string;
}

export interface Budget {
  id: number;
  userId: number;
  category: string;
  amount: number;
  period: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
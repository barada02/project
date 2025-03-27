import React from 'react';
import { Link } from 'react-router-dom';
import { Home, PieChart, DollarSign, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <div className="h-screen w-64 bg-gray-800 text-white p-4">
      <div className="flex items-center justify-center mb-8">
        <DollarSign size={32} className="text-green-400" />
        <h1 className="text-xl font-bold ml-2">ExpenseTracker</h1>
      </div>
      
      <nav className="space-y-4">
        <Link to="/" className="flex items-center p-2 hover:bg-gray-700 rounded">
          <Home className="mr-2" />
          Dashboard
        </Link>
        <Link to="/expenses" className="flex items-center p-2 hover:bg-gray-700 rounded">
          <PieChart className="mr-2" />
          Expenses
        </Link>
        <Link to="/budget" className="flex items-center p-2 hover:bg-gray-700 rounded">
          <DollarSign className="mr-2" />
          Budget
        </Link>
      </nav>
      
      <div className="absolute bottom-4">
        <button
          onClick={logout}
          className="flex items-center p-2 hover:bg-gray-700 rounded"
        >
          <LogOut className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

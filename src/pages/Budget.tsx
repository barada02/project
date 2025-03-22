import React, { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Budget } from '../types';
import { useAuth } from '../context/AuthContext';

const BudgetPage = () => {
  const { user } = useAuth();
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [newBudget, setNewBudget] = useState({
    category: '',
    amount: '',
    period: 'monthly'
  });

  useEffect(() => {
    fetchBudgets();
  }, [user]);

  const fetchBudgets = async () => {
    if (user) {
      const response = await fetch(`http://localhost:3001/budgets?userId=${user.id}`);
      const data = await response.json();
      setBudgets(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newBudget.category || !newBudget.amount) return;

    const budget = {
      userId: user.id,
      category: newBudget.category,
      amount: parseFloat(newBudget.amount),
      period: newBudget.period
    };

    await fetch('http://localhost:3001/budgets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(budget)
    });

    setNewBudget({ category: '', amount: '', period: 'monthly' });
    fetchBudgets();
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:3001/budgets/${id}`, { method: 'DELETE' });
    fetchBudgets();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Budget Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Add New Budget</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                value={newBudget.category}
                onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <input
                type="number"
                value={newBudget.amount}
                onChange={(e) => setNewBudget({ ...newBudget, amount: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                required
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Period</label>
              <select
                value={newBudget.period}
                onChange={(e) => setNewBudget({ ...newBudget, period: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Budget
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Current Budgets</h2>
          <div className="space-y-4">
            {budgets.map((budget) => (
              <div
                key={budget.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded"
              >
                <div>
                  <h3 className="font-medium">{budget.category}</h3>
                  <p className="text-sm text-gray-500">{budget.period}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-bold text-green-600">
                    ${budget.amount.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleDelete(budget.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {budgets.length === 0 && (
              <p className="text-gray-500 text-center">No budgets set yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;
import React, { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Expense } from '../types';
import { useAuth } from '../context/AuthContext';

const Expenses = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExpense, setNewExpense] = useState({
    category: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  useEffect(() => {
    fetchExpenses();
  }, [user]);

  const fetchExpenses = async () => {
    if (user) {
      const response = await fetch(`http://localhost:3001/expenses?userId=${user.id}`);
      const data = await response.json();
      setExpenses(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newExpense.category || !newExpense.amount) return;

    const expense = {
      userId: user.id,
      category: newExpense.category,
      amount: parseFloat(newExpense.amount),
      date: newExpense.date,
      description: newExpense.description
    };

    await fetch('http://localhost:3001/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expense)
    });

    setNewExpense({
      category: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      description: ''
    });
    fetchExpenses();
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:3001/expenses/${id}`, { method: 'DELETE' });
    fetchExpenses();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Expense Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                value={newExpense.category}
                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <input
                type="number"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                required
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                value={newExpense.date}
                onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={newExpense.description}
                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                rows={3}
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Expense
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
          <div className="space-y-4">
            {expenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded"
              >
                <div>
                  <h3 className="font-medium">{expense.category}</h3>
                  <p className="text-sm text-gray-500">{expense.description}</p>
                  <p className="text-xs text-gray-400">{new Date(expense.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-bold text-red-600">
                    ${expense.amount.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleDelete(expense.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {expenses.length === 0 && (
              <p className="text-gray-500 text-center">No expenses recorded yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
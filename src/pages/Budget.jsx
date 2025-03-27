import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const BudgetPage = () => {
  const { user } = useAuth();
  const [budgets, setBudgets] = useState([]);
  const [newBudget, setNewBudget] = useState({
    category: '',
    amount: '',
    period: 'monthly'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchBudgets = async () => {
      if (user) {
        const response = await fetch(`http://localhost:3001/budgets?userId=${user.id}`);
        const data = await response.json();
        setBudgets(data);
      }
    };
    fetchBudgets();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBudget({
      ...newBudget,
      [name]: name === 'amount' ? parseFloat(value) || '' : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newBudget.category || !newBudget.amount) {
      return;
    }

    if (isEditing) {
      // Update existing budget
      const response = await fetch(`http://localhost:3001/budgets/${editId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...newBudget,
          userId: user.id
        })
      });

      const updatedBudget = await response.json();
      setBudgets(budgets.map(budget => budget.id === editId ? updatedBudget : budget));
    } else {
      // Add new budget
      const response = await fetch('http://localhost:3001/budgets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...newBudget,
          userId: user.id
        })
      });

      const newBudgetData = await response.json();
      setBudgets([...budgets, newBudgetData]);
    }

    // Reset form
    setNewBudget({
      category: '',
      amount: '',
      period: 'monthly'
    });
    setIsEditing(false);
    setEditId(null);
  };

  const handleEdit = (budget) => {
    setIsEditing(true);
    setEditId(budget.id);
    setNewBudget({
      category: budget.category,
      amount: budget.amount,
      period: budget.period
    });
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3001/budgets/${id}`, {
      method: 'DELETE'
    });
    setBudgets(budgets.filter(budget => budget.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Budget Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Your Budgets</h2>
            {budgets.length === 0 ? (
              <p className="text-gray-500">No budgets set yet. Add your first budget!</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {budgets.map(budget => (
                      <tr key={budget.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{budget.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap">${budget.amount.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap capitalize">{budget.period}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => handleEdit(budget)}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(budget.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Budget' : 'Add New Budget'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                value={newBudget.category}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={newBudget.amount}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label htmlFor="period" className="block text-sm font-medium text-gray-700">Period</label>
              <select
                id="period"
                name="period"
                value={newBudget.period}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              {isEditing ? 'Update Budget' : 'Add Budget'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditId(null);
                  setNewBudget({
                    category: '',
                    amount: '',
                    period: 'monthly'
                  });
                }}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;

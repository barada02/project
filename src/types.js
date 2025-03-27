// This file provides documentation for the data structures used in the application
// Since we're using JavaScript instead of TypeScript, these are just comments for reference

/*
User structure:
{
  id: number,
  email: string,
  password: string
}

Expense structure:
{
  id: number,
  userId: number,
  category: string,
  amount: number,
  date: string,
  description: string
}

Budget structure:
{
  id: number,
  userId: number,
  category: string,
  amount: number,
  period: string
}

AuthContext structure:
{
  user: User | null,
  login: function(email, password),
  logout: function()
}
*/

# Expense Tracker Application

## Overview

This is a modern expense tracking application built with React, TypeScript, and Tailwind CSS. It allows users to track their expenses, set budgets, and visualize spending patterns through an intuitive dashboard.

## Features

- **User Authentication**: Secure login system to protect user data
- **Dashboard**: Visual overview of expenses with charts and summaries
- **Expense Management**: Add, view, and categorize expenses
- **Budget Planning**: Set and track budgets by category
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**:
  - React 18
  - TypeScript
  - React Router for navigation
  - Recharts for data visualization
  - Tailwind CSS for styling
  - Lucide React for icons

- **Backend**:
  - JSON Server (for development/demo purposes)

- **Build Tools**:
  - Vite
  - ESLint
  - PostCSS
  - Autoprefixer

## Project Structure

```
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable UI components
│   │   └── Sidebar.tsx   # Application sidebar navigation
│   ├── context/          # React context providers
│   │   └── AuthContext.tsx # Authentication context
│   ├── pages/            # Application pages
│   │   ├── Budget.tsx    # Budget management page
│   │   ├── Dashboard.tsx # Main dashboard with charts
│   │   ├── Expenses.tsx  # Expense tracking page
│   │   └── Login.tsx     # User authentication page
│   ├── App.tsx           # Main application component
│   ├── index.css         # Global styles
│   ├── main.tsx          # Application entry point
│   ├── types.ts          # TypeScript type definitions
│   └── vite-env.d.ts     # Vite environment types
├── .eslintrc.js          # ESLint configuration
├── db.json               # JSON Server database file
├── index.html            # HTML entry point
├── package.json          # Project dependencies and scripts
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone [repository-url]
   cd expense-tracker
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Start the JSON server (in a separate terminal)
   ```bash
   npm run server
   # or
   yarn server
   ```

5. Open your browser and navigate to `http://localhost:5173`

### Default Login

- Email: demo@example.com
- Password: demo123

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally
- `npm run server` - Start the JSON Server for the backend API

## Data Structure

### User
```typescript
interface User {
  id: number;
  email: string;
  password: string;
}
```

### Expense
```typescript
interface Expense {
  id: number;
  userId: number;
  category: string;
  amount: number;
  date: string;
  description: string;
}
```

### Budget
```typescript
interface Budget {
  id: number;
  userId: number;
  category: string;
  amount: number;
  period: string;
}
```

## Future Enhancements

- Income tracking
- Financial goals setting
- Reports and analytics
- Multiple currency support
- Dark mode theme
- Mobile application

## License

MIT

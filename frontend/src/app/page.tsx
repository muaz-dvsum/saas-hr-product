'use client';

import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/LoginForm';
import LeaveForm from '@/components/LeaveForm';
import ManagerDashboard from '@/components/ManagerDashboard';

export default function Home() {
  const { user, logout, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              HR Leave Management System
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user.name} ({user.role})
              </span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        {user.role === 'employee' ? (
          <div className="max-w-2xl mx-auto px-4">
            <LeaveForm />
          </div>
        ) : user.role === 'manager' ? (
          <ManagerDashboard />
        ) : (
          <div className="text-center py-8">
            <div className="text-red-500">Unknown user role</div>
          </div>
        )}
      </main>
    </div>
  );
}
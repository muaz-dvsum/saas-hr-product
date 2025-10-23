'use client';

import { useState, useEffect } from 'react';
import { LeaveRequest } from '@/types';
import { api } from '@/lib/api';

export default function ManagerDashboard() {
  const [pendingRequests, setPendingRequests] = useState<LeaveRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    loadPendingRequests();
  }, []);

  const loadPendingRequests = async () => {
    try {
      setIsLoading(true);
      const response = await api.getPendingRequests();
      
      if (response.success && response.data) {
        setPendingRequests(response.data);
      } else {
        setError('Failed to load pending requests');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveReject = async (id: string, action: 'approve' | 'reject', comments?: string) => {
    setProcessingId(id);
    try {
      const response = await api.approveRejectLeave(id, action, comments);
      
      if (response.success) {
        // Remove the processed request from the list
        setPendingRequests(prev => prev.filter(req => req.id !== id));
      } else {
        setError(response.error || `Failed to ${action} request`);
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setProcessingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const calculateDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading pending requests...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manager Dashboard</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {pendingRequests.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-500 text-lg">No pending leave requests</div>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingRequests.map((request) => (
            <div key={request.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{request.employeeName}</h3>
                  <p className="text-sm text-gray-600">Employee ID: {request.employeeId}</p>
                  <p className="text-sm text-gray-600">Applied: {formatDate(request.appliedDate)}</p>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                      {request.leaveType} Leave
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {request.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Duration: {calculateDays(request.startDate, request.endDate)} day(s)
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700">Leave Period:</p>
                <p className="text-sm text-gray-600">
                  {formatDate(request.startDate)} to {formatDate(request.endDate)}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700">Reason:</p>
                <p className="text-sm text-gray-600">{request.reason}</p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => handleApproveReject(request.id, 'approve')}
                  disabled={processingId === request.id}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {processingId === request.id ? 'Processing...' : 'Approve'}
                </button>
                <button
                  onClick={() => handleApproveReject(request.id, 'reject', 'Request rejected by manager')}
                  disabled={processingId === request.id}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {processingId === request.id ? 'Processing...' : 'Reject'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
'use client';

import { useState } from 'react';
import { LeaveApplicationData } from '@/types';
import { api } from '@/lib/api';

interface LeaveFormProps {
  onSuccess?: () => void;
}

export default function LeaveForm({ onSuccess }: LeaveFormProps) {
  const [formData, setFormData] = useState<LeaveApplicationData>({
    leaveType: 'annual',
    startDate: '',
    endDate: '',
    reason: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      // Basic validation
      if (new Date(formData.startDate) < new Date()) {
        setError('Start date cannot be in the past');
        setIsLoading(false);
        return;
      }

      if (new Date(formData.endDate) < new Date(formData.startDate)) {
        setError('End date must be after start date');
        setIsLoading(false);
        return;
      }

      const response = await api.applyLeave(formData);
      
      if (response.success) {
        setSuccess('Leave application submitted successfully!');
        setFormData({
          leaveType: 'annual',
          startDate: '',
          endDate: '',
          reason: '',
        });
        onSuccess?.();
      } else {
        setError(response.error || 'Failed to submit leave application');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Apply for Leave</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="leaveType" className="block text-sm font-medium text-gray-700 mb-1">
            Leave Type
          </label>
          <select
            id="leaveType"
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="annual">Annual Leave</option>
            <option value="sick">Sick Leave</option>
            <option value="personal">Personal Leave</option>
          </select>
        </div>

        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
            Reason
          </label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Please provide a reason for your leave request"
            required
          />
        </div>

        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Submitting...' : 'Submit Leave Request'}
        </button>
      </form>
    </div>
  );
}
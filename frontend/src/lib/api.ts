import { LeaveApplicationData, LeaveRequest, ApiResponse, LeaveSummary, User } from '@/types';

const API_BASE_URL = 'http://localhost:3001';

// Helper function to get user ID from localStorage
const getUserId = (): string | null => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    const user = JSON.parse(userStr);
    return user.id;
  }
  return null;
};

export const api = {
  // Auth endpoints
  async login(userId: string): Promise<ApiResponse<User>> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
    return response.json();
  },

  async getUsers(): Promise<ApiResponse<User[]>> {
    const response = await fetch(`${API_BASE_URL}/auth/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },

  // Leave endpoints
  async applyLeave(leaveData: LeaveApplicationData): Promise<ApiResponse<LeaveRequest>> {
    const userId = getUserId();
    const response = await fetch(`${API_BASE_URL}/leave/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'user-id': userId || '',
      },
      body: JSON.stringify(leaveData),
    });
    return response.json();
  },

  async getPendingRequests(): Promise<ApiResponse<LeaveRequest[]>> {
    const userId = getUserId();
    const response = await fetch(`${API_BASE_URL}/leave/pending`, {
      method: 'GET',
      headers: {
        'user-id': userId || '',
      },
    });
    return response.json();
  },

  async approveRejectLeave(id: string, action: 'approve' | 'reject', comments?: string): Promise<ApiResponse<LeaveRequest>> {
    const userId = getUserId();
    const response = await fetch(`${API_BASE_URL}/leave/approve/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'user-id': userId || '',
      },
      body: JSON.stringify({ action, comments }),
    });
    return response.json();
  },

  async getLeaveSummary(): Promise<ApiResponse<LeaveSummary[]>> {
    const userId = getUserId();
    const response = await fetch(`${API_BASE_URL}/leave/summary`, {
      method: 'GET',
      headers: {
        'user-id': userId || '',
      },
    });
    return response.json();
  },
};
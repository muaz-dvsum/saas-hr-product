import { LeaveApplicationData, LeaveRequest, ApiResponse, LeaveSummary } from '@/types';

const API_BASE_URL = 'http://localhost:3001';

export const api = {
  // Auth endpoints
  async login(username: string, password: string): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    return response.json();
  },

  // Leave endpoints
  async applyLeave(leaveData: LeaveApplicationData): Promise<ApiResponse<LeaveRequest>> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/leave/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(leaveData),
    });
    return response.json();
  },

  async getPendingRequests(): Promise<ApiResponse<LeaveRequest[]>> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/leave/pending`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },

  async approveRejectLeave(id: string, action: 'approve' | 'reject', comments?: string): Promise<ApiResponse<LeaveRequest>> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/leave/approve/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ action, comments }),
    });
    return response.json();
  },

  async getLeaveSummary(): Promise<ApiResponse<LeaveSummary[]>> {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/leave/summary`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },
};
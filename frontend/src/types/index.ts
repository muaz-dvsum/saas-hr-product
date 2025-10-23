export interface User {
  id: string;
  email: string;
  role: 'employee' | 'manager';
  name: string;
  managerId?: string;
  leaveBalance?: number;
}

export interface LeaveBalance {
  userId: string;
  annualLeave: number;
  sickLeave: number;
  personalLeave: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: 'annual' | 'sick' | 'personal';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  reviewedBy?: string;
  reviewedDate?: string;
  reviewComments?: string;
}

export interface LeaveApplicationData {
  leaveType: 'annual' | 'sick' | 'personal';
  startDate: string;
  endDate: string;
  reason: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (userId: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  availableUsers: User[];
}

export interface LeaveSummary {
  month: number;
  year: number;
  totalRequests: number;
  approvedRequests: number;
  rejectedRequests: number;
  pendingRequests: number;
  leavesByType: {
    annual: number;
    sick: number;
    personal: number;
  };
}
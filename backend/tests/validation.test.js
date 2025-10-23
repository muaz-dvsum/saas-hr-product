const { validateLeaveApplication, checkLeaveBalance, hasOverlappingLeaves } = require('../src/utils/validation');
const { users, leaveBalances, leaveRequests } = require('../src/data');

describe('Leave Validation Tests', () => {
  describe('validateLeaveApplication', () => {
    test('should return error for past start date', () => {
      const leaveData = {
        startDate: '2024-10-20', // Past date
        endDate: '2024-10-25',
        leaveType: 'annual'
      };
      
      const result = validateLeaveApplication(leaveData);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('past');
    });

    test('should return error for end date before start date', () => {
      const leaveData = {
        startDate: '2025-12-25',
        endDate: '2025-12-20', // End before start
        leaveType: 'annual'
      };
      
      const result = validateLeaveApplication(leaveData);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('after start date');
    });

    test('should return valid for correct dates', () => {
      const leaveData = {
        startDate: '2025-12-20',
        endDate: '2025-12-25',
        leaveType: 'annual'
      };
      
      const result = validateLeaveApplication(leaveData);
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    test('should validate leave type', () => {
      const leaveData = {
        startDate: '2025-12-20',
        endDate: '2025-12-25',
        leaveType: 'invalid_type'
      };
      
      const result = validateLeaveApplication(leaveData);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('leave type');
    });
  });

  describe('checkLeaveBalance', () => {
    test('should return false when insufficient balance', () => {
      const userId = '1';
      const leaveType = 'annual';
      const requestedDays = 25; // More than available balance
      
      const result = checkLeaveBalance(userId, leaveType, requestedDays);
      expect(result.sufficient).toBe(false);
      expect(result.message).toContain('insufficient');
    });

    test('should return true when sufficient balance', () => {
      const userId = '1';
      const leaveType = 'annual';
      const requestedDays = 5; // Less than available balance
      
      const result = checkLeaveBalance(userId, leaveType, requestedDays);
      expect(result.sufficient).toBe(true);
    });

    test('should handle non-existent user', () => {
      const userId = 'non_existent';
      const leaveType = 'annual';
      const requestedDays = 5;
      
      const result = checkLeaveBalance(userId, leaveType, requestedDays);
      expect(result.sufficient).toBe(false);
      expect(result.message).toContain('not found');
    });
  });

  describe('hasOverlappingLeaves', () => {
    test('should detect overlapping leave periods', () => {
      const userId = '1';
      const startDate = '2025-11-15';
      const endDate = '2025-11-20';
      
      // Mock existing leave request
      const existingRequest = {
        employeeId: '1',
        startDate: '2025-11-18',
        endDate: '2025-11-25',
        status: 'approved'
      };
      
      // Temporarily add the mock request
      leaveRequests.push(existingRequest);
      
      const result = hasOverlappingLeaves(userId, startDate, endDate);
      expect(result.hasOverlap).toBe(true);
      expect(result.conflictingRequest).toBeDefined();
      
      // Clean up
      leaveRequests.pop();
    });

    test('should not detect overlap for non-overlapping periods', () => {
      const userId = '1';
      const startDate = '2025-12-01';
      const endDate = '2025-12-05';
      
      const result = hasOverlappingLeaves(userId, startDate, endDate);
      expect(result.hasOverlap).toBe(false);
      expect(result.conflictingRequest).toBeUndefined();
    });

    test('should ignore rejected leave requests when checking overlap', () => {
      const userId = '1';
      const startDate = '2025-11-15';
      const endDate = '2025-11-20';
      
      // Mock rejected leave request
      const rejectedRequest = {
        employeeId: '1',
        startDate: '2025-11-18',
        endDate: '2025-11-25',
        status: 'rejected'
      };
      
      // Temporarily add the mock request
      leaveRequests.push(rejectedRequest);
      
      const result = hasOverlappingLeaves(userId, startDate, endDate);
      expect(result.hasOverlap).toBe(false);
      
      // Clean up
      leaveRequests.pop();
    });
  });

  describe('Date calculations', () => {
    test('should calculate working days correctly', () => {
      const startDate = '2025-11-03'; // Monday
      const endDate = '2025-11-07';   // Friday
      
      const days = calculateWorkingDays(startDate, endDate);
      expect(days).toBe(5); // 5 working days
    });
  });
});

// Helper function for testing
function calculateWorkingDays(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return diffDays;
}
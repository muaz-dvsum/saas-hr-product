const { v4: uuidv4 } = require('uuid');

// Mock users data
const users = [
  {
    id: 'emp1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'employee',
    managerId: 'mgr1',
    leaveBalance: 25
  },
  {
    id: 'emp2',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    role: 'employee',
    managerId: 'mgr1',
    leaveBalance: 20
  },
  {
    id: 'emp3',
    name: 'Bob Johnson',
    email: 'bob.johnson@company.com',
    role: 'employee',
    managerId: 'mgr2',
    leaveBalance: 18
  },
  {
    id: 'mgr1',
    name: 'Alice Manager',
    email: 'alice.manager@company.com',
    role: 'manager',
    managerId: null,
    leaveBalance: 30
  },
  {
    id: 'mgr2',
    name: 'David Director',
    email: 'david.director@company.com',
    role: 'manager',
    managerId: null,
    leaveBalance: 35
  }
];

// Mock leave requests data
let leaveRequests = [
  {
    id: 'req1',
    employeeId: 'emp1',
    employeeName: 'John Doe',
    startDate: '2025-11-01',
    endDate: '2025-11-03',
    reason: 'Family vacation',
    status: 'pending',
    appliedDate: '2025-10-20',
    managerId: 'mgr1',
    daysRequested: 3
  },
  {
    id: 'req2',
    employeeId: 'emp2',
    employeeName: 'Jane Smith',
    startDate: '2025-12-20',
    endDate: '2025-12-31',
    reason: 'Holiday break',
    status: 'pending',
    appliedDate: '2025-10-18',
    managerId: 'mgr1',
    daysRequested: 12
  }
];

module.exports = {
  users,
  leaveRequests,
  getUserById: (id) => users.find(user => user.id === id),
  getUserByRole: (role) => users.filter(user => user.role === role),
  addLeaveRequest: (request) => {
    const newRequest = {
      id: uuidv4(),
      ...request,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    leaveRequests.push(newRequest);
    return newRequest;
  },
  getLeaveRequestById: (id) => leaveRequests.find(req => req.id === id),
  getPendingRequests: (managerId) => {
    const manager = getUserById(managerId);
    if (!manager || manager.role !== 'manager') return [];
    
    return leaveRequests.filter(req => 
      req.status === 'pending' && 
      (req.managerId === managerId || manager.role === 'manager')
    );
  },
  updateLeaveRequestStatus: (id, status, reviewedBy) => {
    const requestIndex = leaveRequests.findIndex(req => req.id === id);
    if (requestIndex !== -1) {
      leaveRequests[requestIndex].status = status;
      leaveRequests[requestIndex].reviewedBy = reviewedBy;
      leaveRequests[requestIndex].reviewedDate = new Date().toISOString().split('T')[0];
      return leaveRequests[requestIndex];
    }
    return null;
  },
  getEmployeeLeaveHistory: (employeeId) => {
    return leaveRequests.filter(req => req.employeeId === employeeId);
  },
  updateUserLeaveBalance: (userId, newBalance) => {
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
      users[userIndex].leaveBalance = newBalance;
      return users[userIndex];
    }
    return null;
  }
};

function getUserById(id) {
  return users.find(user => user.id === id);
}
const express = require('express');
const { 
  leaveRequests, 
  addLeaveRequest, 
  getLeaveRequestById, 
  getPendingRequests, 
  updateLeaveRequestStatus,
  getUserById,
  updateUserLeaveBalance,
  getEmployeeLeaveHistory
} = require('../data');
const { requireManager } = require('../middleware/auth');
const { 
  validateLeaveRequestDates, 
  validateLeaveBalance, 
  calculateWorkingDays 
} = require('../utils/validation');

const router = express.Router();

/**
 * POST /leave/apply - Employee applies for leave
 */
router.post('/apply', (req, res) => {
  try {
    const { startDate, endDate, reason } = req.body;
    const employee = req.user;

    // Validate required fields
    if (!startDate || !endDate || !reason) {
      return res.status(400).json({
        success: false,
        error: 'Start date, end date, and reason are required.'
      });
    }

    // Only employees can apply for leave
    if (employee.role !== 'employee') {
      return res.status(403).json({
        success: false,
        error: 'Only employees can apply for leave.'
      });
    }

    // Validate dates
    const dateValidation = validateLeaveRequestDates(
      employee.id, 
      startDate, 
      endDate, 
      leaveRequests
    );

    if (!dateValidation.isValid) {
      return res.status(400).json({
        success: false,
        error: dateValidation.message
      });
    }

    // Calculate working days
    const daysRequested = calculateWorkingDays(startDate, endDate);

    // Validate leave balance
    const balanceValidation = validateLeaveBalance(employee.leaveBalance, daysRequested);
    if (!balanceValidation.isValid) {
      return res.status(400).json({
        success: false,
        error: balanceValidation.message
      });
    }

    // Create leave request
    const leaveRequest = {
      employeeId: employee.id,
      employeeName: employee.name,
      startDate,
      endDate,
      reason,
      managerId: employee.managerId,
      daysRequested
    };

    const newRequest = addLeaveRequest(leaveRequest);

    res.status(201).json({
      success: true,
      data: newRequest,
      message: 'Leave request submitted successfully.'
    });

  } catch (error) {
    console.error('Error in /leave/apply:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error.'
    });
  }
});

/**
 * GET /leave/pending - Manager views pending requests
 */
router.get('/pending', requireManager, (req, res) => {
  try {
    const manager = req.user;
    const pendingRequests = getPendingRequests(manager.id);

    res.json({
      success: true,
      data: pendingRequests,
      count: pendingRequests.length
    });

  } catch (error) {
    console.error('Error in /leave/pending:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error.'
    });
  }
});

/**
 * POST /leave/approve/:id - Manager approves/rejects a request
 */
router.post('/approve/:id', requireManager, (req, res) => {
  try {
    const { id } = req.params;
    const { action, comments } = req.body; // action: 'approve' or 'reject'
    const manager = req.user;

    // Validate required fields
    if (!action || !['approve', 'reject'].includes(action)) {
      return res.status(400).json({
        success: false,
        error: 'Action must be either "approve" or "reject".'
      });
    }

    // Get the leave request
    const leaveRequest = getLeaveRequestById(id);

    if (!leaveRequest) {
      return res.status(404).json({
        success: false,
        error: 'Leave request not found.'
      });
    }

    // Check if request is still pending
    if (leaveRequest.status !== 'pending') {
      return res.status(400).json({
        success: false,
        error: `Leave request has already been ${leaveRequest.status}.`
      });
    }

    // Check if manager has authority to approve this request
    if (leaveRequest.managerId !== manager.id) {
      return res.status(403).json({
        success: false,
        error: 'You do not have authority to approve this request.'
      });
    }

    // If approving, check and update employee leave balance
    if (action === 'approve') {
      const employee = getUserById(leaveRequest.employeeId);
      if (!employee) {
        return res.status(404).json({
          success: false,
          error: 'Employee not found.'
        });
      }

      // Final balance check (in case balance changed since request was made)
      const balanceValidation = validateLeaveBalance(employee.leaveBalance, leaveRequest.daysRequested);
      if (!balanceValidation.isValid) {
        return res.status(400).json({
          success: false,
          error: `Cannot approve: ${balanceValidation.message}`
        });
      }

      // Deduct leave balance
      const newBalance = employee.leaveBalance - leaveRequest.daysRequested;
      updateUserLeaveBalance(employee.id, newBalance);
    }

    // Update request status
    const status = action === 'approve' ? 'approved' : 'rejected';
    const updatedRequest = updateLeaveRequestStatus(id, status, manager.id);

    if (comments) {
      updatedRequest.managerComments = comments;
    }

    res.json({
      success: true,
      data: updatedRequest,
      message: `Leave request ${status} successfully.`
    });

  } catch (error) {
    console.error('Error in /leave/approve:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error.'
    });
  }
});

/**
 * GET /leave/my-requests - Get employee's own leave requests
 */
router.get('/my-requests', (req, res) => {
  try {
    const user = req.user;
    const userRequests = getEmployeeLeaveHistory(user.id);

    res.json({
      success: true,
      data: userRequests,
      count: userRequests.length
    });

  } catch (error) {
    console.error('Error in /leave/my-requests:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error.'
    });
  }
});

/**
 * GET /leave/summary - Monthly leave summary (Bonus feature)
 */
router.get('/summary', (req, res) => {
  try {
    const { month, year } = req.query;
    const user = req.user;

    // Default to current month/year if not provided
    const currentDate = new Date();
    const targetMonth = month ? parseInt(month) : currentDate.getMonth() + 1;
    const targetYear = year ? parseInt(year) : currentDate.getFullYear();

    // Filter requests for the specified month/year
    let filteredRequests;
    
    if (user.role === 'manager') {
      // Managers see all requests they can approve
      filteredRequests = leaveRequests.filter(req => req.managerId === user.id);
    } else {
      // Employees see only their own requests
      filteredRequests = leaveRequests.filter(req => req.employeeId === user.id);
    }

    // Filter by month/year
    const monthlyRequests = filteredRequests.filter(req => {
      const startDate = new Date(req.startDate);
      return startDate.getMonth() + 1 === targetMonth && startDate.getFullYear() === targetYear;
    });

    // Calculate summary statistics
    const summary = {
      month: targetMonth,
      year: targetYear,
      totalRequests: monthlyRequests.length,
      approvedRequests: monthlyRequests.filter(req => req.status === 'approved').length,
      pendingRequests: monthlyRequests.filter(req => req.status === 'pending').length,
      rejectedRequests: monthlyRequests.filter(req => req.status === 'rejected').length,
      totalDaysRequested: monthlyRequests.reduce((sum, req) => sum + req.daysRequested, 0),
      approvedDays: monthlyRequests
        .filter(req => req.status === 'approved')
        .reduce((sum, req) => sum + req.daysRequested, 0),
      requests: monthlyRequests
    };

    res.json({
      success: true,
      data: summary
    });

  } catch (error) {
    console.error('Error in /leave/summary:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error.'
    });
  }
});

module.exports = router;
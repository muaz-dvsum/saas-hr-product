const moment = require('moment');

/**
 * Validates if a date is not in the past
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {boolean}
 */
const isValidFutureDate = (dateString) => {
  const date = moment(dateString, 'YYYY-MM-DD', true);
  const today = moment().startOf('day');
  return date.isValid() && date.isSameOrAfter(today);
};

/**
 * Validates if start date is before or equal to end date
 * @param {string} startDate - Start date in YYYY-MM-DD format
 * @param {string} endDate - End date in YYYY-MM-DD format
 * @returns {boolean}
 */
const isValidDateRange = (startDate, endDate) => {
  const start = moment(startDate, 'YYYY-MM-DD', true);
  const end = moment(endDate, 'YYYY-MM-DD', true);
  return start.isValid() && end.isValid() && start.isSameOrBefore(end);
};

/**
 * Calculates the number of working days between two dates (excluding weekends)
 * @param {string} startDate - Start date in YYYY-MM-DD format
 * @param {string} endDate - End date in YYYY-MM-DD format
 * @returns {number}
 */
const calculateWorkingDays = (startDate, endDate) => {
  const start = moment(startDate);
  const end = moment(endDate);
  let workingDays = 0;
  
  const current = start.clone();
  while (current.isSameOrBefore(end)) {
    if (current.day() !== 0 && current.day() !== 6) { // Not Sunday (0) or Saturday (6)
      workingDays++;
    }
    current.add(1, 'day');
  }
  
  return workingDays;
};

/**
 * Checks if two date ranges overlap
 * @param {string} start1 - Start date of first range
 * @param {string} end1 - End date of first range
 * @param {string} start2 - Start date of second range
 * @param {string} end2 - End date of second range
 * @returns {boolean}
 */
const hasDateOverlap = (start1, end1, start2, end2) => {
  const startDate1 = moment(start1);
  const endDate1 = moment(end1);
  const startDate2 = moment(start2);
  const endDate2 = moment(end2);
  
  return startDate1.isSameOrBefore(endDate2) && startDate2.isSameOrBefore(endDate1);
};

/**
 * Validates leave request dates against existing requests
 * @param {string} employeeId - Employee ID
 * @param {string} startDate - Requested start date
 * @param {string} endDate - Requested end date
 * @param {Array} existingRequests - Array of existing leave requests
 * @returns {Object} - Validation result with isValid and message
 */
const validateLeaveRequestDates = (employeeId, startDate, endDate, existingRequests) => {
  // Check if dates are valid format
  if (!moment(startDate, 'YYYY-MM-DD', true).isValid() || 
      !moment(endDate, 'YYYY-MM-DD', true).isValid()) {
    return { isValid: false, message: 'Invalid date format. Use YYYY-MM-DD.' };
  }

  // Check if start date is not in the past
  if (!isValidFutureDate(startDate)) {
    return { isValid: false, message: 'Start date cannot be in the past.' };
  }

  // Check if date range is valid
  if (!isValidDateRange(startDate, endDate)) {
    return { isValid: false, message: 'End date must be on or after start date.' };
  }

  // Check for overlapping requests
  const employeeRequests = existingRequests.filter(req => 
    req.employeeId === employeeId && 
    (req.status === 'pending' || req.status === 'approved')
  );

  for (const request of employeeRequests) {
    if (hasDateOverlap(startDate, endDate, request.startDate, request.endDate)) {
      return { 
        isValid: false, 
        message: `Leave request overlaps with existing request from ${request.startDate} to ${request.endDate}.` 
      };
    }
  }

  return { isValid: true, message: 'Valid leave request dates.' };
};

/**
 * Validates if user has sufficient leave balance
 * @param {number} currentBalance - Current leave balance
 * @param {number} requestedDays - Number of days requested
 * @returns {Object} - Validation result
 */
const validateLeaveBalance = (currentBalance, requestedDays) => {
  if (currentBalance < requestedDays) {
    return {
      isValid: false,
      message: `Insufficient leave balance. Available: ${currentBalance} days, Requested: ${requestedDays} days.`
    };
  }
  return { isValid: true, message: 'Sufficient leave balance.' };
};

module.exports = {
  isValidFutureDate,
  isValidDateRange,
  calculateWorkingDays,
  hasDateOverlap,
  validateLeaveRequestDates,
  validateLeaveBalance
};
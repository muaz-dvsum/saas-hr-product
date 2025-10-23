# SaaS HR Backend API

This is the backend API server for the SaaS HR Leave Request Workflow application built with Node.js and Express.

## Features

### API Endpoints

#### Authentication
- `GET /auth/users` - Get all available users for demo login
- `POST /auth/login` - Mock login endpoint (requires userId)
- `GET /auth/profile` - Get current user profile

#### Leave Management
- `POST /leave/apply` - Employee applies for leave
- `GET /leave/pending` - Manager views pending leave requests
- `POST /leave/approve/:id` - Manager approves/rejects a leave request

#### Bonus Features
- `GET /leave/summary` - Monthly leave summary with statistics
- `GET /health` - Health check endpoint

### Key Features

✅ **Role-based Access Control**
- Employee role: Can apply for leave
- Manager role: Can view and approve/reject leave requests

✅ **Leave Request Validation**
- No past dates allowed
- No overlapping leave requests
- Leave balance checking before approval

✅ **Mock Data Management**
- In-memory data storage
- Pre-populated users and leave balances
- Sample leave requests for testing

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Date Handling**: Moment.js
- **ID Generation**: UUID
- **Testing**: Jest, Supertest
- **Development**: Nodemon

## Project Structure

```
backend/
├── src/
│   ├── index.js              # Main server file
│   ├── data.js              # Mock data and data operations
│   ├── middleware/
│   │   └── auth.js          # Authentication middleware
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   └── leave.js         # Leave management routes
│   └── utils/
│       └── validation.js    # Validation utilities
├── tests/
│   └── validation.test.js   # Unit tests
├── package.json
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

#### Development Mode (with auto-reload)
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3001`

### Testing

Run unit tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## API Authentication

The API uses a simple header-based authentication system for demo purposes:

- Add `user-id` header to all protected endpoints
- Valid user IDs: `emp1`, `emp2`, `emp3`, `mgr1`, `mgr2`

Example:
```bash
curl -H "user-id: emp1" http://localhost:3001/leave/pending
```

## Mock Data

### Users
- **emp1**: John Doe (Employee) - 25 days leave balance
- **emp2**: Jane Smith (Employee) - 20 days leave balance  
- **emp3**: Bob Johnson (Employee) - 18 days leave balance
- **mgr1**: Alice Manager (Manager) - 30 days leave balance
- **mgr2**: David Director (Manager) - 35 days leave balance

### Sample API Calls

#### Login as Employee
```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"userId": "emp1"}'
```

#### Apply for Leave
```bash
curl -X POST http://localhost:3001/leave/apply \
  -H "Content-Type: application/json" \
  -H "user-id: emp1" \
  -d '{
    "leaveType": "annual",
    "startDate": "2025-11-01",
    "endDate": "2025-11-05",
    "reason": "Family vacation"
  }'
```

#### Get Pending Requests (Manager only)
```bash
curl -H "user-id: mgr1" http://localhost:3001/leave/pending
```

#### Approve Leave Request (Manager only)
```bash
curl -X POST http://localhost:3001/leave/approve/req1 \
  -H "Content-Type: application/json" \
  -H "user-id: mgr1" \
  -d '{
    "action": "approve",
    "comments": "Approved for vacation"
  }'
```

## Environment Variables

The application uses the following default configuration:
- **PORT**: 3001
- **NODE_ENV**: development

## Error Handling

The API returns consistent error responses:
```json
{
  "success": false,
  "error": "Error message description"
}
```

## Success Responses

All successful API calls return:
```json
{
  "success": true,
  "data": {...},
  "message": "Optional success message"
}
```

## Development Notes

- CORS is enabled for frontend integration
- All dates are validated using Moment.js
- Leave balance is automatically deducted on approval
- Overlap checking prevents conflicting leave requests
- Manager role is required for approval operations

## Future Enhancements

- JWT token-based authentication
- Database integration (PostgreSQL/MongoDB)
- Email notifications
- File upload for leave documents
- Advanced reporting and analytics
- Role hierarchy management
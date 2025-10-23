# SaaS HR Leave Request WorkflowScreening Test – Senior Full Stack

Developer (SaaS HR Product)

A full-stack web application for managing employee leave requests with role-based access control. Built with Node.js/Express backend and Next.js/React frontend.⏳ Submission Deadline: 5–6 hours

📬 Submission Format: GitHub repo link + README.md

## 🚀 Features

🧪 Scenario

### ✅ Backend APIYou are building a Leave Request Workflow for our SaaS HR platform.

- **Leave Management**: Apply, view, approve/reject leave requestsThe workflow should allow:

- **Role-based Access**: Employee and Manager roles with different permissions● Employees to submit leave requests

- **Validation**: Date validation, overlap checking, leave balance verification● Managers to approve/reject requests

- **Bonus Features**: Monthly leave summary endpoint with TypeScript typesUse mock data for users (Employees & Managers) and leave balances. No need for a real

database — in-memory data or JSON storage is fine.

### ✅ Frontend Application  

- **Employee Interface**: Leave application form with validation and feedback📋 Candidate Tasks

- **Manager Dashboard**: Pending requests list with approve/reject functionality🔹 1. Backend API

- **Authentication**: Mock login system with role-based UI renderingBuild basic APIs:

- **Responsive Design**: Clean, modern UI built with Tailwind CSS● POST /leave/apply → employee applies for leave

● GET /leave/pending → manager views pending requests

### ✅ Additional Features● POST /leave/approve/:id → manager approves/rejects a request

- **TypeScript**: Full type safety across frontend and API responses

- **Testing**: Unit tests for backend validation functionsRequirements:

- **Clean Architecture**: Reusable components and organized code structure● Validate dates (no past dates, no overlaps)

● Check leave balance before approval

## 🏗️ Tech Stack● Ensure only “Manager” role can approve



### Backend🔹 2. Frontend

- **Runtime**: Node.jsBuild a small UI (React/Next.js or similar):

- **Framework**: Express.js● Employee → form to apply for leave (with validation & feedback)

- **Authentication**: Header-based (mock system)● Manager → dashboard with list of pending requests + approve/reject buttons

- **Validation**: Moment.js for dates

- **Testing**: Jest + Supertest🔹 3. Role Handling

● Mock login for Employee and Manager (hardcoded users is fine)

### Frontend● Show different UI based on role

- **Framework**: Next.js 16 (React 19)

- **Language**: TypeScript🔹 4. Code Quality & Documentation

- **Styling**: Tailwind CSS● Use clean architecture & reusable components

- **State Management**: React Context API● Provide a README.md with:

- **HTTP Client**: Fetch API○ Setup instructions

○ Assumptions

## 📁 Project Structure○ Brief explanation of your approach



```🔹 5. Testing

saas-hr-product/● Add unit tests for one backend function (e.g., date validation or leave balance check)

├── backend/                  # Node.js/Express API server● Add a simple frontend test for the leave form

│   ├── src/

│   │   ├── index.js         # Main server file🔹 Bonus (Optional – 5 marks)

│   │   ├── data.js          # Mock data and operations● Add a monthly leave summary endpoint (GET /leave/summary)

│   │   ├── middleware/      # Authentication middleware● Add TypeScript types for API responses

│   │   ├── routes/          # API route handlersBest of luck!
│   │   └── utils/           # Validation utilities
│   ├── tests/               # Unit tests
│   └── package.json
├── frontend/                 # Next.js/React application
│   ├── src/
│   │   ├── app/             # Next.js app router
│   │   ├── components/      # React components
│   │   ├── contexts/        # React context providers
│   │   ├── lib/             # Utility functions
│   │   └── types/           # TypeScript interfaces
│   └── package.json
└── README.md                # This file
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)
- Git

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd saas-hr-product
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**:
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

You need to run both backend and frontend servers simultaneously.

#### Method 1: Separate Terminals (Recommended)

**Terminal 1 - Backend Server**:
```bash
cd backend
npm start
# Server runs on http://localhost:3001
```

**Terminal 2 - Frontend Server**:
```bash
cd frontend
npm run dev
# Application runs on http://localhost:3000
```

#### Method 2: Development Mode with Auto-reload

**Terminal 1 - Backend (Development)**:
```bash
cd backend
npm run dev
# Uses nodemon for auto-reload on file changes
```

**Terminal 2 - Frontend (Development)**:
```bash
cd frontend
npm run dev
# Next.js development server with hot reload
```

### Accessing the Application

1. **Frontend Application**: http://localhost:3000
2. **Backend API**: http://localhost:3001
3. **Health Check**: http://localhost:3001/health

## 👥 Demo Users

The application comes with pre-configured demo users:

### Employees
- **John Doe** (ID: emp1) - john.doe@company.com - 25 days leave balance
- **Jane Smith** (ID: emp2) - jane.smith@company.com - 20 days leave balance  
- **Bob Johnson** (ID: emp3) - bob.johnson@company.com - 18 days leave balance

### Managers
- **Alice Manager** (ID: mgr1) - alice.manager@company.com - 30 days leave balance
- **David Director** (ID: mgr2) - david.director@company.com - 35 days leave balance

## 🔐 Authentication

The system uses a simplified header-based authentication for demo purposes:
- Frontend automatically manages user sessions
- Backend validates requests using `user-id` header
- No passwords required - just select a user from the dropdown

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test                # Run unit tests
npm run test:watch     # Run tests in watch mode
```

### Frontend Tests (Future Enhancement)
```bash
cd frontend
npm test               # Run React component tests
```

## 📊 API Endpoints

### Authentication
- `GET /auth/users` - Get all users for demo login
- `POST /auth/login` - Mock login (requires userId)
- `GET /auth/profile` - Get current user profile

### Leave Management
- `POST /leave/apply` - Apply for leave (Employee)
- `GET /leave/pending` - Get pending requests (Manager)
- `POST /leave/approve/:id` - Approve/reject leave (Manager)
- `GET /leave/summary` - Monthly leave summary (Bonus)

### System
- `GET /health` - Health check endpoint

## 💡 Usage Examples

### Employee Workflow
1. Login as an employee (e.g., John Doe)
2. Fill out the leave application form
3. Select leave type, dates, and provide reason
4. Submit the request
5. View confirmation message

### Manager Workflow
1. Login as a manager (e.g., Alice Manager)
2. View pending leave requests in the dashboard
3. Review employee details and leave request info
4. Approve or reject with optional comments
5. See updated pending requests list

## 🏗️ Architecture Decisions

### Backend Design
- **RESTful API**: Standard HTTP methods and status codes
- **Middleware Pattern**: Centralized authentication and validation
- **Mock Data**: In-memory storage for simplicity and demo purposes
- **Error Handling**: Consistent error response format

### Frontend Design
- **Component-based**: Reusable React components
- **Context API**: Simple state management for authentication
- **TypeScript**: Type safety and better developer experience
- **Responsive**: Mobile-first design with Tailwind CSS

## 🔮 Assumptions

1. **Demo Environment**: No real database or persistent storage needed
2. **Simplified Auth**: Header-based authentication sufficient for demo
3. **Mock Data**: Pre-populated users and leave balances acceptable
4. **Single Tenant**: No multi-organization support required
5. **Basic Validation**: Client and server-side validation for user experience

## 🚀 Future Enhancements

### Security
- JWT token-based authentication
- Password hashing and secure login
- Rate limiting and CORS improvements

### Database
- PostgreSQL or MongoDB integration
- Data persistence and migrations
- Advanced querying capabilities

### Features
- Email notifications for leave status updates
- File upload for leave supporting documents
- Calendar integration for leave visualization
- Advanced reporting and analytics
- Approval workflow with multiple levels
- Leave policy configuration
- Team leave calendar view

### DevOps
- Docker containerization
- CI/CD pipeline setup
- Environment configuration management
- Monitoring and logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is for demonstration purposes as part of a technical assessment.

## 📞 Support

For any questions or issues, please refer to the individual README files in the `backend/` and `frontend/` directories for more detailed documentation.
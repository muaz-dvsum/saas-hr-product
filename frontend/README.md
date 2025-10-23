# SaaS HR Frontend ApplicationThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



This is the frontend application for the SaaS HR Leave Request Workflow, built with Next.js, React, and TypeScript.## Getting Started



## FeaturesFirst, run the development server:



### 🎯 User Interface Components```bash

- **LoginForm**: Demo user selection for authenticationnpm run dev

- **LeaveForm**: Employee leave application form with validation# or

- **ManagerDashboard**: Manager interface for reviewing and approving leave requestsyarn dev

# or

### 🔐 Authentication Systempnpm dev

- **AuthContext**: React Context for user state management# or

- **Role-based Routing**: Different UI based on user role (Employee/Manager)bun dev

- **Session Persistence**: User login state persisted in localStorage```



### 🎨 Design SystemOpen [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- **Tailwind CSS**: Utility-first CSS framework for styling

- **Responsive Design**: Mobile-first approach with responsive layoutsYou can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

- **Consistent UI**: Reusable components with consistent styling

- **Loading States**: Loading indicators for better user experienceThis project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.



## Tech Stack## Learn More



- **Framework**: Next.js 16 (React 19)To learn more about Next.js, take a look at the following resources:

- **Language**: TypeScript

- **Styling**: Tailwind CSS- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

- **State Management**: React Context API- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

- **HTTP Client**: Native Fetch API

- **Type Safety**: Full TypeScript coverageYou can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!



## Project Structure## Deploy on Vercel



```The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

frontend/

├── src/Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx          # Root layout with AuthProvider
│   │   ├── page.tsx            # Main page with role-based routing
│   │   ├── globals.css         # Global styles and Tailwind imports
│   │   └── favicon.ico         # App favicon
│   ├── components/             # React Components
│   │   ├── LoginForm.tsx       # User authentication component
│   │   ├── LeaveForm.tsx       # Employee leave application form
│   │   └── ManagerDashboard.tsx # Manager dashboard for approvals
│   ├── contexts/               # React Context Providers
│   │   └── AuthContext.tsx     # Authentication state management
│   ├── lib/                    # Utility Libraries
│   │   └── api.ts              # API client for backend communication
│   └── types/                  # TypeScript Type Definitions
│       └── index.ts            # All TypeScript interfaces
├── public/                     # Static Assets
├── package.json               # Dependencies and scripts
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── next.config.ts            # Next.js configuration
└── README.md                 # This file
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)
- Backend API server running on http://localhost:3001

### Installation

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Development

**Start the development server**:
```bash
npm run dev
```

The application will be available at http://localhost:3000

### Production

**Build for production**:
```bash
npm run build
```

**Start production server**:
```bash
npm start
```

## Component Overview

### AuthContext (`/contexts/AuthContext.tsx`)
Manages user authentication state and provides login/logout functionality.

**Key Features**:
- User session management
- API integration for user loading
- localStorage persistence
- Loading state handling

### LoginForm (`/components/LoginForm.tsx`)
Demo authentication interface allowing users to select from available users.

**Key Features**:
- Dropdown selection of demo users
- Role identification (Employee/Manager)
- Form validation and error handling
- Clean, accessible UI

### LeaveForm (`/components/LeaveForm.tsx`)
Employee interface for submitting leave requests.

**Key Features**:
- Leave type selection (Annual, Sick, Personal)
- Date range validation
- Reason text input
- Real-time form validation
- Success/error feedback

### ManagerDashboard (`/components/ManagerDashboard.tsx`)
Manager interface for reviewing and processing leave requests.

**Key Features**:
- Pending requests display
- Employee information view
- Approve/reject actions
- Comments/feedback system
- Real-time updates

## API Integration

The frontend communicates with the backend API through the `/lib/api.ts` module:

### Authentication Endpoints
- `getUsers()` - Fetch available demo users
- `login(userId)` - Authenticate user by ID

### Leave Management Endpoints
- `applyLeave(leaveData)` - Submit leave application
- `getPendingRequests()` - Get pending requests (Manager only)
- `approveRejectLeave(id, action, comments)` - Process leave request
- `getLeaveSummary()` - Get monthly summary (Bonus feature)

## TypeScript Types

All TypeScript interfaces are defined in `/types/index.ts`:

```typescript
- User: User account information
- LeaveRequest: Leave request data structure
- LeaveApplicationData: Form data for leave applications
- ApiResponse<T>: Generic API response wrapper
- AuthContextType: Authentication context interface
- LeaveSummary: Monthly leave statistics
```

## Styling Approach

### Tailwind CSS
- Utility-first CSS framework
- Responsive design classes
- Consistent color palette
- Custom component classes

### Design Principles
- **Mobile-first**: Responsive design starting from mobile
- **Accessibility**: Proper ARIA labels and semantic HTML
- **Consistency**: Reusable design patterns
- **User Experience**: Clear feedback and loading states

## User Experience Features

### Employee Experience
1. **Simple Login**: Select user from dropdown
2. **Intuitive Form**: Clear leave application process
3. **Validation**: Real-time form validation feedback
4. **Confirmation**: Success messages after submission

### Manager Experience  
1. **Dashboard View**: Overview of all pending requests
2. **Request Details**: Complete employee and request information
3. **Quick Actions**: One-click approve/reject buttons
4. **Feedback System**: Add comments to decisions

## Environment Configuration

### Development
- **API Base URL**: http://localhost:3001
- **Hot Reload**: Enabled for development efficiency
- **Error Overlay**: Development error display

### Production
- **Optimized Build**: Minified and optimized assets
- **Static Generation**: Pre-rendered pages where possible
- **Performance**: Optimized bundle size

## Testing Strategy

### Current Testing
- TypeScript compilation checks
- ESLint code quality checks

### Future Testing Enhancements
- **Unit Tests**: React component testing with Jest
- **Integration Tests**: API integration testing
- **E2E Tests**: Full user workflow testing with Playwright

## Performance Optimizations

### Next.js Features
- **App Router**: Modern routing with React Server Components
- **Automatic Code Splitting**: Optimized bundle loading
- **Image Optimization**: Next.js Image component
- **Font Optimization**: Automatic font loading optimization

### React Optimizations
- **Context Optimization**: Minimal re-renders
- **Component Memoization**: Strategic use of React.memo
- **Lazy Loading**: Dynamic imports where beneficial

## Accessibility

### Implementation
- **Semantic HTML**: Proper HTML5 elements
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG compliant color schemes

## Future Enhancements

### Features
- **Dark Mode**: Theme switching capability
- **Internationalization**: Multi-language support
- **Progressive Web App**: Offline functionality
- **Real-time Updates**: WebSocket integration

### Technical Improvements
- **State Management**: Redux Toolkit for complex state
- **Component Library**: Design system components
- **Error Boundary**: Comprehensive error handling
- **Performance Monitoring**: Real user monitoring

## Development Guidelines

### Code Style
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting (if configured)
- **Component Structure**: Consistent component patterns

### Best Practices
- **Component Composition**: Reusable component design
- **Custom Hooks**: Logic extraction and reuse
- **Error Handling**: Comprehensive error boundaries
- **Loading States**: User feedback during async operations

## Troubleshooting

### Common Issues

**"Cannot find module" errors**:
- Check if all dependencies are installed (`npm install`)
- Verify TypeScript paths in `tsconfig.json`

**API connection errors**:
- Ensure backend server is running on port 3001
- Check CORS configuration
- Verify API endpoints match backend routes

**Styling issues**:
- Check Tailwind CSS configuration
- Verify CSS imports in `globals.css`
- Check for conflicting styles

## Contributing

### Development Workflow
1. Create feature branch
2. Make changes with TypeScript types
3. Test component functionality
4. Update documentation if needed
5. Submit pull request

### Code Standards
- Follow TypeScript best practices
- Use consistent component patterns
- Add proper error handling
- Include loading states for async operations
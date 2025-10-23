Screening Test – Senior Full Stack
Developer (SaaS HR Product)
⏳ Submission Deadline: 5–6 hours
📬 Submission Format: GitHub repo link + README.md

🧪 Scenario
You are building a Leave Request Workflow for our SaaS HR platform.
The workflow should allow:
● Employees to submit leave requests
● Managers to approve/reject requests
Use mock data for users (Employees & Managers) and leave balances. No need for a real
database — in-memory data or JSON storage is fine.

📋 Candidate Tasks
🔹 1. Backend API
Build basic APIs:
● POST /leave/apply → employee applies for leave
● GET /leave/pending → manager views pending requests
● POST /leave/approve/:id → manager approves/rejects a request

Requirements:
● Validate dates (no past dates, no overlaps)
● Check leave balance before approval
● Ensure only “Manager” role can approve

🔹 2. Frontend
Build a small UI (React/Next.js or similar):
● Employee → form to apply for leave (with validation & feedback)
● Manager → dashboard with list of pending requests + approve/reject buttons

🔹 3. Role Handling
● Mock login for Employee and Manager (hardcoded users is fine)
● Show different UI based on role

🔹 4. Code Quality & Documentation
● Use clean architecture & reusable components
● Provide a README.md with:
○ Setup instructions
○ Assumptions
○ Brief explanation of your approach

🔹 5. Testing
● Add unit tests for one backend function (e.g., date validation or leave balance check)
● Add a simple frontend test for the leave form

🔹 Bonus (Optional – 5 marks)
● Add a monthly leave summary endpoint (GET /leave/summary)
● Add TypeScript types for API responses
Best of luck!
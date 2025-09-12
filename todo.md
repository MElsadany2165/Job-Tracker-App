# Job Tracker Web App - MVP Implementation

## Core Features to Implement:

### 1. Main Dashboard (`src/pages/Index.tsx`)
- Overview statistics (total applications, interviews, offers, rejections)
- Recent activity feed
- Quick actions (add new job, upcoming interviews)

### 2. Job Management (`src/components/JobList.tsx`, `src/components/JobCard.tsx`)
- Add/edit/delete job applications
- Job status tracking (Applied, Interview, Offer, Rejected, etc.)
- Company information, position, salary, application date
- Notes and follow-up reminders

### 3. Interview Tracker (`src/components/InterviewTracker.tsx`)
- Schedule interviews with date/time
- Interview types (phone, video, onsite)
- Interview notes and feedback
- Next steps tracking

### 4. Analytics Dashboard (`src/components/Analytics.tsx`)
- Application status distribution (pie chart)
- Application timeline (line chart)
- Success rate metrics
- Monthly application trends

### 5. Data Management (`src/lib/storage.ts`)
- Local storage implementation
- Data models for jobs, interviews, companies
- CRUD operations
- Data export/import functionality

### 6. UI Components
- Modern responsive layout with sidebar navigation
- Dark/light mode toggle
- Search and filter functionality
- Mobile-responsive design

## File Structure:
1. `src/pages/Index.tsx` - Main dashboard
2. `src/components/JobList.tsx` - Job applications list
3. `src/components/JobCard.tsx` - Individual job card
4. `src/components/JobForm.tsx` - Add/edit job form
5. `src/components/InterviewTracker.tsx` - Interview management
6. `src/components/Analytics.tsx` - Charts and statistics
7. `src/lib/storage.ts` - Data management
8. `src/lib/types.ts` - TypeScript interfaces

## Technology Stack:
- React + TypeScript
- Shadcn/UI components
- Tailwind CSS for styling
- Recharts for analytics
- Local storage for data persistence
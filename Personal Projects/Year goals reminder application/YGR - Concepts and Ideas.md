<span class="mcl-back-button">[[Personal Projects/Year goals reminder application/index|← Year goals reminder application]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---


---
tags:
  - personal-projects
---
### Use Cases:

1. **Create Goals**
    
    - Users can create overarching (big) goals.
    - Users can break down big goals into smaller sub-goals.
    - Users can add details (description, images, tags, and reference links) to goals and sub-goals.
2. **Manage Goals**
    
    - Users can edit goals (title, details, tags, reminders, etc.).
    - Users can delete goals or sub-goals.
    - Users can change the status of goals (e.g., "In Progress," "Completed," "Reopened").
    - Users can switch between years (2023, 2024, etc.) to view or manage goals for different timelines.
3. **Set and Manage Reminders**
    
    - Users can set reminders for goals on a daily, weekly, or monthly basis.
    - Users can view upcoming reminders in a consolidated view.
4. **View Goals**
    
    - Users can view goals in a hierarchical structure (Big -> Small -> Detail).
    - Users can filter or search goals by tags, status, or year.

---

### User Stories:

#### Goal Management:

- **As a user**, I want to create goals for the year so that I can track my progress toward achieving them.
- **As a user**, I want to add sub-goals to a primary goal so that I can break it down into manageable steps.
- **As a user**, I want to attach images, tags, and reference links to my goals so that I can have all related information in one place.
- **As a user**, I want to mark goals as complete or reopen them as needed so that I can manage progress dynamically.
- **As a user**, I want to switch between years so that I can compare or manage goals over time.

#### Reminders:

- **As a user**, I want to set reminders for specific goals so that I can stay on track to complete them.
- **As a user**, I want to receive reminders daily, weekly, or monthly so that I don't forget my objectives.
- **As a user**, I want to view a list of all reminders so that I can plan my actions better.

#### Filtering and Search:

- **As a user**, I want to filter my goals by tags or status so that I can focus on specific types of tasks.
- **As a user**, I want to search for a goal using keywords so that I can quickly find it.

---

### Features:

#### Core Features:

1. **Goal Hierarchy**
    - Create and view goals in a nested structure.
2. **Goal Details**
    - Attach metadata (images, tags, links).
3. **Year Management**
    - Easily switch between years.

#### Advanced Features:

1. **Reminders**
    - Configurable notifications.
2. **Filters & Search**
    - Dynamic searching and tagging.
3. **Status Updates**
    - Real-time status management.

---

### Frontend Components:

1. **GoalList Component**
    
    - Displays all goals for the selected year.
    - Allows hierarchy navigation (expand/collapse sub-goals).
2. **GoalEditor Component**
    
    - A modal or page for creating/editing goals.
3. **ReminderList Component**
    
    - Displays upcoming reminders.
4. **YearSwitcher Component**
    
    - Dropdown or tabs for selecting the year.
5. **FilterBar Component**
    
    - Search bar and tag filters.
6. **Notification Component**
    
    - Displays reminders or alerts.

---

### Backend/API (if needed):

- **Goal API**: Handle CRUD operations for goals.
- **Reminder API**: Manage reminders and notifications.
- **User Preferences API**: Save user-specific settings (e.g., reminder intervals, preferred view, etc.).

---

### Technology Stack:

- **Frontend**: Next.js, React, Tailwind CSS for styling.
- **State Management**: React Context or Redux.
- **Database**: Firebase, Supabase, or a lightweight database like SQLite.
- **Notifications**: Push APIs or integration with services like OneSignal.
- **Deployment**: Vercel for fast, seamless deployments.

---

### Development Steps:

1. **Design UI/UX**
    
    - Sketch wireframes for the main pages and components.
    - Create a component library for reusable UI elements.
2. **Set Up Next.js**
    
    - Initialize the project with TypeScript.
    - Configure routing and API routes for dynamic data handling.
3. **Build Features**
    
    - Start with core features (goal creation, hierarchical view).
    - Add advanced features iteratively (reminders, filters).
4. **Testing**
    
    - Write unit and integration tests for critical components.
    - Test notifications and reminders.
5. **Deploy**
    
    - Push to Vercel and test in production.

---

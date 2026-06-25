<span class="mcl-back-button">[[Personal Projects/Year goals reminder application/index|← Year goals reminder application]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---


---
tags:
  - personal-projects
---
Here’s a detailed breakdown of the pages and their functionality for the "Goals of Year Reminder" application:

---

### **1. Home Page (Goals Overview)**

#### **Purpose**:

- Central dashboard to view, manage, and navigate goals for a selected year.

#### **Key Components**:

1. **Header**:
    
    - **Year Selector**: Dropdown to switch between years (e.g., 2023, 2024).
    - **Search Bar**: Allows keyword-based search across goals.
    - **Filter Options**: Filter goals by status, tags, or completion.
2. **Goals List**:
    
    - Hierarchical structure to display:
        - **Big Goals**: Main categories or overarching objectives.
        - **Small Goals**: Sub-goals tied to a big goal.
        - **Detailed Goals**: Specific tasks or steps.
    - Expand/Collapse functionality for nested goals.
3. **Action Buttons**:
    
    - **Add Goal**: Opens a modal or navigates to the Goal Creation page.
    - **Quick Actions**: Mark a goal as complete or reopen it directly from the list.

#### **Functionality**:

- Navigate between years.
- View a list of all goals with real-time status updates.
- Perform quick actions like marking goals complete or reopening them.

---

### **2. Goal Detail Page**

#### **Purpose**:

- Detailed view of a selected goal for editing and managing related tasks.

#### **Key Components**:

1. **Goal Overview**:
    
    - Title, description, and current status.
    - Tags for categorization.
    - Attached image or media (if any).
2. **Sub-Goals Section**:
    
    - List of sub-goals under the main goal.
    - Add/Edit/Delete functionality for sub-goals.
3. **Reference Links**:
    
    - List of external links associated with the goal.
    - Add new links.
4. **Reminders**:
    
    - Current reminder settings (daily, weekly, monthly).
    - Edit/Delete reminder.

#### **Functionality**:

- View and update all details of the goal.
- Manage sub-goals and their hierarchy.
- Attach or edit metadata like images, links, and tags.

---

### **3. Reminder Management Page**

#### **Purpose**:

- Centralized view to manage reminders for all goals.

#### **Key Components**:

1. **Reminder List**:
    
    - Grouped by frequency: Daily, Weekly, Monthly.
    - Display goal titles and their associated reminders.
2. **Edit/Delete Buttons**:
    
    - Modify or remove reminders for a specific goal.
3. **Add Reminder**:
    
    - Create a new reminder linked to a goal.

#### **Functionality**:

- Modify existing reminders.
- Add new reminders to specific goals.
- View reminders grouped by frequency for better organization.

---

### **4. Settings Page**

#### **Purpose**:

- Configure preferences for the application.

#### **Key Components**:

1. **Tags Management**:
    
    - Create, edit, or delete tags.
    - View all tags used across goals.
2. **Reminder Defaults**:
    
    - Set default reminder frequency (e.g., daily by default).
3. **Theme Settings**:
    
    - Light/Dark mode toggle.
    - Option to customize the UI theme.

#### **Functionality**:

- Manage global preferences for reminders and tags.
- Personalize the application’s look and feel.

---

### **5. Add/Edit Goal Page**

#### **Purpose**:

- Dedicated page or modal for creating or editing a goal.

#### **Key Components**:

1. **Input Fields**:
    
    - Title, description, tags, and optional image upload.
    - Dropdown for assigning the goal to a specific year.
2. **Sub-Goals Section**:
    
    - Add/edit multiple sub-goals at the time of goal creation.
3. **Reference Links**:
    
    - Add links related to the goal.
4. **Reminder Settings**:
    
    - Set an initial reminder (optional).

#### **Functionality**:

- Create new goals with all associated metadata.
- Update existing goals.

---

### **6. Error and Empty States**

#### **Purpose**:

- Handle situations where no data exists or errors occur.

#### **Key Components**:

1. **Empty State for Goals**:
    
    - Display a message like “No goals created yet for this year.”
    - Button to add the first goal.
2. **Error Handling**:
    
    - User-friendly error messages for failed operations (e.g., saving a goal or reminder).

---

### **General Functionalities Across Pages**

1. **Navigation**:
    
    - Sidebar or top navigation for seamless switching between pages (Home, Reminders, Settings).
2. **Real-Time Updates**:
    
    - Reflect changes (e.g., goal completion) across all relevant pages.
3. **Mobile Responsiveness**:
    
    - Ensure pages adapt well to smaller screens with collapsible menus and optimized layouts.

---

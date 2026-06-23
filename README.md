# Taskflow — Simple Task Manager

A clean, full-stack task management application built with **Next.js 16**, **React 19**, and **MongoDB**. Create, view, update, and delete tasks with a polished dark-themed UI.

## Features

- **Add tasks** with a title, description, and status (To Do / In Progress / Done)
- **View all tasks** in a clean card-based list with staggered animations
- **Update status** directly from each task card using inline status buttons
- **Delete tasks** with a confirmation step to prevent accidental removal
- **Filter tasks** by status using the filter bar (All, To Do, In Progress, Done)
- **Loading skeletons** for a seamless experience while data loads
- **Optimistic UI updates** for instant visual feedback
- **Responsive design** that works on desktop and mobile

## Tech Stack

| Layer     | Technology           |
| --------- | -------------------- |
| Framework | Next.js 16 (App Router) |
| Frontend  | React 19, TypeScript |
| Styling   | Tailwind CSS v4, CSS Custom Properties |
| Database  | MongoDB (Mongoose ODM) |
| API       | Next.js Route Handlers (REST) |
| Font      | Inter (via next/font) |

## Project Structure

```
task-manager/
├── app/
│   ├── api/
│   │   └── tasks/
│   │       ├── route.ts          # GET all, POST new task
│   │       └── [id]/
│   │           └── route.ts      # PATCH status, DELETE task
│   ├── globals.css               # Design system tokens & styles
│   ├── layout.tsx                # Root layout with fonts & SEO
│   └── page.tsx                  # Main page (client component)
├── components/
│   ├── Header.tsx                # Sticky header with logo & CTA
│   ├── StatsBar.tsx              # Filter pills with counts
│   ├── TaskForm.tsx              # Form for creating tasks
│   ├── TaskCard.tsx              # Individual task card
│   └── TaskList.tsx              # Task list with loading/empty states
├── lib/
│   └── mongodb.ts                # MongoDB connection utility
├── models/
│   └── Task.ts                   # Mongoose schema
├── services/
│   └── taskService.ts            # Frontend API calls (fetch)
└── types/
    └── task.ts                   # TypeScript interfaces
```

## Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **MongoDB** — a running instance (local or cloud like [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone the repository

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/taskmanager
```

Replace the URI with your actual MongoDB connection string.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production (optional)

```bash
npm run build
npm start
```

## API Endpoints

| Method   | Endpoint          | Description              |
| -------- | ----------------- | ------------------------ |
| `GET`    | `/api/tasks`      | Fetch all tasks (sorted by newest) |
| `POST`   | `/api/tasks`      | Create a new task        |
| `PATCH`  | `/api/tasks/:id`  | Update a task's status   |
| `DELETE` | `/api/tasks/:id`  | Delete a task            |

### Example: Create a task

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "My Task", "description": "Something to do", "status": "To Do"}'
```

## Design Decisions

- **Inline styles over CSS classes** in components — keeps each component self-contained and portable without extra stylesheets. The design system tokens (CSS custom properties) in `globals.css` provide the shared visual language.
- **Optimistic updates** — status changes and deletions feel instant because the UI updates before the server confirms.
- **Status as buttons, not a dropdown** — more visible, more intentional. You can see all states at a glance and switch with one click.
- **Delete confirmation** — appears inline on hover rather than a modal, keeping the user in context.

## License

MIT

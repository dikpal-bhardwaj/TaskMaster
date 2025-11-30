# TaskMaster

A modern, full-stack task management application built with the MERN stack. TaskMaster helps you organize your daily tasks with an elegant, glassmorphic dark-themed interface.

## Features

- **User Authentication** - Secure login and registration system with password management
- **Task Management** - Create, update, delete, and toggle task status with ease
- **Calendar View** - Browse tasks by date with an intuitive calendar interface
- **Smart Filtering** - Filter tasks by status (All, Pending, Completed)
- **Task Statistics** - Real-time dashboard showing pending, completed, and today's tasks
- **Responsive Design** - Seamless experience across desktop and mobile devices
- **Dark Theme** - Eye-friendly glassmorphic UI with purple and cyan gradients

## Tech Stack

**Frontend:**
- React 18 with TypeScript
- React Router for navigation
- Axios for API calls
- React DatePicker for calendar functionality
- CSS3 with custom properties for theming

**Backend:**
- Node.js & Express
- MongoDB Atlas for cloud database
- JWT for authentication
- bcrypt for password hashing

**Development:**
- Vite for fast development and building
- pnpm for package management
- Concurrently for running multiple processes

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm package manager
- MongoDB Atlas account

### Installation

1. Clone the repository
```bash
git clone https://github.com/dikpal-bhardwaj/TaskMaster.git
cd TaskMaster
```

2. Install dependencies
```bash
pnpm install
```

3. Set up environment variables

Create a `.env` file in the root directory:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret
PORT=5000
```

4. Start the development server
```bash
pnpm dev
```

The application will be available at:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## Project Structure

```
TaskMaster/
├── client/                # Frontend React application
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── contexts/     # React context providers
│   │   ├── pages/        # Application pages
│   │   └── types/        # TypeScript type definitions
│   └── package.json
├── server/               # Backend Express application
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   └── server.js        # Server entry point
└── package.json         # Root package configuration
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/change-password` - Change password

### Tasks
- `GET /api/tasks` - Get all tasks (supports filtering by status and date)
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Usage

1. **Register/Login** - Create an account or login with existing credentials
2. **Add Tasks** - Click the "Add Task" button to create new tasks
3. **Manage Tasks** - Mark tasks as complete, edit details, or delete them
4. **View Calendar** - Navigate to the Calendar page to browse tasks by date
5. **Update Settings** - Change your password in the Settings page

## Build for Production

```bash
pnpm build
```

This will create optimized production builds in:
- `client/dist` - Frontend build
- Server runs from `server/` directory

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

Dikpal Bhardwaj - [@dikpal-bhardwaj](https://github.com/dikpal-bhardwaj)

Project Link: [https://github.com/dikpal-bhardwaj/TaskMaster](https://github.com/dikpal-bhardwaj/TaskMaster)

## Acknowledgments

- Design inspiration from modern glassmorphism trends
- Icons and emojis for visual enhancement
- MongoDB Atlas for reliable cloud database hosting

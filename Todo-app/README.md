# Todo App

A simple Todo application built with Vite, React, shadcn/ui, Tailwind CSS, and TanStack Query.

## Features

- Create, read, update, and delete todos
- Mark todos as completed
- Responsive design with Tailwind CSS
- Beautiful UI components from shadcn/ui
- State management with TanStack Query
- API integration with Axios
- Code quality with Biome.js

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query
- **HTTP Client**: Axios
- **Linting & Formatting**: Biome.js

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm

### Installation

**Step 1:** Clone the repository

**Step 2:** Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

**Step 3:** Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

**Step 4:** Open your browser and navigate to `http://localhost:5173`

## API Integration

The app is configured to connect to a REST API at `http://localhost:8080`. Make sure your backend server is running at this address.

## Code Quality

This project uses Biome.js for linting and formatting instead of ESLint. To run the linter:

```bash
npm run lint
# or
yarn lint
# or
pnpm lint
```

To format the code:

```bash
npm run format
# or
yarn format
# or
pnpm format
```

## VS Code Integration

For the best development experience with VS Code, install the Biome extension and use the provided `.vscode/settings.json` configuration.

## Project Structure

```text
todo-app/
├── public/              # Static assets
├── src/
│   ├── api/             # API functions
│   ├── components/      # React components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── TodoForm.tsx # Form for adding todos
│   │   ├── TodoItem.tsx # Individual todo item
│   │   └── TodoList.tsx # List of todos
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Main application component
│   ├── index.css        # Global styles
│   └── main.tsx         # Application entry point
├── .vscode/             # VS Code configuration
├── biome.json           # Biome.js configuration
├── index.html           # HTML entry point
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## License

MIT

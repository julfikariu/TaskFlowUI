# TaskFlow UI

TaskFlow UI is an Angular frontend application for the TaskFlow project.

The project is being developed as a learning project to understand modern Angular architecture and real-world frontend integration with an ASP.NET Core Web API.

The backend API provides authentication and project/task management functionality.

## Tech Stack

* Angular 21
* TypeScript
* Tailwind CSS
* RxJS
* Angular Router
* Angular Reactive Forms
* ASP.NET Core Web API
* JWT Authentication

## Project Goals

The main purpose of this project is to learn Angular by building a real-world application rather than following isolated tutorials.

The project will cover:

* Angular standalone architecture
* Feature-based project structure
* Angular routing
* Reactive Forms
* Form validation
* HTTP API integration
* JWT authentication
* HTTP Interceptors
* Route Guards
* Signals
* Dashboard architecture
* Projects CRUD
* Tasks CRUD
* Loading and error handling
* Reusable components
* Production-oriented frontend structure

## Current Architecture

```text
src/app/
│
├── core/
│   ├── guards/
│   ├── interceptors/
│   └── services/
│
├── shared/
│   ├── components/
│   └── models/
│
├── features/
│   ├── auth/
│   │   ├── login/
│   │   └── register/
│   │
│   ├── dashboard/
│   ├── projects/
│   └── tasks/
│
├── app.ts
├── app.html
├── app.config.ts
└── app.routes.ts
```

## Completed

### Angular Project Setup

* Created Angular 21 application
* Configured standalone Angular architecture
* Configured Tailwind CSS
* Verified Tailwind CSS integration

### Application Routing

Implemented routes for:

```text
/login
/register
/dashboard
/projects
/tasks
```

### Authentication UI

Created the initial Login page with:

* Email field
* Password field
* Reactive Form
* Form validation
* Required validation
* Email validation
* Minimum password length validation
* Register navigation

## Login Architecture

The current login flow is intentionally separated into UI and service responsibilities.

```text
Login Component
      │
      │ Form Data
      ▼
Auth Service
      │
      │ HTTP Request
      ▼
ASP.NET Core API
      │
      ▼
JWT
```

The API integration will be implemented in the next stage.

## Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Application:

```text
http://localhost:4200
```

## Backend

The frontend will communicate with the TaskFlow ASP.NET Core Web API.
```
https://github.com/julfikariu/TaskFlowAPI
```

The backend currently provides:

* User Registration
* User Login
* JWT Authentication
* Project APIs
* Task APIs

## Learning Approach

This project follows a production-oriented architecture.

The application is being developed feature by feature while focusing on:

1. Separation of concerns
2. Maintainability
3. Reusability
4. Type safety
5. Proper Angular patterns
6. API integration
7. Authentication architecture
8. Scalable project structure

The goal is not only to make the application work, but also to understand why each architectural decision is made.

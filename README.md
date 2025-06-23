# User Management App

A modern Angular application for user management with a responsive design, featuring authentication, user data visualization, and a mobile-friendly interface built with Angular 19 and Angular Material.

## 🌐 Live Demo

**[View Live Application](https://ubiquitous-fudge-3fa4f3.netlify.app/login)**

The application is deployed and accessible at: `https://ubiquitous-fudge-3fa4f3.netlify.app/login`

## 🚀 Features

- **Authentication System**: Login with mock user credentials
- **User Management**: View and manage user data with pagination and search
- **Responsive Design**: Mobile-first approach with collapsible sidebar
- **Data Visualization**: User statistics and interactive data tables
- **Modern UI**: Angular Material components with custom styling
- **Progressive Web App**: Optimized for performance and modern web standards

## 🛠️ Tech Stack

- **Framework**: Angular 19.2.x
- **UI Library**: Angular Material 19.2.x
- **Styling**: SCSS with Material Design
- **State Management**: Angular Signals
- **HTTP Client**: Angular HttpClient with RxJS
- **Data Source**: Random User API
- **Build Tool**: Angular CLI
- **Package Manager**: npm

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher
- **Angular CLI**: Version 19.x or higher

```bash
# Install Angular CLI globally
npm install -g @angular/cli
```

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone <repository-url>
cd user-management-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm start
# or
ng serve
```

### 4. Open your browser
Navigate to `http://localhost:4200/`

## 🔑 Login Credentials

Use any of these test credentials to access the application:

| Username | Password |
|----------|----------|
| `usuario123` | `¡Contraseña1!` |
| `coder_gal` | `SecurePass2#` |
| `dev_master` | `MySecretPwd3$` |
| `cuenta_de_prueba` | `ContraseñaDébil4%` |
| `admin_user` | `AdminPass5^` |

## 📁 Project Structure

```
src/
├── app/
│   ├── core/                     # Core functionality
│   │   ├── interfaces/           # TypeScript interfaces
│   │   ├── services/             # Application services
│   │   │   ├── auth.service.ts   # Authentication service
│   │   │   ├── user.service.ts   # User data service
│   │   │   └── sidebar.service.ts # Sidebar state management
│   │   ├── navbar/               # Navigation bar component
│   │   ├── sidebar/              # Sidebar component
│   │   └── utils/                # Utility functions
│   │
│   ├── modules/                  # Feature modules
│   │   ├── login/                # Authentication module
│   │   │   ├── components/       # Login components
│   │   │   │   ├── login-form/   # Login form component
│   │   │   │   └── login-banner/ # Login banner component
│   │   │   ├── login.component.ts
│   │   │   ├── login.module.ts
│   │   │   └── login-routing.module.ts
│   │   │
│   │   ├── user-management/      # User management module
│   │   │   ├── components/       # User management components
│   │   │   │   ├── table/        # User data table
│   │   │   │   └── stats/        # User statistics
│   │   │   ├── user-management.component.ts
│   │   │   ├── user-management.module.ts
│   │   │   └── user-management-routing.module.ts
│   │   │
│   │   └── user/                 # User detail module
│   │       ├── user.component.ts # User profile component
│   │       ├── user.module.ts
│   │       └── user-routing.module.ts
│   │
│   ├── shared/                   # Shared components and utilities
│   │   ├── material/             # Angular Material module
│   │   ├── pipes/                # Custom pipes
│   │   │   ├── birth-date.pipe.ts
│   │   │   ├── phone-format.pipe.ts
│   │   │   └── user-age.pipe.ts
│   │   └── main-layout.component.ts # Main layout wrapper
│   │
│   ├── app.component.ts          # Root component
│   ├── app.config.ts             # Application configuration
│   └── app.routes.ts             # Application routes
│
├── environments/                 # Environment configurations
│   └── environment.ts            # Development environment
├── styles.scss                   # Global styles
└── index.html                    # Main HTML file
```

## 🏗️ Architecture

### Core Services

- **AuthService**: Handles user authentication with mock data
- **UserService**: Manages user data fetching from Random User API
- **SidebarService**: Controls sidebar state using Angular Signals

### State Management

The application uses Angular Signals for reactive state management:
- User data state (loading, error, pagination)
- Sidebar visibility state
- Authentication state

### Routing

The application implements lazy loading for optimal performance:
- `/login` - Authentication module
- `/app/user-management` - User management dashboard
- `/app/user/:id` - User detail view

## 🎨 UI/UX Features

### Responsive Design
- **Desktop**: Fixed sidebar with main content area
- **Mobile**: Overlay sidebar with hamburger menu
- **Tablet**: Adaptive layout based on screen size

### Components
- **Data Table**: Sortable, searchable user table with pagination
- **Statistics Cards**: User data visualization
- **Navigation**: Responsive navbar with sidebar toggle
- **Forms**: Reactive forms with validation

## 📊 Data Source

The application fetches user data from the [Random User API](https://randomuser.me/):
- **Endpoint**: `https://randomuser.me/api/`
- **Features**: Pagination, seeded results for consistency
- **Data**: User profiles with photos, contact info, and demographics

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Build with file watching
npm run watch

# Lint code
ng lint
```

### Code Generation

Generate new components, services, and other Angular artifacts:

```bash
# Generate a new component
ng generate component component-name

# Generate a new service
ng generate service service-name

# Generate a new module
ng generate module module-name

# See all available schematics
ng generate --help
```

### Build and Deployment

```bash
# Production build
npm run build

# The build artifacts will be stored in the `dist/` directory
```

## 📱 Progressive Web App

The application is configured as a PWA with:
- Service worker for caching
- Responsive design
- Offline capability
- App manifest for installability

## 🚀 Deployment

### Netlify (Configured)
The project includes `netlify.toml` configuration:
```bash
# Deploy to Netlify
npm run build
# Upload dist/ folder to Netlify
```

### Other Platforms
- **Vercel**: Direct integration with Git repositories
- **Firebase Hosting**: `ng add @angular/fire`
- **GitHub Pages**: `ng add angular-cli-ghpages`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🔗 Additional Resources

- [Angular Documentation](https://angular.dev/)
- [Angular Material](https://material.angular.io/)
- [Angular CLI](https://angular.dev/tools/cli)
- [Random User API](https://randomuser.me/)

---

**Note**: This is a demo application built for educational purposes. The authentication system uses mock data and should not be used in production environments without proper security implementation.

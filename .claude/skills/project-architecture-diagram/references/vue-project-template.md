# Vue.js Project Architecture Template

This reference provides a template for documenting Vue.js 3 project architecture, particularly for projects using Vite, Composition API, and Vue Router.

## Example: Current Project Architecture

### Project Overview
- **Project Name**: claude-code-tutorial
- **Description**: Vue.js Hello World tutorial with Vue single-file components
- **Technology Stack**: Vue.js 3 + Vite + Vue Router
- **Project Type**: Single Page Application (SPA) with Vue 3 Composition API

### Directory Structure

```
/
├── src/                    # Source code
│   ├── App.vue            # Root application component
│   ├── main.js            # Application entry point
│   ├── assets/
│   │   └── global.css     # Global CSS styles
│   ├── components/        # Reusable Vue components
│   │   ├── Header.vue
│   │   └── CreateButton.vue
│   ├── views/             # Page components
│   │   ├── Home.vue
│   │   └── About.vue
│   └── router/            # Vue Router configuration
│       └── index.js
├── backup/                # Legacy CDN-based Vue application
│   ├── app.js
│   ├── index.html
│   └── style.css
├── dist/                  # Production build output
├── index.html            # Main HTML entry point
├── vite.config.js        # Vite configuration
├── package.json          # Project dependencies and scripts
└── CLAUDE.md            # Project documentation for Claude Code
```

### Architecture Components

#### Entry Points
- `src/main.js` - Application entry point, mounts Vue app to DOM
- `index.html` - HTML template with `#app` mount point

#### Core Application Structure
- **Root Component**: `src/App.vue` - Main application layout and routing
- **Routing**: `src/router/index.js` - Vue Router configuration with routes
- **Pages**: `src/views/` - Route components (Home, About)
- **Components**: `src/components/` - Reusable UI components
- **Styling**: `src/assets/global.css` - Global styles

#### Configuration Files
- `package.json` - Dependencies: Vue 3, Vue Router, Vite
- `vite.config.js` - Vite build configuration with Vue plugin
- `CLAUDE.md` - Project-specific instructions for Claude Code

### Key Dependencies

#### Runtime Dependencies
- `vue` (^3.4.0) - Vue.js 3 framework
- `vue-router` (^4.6.4) - Client-side routing

#### Development Dependencies
- `@vitejs/plugin-vue` (^5.0.0) - Vite plugin for Vue
- `vite` (^5.0.0) - Build tool and dev server

### Development Workflow

#### Available Scripts
```bash
npm run dev    # Start development server on port 8082
npm run build  # Build for production (output to dist/)
npm run preview # Preview production build locally
```

#### Build Configuration
- **Port**: 8082 (configured in vite.config.js)
- **Auto-open**: Browser opens automatically on dev server start
- **HMR**: Hot Module Replacement enabled for development
- **ES Modules**: `"type": "module"` in package.json

### Vue.js Specific Architecture

#### Composition API
- Uses `<script setup>` syntax in Vue components
- Reactive state with `ref()` and `computed()`
- Component logic organized in Composition API style

#### Component Structure
- Single File Components (SFC) with `.vue` extension
- Template, script, and style sections in one file
- Component-scoped styles with `<style scoped>`

#### Routing Architecture
- Vue Router for client-side navigation
- Route components in `src/views/` directory
- Router configuration in `src/router/index.js`

### Project Evolution

#### Modern vs Legacy Architecture
- **Modern**: Vite + SFC + npm dependencies (current implementation)
- **Legacy**: CDN-based Vue + separate JS/CSS files (in `backup/` directory)

This demonstrates the migration from CDN-based Vue to modern SFC development.

## Generic Vue.js Project Template

Use this template for documenting other Vue.js projects:

```markdown
# Project Architecture: [Project Name]

## Overview
- **Description**: [Brief project description]
- **Technology Stack**: Vue.js [version], [build tool], [router], [state management]
- **Project Type**: SPA, SSR, PWA, etc.

## Directory Structure

```
[Generated directory tree excluding node_modules, .git, dist, build]
```

### Key Directories
- `src/` - Source code
  - `main.js` - Application entry point
  - `App.vue` - Root component
  - `components/` - Reusable components
  - `views/` or `pages/` - Route components
  - `router/` - Routing configuration
  - `store/` - State management (if using Pinia/Vuex)
  - `composables/` or `hooks/` - Composition functions
  - `assets/` - Static assets (images, fonts, styles)
  - `utils/` or `helpers/` - Utility functions
- `public/` - Public static assets
- `tests/` or `__tests__/` - Test files

## Architecture Components

### Entry Points
- `src/main.js` - Initializes Vue app, registers plugins, mounts to DOM
- `index.html` - HTML template with app mount point

### Core Architecture
- **Vue Instance**: Configuration and global components
- **Routing**: Route definitions and navigation guards
- **State Management**: Global state pattern (if applicable)
- **API Layer**: Service classes or composables for API calls
- **UI Components**: Component hierarchy and relationships

### Configuration
- `package.json` - Dependencies, scripts, project metadata
- `vite.config.js` / `webpack.config.js` - Build configuration
- `.env.*` - Environment variables
- Other config files (TypeScript, ESLint, Prettier, etc.)

## Development Workflow

### Scripts
```bash
# From package.json
[List key scripts with descriptions]
```

### Development Server
- Port: [port number]
- Features: HMR, auto-open, proxy configuration, etc.

### Build Process
- Output directory: `dist/` or `build/`
- Bundling strategy: Code splitting, lazy loading, etc.
- Asset handling: Images, fonts, CSS extraction

## Dependencies

### Key Framework Dependencies
- Vue.js [version]
- Vue Router [version] (if used)
- Pinia/Vuex [version] (if used)
- UI library (Element Plus, Vuetify, Quasar, etc.)

### Build Toolchain
- Vite/Webpack
- TypeScript (if used)
- CSS preprocessor (Sass, Less, etc.)

### Testing
- Vitest/Jest
- Vue Test Utils
- Testing Library
- Cypress/Playwright (E2E)

## Deployment
- Build command and output
- Server requirements
- Environment variables
- Deployment targets (Netlify, Vercel, traditional hosting)
```

## Analysis Tips for Vue.js Projects

### 1. Identify Vue Version and Features
- Check package.json for Vue version
- Look for Composition API (`<script setup>`) vs Options API
- Identify additional Vue plugins (Router, Pinia, etc.)

### 2. Analyze Component Structure
- Component organization pattern (feature-based, layer-based)
- Component communication patterns (props, events, provide/inject)
- Reusable component library vs project-specific components

### 3. Examine State Management
- Local component state vs global state
- Pinia/Vuex stores or composables for shared state
- Data fetching patterns (composables, services, etc.)

### 4. Review Build Configuration
- Bundler (Vite, Webpack)
- Development server configuration
- Build optimization settings
- Environment handling

### 5. Check Testing Setup
- Unit testing framework
- Test directory structure
- Component testing patterns

## Common Vue.js Project Patterns

### Small to Medium Projects
- Single `src/` directory with flat or lightly organized structure
- Few reusable components in `components/`
- Route components in `views/` or `pages/`
- Minimal state management (local component state)

### Large Enterprise Projects
- Feature-based organization (`src/features/`)
- Domain-driven structure
- Comprehensive state management with Pinia/Vuex
- API service layer
- Shared composables and utilities
- Extensive testing setup

### Nuxt.js Projects
- Pages automatically become routes
- Layouts system
- Middleware for route handling
- Server-side rendering configuration
- Modules for extended functionality

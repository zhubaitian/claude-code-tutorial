# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Vue.js 3 tutorial project** demonstrating Single File Components (SFC) with the Composition API. The application is a Chinese-language Todo app that shows the evolution from a simple CDN-based Vue app to a modern Vite-based SFC application.

## Architecture

### Current Application (Vite + Vue 3 SFC)
- **Build Tool**: Vite 5.0.0 with Hot Module Replacement (HMR)
- **Vue Version**: 3.4.0 with Composition API
- **Entry Point**: `src/main.js` → mounts `App.vue` to `#app` element
- **Main Component**: `src/App.vue` - Todo application with full CRUD operations
- **Styling**: Component-scoped CSS in App.vue + global CSS in `src/assets/global.css`
- **External Dependencies**: Font Awesome 6.4.0 loaded via CDN in `main.js`

### Legacy Application (Backup)
The `backup/` directory contains the original CDN-based Vue 3 application:
- `backup/app.js` - Vue 3 Composition API using CDN
- `backup/index.html` - HTML entry point
- `backup/style.css` - Styles
This demonstrates the migration path from CDN-based to SFC-based Vue development.

## Development Commands

### Essential Commands
```bash
# Start development server (opens browser automatically)
npm run dev

# Build for production (outputs to dist/)
npm run build

# Preview production build locally
npm run preview
```

### Development Server
- **Port**: 8081 (configured in `vite.config.js`)
- **Auto-open**: Enabled (browser opens automatically)
- **HMR**: Enabled for fast development

## Project Structure

```
/
├── src/                    # Source code (modern SFC application)
│   ├── App.vue            # Main Todo application component
│   ├── main.js            # Application entry point (mounts Vue app)
│   └── assets/
│       └── global.css     # Global CSS styles
├── backup/                # Legacy CDN-based Vue application
│   ├── app.js            # Original Vue 3 Composition API code
│   ├── index.html        # Original HTML entry
│   └── style.css         # Original styles
├── dist/                  # Production build output (generated)
├── index.html            # Main HTML entry point (modern app)
├── vite.config.js        # Vite configuration
└── package.json          # Project configuration and dependencies
```

## Key Implementation Details

### App.vue Component
- Uses Vue 3 `<script setup>` syntax for Composition API
- Chinese language interface (text, placeholders, labels)
- Features:
  - Add todos with Enter key or button click
  - Edit todos via double-click or edit button
  - Delete todos with trash button
  - Mark todos as complete/incomplete
  - Responsive design with modern UI
- State management: Local reactive state using `ref()` and `computed()`
- No external state management (Pinia/Vuex) - uses local component state

### Build Configuration
- **Vite Config**: `vite.config.js` configures Vue plugin and dev server
- **ES Modules**: `"type": "module"` in package.json
- **Node Version**: Requires Node.js >= 18.0.0

## Testing

**No testing framework is currently configured.** The project lacks:
- Unit tests (Jest, Vitest, etc.)
- E2E tests (Cypress, Playwright, etc.)
- Test configuration files

To add testing, consider:
1. `npm install -D vitest @vue/test-utils` for unit testing
2. Configure `vitest.config.js` for Vue component testing
3. Create `__tests__` directory for test files

## Common Development Tasks

### Adding New Features
1. Create new Vue components in `src/components/` directory
2. Import and use in `App.vue` or other components
3. Use Composition API with `<script setup>` syntax
4. Add component-scoped styles with `<style scoped>`

### Modifying the Todo App
- State is managed in `App.vue` using `todos` reactive array
- Each todo has: `id`, `text`, `completed` properties
- Editing state is managed with `editingId` and `editingText` refs

### Styling Guidelines
- Component-specific styles go in `<style scoped>` section of `.vue` files
- Global styles go in `src/assets/global.css`
- Uses modern CSS: Flexbox, CSS Grid, CSS variables, gradients
- Responsive design with media queries

## Migration Considerations

The project shows two approaches:
1. **Modern**: Vite + SFC + npm dependencies (current)
2. **Legacy**: CDN-based Vue + separate JS/CSS files (backup/)

When extending the application:
- Follow the modern SFC pattern used in `src/App.vue`
- Use npm packages instead of CDN dependencies where possible
- Leverage Vite's built-in features (HMR, optimized builds)

## Troubleshooting

### Common Issues
1. **Port already in use**: Change port in `vite.config.js` server.port
2. **Node version**: Ensure Node.js >= 18.0.0
3. **Dependencies**: Run `npm install` if missing node_modules
4. **Build errors**: Check Vue syntax and import statements

### Development Workflow
1. Run `npm run dev` for development
2. Make changes to `.vue` files - HMR will update automatically
3. Test changes in browser at http://localhost:8081
4. Run `npm run build` for production deployment
5. Use `npm run preview` to test production build locally
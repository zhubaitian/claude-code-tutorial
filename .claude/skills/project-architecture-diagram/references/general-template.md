# General Project Architecture Template

This reference provides templates and guidance for documenting various types of software project architectures.

## Project Type Identification

First, identify the project type:

### Web Applications
- **Frontend Frameworks**: React, Vue, Angular, Svelte
- **Full-Stack**: Next.js, Nuxt.js, SvelteKit
- **Static Sites**: Hugo, Jekyll, Gatsby, Astro

### Backend/API Services
- **Node.js**: Express, Fastify, NestJS
- **Python**: Django, Flask, FastAPI
- **Java**: Spring Boot
- **Go**: Gin, Echo
- **Rust**: Actix, Rocket

### Mobile Applications
- **React Native**
- **Flutter**
- **Native**: iOS (Swift), Android (Kotlin)

### Desktop Applications
- **Electron**
- **Tauri**
- **Flutter Desktop**

### Libraries/Packages
- **JavaScript/TypeScript** libraries
- **Python** packages
- **Go** modules
- **Rust** crates

### CLI Tools
- **Node.js** with Commander.js, oclif
- **Python** with Click, Typer
- **Go** with Cobra
- **Rust** with Clap

## Universal Architecture Documentation Template

```markdown
# Project Architecture: [Project Name]

## Overview
- **Description**: [Brief project description from README or package.json]
- **Technology Stack**: [Primary technologies, frameworks, tools]
- **Project Type**: [Web app, API service, library, CLI, etc.]
- **Repository**: [Git repository URL if available]

## Directory Structure

\`\`\`
[Generated directory tree excluding:
- node_modules/
- .git/
- dist/ build/ out/ target/
- coverage/ .nyc_output/
- .cache/ .next/ .nuxt/ .svelte-kit/
- *.log files
- env/ .env* files
]
\`\`\`

### Key Directory Explanations
- `[directory]`: [Purpose and contents]
- `[directory]`: [Purpose and contents]

## Architecture Components

### Entry Points
- `[file]`: [Role and function]
- `[file]`: [Role and function]

### Core Modules/Components
- **Module 1**: [Description and responsibility]
- **Module 2**: [Description and responsibility]

### Configuration
- `[config file]`: [Purpose and key settings]
- `[config file]`: [Purpose and key settings]

## Development Workflow

### Available Scripts
\`\`\`bash
# From package.json or similar
[Command]: [Description]
[Command]: [Description]
\`\`\`

### Development Environment
- **Setup**: Installation and configuration steps
- **Development Server**: [Port, features, access URL]
- **Hot Reload**: [Supported/not supported]

### Build Process
- **Command**: [Build command]
- **Output**: [Output directory and artifacts]
- **Optimizations**: [Minification, bundling, etc.]

## Dependencies

### Runtime Dependencies
- `[dependency]`: [Version, purpose]
- `[dependency]`: [Version, purpose]

### Development Dependencies
- `[dependency]`: [Version, purpose]
- `[dependency]`: [Version, purpose]

### Tooling
- **Linting**: [ESLint, Prettier, etc.]
- **Testing**: [Framework, runner]
- **Type Checking**: [TypeScript, Flow, etc.]

## Testing Strategy

### Unit Tests
- **Framework**: [Jest, Mocha, pytest, etc.]
- **Location**: [Test directory pattern]
- **Coverage**: [Tool and configuration]

### Integration Tests
- **Approach**: [Testing methodology]
- **Tools**: [Testing libraries]

### E2E Tests
- **Framework**: [Cypress, Playwright, Selenium]
- **Configuration**: [Test setup]

## Deployment

### Build Artifacts
- [Description of production artifacts]

### Hosting/Deployment
- **Platform**: [Vercel, Netlify, AWS, Heroku, etc.]
- **Configuration**: [Deployment settings]
- **Environment Variables**: [Required variables]

## Monitoring and Observability
- **Logging**: [Logging framework]
- **Metrics**: [Monitoring tools]
- **Error Tracking**: [Error reporting service]

## Project-Specific Sections

[Add sections relevant to the specific project type]
```

## Technology-Specific Guidance

### React Projects
- **Key Files**: `src/index.js`, `src/App.js`, `package.json`
- **Structure Patterns**:
  - Feature-based: `src/features/`
  - Layer-based: `src/components/`, `src/pages/`, `src/hooks/`
- **State Management**: Redux, Context API, Zustand, etc.
- **Routing**: React Router, file-based routing (Next.js)

### Node.js/Express Projects
- **Entry Point**: `src/index.js` or `app.js`
- **Structure Patterns**:
  - MVC: `controllers/`, `models/`, `views/`, `routes/`
  - Modular: `src/modules/` or feature-based organization
- **Database**: ORM configuration, connection setup
- **Middleware**: Authentication, logging, error handling

### Python Projects
- **Entry Point**: `main.py`, `app.py`, or package `__main__.py`
- **Structure**:
  - Package structure with `__init__.py`
  - `src/` layout for modern packages
- **Virtual Environment**: `.venv/`, `venv/`, `env/`
- **Dependencies**: `requirements.txt`, `pyproject.toml`, `setup.py`

### Go Projects
- **Entry Point**: `cmd/` directory with main packages
- **Structure**:
  - `internal/` for private code
  - `pkg/` for public packages
  - `api/` for API definitions
- **Modules**: `go.mod` and `go.sum`
- **Testing**: `*_test.go` files alongside source

## Analysis Checklist

### 1. Initial Assessment
- [ ] Identify project type and primary technology
- [ ] Locate entry points and main files
- [ ] Check for configuration files
- [ ] Review README and documentation

### 2. Directory Structure Analysis
- [ ] Generate clean directory tree (exclude build artifacts)
- [ ] Identify source vs configuration vs asset directories
- [ ] Note unusual or project-specific directories

### 3. Dependency Analysis
- [ ] Examine package.json, requirements.txt, go.mod, etc.
- [ ] Identify key runtime dependencies
- [ ] Note development and build tools
- [ ] Check for framework-specific dependencies

### 4. Build and Development Setup
- [ ] Identify build tool (webpack, vite, make, etc.)
- [ ] Locate build configuration
- [ ] Check available scripts/commands
- [ ] Note development server configuration

### 5. Architecture Patterns
- [ ] Identify architectural style (MVC, modular, monolithic, etc.)
- [ ] Note separation of concerns
- [ ] Check for testing structure
- [ ] Identify deployment configuration

## Common Project Structures

### Monolithic Application
```
project/
├── src/
│   ├── main entry point
│   ├── modules/features
│   ├── shared utilities
│   └── tests/
├── config/
├── public/ or assets/
└── documentation/
```

### Microservices/Modular
```
project/
├── service-1/
│   ├── src/
│   ├── tests/
│   └── config/
├── service-2/
│   ├── src/
│   ├── tests/
│   └── config/
├── shared/
│   ├── libs/
│   └── types/
└── infrastructure/
```

### Library/Package
```
project/
├── src/ or lib/
│   ├── core functionality
│   └── utils/
├── tests/
├── examples/
└── docs/
```

### Full-Stack Application
```
project/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/
│   ├── src/
│   ├── config/
│   └── package.json
├── shared/
│   └── types/ schemas/
└── docker-compose.yml
```

## Tips for Effective Architecture Documentation

### Be Concise but Comprehensive
- Focus on the most important architectural decisions
- Explain the "why" not just the "what"
- Highlight unique or unusual aspects

### Use Visual Aids When Helpful
- Directory trees (text-based are fine)
- Component diagrams (describe if can't generate)
- Flow charts for data/request flow

### Tailor to Audience
- **Developers**: Focus on code organization and patterns
- **New Team Members**: Emphasize setup and workflow
- **Stakeholders**: Highlight key technologies and architecture

### Keep It Maintainable
- Reference existing documentation (README, etc.)
- Note where documentation might be outdated
- Suggest improvements to the actual documentation

## Example Output for Different Project Types

### Example 1: Simple React App
```markdown
# Project Architecture: Todo App

## Overview
- **Description**: A simple todo application built with React
- **Technology Stack**: React 18, Vite, CSS Modules
- **Project Type**: Single Page Application

## Directory Structure
...
```

### Example 2: Node.js API Service
```markdown
# Project Architecture: User Service API

## Overview
- **Description**: REST API for user management
- **Technology Stack**: Node.js, Express, MongoDB, JWT
- **Project Type**: Backend API Service

## Directory Structure
...
```

### Example 3: Python Data Pipeline
```markdown
# Project Architecture: ETL Pipeline

## Overview
- **Description**: Extract, Transform, Load pipeline for analytics
- **Technology Stack**: Python, Pandas, SQLAlchemy, Airflow
- **Project Type**: Data Processing Pipeline

## Directory Structure
...
```

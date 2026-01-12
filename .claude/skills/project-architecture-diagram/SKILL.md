---
name: project-architecture-diagram
description: Generate project architecture diagrams in markdown format. Use this skill when users need a visual or textual representation of the current project structure, including directory trees, file descriptions, dependencies, and architecture overview. This skill helps document Vue.js projects, React projects, Node.js applications, and other software projects by analyzing the file system and creating comprehensive architecture documentation.
---

# Project Architecture Diagram Skill

This skill generates detailed project architecture diagrams in markdown format by analyzing the current project structure.

## When to Use This Skill

Use this skill when:
- User asks for "project architecture diagram" or "project structure"
- User needs to understand the project layout and file organization
- User wants to document the project architecture
- User requests a "visual representation" of the project structure
- User needs to create documentation for onboarding or project overview

## How to Generate Architecture Diagrams

### 1. Analyze Project Structure

First, examine the project root directory to understand the overall structure:

```bash
ls -la
```

Look for key files and directories:
- `package.json` - Project dependencies and scripts
- Configuration files (vite.config.js, webpack.config.js, etc.)
- Source directories (`src/`, `app/`, `lib/`, etc.)
- Build output directories (`dist/`, `build/`, etc.)
- Configuration directories (`.config/`, `.github/`, etc.)
- Documentation files (`README.md`, `CLAUDE.md`, etc.)

### 2. Generate Directory Tree

Create a visual directory tree using the `tree` command if available, or generate a text-based representation:

```bash
# If tree command is available
tree -I 'node_modules|.git|dist|build|coverage' --dirsfirst

# Alternative: find command for text representation
find . -type d -not -path './node_modules*' -not -path './.git*' -not -path './dist*' -not -path './build*' | sort
```

For markdown formatting, create a hierarchical list using dashes or asterisks.

### 3. Analyze Key Files

Examine important configuration files to understand project setup:

- **package.json**: Identify dependencies, scripts, and project metadata
- **Build configuration**: Check vite.config.js, webpack.config.js, or other build tools
- **Framework configuration**: Look for framework-specific configs (vue.config.js, next.config.js, etc.)
- **Source entry points**: Find main application files (main.js, index.js, App.vue, etc.)

### 4. Create Architecture Documentation

Generate a comprehensive markdown document with the following sections:

#### Project Overview
- Project name and description (from package.json or README.md)
- Technology stack (framework, build tool, testing framework)
- Key dependencies

#### Directory Structure
- Visual tree representation
- Explanation of key directories
- File organization patterns

#### Architecture Components
- Entry points and their roles
- Key source directories and their purposes
- Configuration files and their functions
- Build and deployment artifacts

#### Development Workflow
- Available scripts (from package.json)
- Build process
- Testing approach
- Development server setup

#### Dependencies
- Key runtime dependencies
- Development dependencies
- Framework and library versions

### 5. Markdown Template

Use this template structure for the architecture document:

```markdown
# Project Architecture: [Project Name]

## Overview
- **Description**: [Brief project description]
- **Technology Stack**: [Framework, build tool, etc.]
- **Project Type**: [Web app, CLI tool, library, etc.]

## Directory Structure

```
[Directory tree output]
```

### Key Directories
- `src/` - Source code
- `public/` - Static assets
- `tests/` - Test files
- `config/` - Configuration files

## Architecture Components

### Entry Points
- `src/main.js` - Application entry point
- `index.html` - HTML template

### Core Modules
- [Describe main modules/components]

### Configuration
- `package.json` - Dependencies and scripts
- `vite.config.js` - Build configuration
- [Other config files]

## Development Workflow

### Available Scripts
```bash
# From package.json
npm run dev    # Start development server
npm run build  # Build for production
npm run test   # Run tests
```

### Build Process
[Describe build steps and output]

## Dependencies

### Runtime
- [Key runtime dependencies]

### Development
- [Key dev dependencies]

## Deployment
[Deployment instructions if available]
```

### 6. Vue.js Specific Considerations

For Vue.js projects (like this tutorial project), pay special attention to:

- **Single File Components (SFC)**: `.vue` files with `<template>`, `<script>`, and `<style>` sections
- **Composition API**: Check for `setup()` function or `<script setup>` syntax
- **State Management**: Look for Pinia/Vuex or local component state
- **Routing**: Vue Router configuration if present
- **Global Components**: Component registration patterns

### 7. Enhancements for Better Documentation

Consider adding:
- **Code snippets** showing key architectural patterns
- **Dependency graphs** (if tools are available)
- **Component relationships** for frontend frameworks
- **API endpoints** for backend projects
- **Database schema** for full-stack applications

### 8. Save Architecture Documentation to File

After generating the architecture documentation, save it to a markdown file in the project root directory:

**Recommended file names**:
- `ARCHITECTURE.md`
- `PROJECT-ARCHITECTURE.md`
- `ARCHITECTURE-OVERVIEW.md`

**Steps to save**:
1. Generate the complete architecture documentation as shown in previous steps
2. Use the Write tool to create the markdown file
3. Save it in the project root directory for easy access
4. Optionally ask the user for their preferred filename

**Example Write tool usage**:
```
Write tool with file_path: "/path/to/project/ARCHITECTURE.md" and content: [generated architecture markdown]
```

**Note**: Always check if the user has a specific filename preference before saving.

## Notes

- Always exclude `node_modules`, `.git`, `dist`, `build` from the directory tree
- Adapt the analysis based on project type (Vue.js, React, Node.js, etc.)
- Include relevant configuration details for the specific build tools used
- Reference existing documentation (README.md, CLAUDE.md) when available
- For large projects, focus on the most important architectural elements

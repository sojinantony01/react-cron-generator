# Contributing to React Cron Generator

First off, thank you for considering contributing to React Cron Generator! It's people like you that make this project such a great tool for the community.

## 🌟 Ways to Contribute

There are many ways you can contribute to this project:

- 🐛 **Report bugs** - Help us identify and fix issues
- 💡 **Suggest features** - Share ideas for new functionality
- 📝 **Improve documentation** - Help others understand the project better
- 🔧 **Submit pull requests** - Contribute code improvements
- 🌍 **Add translations** - Help make the component accessible to more users
- ⭐ **Star the project** - Show your support and help others discover it

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [Questions](#questions)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [sojinantony01@gmail.com](mailto:sojinantony01@gmail.com).

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (v7 or higher) or **yarn**
- **Git**

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:

```bash
git clone https://github.com/YOUR_USERNAME/react-cron-generator.git
cd react-cron-generator
```

3. Add the upstream repository:

```bash
git remote add upstream https://github.com/sojinantony01/react-cron-generator.git
```

## 🛠️ Development Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

This will start a local development server at `http://localhost:5173` where you can test your changes.

3. Build the library:

```bash
npm run build
```

## 📁 Project Structure

```
react-cron-generator/
├── src/
│   ├── lib/                    # Library source code
│   │   ├── cron.tsx           # Main Cron component
│   │   ├── index.ts           # Public API exports
│   │   ├── types/             # TypeScript type definitions
│   │   ├── utils/             # Utility functions
│   │   ├── cron-tab/          # Tab components (Minutes, Hourly, etc.)
│   │   ├── localization/      # Translation files
│   │   └── ...
│   ├── App.tsx                # Demo application
│   └── index.tsx              # Demo entry point
├── cypress/                    # E2E tests
├── public/                     # Static assets
├── build/                      # Build output (generated)
├── rollup.config.js           # Build configuration
└── package.json
```

## 🔄 Development Workflow

### 1. Create a Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Test additions or modifications
- `chore/` - Maintenance tasks

### 2. Make Your Changes

- Write clean, readable code
- Follow the existing code style
- Add comments for complex logic
- Update documentation as needed
- Add tests for new functionality

### 3. Keep Your Branch Updated

Regularly sync with the upstream repository:

```bash
git fetch upstream
git rebase upstream/main
```

## 🧪 Testing

### Unit Tests

Run unit tests with Vitest:

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui
```

### E2E Tests

Run end-to-end tests with Cypress:

```bash
# Open Cypress UI
npm run cy:open

# Run Cypress tests headlessly
npm run cy:run
```

### Writing Tests

- Add unit tests for new utility functions
- Add component tests for new UI components
- Ensure all tests pass before submitting a PR
- Aim for good test coverage (but don't obsess over 100%)

## 📏 Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid using `any` type when possible
- Export types that might be useful to consumers

### Code Style

We use Prettier for code formatting. Format your code before committing:

```bash
npm run format
```

Check formatting:

```bash
npm run format-check
```

### Best Practices

- **Keep components small and focused** - Single responsibility principle
- **Use meaningful variable names** - Code should be self-documenting
- **Avoid magic numbers** - Use named constants
- **Handle errors gracefully** - Provide helpful error messages
- **Optimize for performance** - Use React.memo, useMemo, useCallback when appropriate
- **Ensure accessibility** - Follow WCAG guidelines

## 📝 Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(cron-tab): add yearly tab support
fix(validation): handle edge case in Unix format validation
docs(readme): update installation instructions
test(utils): add tests for cron converter
```

## 🔀 Pull Request Process

### Before Submitting

1. ✅ Ensure all tests pass
2. ✅ Run the formatter
3. ✅ Update documentation if needed
4. ✅ Add/update tests for your changes
5. ✅ Rebase on the latest main branch
6. ✅ Ensure your commits follow the commit guidelines

### Submitting a PR

1. Push your branch to your fork:

```bash
git push origin feature/your-feature-name
```

2. Go to the [repository](https://github.com/sojinantony01/react-cron-generator) and click "New Pull Request"

3. Fill out the PR template with:
   - **Clear title** following commit conventions
   - **Description** of what changed and why
   - **Related issues** (if any)
   - **Screenshots** (for UI changes)
   - **Breaking changes** (if any)

4. Wait for review and address feedback

### PR Review Process

- Maintainers will review your PR as soon as possible
- You may be asked to make changes
- Once approved, a maintainer will merge your PR
- Your contribution will be included in the next release! 🎉

## 🐛 Reporting Bugs

### Before Reporting

1. Check if the bug has already been reported in [Issues](https://github.com/sojinantony01/react-cron-generator/issues)
2. Try to reproduce the bug with the latest version
3. Gather relevant information (browser, React version, etc.)

### Bug Report Template

When reporting a bug, please include:

- **Clear title** - Describe the issue concisely
- **Description** - Detailed explanation of the problem
- **Steps to reproduce** - How to trigger the bug
- **Expected behavior** - What should happen
- **Actual behavior** - What actually happens
- **Environment** - Browser, React version, OS, etc.
- **Screenshots** - If applicable
- **Code sample** - Minimal reproducible example

## 💡 Suggesting Features

We love feature suggestions! Before suggesting:

1. Check if it's already been suggested in [Issues](https://github.com/sojinantony01/react-cron-generator/issues)
2. Consider if it fits the project's scope and goals
3. Think about how it would benefit other users

### Feature Request Template

Include:

- **Clear title** - Describe the feature concisely
- **Problem statement** - What problem does this solve?
- **Proposed solution** - How should it work?
- **Alternatives** - Other approaches you've considered
- **Use cases** - Real-world scenarios where this would be useful

## ❓ Questions

Have questions? Here's how to get help:

- 📖 Check the [README](README.md) and documentation
- 🔍 Search [existing issues](https://github.com/sojinantony01/react-cron-generator/issues)
- 💬 Open a [new discussion](https://github.com/sojinantony01/react-cron-generator/discussions)
- 📧 Email the maintainer: [sojinantony01@gmail.com](mailto:sojinantony01@gmail.com)

## 🏆 Recognition

Contributors will be:

- Listed in the project's contributors
- Mentioned in release notes (for significant contributions)
- Forever appreciated by the community! ❤️

## 📄 License

By contributing, you agree that your contributions will be licensed under the same [MIT License](LICENSE.txt) that covers the project.

---

Thank you for contributing to React Cron Generator! Your efforts help make this project better for everyone. 🙏

**Happy coding!** 🚀
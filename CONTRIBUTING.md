# Contributing to Ride Link Driver

Thank you for your interest in contributing to Ride Link Driver! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## Development Workflow

### 1. Fork and Clone

```bash
git clone https://github.com/your-username/Ride-Link-Driver.git
cd Ride-Link-Driver
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### 4. Make Changes

- Write clear, concise commit messages
- Follow the existing code style
- Add tests for new features
- Update documentation as needed

### 5. Run Tests

```bash
pnpm lint
pnpm type-check
pnpm test
```

### 6. Commit Changes

The project uses Husky to run pre-commit hooks. All code will be automatically formatted and linted before commit.

```bash
git add .
git commit -m "feat: add new feature"
```

### 7. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Enable strict mode
- Avoid `any` types when possible
- Define proper interfaces and types

### Code Style

- Follow ESLint and Prettier configurations
- Use functional components with hooks
- Keep components small and focused
- Use meaningful variable and function names

### Commit Messages

Follow conventional commits format:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### Testing

- Write unit tests for utility functions
- Write integration tests for components
- Aim for 70%+ code coverage
- Test edge cases and error scenarios

## Pull Request Process

1. Ensure all tests pass
2. Update documentation if needed
3. Add a clear description of changes
4. Link related issues
5. Wait for review from maintainers

## Questions?

Feel free to open an issue for any questions or concerns.

# Git Commit Message Convention

Follow this convention when writing commit messages to maintain consistency and readability across the project.

## Commit Message Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Type

- **feat**: A new feature.
- **fix**: A bug fix.
- **docs**: Documentation changes.
- **style**: Changes that do not affect the meaning of the code (e.g., formatting, white-space, etc.).
- **refactor**: Code refactorings.
- **test**: Adding or fixing tests.
- **chore**: Maintenance tasks.

### Scope (optional)

Provide additional context for the change, such as the module or component affected.

### Description

A concise summary of the change. It should be clear and descriptive.

### Body (optional)

Additional details about the change, if needed. This could include the reasoning behind the change, implementation details, or any other relevant information.

### Footer(s) (optional)

Extra information like references to related issues, breaking changes, or other metadata.

## Examples

- feat(auth): Add JWT authentication
- fix(user): Fix null pointer exception in user registration
- docs(readme): Update installation instructions
- style: Format code according to PEP8
- refactor(api): Simplify error handling in API
- test(auth): Add integration tests for login endpoint
- chore: Update dependencies to latest versions

## Additional Guidelines

- Keep the subject line (type, scope, and description) under 72 characters.
- Use imperative mood in the subject line (e.g., "Add feature" instead of "Added feature").
- Separate the subject line from the body and footer(s) with a blank line.
- Use bullet points or other formatting to make the content easy to read and understand.
- Remember to refer to this template when writing commit messages to ensure consistency throughout the project.

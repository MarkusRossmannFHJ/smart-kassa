# CONTRIBUTION CONVENTIONS
To ensure consistency and smooth collaboration across the project, all contributors are expected to follow the conventions and structures outlined below.

## Branch Strategy
***TBD***

## Commit Messages
Commit messages must always use the imperative form:
```python
# RIGHT WAY
git commit -m "feat: add user login"

# WRONG WAY
git commit -m "feat: added user login"
git commit -m "feat: adds user login"
```

### Detailed Commit Type Overview
| Commit Type   | When to Use It                                            | Examples                                                  |
| ------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| **feat:**     | Adding a new feature or expanding functionality           | New API endpoint, new UI component, new DB logic          |
| **fix:**      | Fixing a bug or incorrect behavior                        | Typo causing an error, wrong calculation                  |
| **docs:**     | Documentation-only changes                                | README, comments, API docs                                |
| **style:**    | Code changes that do **not** affect behavior              | Formatting, whitespace, non-breaking typos                |
| **refactor:** | Code restructuring without adding features or fixing bugs | Cleanup, reorganizing code                                |
| **test:**     | Adding or modifying tests                                 | Unit tests, integration tests, E2E tests                  |
| **perf:**     | Performance improvements                                  | Caching, faster algorithm                                 |
| **chore:**    | Project maintenance tasks, configs, tooling               | `.gitignore` updates, dependency updates, cleanup scripts |
| **ci:**       | Changes to CI/CD configuration                            | GitHub Actions, pipelines                                 |
| **build:**    | Changes to the build system or dependencies               | Webpack, package updates                                  |

### Quick Commit Type Overview
| Commit Type  | When to Use                                            |
| ------------ | ------------------------------------------------------ |
| **feat**     | You add a feature                                      |
| **fix**      | You fix a bug                                          |
| **docs**     | You change documentation                               |
| **style**    | You change formatting or a harmless typo               |
| **refactor** | You reorganize or improve code structure               |
| **test**     | You add or modify tests                                |
| **perf**     | You improve performance                                |
| **chore**    | You change project configuration or housekeeping tasks |
| **ci**       | You adjust CI/CD pipelines                             |
| **build**    | You modify build processes or dependencies             |


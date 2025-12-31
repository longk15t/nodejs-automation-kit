# perf-k6

This project is a performance testing suite using [k6](https://k6.io/), written in TypeScript. It includes a setup for bundling TypeScript tests using Webpack, linting with ESLint, and formatting with Prettier.

## Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [k6](https://k6.io/docs/get-started/installation/)

## Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd perf-k6
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

## Usage

### Development

-   **Lint code**:
    ```bash
    npm run lint
    ```

-   **Format code**:
    ```bash
    npm run format
    ```

### Building Tests

The tests are written in TypeScript and need to be bundled before running with k6.

-   **Build tests**:
    ```bash
    npm run build
    ```
    This will compile the TypeScript files from `src/` into the `dist/` directory.

### Running Tests

After building the project, you can run the tests using k6.

-   **Run a specific test**:
    ```bash
    k6 run dist/pet-lifecycle.js
    ```

-   **Run a test on a specific environment**:
    ```bash
    # Run on dev environment (default)
    k6 run dist/pet-lifecycle.js

    # Run on staging environment
    k6 run -e ENVIRONMENT=staging dist/pet-lifecycle.js
    ```
-   **Run a test on a specific profile**:
    ```bash
    # Run normal load test (default)
    k6 run dist/pet-lifecycle.js

    # Run stress test
    k6 run -e PROFILE=STRESS_TEST dist/pet-lifecycle.js
    ```

-   **Run a test on cloud**:
    ```bash
    # Run spike test on uat environment on Grafana k6 Cloud
    k6 cloud -e PROFILE=SPIKE -e ENVIRONMENT=uat dist/pet-lifecycle.js
    ```

    *Note: Ensure you have built the project (`npm run build`) before running the tests.*

### HTML Reports

After running tests, HTML reports are generated in the `reports/` directory with timestamped filenames (e.g., `reports/summary-2025-12-28T05-23-21-277Z.html`).

## Project Structure

-   `src/`: Contains the source TypeScript test files.
-   `dist/`: Contains the bundled JavaScript files ready for k6.
-   `webpack.config.js`: Webpack configuration for bundling TypeScript.
-   `tsconfig.json`: TypeScript configuration.
-   `eslint.config.mjs`: ESLint configuration.

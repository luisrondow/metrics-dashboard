# Metrics Dashboard

This project demonstrates the implementation of a metrics dashboard with various charts and data visualizations. The dashboard includes sections for equipment efficiency, downtime analysis, and losses, with detailed metrics and charts for each. It also possible to visualize the raw data in a table format.

FYI: To calculate the gain over the loss, I've used the efficiency average as a reference. The formula used is: `gain = loss / (1 - efficiency)`.

## Table of Contents

- [Stack used](#stack-used)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Testing](#testing)

## Stack used

I've used the following technologies to build this project:

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Syled Components](https://styled-components.com/)

- [MSW](https://mswjs.io/)
  - For mocking API requests
- [Nivo](https://nivo.rocks/)
  - For building the charts using D3.js under the hood
- [React Query](https://react-query.tanstack.com/)
  - For fetching and caching data
- [Testing Library](https://testing-library.com/)
  - Unit tests
- [Cypress](https://www.cypress.io/)
  - End-to-end tests

## Available Scripts

### Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/your-username/metrics-dashboard.git
    ```

2. **Navigate to the project directory:**

    ```sh
    cd metrics-dashboard
    ```

3. **Install dependencies:**

    ```sh
    npm install
    ```

### Running the Project

To start the development server, run:

```sh
npm run dev

Open http://localhost:3000 in your browser to view the application.

### Building the Project

To build the project, run:

```sh
npm run build
```

then:

```sh
npm start
```

## Project Structure

The project is structured as follows:

```
src/
├── components/
│   ├── charts/
│   │   ├── Bars
│   │   ├── ChartCard
│   │   ├── Line
│   │   └── Pie
│   ├── Header
│   ├── Modal
│   ├── Section
│   ├── Table
│   └── TimeToggle
├── hooks/
│   ├── useFetchMetrics.ts
│   ├── useMetricsChartData.ts
│   └── useTableData.ts
├── lib/
│   ├── react-query-provider.tsx
│   └── registry.ts
├── mocks/
│   ├── api/
│   │   ├── data/
│   │   │   └── metrics.json
│   │   └── metrics.ts
│   ├── handlers/
│   │   └── index.ts
│   ├── mswServer.ts
│   ├── mswBrowser.ts
│   └── provider.tsx
├── styles/
│   ├── global.css
│   └── responsive.ts
├── utils/
│   ├── formatters.ts
│   ├── metrics.ts
│   └── time.ts
└── types/
    ├── charts.d.ts
    ├── metrics.d.ts
    └── time-utils.d.ts
├── layout.tsx
└── page.tsx
```

## Testing

### Unit Tests

To run the unit tests, run:

```sh
npm run test
```

### End-to-End Tests

To run the end-to-end tests, run:

```sh
npm run cypress:open
```

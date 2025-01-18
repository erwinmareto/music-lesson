# Full Stack Web App Assessment 2025

This project is a full-stack web application designed to showcase various charts and data tables. It includes components for displaying revenue data, instrument lessons, and more.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Usage](#usage)
- [Pages](#pages)
- [Components](#components)
- [Hooks](#hooks)
- [Queries](#queries)
- [Repositories](#repositories)
- [Library Functions](#library-functions)
- [Additional Note](#additional-note)
- [License](#license)

## Prerequisites

- Node.js >= 18.17.0
- Yarn >= 1.22.0
- Git
- A modern web browser (Chrome, Firefox, Safari, Edge)

## Installation

To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/full-stack-web-app-assessment-2025.git
cd full-stack-web-app-assessment-2025
yarn install
```

## Environment Setup

1. Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_API_URL=http://localhost:8055
```

## Usage

First, you need to run `directus`:

```bash
cd directus
docker compose up -d
```

To run the application locally, use the following command (make sure you are in the rool folder now):

```bash
yarn dev
```

This will start the development server and you can view the application in your browser at `http://localhost:3000`.

## Pages

### Home

The home page of the application, which includes an overview of the charts and data tables.

### Instruments

A page dedicated to displaying the data table for instruments with the teacher and student count.

### Lessons

A page dedicated to displaying the data table for lessons and filters.

### Packages

A page dedicated to displaying the data table for packages with filters.

### Payments

A page dedicated to displaying the data table for payments with filters.

## Components

### Charts

- **RevenueChart**: Displays the revenue data for selected years.
- **InstrumentsChart**: Shows the top instruments with the most lessons.
- **LessonChart**: Shows the ratio of attended and absent lessons.

### DataTable

- **DataTable**: A reusable data table component that supports filtering and pagination.

### OverviewCards

- **OverviewCards**: A reusable card to display count data with an icon.

### Parts

- **Charts**: Contains various chart components like `RevenueChart` and `InstrumentsChart`.
- **DataTable**: Contains the `DataTable` component for displaying tabular data.
- **OverviewCards**: Contains the `OverviewCards` component for displaying summary information.

### Filters

- **SearchInput**: A reusable input component for search functionality.
- **SelectInput**: A reusable select component for filtering options.
- **DatePicker**: A reusable date picker component for selecting dates.
- **PaginationControls**: A component for pagination controls.

### ReactQuery

- **ReactQuery**: A reusable component for managing server state with React Query.

## Hooks

### useDebounce

A custom hook to debounce a callback function.

### useTimeout

A custom hook to manage timeouts.

## Queries

### Lessons

#### useLessons

A custom hook that fetches lesson data with pagination and filtering capabilities. Useful for displaying lesson lists with search, status filters, and page navigation.

#### useLessonCount

A custom hook that returns the total count of lessons matching the specified filters. Essential for pagination and statistics.

#### useLessonsByStatusCount

A custom hook that provides the distribution of lessons by their status (attended/absent). Used in charts and analytics to show attendance patterns.

### Packages

#### usePackages

A custom hook that retrieves package data with filtering and pagination support. Used for displaying and managing music lesson packages.

#### usePackageCount

A custom hook that returns the total number of available packages with applied filters. Used for pagination and overview statistics.

#### useTopInstruments

A custom hook that fetches and ranks instruments based on their popularity in lessons. Essential for analytics and trending instrument displays.

### Payments

#### useRevenueByMonth

A custom hook that aggregates and returns monthly revenue data. Used in financial charts and reports.

#### usePaymentCount

A custom hook that provides the total count of payments. Used for financial overview and statistics.

#### useRevenueSum

A custom hook that calculates the total revenue across all payments. Essential for financial summaries.

#### usePayments

A custom hook that fetches detailed payment data with filtering and pagination. Used for payment history and transaction logs.

### Instruments

#### useInstrumentCount

A custom hook that returns the total number of unique instruments available. Used in overview statistics.

#### useInstruments

A custom hook that fetches detailed instrument data with filtering support. Used for instrument management and selection.

### Users

#### useUserCount

A custom hook that provides the total count of users grouped by their roles. Used for user management and role-based statistics. Returns data about teacher and student counts.

## Repositories

### Lessons

Repository for managing lesson-related database operations.

#### Functions

- `getLessons({ page, status, filter })`: Fetches paginated lesson data with optional filters
- `getLessonCount({ status, filter })`: Gets total lesson count with filters
- `getLessonsByStatusCount()`: Retrieves lesson count grouped by status

### Packages

Repository for managing music lesson packages.

#### Functions

- `getPackages({ page, filter })`: Retrieves paginated package data with filters
- `getPackageCount({ filter })`: Gets total package count with filters

### Payments

Repository for handling payment and revenue data.

#### Functions

- `getRevenueByMonth()`: Retrieves monthly revenue aggregations
- `getPaymentCount()`: Gets total number of payments
- `getRevenueSum()`: Calculates total revenue
- `getPayments({ page, filter })`: Fetches paginated and filtered payment records

### Instruments

Repository for instrument management.

#### Functions

- `getInstrumentCount()`: Gets total number of instruments
- `getInstruments({ filter })`: Retrieves instrument data with filter capability
- `getTopInstruments()`: Fetches instruments ranked by lesson count

### Users

Repository for managing user-related operations.

#### Functions

- `getUserCountByRole()`: Fetches total count of users grouped by role.

## Library Functions

### Utils (`lib/utils.ts`)

- `cn(...inputs: ClassValue[])`: A utility function that combines Tailwind CSS classes using `clsx` and `tailwind-merge`. This ensures proper class merging and removes conflicts between Tailwind classes.

### URL (`lib/url.ts`)

- `combineSearchParams(searchParams, newParams)`: Combines existing URL search parameters with new parameters. Useful for adding filters and pagination parameters to URLs.
- `removeSearchParams(searchParams, paramsToRemove)`: Removes specified parameters from URL search parameters. Helpful for clearing filters or resetting pagination.

### Query Client (`lib/queryClient.ts`)

- `getQueryClient()`: A cached function that creates and returns a React Query client with predefined configuration:
  - Disables refetching on window focus
  - Sets a 5-minute stale time for queries
  - Includes default error handling for mutations

### Filters (`lib/filter.ts`)

- `getFilters(filters)`: Processes an array of filter objects to create Directus-compatible filter conditions. Supports:
  - Text search with case-insensitive contains
  - Number and date comparisons
  - Nested field filtering
- `getFiltersQueryKeys(filters)`: Extracts query values from filters for use as React Query cache keys
- `checkIsFiltersEmpty(filters)`: Checks if all filters are empty/unset

### Directus (`lib/directus.ts`)

- Creates and configures a Directus client instance with:
  - REST API support
  - Authentication handling
  - Default connection to localhost:8055

## Additional Note

If you want to build, you will most likely run into these errors:

```typescript
./node_modules/lucide-react/dist/lucide-react.d.ts:2:10
Type error: Module '"react"' has no exported member 'ReactSVG'.

  1 | import * as react from 'react';
> 2 | import { ReactSVG, SVGProps, ForwardRefExoticComponent, RefAttributes } from 'react';
    |          ^
  3 |
  4 | type IconNode = [elementName: keyof ReactSVG, attrs: Record<string, string>][];
  5 | type SVGAttributes = Partial<SVGProps<SVGSVGElement>>;
```

```typescript
./node_modules/react-day-picker/dist/index.d.ts:26:48
Type error: Cannot find namespace 'JSX'.

  24 |  * setting the {@link DayPickerBase.captionLayout} prop.
  25 |  */
> 26 | declare function Caption(props: CaptionProps): JSX.Element;
     |                                                ^
  27 |
  28 | /** The props for the {@link CaptionLabel} component. */
  29 | interface CaptionLabelProps {
```

You will have to manually fix them yourself because they are located in the `node_modules`. This is happening because of React 19 and the types in some libraries have not been updated.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

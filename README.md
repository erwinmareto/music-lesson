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

  - Parameters:
    - No props required - uses `useRevenueByMonth` hook internally

- **InstrumentsChart**: Shows the top instruments with the most lessons.

  - Parameters:
    - No props required - uses `useTopInstruments` hook internally

- **LessonChart**: Shows the ratio of attended and absent lessons.
  - Parameters:
    - No props required - uses `useLessonByStatusCount` hook internally

### DataTable

- **DataTable**: A reusable data table component that supports filtering and pagination.
  - Parameters:
    - `columns: ColumnDef<TData, TValue>[]` - Column definitions for the table
    - `data: TData[]` - Array of data items to display

### OverviewCard

- **OverviewCard**: A reusable card to display count data with an icon.
  - Parameters:
    - `icon: React.ReactNode` - Icon component to display
    - `category: string` - Category name (used for navigation link)
    - `total: number` - Total count/value to display
    - `isUser?: boolean` - Optional flag to use user-specific styling

### ReactQuery

- **ReactQuery**: A reusable component for managing server state with React Query.
  - Parameters:
    - `queryResult: UseQueryResult<T>` - Result from a React Query hook
    - `render: (data: T) => React.ReactNode` - Render function for success state
    - `renderLoading?: React.ReactNode` - Optional custom loading state
    - `renderError?: React.ReactNode` - Optional custom error state

### Filters

- **SearchInput**: A reusable input component for search functionality.
- **SelectInput**: A reusable select component for filtering options.
- **DatePicker**: A reusable date picker component for selecting dates.
- **PaginationControls**: A component for pagination controls.

### Parts

- **SearchInput**: A reusable search input component.

  - Parameters:
    - `id: string` - Unique identifier for the input element
    - `label: string` - Label text for the input
    - `placeholder: string` - Placeholder text for the input field
    - `value: string` - Current value of the input
    - `onChange: (value: string) => void` - Callback function when input value changes

- **SelectInput**: A reusable select/dropdown component.

  - Parameters:
    - `id: string` - Unique identifier for the select element
    - `label: string` - Label text for the select
    - `value: string` - Current selected value
    - `options: string[]` - Array of options to display in the dropdown
    - `onChange: (value: string) => void` - Callback function when selection changes

- **DatePicker**: A reusable date picker component.

  - Parameters:
    - `label: string` - Label text for the date picker
    - `selectedDate: Date | undefined` - Currently selected date
    - `onSelectDate: (date: Date | undefined) => void` - Callback function when date is selected

- **PaginationControls**: A component for navigation through paginated data.
  - Parameters:
    - `currentPage: number` - Current active page number
    - `totalPages: number` - Total number of available pages
    - `hasMorePage: boolean` - Whether there are more pages available
    - `handleNextPage: () => void` - Callback function for next page navigation
    - `handlePreviousPage: () => void` - Callback function for previous page navigation

## Hooks

### useDebounce

A custom hook that delays the execution of a callback function until after a specified delay has elapsed since the last call.

```typescript
useDebounce(callback: () => void, delay: number, dependencies: React.DependencyList)
```

Parameters:

- `callback`: Function to be debounced
- `delay`: Time in milliseconds to wait before executing the callback
- `dependencies`: Array of dependencies that will trigger a reset of the debounce timer

Example usage:

```typescript
useDebounce(
  () => {
    // This will only run after 500ms of no changes to searchTerm
    fetchSearchResults(searchTerm);
  },
  500,
  [searchTerm]
);
```

### useTimeout

A custom hook that provides controlled timeout functionality with clear and reset capabilities.

```typescript
const { reset, clear } = useTimeout(callback: () => void, delay: number)
```

Parameters:

- `callback`: Function to be executed after the timeout
- `delay`: Time in milliseconds before the callback is executed

Returns:

- `reset`: Function to restart the timeout
- `clear`: Function to cancel the timeout

Example usage:

```typescript
const { reset, clear } = useTimeout(() => {
  // This will run after 1000ms unless cleared or reset
  console.log('Timeout completed');
}, 1000);
```

## Queries

Parameters used across query hooks:

- `page`: number - The current page number for pagination (starts at 1)
- `filters`: Array of filter objects with the following structure:

```typescript
interface Filters {
  field: string | string[]; // The field(s) to filter on
  query: string | null; // The filter value
  dataType: 'search' | 'number' | 'date'; // The type of filter to apply
}
```

Example usage:

```typescript
// Search filter
{ field: 'name', query: 'John', dataType: 'search' }

// Date filter
{ field: 'created_at', query: '2023-01-01', dataType: 'date' }

// Number filter
{ field: 'amount', query: '100', dataType: 'number' }
```

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

- `getLessons(params)`: Fetches paginated lesson data with optional filters

  - `page`: number - The current page number (1-based)
  - `filter`: Record<string, unknown> - Filter conditions for the query
  - `isFilterEmpty`: boolean - Whether any filters are applied
    Returns lessons with their status, dates, package, and teacher information.

- `getLessonCount(filter?)`: Gets total lesson count with filters

  - `filter`: (optional) Record<string, unknown> - Filter conditions
    Returns the total count of lessons matching the filter.

- `getLessonsByStatusCount()`: Retrieves lesson count grouped by status
  Returns an array of counts grouped by lesson status.

### Packages

Repository for managing music lesson packages.

#### Functions

- `getPackages(params)`: Retrieves paginated package data with filters

  - `page`: number - The current page number (1-based)
  - `filter`: Record<string, unknown> - Filter conditions for the query
  - `isFilterEmpty`: boolean - Whether any filters are applied
    Returns packages with student info, instrument, dates, lesson count and duration.

- `getPackageCount(filter?)`: Gets total package count with filters
  - `filter`: (optional) Record<string, unknown> - Filter conditions
    Returns the total count of packages matching the filter.

### Payments

Repository for handling payment and revenue data.

#### Functions

- `getRevenueByMonth()`: Retrieves monthly revenue aggregations
  Returns an array of revenue sums grouped by month and year.

- `getPaymentCount(filter?)`: Gets total number of payments

  - `filter`: (optional) Record<string, unknown> - Filter conditions
    Returns the total count of payments matching the filter.

- `getRevenueSum()`: Calculates total revenue
  Returns the sum of all payment rates.

- `getPayments(params)`: Fetches paginated and filtered payment records
  - `page`: number - The current page number (1-based)
  - `filter`: Record<string, unknown> - Filter conditions for the query
  - `isFilterEmpty`: boolean - Whether any filters are applied
    Returns payments with their ID, currency, rate, date and package info.

### Instruments

Repository for instrument management.

#### Functions

- `getInstrumentCount(filter?)`: Gets total number of instruments

  - `filter`: (optional) Record<string, unknown> - Filter conditions
    Returns the total count of instruments matching the filter.

- `getInstruments(params)`: Retrieves instrument data with filter capability

  - `page`: number - The current page number (1-based)
  - `filter`: Record<string, unknown> - Filter conditions for the query
    Returns instruments with their name and counts of associated students and teachers.

- `getTopInstruments()`: Fetches instruments ranked by lesson count
  Returns an array of instruments grouped by usage in packages.

### Users

Repository for managing user-related operations.

#### Functions

- `getUserCountByRole()`: Fetches total count of users grouped by role.
  Returns an array of user counts grouped by their role (teacher/student).

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

## Troubleshooting Build Errors

If you encounter the following errors while building the project, you can manually fix them as they are located in the `node_modules` directory. These issues arise due to compatibility problems with React 19, and some libraries have not yet updated their types.

### Error 1: `ReactSVG` Not Exported

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

**Solution**: Change `ReactSVG` to `SVGElementType`.

### Error 2: `JSX` Namespace Not Found

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

**Solution**: Change `JSX` to `react.JSX`.

Note
You will need to manually fix these issues in the `node_modules` directory. This is necessary because the types in some libraries have not been updated to be compatible with **React 19**.
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

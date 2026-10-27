# School Back-Office Frontend — Comprehensive Technical Architecture & Project Analysis

> **Generated on:** October 27, 2026  
> **Repository:** `school-back-office-frontend`  
> **Target Audience:** Frontend Engineers, Full-Stack Developers, Technical Project Leads  
> **Document Status:** Baseline Pre-Implementation Analysis (Phase 1–5 Complete; Phase 6 Standby)

---

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Phase 1: Project Structure Analysis](#phase-1-project-structure-analysis)
   - 1.1 Frontend Framework & Runtime
   - 1.2 Programming Languages & Compilation
   - 1.3 Project Directory Architecture
   - 1.4 Routing System & Existing Pages
   - 1.5 Reusable Component Hierarchy
   - 1.6 State Management & Data Fetching
   - 1.7 Design System, Styling & UI Foundations
   - 1.8 Authentication & Authorization Analysis
   - 1.9 Forms, Schemas & Validation Systems
   - 1.10 Configuration Files & Tooling
3. [Phase 2: Backend API Integration Analysis](#phase-2-backend-api-integration-analysis)
   - 2.1 Backend URL Configuration & Environment Variables
   - 2.2 HTTP Client Architecture (`httpClient.ts`)
   - 2.3 Identified API Endpoints & Request Contracts
   - 2.4 Payload Schemas & Data Transformations
   - 2.5 Loading States & Error Interception
   - 2.6 Authentication Headers, Cookies & Session Flow
   - 2.7 Inconsistencies & Unconnected Integrations
4. [Phase 3: Existing Functionality Classification](#phase-3-existing-functionality-classification)
   - 3.1 Fully Implemented & Verified in Code
   - 3.2 Implemented but Requiring Runtime Verification
   - 3.3 Partially Implemented Features
   - 3.4 Missing or Incomplete Features
   - 3.5 Indeterminate Functionality
5. [Phase 4: Code Quality, Anti-Patterns & Risk Assessment](#phase-4-code-quality-anti-patterns--risk-assessment)
   - 4.1 Confirmed Technical Bugs & Inconsistencies
   - 4.2 Duplicate Implementations & Architecture Drift
   - 4.3 Import Ambiguities (`"cn"` package vs. `@/lib/utils`)
   - 4.4 Responsive Design & Mobile Usability Findings
   - 4.5 Accessibility (a11y) Findings
   - 4.6 Security & Vulnerability Posture
6. [Phase 5: Structured Project Documentation (Sections A–J)](#phase-5-structured-project-documentation-sections-a-j)
   - Section A: Project Overview
   - Section B: Technology Stack Reference Table
   - Section C: Complete Directory & File Map
   - Section D: Frontend-Backend Integration Map
   - Section E: Feature & Screen Inventory
   - Section F: Development Progress Assessment
   - Section G: Detailed Issue & Concern Log
   - Section H: Essential Files for Future Tasks
   - Section I: Information Gaps Requiring Developer Clarification
   - Section J: Technical Questions for the Backend / Primary Developer
7. [Phase 6: Standby Protocol](#phase-6-standby-protocol)

---

## Executive Summary

The **School Back-Office Frontend** (`school-back-office-frontend`) is an administrative dashboard built for managing primary schools in Bangladesh (প্রাথমিক বিদ্যালয় ব্যাক-অফিস). The system is targeted at educational administrators, school supervisors, and institutional staff.

The application is built on **Next.js 16.4.3** using the **App Router** with **Turbopack**, paired with **React 19.3.0**, **TypeScript 5 (Strict)**, and **Tailwind CSS v4**.

### Key Architectural Takeaways:
1. **Hybrid Maturity State:** The application possesses an advanced, enterprise-grade data table architecture (`DataTable` with `nuqs` URL synchronization and TanStack Query caching) and geographic cascading data for all 8 divisions, 64 districts, and upazilas of Bangladesh. However, core screens currently rely on mock data rather than live backend endpoints.
2. **Disconnected Endpoints:** The primary `/schools` list table displays a static in-memory array of 25 dummy schools (`mockFetchSchools`). Although a real API query hook (`fetchSchools` calling `GET /schools`) was drafted in an example file (`data-table-query-example.tsx`), it has not yet been connected to the main screen.
3. **Duplicate Onboarding Workflows:** There are two competing implementations of the School Onboarding form:
   - One in `src/components/form/school-onboard-form.tsx` built with `@tanstack/react-form`.
   - Another in `src/components/schools/school-onboarding-dialog.tsx` built with `react-hook-form` + `@hookform/resolvers/zod`.
4. **Backend Authentication Disabled:** The HTTP client explicitly notes that authentication and token refresh on the backend are temporarily disabled; all requests currently run unauthenticated with `withCredentials: true`.
5. **No Breaking Modifications:** This document serves as the single source of truth before any new tasks are undertaken.

---

## Phase 1: Project Structure Analysis

### 1.1 Frontend Framework & Runtime
* **Framework:** Next.js `16.4.3` (App Router)
* **Core React Engine:** React `19.3.0` & React DOM `19.3.0`
* **Compiler / Bundler:** Next.js Turbopack (`@tailwindcss/turbopack` v4)
* **Runtime Target:** Node.js (tested and verified on Node `v24.18.0`, npm `11.16.0`)
* **Package Management:** Configured for `pnpm@10.32.1` in `package.json`, compatible with `npm` using `--legacy-peer-deps` for React 19 dependency resolution.

### 1.2 Programming Languages & Compilation
* **Languages:** 100% TypeScript (`.ts`, `.tsx`), Modern CSS (`globals.css`), and JSON.
* **TypeScript Configuration (`tsconfig.json`):**
  * Target: `ES2017`
  * Module Resolution: `bundler`
  * Strictness: `"strict": true`, `"noEmit": true`
  * Path Aliases: `"@/*": ["./src/*"]`

### 1.3 Project Directory Architecture
```
school-back-office-frontend/
├── public/                     # Static assets (favicons, images)
├── src/
│   ├── app/                    # Next.js App Router (pages, layouts, route groups)
│   │   ├── (dashboard)/        # Route group sharing the main dashboard shell layout
│   │   │   ├── dashboard/      # Overview page (/dashboard)
│   │   │   ├── schools/        # School management (/schools)
│   │   │   │   └── onboard/    # Dedicated onboarding page (/schools/onboard)
│   │   │   ├── users/          # User management (/users)
│   │   │   └── layout.tsx      # Persistent desktop sidebar & mobile drawer shell
│   │   ├── globals.css         # Tailwind v4 theme, design tokens, OKLCH variables
│   │   ├── layout.tsx          # Root HTML layout with font loading & Providers
│   │   ├── page.tsx            # Root redirect: "/" -> "/dashboard"
│   │   └── providers.tsx       # QueryClient, ThemeProvider, NuqsAdapter, Sonner
│   ├── components/             # Reusable UI, layout, and feature components
│   │   ├── dashboard/          # Dashboard specific widgets (e.g., AttendanceChart)
│   │   ├── data-table/         # Generic server-side sortable/filterable/paginated table
│   │   ├── form/               # Form fields, TanStack form components & inputs
│   │   ├── layouts/            # AppSidebar, ThemeToggle
│   │   ├── providers/          # QueryProvider, ThemeProvider wrappers
│   │   ├── schools/            # SchoolOnboardingDialog (modal with Geo cascade)
│   │   └── ui/                 # 18 shadcn/ui primitives (button, card, dialog, etc.)
│   ├── config/                 # Application configuration & validated env variables
│   │   └── env.ts              # Zod validation for process.env
│   ├── data/                   # Static application datasets
│   │   └── bangladesh-geo.json # 76KB database of BD Divisions, Districts, Upazilas
│   ├── lib/                    # Shared utilities and network clients
│   │   ├── httpClient.ts       # Central Axios instance with interceptors
│   │   └── utils.ts            # Class merging utility (twMerge + clsx)
│   └── types/                  # Global TypeScript type definitions
│       ├── api.types.ts        # ApiResponse<T>, ApiRequestOptions interfaces
│       └── geo.ts              # Bangladesh administrative boundary types
├── .env.example                # Template for environment configuration
├── components.json             # shadcn/ui CLI configuration file
├── next.config.ts              # Next.js configuration with Turbopack loaders
├── package.json                # Dependencies, scripts, and engine metadata
└── tsconfig.json               # TypeScript compiler options
```

### 1.4 Routing System & Existing Pages

The application utilizes the Next.js App Router file-system routing. A route group `(dashboard)` encapsulates all authenticated screens within a common administrative sidebar layout.

| Route | File Path | Status | Functionality |
| :--- | :--- | :--- | :--- |
| `/` | `src/app/page.tsx` | Implemented | Server-side 307 redirect directly to `/dashboard`. |
| `/dashboard` | `src/app/(dashboard)/dashboard/page.tsx` | Implemented (Mock) | Displays 4 KPI summary cards, quick action links, Recharts weekly attendance graph, and latest institutional notices. |
| `/schools` | `src/app/(dashboard)/schools/page.tsx` | Implemented (Mock Table) | Data table displaying schools with search, sorting, filtering, and a modal trigger for onboarding new schools. |
| `/schools/onboard` | `src/app/(dashboard)/schools/onboard/page.tsx` | Implemented (Live API) | Standalone full-page form using `@tanstack/react-form` submitting to `POST /schools/onboard`. |
| `/users` | `src/app/(dashboard)/users/page.tsx` | Implemented (Live API) | Renders `UsersTableExample` which calls `GET /users`. |
| `/enrollments`, `/attendances`, `/routines`, `/evaluations` | Referenced in buttons/sidebar | **Missing (404)** | Links exist in Quick Actions and Sidebar, but folders and `page.tsx` files are not created. |
| `/academic-years`, `/shifts`, `/classes`, `/sections`, `/subjects`, `/teachers`, `/students`, `/guardians`, `/indicators` | Referenced in sidebar | **Missing (404)** | Listed in navigation groups, but pages have not yet been developed. |

### 1.5 Reusable Component Hierarchy
* **Shell & Layouts:**
  * `DashboardLayout` (`src/app/(dashboard)/layout.tsx`): Manages responsive breakpoints (`lg:pl-72`). Renders `AppSidebar` statically on desktop and inside a floating `Sheet` drawer on mobile devices.
  * `AppSidebar` (`src/components/layouts/app-sidebar.tsx`): 366-line sidebar containing institutional branding, categorized navigation links, active route detection via `usePathname()`, theme toggle, and admin user menu.
* **Data Table Architecture (`src/components/data-table/`):**
  * `DataTable`: Generic component wrapping `@tanstack/react-table` legacy core.
  * `DataTableToolbar`: Search input box with faceted filter chips and view options.
  * `DataTableColumnHeader`: Sortable column triggers (asc/desc/reset).
  * `DataTableFacetedFilter`: Multi-select dropdown popover for faceted categorical filtering.
  * `DataTablePagination`: Page jump controls, page size selector (`pageSizeOptions`), and item count.
  * `useDataTableQuery`: Custom hook synchronizing table state (`page`, `limit`, `search`, `sortBy`, `sortOrder`, custom filters) with browser URL query parameters using `nuqs`.
* **Forms & Inputs (`src/components/form/` & `src/components/ui/`):**
  * `FormInput`: TanStack Form-connected text input supporting `startIcon`, `endIcon`, `clearable`, and inline error messages.
  * `PasswordInput`: Input supporting visibility toggling.
  * `SchoolOnboardForm`: 466-line full onboarding form connecting `@tanstack/react-form` with `zod`.
  * `SchoolOnboardingDialog`: 664-line multi-tab modal dialog combining `react-hook-form` with cascading Bangladesh geographical selectors.

### 1.6 State Management & Data Fetching
1. **Server State (Caching & Background Sync):** Handled via `@tanstack/react-query` v5. Configured with `QueryClientProvider` in `src/components/providers/query-provider.tsx` with `staleTime: 60 * 1000` and `placeholderData: keepPreviousData` to prevent screen flickering during page/filter transitions.
2. **URL Search Parameter State:** Handled via `nuqs` (Next.js URL Query State). Table search strings, page indexes, limit sizes, and active filters are mirrored in the browser address bar. This allows users to bookmark or share filtered table views.
3. **Client Component State:** Standard React `useState`, `useMemo`, and `useCallback` hooks for modal visibility, mobile sidebar drawer state, and cascaded dropdown filtering.
4. **Theme State:** Handled by `next-themes` (`ThemeProvider`), supporting system preference, dark mode, and light mode with OKLCH CSS variables.

### 1.7 Design System, Styling & UI Foundations
* **Styling Engine:** Tailwind CSS v4 (`@tailwindcss/turbopack`).
* **Design System:** Custom implementation of shadcn/ui (New York style) using CSS custom properties in `src/app/globals.css`.
* **Color Palette:** OKLCH tailored slate and blue theme.
* **Typography:** `Inter` variable font loaded via `next/font/google`.
* **Component Primitives:** `@radix-ui` primitives used for Dialogs, Dropdown Menus, Popovers, Selects, Tooltips, and Sheets.
* **Data Visualization:** `recharts` v3.8.0 customized through shadcn's `ChartContainer`.

### 1.8 Authentication and Authorization Implementation
* **Current Status:** **Authentication is NOT yet active on the frontend.**
* **Code Verification (`src/lib/httpClient.ts` lines 18–36):**
  * The Axios request interceptor contains an explicit comment:
    `// Authentication is currently disabled on the backend.`
    `// Auth token injection will be connected here once enabled.`
  * No authorization header (`Bearer <token>`) is currently appended.
  * No login screen, register page route, password reset flow, or route protection middleware (`middleware.ts`) exists in the repository.
  * The sidebar displays a static mock administrator (`প্রধান শিক্ষক / অ্যাডমিন`, `admin@school.gov.bd`).

### 1.9 Forms, Validation, and Error-Handling Mechanisms
* **Validation Engine:** `zod` schemas.
* **Validation Standards:**
  * Bangladeshi Phone Number Regex: `/^01[3-9]\d{8}$/` (11-digit mobile starting with standard telecom prefixes: Grameenphone, Banglalink, Robi, Teletalk).
  * Primary School GPS Code Regex: `/^\d{8}$/` (Strict 8-digit government primary school identifier).
* **Feedback Mechanism:** `sonner` rich toast alerts (`toast.success()`, `toast.error()`, `toast.info()`) positioned at `top-right`.

### 1.10 Important Configuration Files
* **`next.config.ts`:**
  * Enables Next.js Turbopack custom CSS loaders for Tailwind v4.
  * Enables experimental features: `cacheComponents: true`, `partialPrefetching: true`, and `experimental: { agentUpgrade: "security" }`.
* **`components.json`:** Defines shadcn/ui configuration with aliases pointing to `@/components`, `@/lib/utils`, and `@/components/ui`.
* **`eslint.config.mjs`:** Flat ESLint 9 configuration extending `eslint-config-next/core-web-vitals` and `typescript-eslint`.
* **`src/config/env.ts`:** Runtime schema validation ensuring `NEXT_PUBLIC_API_BASE_URL` is a valid URL before the application boots.

---

## Phase 2: Backend API Integration Analysis

### 2.1 Backend URL Configuration & Environment Variables
* The application reads the backend URL exclusively through:
  `NEXT_PUBLIC_API_BASE_URL`
* **Configuration Locations:**
  * `.env.example`: Provides the template (`http://localhost:5001/api/v1` or `http://localhost:5000/api/v1`).
  * `.env` / `.env.local`: Configured with the active backend endpoint.
* **Validation File:** `src/config/env.ts` validates this variable using Zod. If the variable is missing or malformed, it throws: `"Invalid environment configuration. Check your .env file."`

### 2.2 HTTP Client Architecture (`httpClient.ts`)
All network communication is routed through a centralized Axios client:
* **Location:** `src/lib/httpClient.ts`
* **Configuration:**
  * `baseURL`: Derived dynamically from `env.NEXT_PUBLIC_API_BASE_URL`.
  * `timeout`: 30,000ms (30 seconds).
  * `withCredentials: true`: Instructs Axios to transmit cross-site cookies with requests.
  * `headers`: `"Content-Type": "application/json"`, `"Accept": "application/json"`.
* **Exposed Methods:**
  * `httpClient.get<TData>(url, options)`
  * `httpClient.post<TData>(url, data, options)`
  * `httpClient.put<TData>(url, data, options)`
  * `httpClient.patch<TData>(url, data, options)`
  * `httpClient.delete<TData>(url, options)`

### 2.3 Identified API Endpoints & Request Contracts

| Endpoint | HTTP Method | Referenced In | Request Payload | Response Data Shape |
| :--- | :--- | :--- | :--- | :--- |
| `/schools/onboard` | `POST` | `src/components/form/school-onboard-form.tsx`<br>`src/components/schools/school-onboarding-dialog.tsx` | Nested `{ school: {...}, admin: {...} }` | `ApiResponse<{ school: CreatedSchoolResult, admin: unknown }>` |
| `/schools` | `POST` | `src/components/schools/school-onboarding-dialog.tsx` | Flat School Object `{ name, gps_code, division, district, upazila, cluster, ... }` | `ApiResponse<CreatedSchoolResult>` |
| `/schools` | `GET` | `src/components/data-table/data-table-query-example.tsx` | Query Params: `page`, `limit`, `search`, `sortBy`, `sortOrder`, `type`, `status` | `ApiResponse<PaginatedResponse<School>>` |
| `/users` | `GET` | `src/components/data-table/users-table-example.tsx` | Query Params: `page`, `limit`, `search`, `sortBy`, `sortOrder`, `role`, `status` | `ApiResponse<PaginatedResponse<User>>` |

### 2.4 Payload Schemas & Data Transformations

#### A. Full Onboarding Payload (`POST /schools/onboard`):
```json
{
  "school": {
    "name": "রামপুর সরকারি প্রাথমিক বিদ্যালয়",
    "gps_code": "91203040",
    "division": "Dhaka",
    "district": "Gazipur",
    "upazila": "Sreepur",
    "cluster": "Cluster 1",
    "address": "গ্রাম: রামপুর, ডাকঘর: শ্রীপুর",
    "email": "rampur.gps@edu.gov.bd",
    "phone": "01711000000",
    "is_active": true
  },
  "admin": {
    "full_name": "মো: রফিকুল ইসলাম",
    "phone": "01811000000",
    "email": "admin.rampur@edu.gov.bd"
  }
}
```

#### B. Standalone School Creation Payload (`POST /schools`):
Sent when the administrator unchecks the "Create Admin Account" checkbox in `school-onboarding-dialog.tsx`:
```json
{
  "name": "রামপুর সরকারি প্রাথমিক বিদ্যালয়",
  "gps_code": "91203040",
  "division": "Dhaka",
  "district": "Gazipur",
  "upazila": "Sreepur",
  "cluster": "Cluster 1",
  "address": "গ্রাম: রামপুর",
  "email": "rampur@edu.gov.bd",
  "phone": "01711000000",
  "is_active": true
}
```

### 2.5 Loading States & Error Interception
* **Button Feedback:** Submit buttons toggle to `disabled` and display a spinning `Loader2` icon when `isSubmitting` or `isPending` is active.
* **Table Feedback:** Data tables render animated `Skeleton` rows when `isLoading` or `isFetching` is true.
* **Error Extraction:** Both onboarding forms inspect incoming Axios errors to extract backend error messages:
  ```typescript
  const message = axiosErr.response?.data?.message || axiosErr.response?.data?.error || fallback;
  toast.error(message);
  ```

### 2.6 Authentication Headers, Cookies & Session Flow
* **Current State:** Requests carry no Authorization Bearer token header.
* **Cookie Support:** `withCredentials: true` is enabled on the Axios instance. If the backend issues `Set-Cookie` headers (e.g. session or refresh cookies), the browser will automatically include them in requests.

### 2.7 Inconsistencies & Unconnected Integrations
1. **Schools Page Disconnect:** The main page `src/app/(dashboard)/schools/page.tsx` executes `mockFetchSchools` over a static dummy array of 25 records. It **does not** execute `httpClient.get("/schools")`.
2. **Volatile Local Cache Mutation:** When a school is successfully onboarded via the dialog on `/schools`, the callback executes `DUMMY_SCHOOLS.unshift(newRecord)`. This creates a temporary illusion of success in memory, but reloading the page restores the original hardcoded dummy records.
3. **Dashboard Page Disconnect:** `src/app/(dashboard)/dashboard/page.tsx` contains hardcoded numbers (840 students, 36 teachers, 96.2% attendance) and hardcoded notices. No backend API integration exists for dashboard metrics.
4. **Recent Backend Status Codes Encountered:**
   * `404 Not Found`: Occurred during onboarding attempts when submitting to `/schools` or `/schools/onboard`, indicating either an endpoint path mismatch or missing backend route.
   * `409 Conflict`: Occurred when attempting to register a school with a `gps_code` that already exists in the backend database.

---

## Phase 3: Existing Functionality Classification

### 3.1 Implemented & Verified in Code
* **Dashboard Shell Layout:** Responsive desktop sidebar with mobile drawer sheet (`DashboardLayout`, `AppSidebar`).
* **Root Navigation Redirect:** Visiting `/` redirects to `/dashboard`.
* **Theme Switching:** Dark, light, and system theme modes (`ThemeToggle`, `next-themes`).
* **Reusable DataTable Engine:** Search debouncing, URL state management via `nuqs`, server-side pagination controls, sort toggling, and multi-select faceted filters.
* **Bangladesh Administrative Geography Data:** Local dataset `bangladesh-geo.json` with 8 divisions, 64 districts, and upazilas, typed in `geo.ts`.
* **Cascading Geographic Selectors:** Selecting a Division dynamically filters available Districts; selecting a District dynamically filters available Upazilas.
* **Validation Rules:** Bangladeshi phone regex validation and 8-digit GPS code validation.
* **Production Build Integrity:** TypeScript type-checking and Next.js static page generation compile cleanly (`npm run build`).

### 3.2 Implemented but Requiring Runtime Verification
* **School Onboarding Creation via Dialog (`POST /schools/onboard`):** Component `school-onboarding-dialog.tsx` submits the nested payload to the backend. Success depends on the backend server accepting the exact JSON shape and returning the expected HTTP 201/200.
* **Standalone School Creation (`POST /schools`):** Submits when the admin toggle is off. Requires backend verification of the standalone `/schools` endpoint.
* **Users Table Query (`GET /users`):** Implemented in `users-table-example.tsx`. Requires verification that the backend `/users` endpoint returns the paginated response structure `{ data: [], meta: {...} }`.

### 3.3 Partially Implemented Features
* **Schools Management (`/schools`):** The UI table and filtering controls are complete, but data loading is powered by `mockFetchSchools` instead of the live backend `GET /schools`.
* **School Onboarding Page (`/schools/onboard`):** Dedicated page exists and connects to `@tanstack/react-form`, but is disconnected from the dialog used on `/schools`.
* **User Profile & Logout:** Sidebar dropdown UI exists (`admin@school.gov.bd`), but clicking settings or logout does not trigger any authentication actions.

### 3.4 Missing or Incomplete Features
* **Authentication System:** No login page, no registration route, no JWT token persistence, no auth guards or route protection.
* **Live Dashboard Statistics:** Total students, teachers, attendance rates, and notices are static constants.
* **Academic Setup Routes (404s):**
  * `/academic-years`, `/shifts`, `/classes`, `/sections`, `/subjects`.
* **Stakeholder Management Routes (404s):**
  * `/teachers`, `/students`, `/guardians`.
* **Daily Activity Routes (404s):**
  * `/routines`, `/enrollments`, `/attendances`.
* **Evaluation Routes (404s):**
  * `/indicators`, `/evaluations`.

### 3.5 Indeterminate Functionality
* **Backend Expected Query Parameter Naming:** Whether the backend expects `page` & `limit` vs. `skip` & `take`, or `sortBy` & `sortOrder` vs. `sort=field:asc`, cannot be confirmed without backend route documentation.
* **Backend Auth Session Mechanism:** Whether the backend uses HTTP-only session cookies, Bearer JWTs, or API keys when authentication is turned back on.

---

## Phase 4: Code Quality, Anti-Patterns & Risk Assessment

### 4.1 Confirmed Technical Bugs & Inconsistencies
1. **Dual Form Library Collision:**
   * `src/components/schools/school-onboarding-dialog.tsx` uses **`react-hook-form`** with `@hookform/resolvers/zod`.
   * `src/components/form/school-onboard-form.tsx` uses **`@tanstack/react-form`** with inline Zod validators.
   * *Impact:* Both libraries are bundled into the client build, increasing bundle size and creating conflicting development patterns.
2. **Duplicate Onboarding Dialogs:**
   * `src/components/schools/school-onboarding-dialog.tsx` (664 lines, active on `/schools`).
   * `src/components/form/school-onboard-dialog.tsx` (90 lines, orphan wrapper around `SchoolOnboardForm`).
   * *Impact:* Code duplication and maintenance confusion.

### 4.2 Duplicate Implementations & Architecture Drift
* `src/components/data-table/data-table-query-example.tsx` contains a production-ready `useSchoolsQuery` and `fetchSchools` function calling `httpClient.get("/schools")`.
* However, `src/app/(dashboard)/schools/page.tsx` was written separately using internal `mockFetchSchools` and `DUMMY_SCHOOLS`.
* *Recommendation for future task:* Unify the real API hook into the main `/schools` page.

### 4.3 Import Ambiguities (`"cn"` package vs. `@/lib/utils`)
* In `src/lib/utils.ts`, a project helper is defined:
  ```typescript
  export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
  ```
* However, 23 files (including shadcn UI primitives and `data-table.tsx`) import from the external npm package `"cn"`:
  ```typescript
  import { cn } from "cn";
  ```
* While currently functional because `"cn": "^0.4.0"` is in `package.json`, this causes subtle styling bugs if the external `"cn"` package lacks Tailwind-merge conflict resolution.

### 4.4 Responsive Design & Mobile Usability Findings
* **Positive:** `DashboardLayout` handles mobile gracefully via `Sheet` drawer trigger and `overflow-x-hidden`.
* **Positive:** Previous horizontal card scroll issues on mobile were patched in commit `0862474`.
* **Concern:** The `SchoolOnboardingDialog` modal content has a large height (`max-h-[92vh]`). On smaller mobile viewports, scrolling between the two tabs (বিদ্যালয়ের বিবরণ and অ্যাডমিন অ্যাকাউন্ট) can feel cramped.

### 4.5 Accessibility (a11y) Findings
* Form inputs in `school-onboarding-dialog.tsx` use Radix `Label` primitives linked to `Input` elements.
* Recharts in `attendance-chart.tsx` uses SVG without alternative text tables for screen readers.
* Color contrast across OKLCH tokens satisfies WCAG AA standards in both light and dark themes.

### 4.6 Security & Vulnerability Posture
* **Next.js Engine:** Upgraded from `16.4.0` to `16.4.3` to eliminate known CVE advisories (0 npm vulnerabilities).
* **Secret Hygiene:** No API secrets, private keys, or passwords are hardcoded in the frontend repository.
* **Input Sanitization:** Strings are `.trim()`'d before dispatching payloads to prevent whitespace injection.

---

## Phase 5: Project Documentation (Sections A–J)

### Section A: Project Overview
The **School Back-Office** is a specialized administrative frontend for primary school governance in Bangladesh. It provides institutional tracking, administrative onboarding, user directory management, and academic dashboards. The project follows a modern single-page dashboard paradigm with server-side rendering support through Next.js App Router.

### Section B: Technology Stack Reference Table

| Layer | Package / Tool | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | `next` | `16.4.3` | App Router, SSR, Turbopack bundling |
| **UI Library** | `react`, `react-dom` | `19.3.0` | Component lifecycle & rendering engine |
| **Styling** | `tailwindcss`, `@tailwindcss/turbopack` | `^4.0.0` | Atomic CSS engine with OKLCH theme tokens |
| **Component Primitives** | `@radix-ui/*` / `radix-ui` | `^1.7.0` | Accessible headless UI primitives |
| **Icons** | `lucide-react` | `^1.55.0` | Comprehensive icon library |
| **Data Fetching & Cache** | `@tanstack/react-query` | `^5.104.1` | Client-side cache, query keys, background refetch |
| **URL State Adapter** | `nuqs` | `^2.10.2` | Type-safe URL query parameter synchronization |
| **Table Engine** | `@tanstack/react-table` | `^9.2.8` | Headless table sorting, pagination, filtering |
| **HTTP Client** | `axios` | `^1.20.0` | HTTP request dispatch, interceptors |
| **Validation** | `zod` | `^4.6.5` | TypeScript-first schema declaration & validation |
| **Form Management (1)** | `react-hook-form`, `@hookform/resolvers` | `^7.89.0` | Used in `school-onboarding-dialog.tsx` |
| **Form Management (2)** | `@tanstack/react-form` | `^1.33.5` | Used in `school-onboard-form.tsx` |
| **Notifications** | `sonner` | `^2.0.8` | Rich, animated toast notification system |
| **Charts** | `recharts` | `^3.8.0` | SVG charting for attendance trends |
| **Date Formatting** | `date-fns` | `^4.4.0` | Date manipulation and display formatting |
| **Utility** | `clsx`, `tailwind-merge` | `^2.1.1`, `^3.7.0` | Conditional class composition |

### Section C: Complete Directory & File Map
* `src/app/`
  * `page.tsx`: Redirects `/` to `/dashboard`.
  * `layout.tsx`: Root HTML, metadata, loads Inter font, mounts `Providers`.
  * `providers.tsx`: Wraps `QueryProvider`, `ThemeProvider`, `NuqsAdapter`, `Toaster`.
  * `globals.css`: Tailwind v4 theme, OKLCH color definitions.
  * `(dashboard)/layout.tsx`: Responsive dashboard layout (sidebar + mobile drawer).
  * `(dashboard)/dashboard/page.tsx`: Dashboard overview with KPI cards and chart.
  * `(dashboard)/schools/page.tsx`: Schools list with search, filter, and modal trigger.
  * `(dashboard)/schools/onboard/page.tsx`: Full-page school onboarding form.
  * `(dashboard)/users/page.tsx`: Users management table view.
* `src/components/`
  * `dashboard/attendance-chart.tsx`: Recharts weekly attendance bar chart.
  * `data-table/`: 11 files forming the reusable server-side table architecture.
  * `form/`: `form-input.tsx`, `password-input.tsx`, `school-onboard-form.tsx`, `school-onboard-dialog.tsx`, `register-form.tsx`.
  * `layouts/`: `app-sidebar.tsx`, `theme-toggle.tsx`.
  * `schools/`: `school-onboarding-dialog.tsx`.
  * `ui/`: 18 atomic shadcn primitives (button, dialog, input, table, etc.).
* `src/config/env.ts`: Validates `NEXT_PUBLIC_API_BASE_URL`.
* `src/data/bangladesh-geo.json`: 76KB Bangladesh administrative geography tree.
* `src/lib/httpClient.ts`: Axios client configured with interceptors and base URL.
* `src/types/api.types.ts`: `ApiResponse<T>` and `ApiRequestOptions`.
* `src/types/geo.ts`: `GeoDivision`, `GeoDistrict`, `GeoUpazila`, `GeoUnion`.

### Section D: Frontend and Backend Communication
* **Base URL:** Retrieved from `NEXT_PUBLIC_API_BASE_URL` in `.env` / `.env.local`.
* **Transport:** JSON over HTTP/HTTPS with `timeout: 30000` and `withCredentials: true`.
* **Standard Response Envelope (`ApiResponse<T>`):**
  ```typescript
  export interface ApiResponse<TData = unknown> {
    success: boolean;
    message: string;
    data?: TData;
    error?: unknown;
    meta?: {
      page: number;
      limit: number;
      total: number;
    };
  }
  ```
* **Security Note:** No authentication tokens are injected into request headers yet; token interceptors are prepared for future backend activation.

### Section E: Existing Features
1. **Overview Dashboard (`/dashboard`):** KPI summary cards (Students, Teachers, Attendance %, Sections), quick action navigation, attendance bar chart, and recent notices.
2. **Schools Management (`/schools`):** DataTable with debounced search, faceted status and type filtering, ascending/descending column sorting, and pagination controls.
3. **School Onboarding (`/schools/onboard` & Dialog):** Multi-step data capture for School Details (Name, GPS code, Division, District, Upazila, Cluster, Email, Phone, Address) and Admin Credentials (Full Name, Phone, Email).
4. **User Management (`/users`):** Paginated table displaying registered users, roles (Super Admin, School Admin, Teacher, Student, Guardian), and status badges.
5. **Dark / Light Mode:** Fully reactive theme toggle persisting user preference across reloads.

### Section F: Development Progress Assessment
* **Architecture & Foundation:** **95% Complete** (Modern, scalable structure, typed HTTP client, validated environment, robust data table engine).
* **UI & Design System:** **85% Complete** (Rich aesthetic styling, clean responsive behavior, consistent typography).
* **Live API Integration:** **35% Complete** (Onboarding endpoints implemented, but `/schools` table and `/dashboard` rely on dummy data; authentication is inactive).
* **Application Scope:** **25% Complete** (Only `/dashboard`, `/schools`, and `/users` are implemented; 13 academic, stakeholder, and evaluation routes remain to be created).

### Section G: Detailed Issue & Concern Log

| Issue ID | File Path | Concern / Evidence | Severity |
| :--- | :--- | :--- | :--- |
| **ISSUE-01** | `src/app/(dashboard)/schools/page.tsx:549` | `queryFn: () => mockFetchSchools(queryParams)` queries a local dummy array rather than the backend `GET /schools` API. | High |
| **ISSUE-02** | `src/components/schools/school-onboarding-dialog.tsx` vs `src/components/form/school-onboard-form.tsx` | Two competing form libraries (`react-hook-form` vs `@tanstack/react-form`) and duplicate onboarding logic in two separate directories. | Medium |
| **ISSUE-03** | `src/components/ui/*.tsx`, `src/components/data-table/*.tsx` | 23 files import `{ cn } from "cn"` (external package) instead of `{ cn } from "@/lib/utils"` (local Tailwind-merge helper). | Low |
| **ISSUE-04** | `src/app/(dashboard)/dashboard/page.tsx:155-187` | Quick action buttons link to `/enrollments`, `/attendances`, `/routines`, `/evaluations` which currently return 404 Not Found. | Medium |
| **ISSUE-05** | `src/components/layouts/app-sidebar.tsx:88-168` | 13 sidebar navigation links point to unimplemented routes. | Low |
| **ISSUE-06** | `src/lib/httpClient.ts:18` | Backend authentication is disabled; no login or session management exists. | Medium |

### Section H: Important Files for Future Changes
1. **`src/app/(dashboard)/schools/page.tsx`:** Primary candidate for connecting the live `useSchoolsQuery` and replacing `mockFetchSchools`.
2. **`src/components/data-table/data-table-query-example.tsx`:** Contains the reference implementation of `fetchSchools` and query key factories.
3. **`src/components/schools/school-onboarding-dialog.tsx`:** The active dialog for school onboarding.
4. **`src/lib/httpClient.ts`:** Where auth headers and token refresh logic will be implemented once backend security is enabled.
5. **`src/types/api.types.ts`:** Where new backend payload interfaces should be registered.

### Section I: Information Still Needed
1. **Live Backend Route for Schools Listing:** What is the exact URL and query parameter specification for fetching the paginated school list? Does the backend support `GET /api/v1/schools` with pagination query params (`page`, `limit`, `search`, `sortBy`, `sortOrder`)?
2. **Backend Response Envelope:** Does `GET /api/v1/schools` return `{ success: true, data: [...], meta: {...} }` or `{ success: true, data: { data: [...], meta: {...} } }`?
3. **Standard Form Library Decision:** Which form library does the team wish to standardize on: `react-hook-form` (already used in the 664-line dialog) or `@tanstack/react-form` (used in `school-onboard-form.tsx`)?
4. **Authentication Roadmap:** When will backend authentication be activated? Will it use Bearer JWT tokens in the `Authorization` header or HTTP-only cookies?

### Section J: Questions for the Developer
1. *"For `GET /api/v1/schools`, what query parameter names does your backend accept for searching, sorting, and pagination (e.g., `page` & `limit` or `page` & `size`; `search` or `q`)?"*
2. *"Can you confirm if `POST /api/v1/schools/onboard` is the final route for onboarding, or should standalone schools be created via `POST /api/v1/schools`?"*
3. *"When onboarding fails with HTTP 409, does the response body provide specific field error details (such as `field: 'gps_code'`), or a general `message` string?"*
4. *"Do you prefer that we standardize the entire project on `react-hook-form` with Zod or `@tanstack/react-form`?"*
5. *"Are the upcoming backend routes for Academic Setup (`/academic-years`, `/classes`, `/sections`, `/subjects`) ready for frontend integration, or are we focusing strictly on Schools and Users first?"*

---

## Phase 6: Standby Protocol

**Status: Standby.**  
In accordance with your instructions:
* **No code changes or feature implementations have been made.**
* **No files have been deleted, moved, or altered.**
* **Dependencies and configuration files have been kept intact.**
* **The dev server is active and running cleanly on `http://localhost:3000`.**

Whenever you are ready, please provide the specific task assigned by the developer, and we will review its requirements and implement it step by step.

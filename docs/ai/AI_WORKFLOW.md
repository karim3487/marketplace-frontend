# AI Development Workflow - Marketplace Frontend

This frontend was developed using an AI-centric approach, adhering to Feature-Sliced Design (FSD) principles.

## AI Tools Used

- **Gemini CLI**: Core orchestration for architecture design, code generation, and project management.
- **Vue.js 3 / Vite / TypeScript**: Stack selected for performance and developer experience.

## Development Iterations

### 1. Architectural Planning (FSD)

- **AI Action**: Identified layers (app, pages, widgets, features, entities, shared) based on FSD requirements.
- **Decision**: Implemented strict Public API boundaries for each slice to ensure maintainability.

### 2. Core Infrastructure & Tooling

- **AI Action**: Configured Vite, TailwindCSS (v4), and TypeScript.
- **Data Fetching**: Integrated `@tanstack/vue-query` for server state management and infinite scroll logic.

### 3. Feature Implementation

- **Infinite Scroll**: Implemented in `widgets/ProductList` using `useInfiniteScroll` from `@vueuse/core`.
- **Admin Dashboard**: Developed full CRUD functionality for products and attributes with JWT-based authentication.
- **Image Handling**: Integrated S3-compatible storage (MinIO) via backend-provided presigned URLs.

### 4. Quality Assurance

- **Linting**: Automated checks via `eslint` and `oxlint`.
- **Type Safety**: Strictly enforced through `vue-tsc`.
- **UI/UX**: Refined layout with responsive design and modern CSS (TailwindCSS v4).

## Engineering Decisions

- **Composition API**: Used exclusively for reactivity and logic.
- **TanStack Query**: Selected for robust caching and simplified pagination handling.
- **FSD Structure**: Implemented to support long-term scalability and clear separation of concerns.
- **Generated Client**: Used `openapi-typescript-codegen` to ensure type consistency between backend and frontend.

# Shared library guidance

This package contains reusable Playwright infrastructure. Feature specifications,
Playwright configuration, authentication setup, fixtures, and credentials belong
to consuming automation repositories. Do not add test cases here.

Use strict TypeScript, two-space indentation, and explicit type-only imports.
Export supported APIs from src/index.ts. Use relative internal imports.
Pages may own components; components must not depend on application pages.
Inject locators and Playwright contexts. Keep application URLs, selectors,
payloads, and environment settings in consumers. Do not swallow action failures
or use fixed sleeps. Consumers own and dispose their browser and API contexts.

Run npm run typecheck and npm run build after changes. Use npm pack --dry-run
to inspect package contents. Validate application behavior in consuming projects.
Do not modify consumer repositories as part of a library-only change.

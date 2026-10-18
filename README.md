# Playwright shared library

Reusable TypeScript infrastructure for IdeaScale automation projects. Feature
tests remain in the consuming projects; this package has no test suite or
Playwright configuration.

## Development

```powershell
npm ci
npm run typecheck
npm run build
npm pack --dry-run
```

Source lives in `src/`; compilation produces CommonJS JavaScript and TypeScript
declarations in `dist/`. The package root exports the supported API. The `prepare`
script builds the library during a normal development install and packing.

The library declares Playwright as a peer dependency (`^1.51.1`). Consumers
provide their own compatible installation. Development dependencies support
local compilation. The peer range is an initial target based on existing
projects, not a claim that every version has been integration tested.

## Contents

- `src/pages`: generic BasePage with consumer-defined page identity and URL.
- `src/components/common`: locator-injected modal components.
- `src/api`: API client base using a consumer-owned request context.
- `src/utils`: English abbreviated-month date-range format matcher.
- `src/types`: public configuration types.

See [usage and integration](docs/USAGE.md) for local installation and examples.
Reporting-specific pages, chart helpers, enums, fixtures, payloads, and credentials
stay in their application repositories. These foundations require explicit
adaptation; they are not drop-in replacements for reporting's existing classes.

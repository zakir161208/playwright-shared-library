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

## GitHub Actions

The **Build and Publish Shared Library** workflow (`.github/workflows/build-and-publish.yml`) runs on pull requests and pushes
to `develop`, and can also be started manually. The Build job installs dependencies,
typechecks, builds, and checks the package contents. The Publish job runs only after
a successful build on `develop`. It selects the next patch version above the
highest stable version already published (for example, `1.0.1` becomes `1.0.2`).
If the version in `package.json` is higher, that version is used instead.
It then verifies that the expected package version is available on GitHub Packages.

Packages publish as `@zakir161208/playwright-shared-library` to GitHub Packages,
linked to `zakir161208/playwright-shared-library`, using the workflow's
`GITHUB_TOKEN`. Version updates are applied to `package.json` and
`package-lock.json` inside the workflow only; they are not committed back to the
repository. Each successful publish, including a manual run or rerun on `develop`,
creates a new version. Pull requests only build. Publishing runs the
`prepublishOnly` build script.

## Gradle publishing

Gradle delegates its `build` and `publish` tasks to npm. Run `./gradlew clean
publish` to retry a failed publish from a clean output directory.

The Gradle process must be able to find `npm`. If an IDE-launched Gradle task
does not inherit the shell PATH (common with nvm installations), configure the
npm executable using either a Gradle property or `NPM_COMMAND` environment
variable:

```properties
# ~/.gradle/gradle.properties
npmCommand=/absolute/path/to/npm
```

For example, the same setting can be passed ad hoc as
`./gradlew -PnpmCommand=/absolute/path/to/npm publish`. Do not commit a
machine-specific npm path to this repository. When an absolute npm path is
configured, the Gradle tasks also add its directory to `PATH`, so npm can find
the corresponding `node` executable in nvm-based IDE environments.

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

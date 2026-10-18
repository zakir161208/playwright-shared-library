# Consumer integration

## Install locally

Build the library, then install it from an automation repository:

```powershell
Set-Location E:\Ideascale\QA-Automation\playwright-shared-library
npm install
npm run build

Set-Location E:\Ideascale\reporting-test
npm install --save-dev ../QA-Automation/playwright-shared-library
```

These consumer commands are instructions for a later integration step; the
library setup does not run them. Keep `@playwright/test` installed in the
consumer. Rebuild the library after source changes. For testing the actual
distribution, run `npm pack` in the library and install the resulting `.tgz`
in the consumer instead of the folder dependency.

## Extend a page

```typescript
import type { Page } from '@playwright/test';
import { BasePage } from '@ideascale/playwright-shared-library';

export class DashboardPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  getPageUrl(): string {
    return '/dashboards';
  }

  atPageLocator() {
    return this.page.getByRole('heading', { name: 'Dashboards', exact: true });
  }
}
```

The URL and locator above are illustrative: supply actual application values.
Use Playwright's configured `baseURL` for relative navigation, or pass
`navigate({ baseUrl: 'https://your-environment.example', waitForReadyState: true })`.
An explicit base URL uses standard URL resolution: a leading slash replaces
the base path; a relative path resolves against it. `gotoOptions` forwards
Playwright navigation settings. `waitForReadyState` calls `waitForReady`, which
waits for the identity locator by default. Override it for additional application
readiness checks. `isAtPage` is an immediate visibility check, not an assertion.

## Use the confirmation modal

```typescript
import { ConfirmationModal } from '@ideascale/playwright-shared-library';

const confirmation = new ConfirmationModal(page);

await expect(confirmation.getModalLocator()).toBeVisible();
await confirmation.clickConfirm();
await expect(confirmation.getModalLocator()).toBeHidden();
```

The selectors (`.modal .modal-content`, `.modal-body`, `.btn-close`, and the
`submit-button` / `confirmation-modal-confirm-button` / `cancel-button` test IDs)
are defined inside `ConfirmationModal`. Actions propagate Playwright errors. Waiting for dismissal is explicit because
not every action closes a modal. Configure `testIdAttribute` in the consumer
when using custom test-ID attributes.

## Utilities

`dateRangePattern` matches display formats such as `Jan 1 - Jan 31, 2026` and
`Jan 1, 2026 – Feb 2, 2026`. It checks formatting, not calendar validity, and
does not support localized month names.

Keep page fixtures and feature assertions in the consumer. Import from
`@ideascale/playwright-shared-library`, not internal `src/` or `dist/` paths. Integrate one
page or component first and run its existing consumer tests before migrating
additional code.

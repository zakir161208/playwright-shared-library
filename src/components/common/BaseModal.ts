import type { Locator } from '@playwright/test';

export abstract class BaseModal {
  protected constructor(protected readonly modal: Locator) {}

  modalLocator(): Locator {
    return this.modal;
  }

  async waitForVisible(): Promise<void> {
    await this.modal.waitFor({ state: 'visible' });
  }

  async waitForHidden(): Promise<void> {
    await this.modal.waitFor({ state: 'hidden' });
  }
}

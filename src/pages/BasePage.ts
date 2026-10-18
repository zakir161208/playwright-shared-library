import type { Locator, Page } from '@playwright/test';

export type NavigateOptions = {
  baseUrl?: string;
  gotoOptions?: Parameters<Page['goto']>[1];
  waitForReadyState?: boolean;
};

export abstract class BasePage {
  protected constructor(public readonly page: Page) {}

  abstract getPageUrl(): string;

  abstract atPageLocator(): Locator;

  async isAtPage(): Promise<boolean> {
    return this.atPageLocator().isVisible();
  }

  async waitForReady(): Promise<void> {
    await this.atPageLocator().waitFor({ state: 'visible' });
  }

  async navigate(options: NavigateOptions = {}): Promise<void> {
    const url = options.baseUrl
      ? new URL(this.getPageUrl(), options.baseUrl).href
      : this.getPageUrl();

    await this.page.goto(url, options.gotoOptions);

    if (options.waitForReadyState) {
      await this.waitForReady();
    }
  }
}

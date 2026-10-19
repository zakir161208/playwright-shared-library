import {Locator} from '@playwright/test';

export class AddThemeModal {
    private readonly modal: Locator;

    constructor(modal: Locator) {
        this.modal = modal;
    }

    modalLocator(): Locator {
        return this.modal;
    }

    themeOptionLocator(name: string): Locator {
        return this.modal.locator('.ideascale-select-menu:visible').getByText(name, {exact: true});
    }

    async selectTheme(name: string): Promise<void> {
        await this.modal.locator('#theme-select').click();
        await this.themeOptionLocator(name).click();
    }

    async save(): Promise<void> {
        await this.modal.getByTestId('submit-button').click();
    }

    async cancel(): Promise<void> {
        await this.modal.getByTestId('cancel-button').click();
    }

    async close(): Promise<void> {
        await this.modal.locator('.btn-close').click();
    }
}

import type { Locator, Page } from '@playwright/test';

export class ConfirmationModal {
    private readonly modal: Locator;
    private readonly confirmButton: Locator;
    private readonly cancelButton: Locator;
    private readonly closeButton:Locator;
    private readonly modalBody: Locator;

    constructor(page: Page) {
        this.modal = page.locator('.modal .modal-content');
        this.confirmButton = this.modal.getByTestId('submit-button').or(this.modal.getByTestId('confirmation-modal-confirm-button'));
        this.cancelButton = this.modal.getByTestId('cancel-button');
        this.closeButton = this.modal.locator(".btn-close");
        this.modalBody = this.modal.locator('.modal-body');
    }

    getModalLocator(): Locator {
        return this.modal;
    }

    bodyLocator(): Locator {
        return this.modalBody;
    }

    async clickConfirm(): Promise<void> {
        await this.confirmButton.click();
    }

    async clickCancel(): Promise<void> {
        await this.cancelButton.click();
    }

    async clickClose(): Promise<void> {
        await this.closeButton.click();
    }
}

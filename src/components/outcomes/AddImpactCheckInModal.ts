import {Locator} from '@playwright/test';

export class AddImpactCheckInModal {
    private readonly modal: Locator;

    constructor(modal: Locator) {
        this.modal = modal;
    }

    modalLocator(): Locator {
        return this.modal;
    }

    async fillActualValue(value: string): Promise<void> {
        await this.modal.locator('#check-in-actual-value').fill(value);
    }

    async fillNotes(notes: string): Promise<void> {
        await this.modal.locator('#check-in-notes').fill(notes);
    }

    async saveCheckIn(): Promise<void> {
        await this.modal.getByTestId('submit-button').click();
    }
}
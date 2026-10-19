import {Locator} from '@playwright/test';

export type OutcomeVerdict = 'Achieved' | 'Missed';

export class CloseOutcomeModal {
    private readonly modal: Locator;
    private readonly achievedOption: Locator;
    private readonly missedOption: Locator;
    private readonly confirmButton: Locator;
    private readonly closingNotes: Locator;


    constructor(modal: Locator) {
        this.modal = modal;
        this.achievedOption = this.modal.locator('.close-outcome-verdict-card--achieved');
        this.missedOption = this.modal.locator('.close-outcome-verdict-card--missed');
        this.closingNotes = this.modal.locator('#close-outcome-notes');
        this.confirmButton = this.modal.getByTestId('submit-button');
    }


    getModalLocator(): Locator {
        return this.modal;
    }

    confirmButtonLocator(): Locator {
        return this.confirmButton;
    }

    async selectVerdict(verdict: OutcomeVerdict): Promise<void> {
        switch (verdict) {
            case 'Achieved':
                await this.achievedOption.click();
                break;
            case 'Missed':
                await this.missedOption.click();
                break;
        }
    }


    async fillClosingNotes(notes: string): Promise<void> {
        await this.closingNotes.fill(notes);
    }

    async confirm(): Promise<void> {
        await this.confirmButton.click();
    }
}

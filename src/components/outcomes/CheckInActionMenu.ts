import {Locator, Page} from '@playwright/test';
import {ConfirmationModal} from '@components/ConfirmationModal';

export class CheckInActionMenu {
    private readonly deleteButton: Locator;

    constructor(
        private readonly actionMenu: Locator,
        private readonly page: Page
    ) {

        this.deleteButton = this.actionMenu.getByTestId('delete-check-in-button');
    }

    async clickDelete(): Promise<ConfirmationModal> {
        await this.deleteButton.click();

        return new ConfirmationModal(this.page.locator('.modal .modal-content:visible'));
    }
}

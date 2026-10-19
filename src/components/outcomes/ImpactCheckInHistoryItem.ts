import type { Locator, Page } from '@playwright/test';
import { CheckInActionMenu } from '@components/outcomes/CheckInActionMenu';

export class ImpactCheckInHistoryItem {
    private readonly optionsButton: Locator;
    private readonly actionMenu: Locator;

    constructor(
        private readonly item: Locator,
        private readonly page: Page
    ) {
        this.optionsButton = item.getByTestId('check-in-more-actions-toggle-button');
        this.actionMenu = item.getByTestId('check-in-action-menu');
    }

    getItemLocator(): Locator {
        return this.item;
    }

    getByIndex(index: number): ImpactCheckInHistoryItem {
        return new ImpactCheckInHistoryItem(this.item.nth(index), this.page);
    }

    findByActualValue(actualValue: string, unit: string): ImpactCheckInHistoryItem {
        const value = this.page.locator('.checkin-history-value', {
            hasText: `${actualValue}${unit}`
        });

        return new ImpactCheckInHistoryItem(this.item.filter({has: value}), this.page);
    }

    async openActionMenu(): Promise<CheckInActionMenu> {
        await this.optionsButton.click();
        return new CheckInActionMenu(this.actionMenu, this.page);
    }
}

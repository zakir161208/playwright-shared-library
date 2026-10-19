import {Locator} from '@playwright/test';
import {AddImpactCheckInModal} from '@components/outcomes/AddImpactCheckInModal';
import {CloseOutcomeModal} from '@components/outcomes/CloseOutcomeModal';
import {ImpactCheckInHistoryItem} from '@components/outcomes/ImpactCheckInHistoryItem';

export class CheckInWidget {
    private readonly widget: Locator;
    private readonly addCheckInButton: Locator;
    private readonly actualValue: Locator;
    private readonly closeOutcomeButton: Locator;
    private readonly reopenOutcomeButton: Locator;
    private readonly outcomeClosureBanner: Locator;


    constructor(widget: Locator) {
        this.widget = widget;
        this.addCheckInButton = widget.getByTestId('impact-check-in-button');
        this.actualValue = widget.getByTestId('impact-check-in-actual-value');
        this.closeOutcomeButton = widget.getByTestId('impact-close-button');
        this.reopenOutcomeButton = widget.getByTestId('impact-reopen-outcome-button');
        this.outcomeClosureBanner = widget.locator('.outcome-closure-banner');
    }

    getActualValueLocator(): Locator {
        return this.actualValue;
    }

    addCheckInButtonLocator(): Locator {
        return this.addCheckInButton;
    }

    closeOutcomeBanner(): Locator {
        return this.outcomeClosureBanner;
    }

    reopenOutcomeButtonLocator(): Locator {
        return this.reopenOutcomeButton;
    }

    outcomeClosureBannerLocator(): Locator {
        return this.outcomeClosureBanner;
    }

    getCheckInHistoryItems(): ImpactCheckInHistoryItem {
        return new ImpactCheckInHistoryItem(
            this.widget.locator('.checkin-history-item'),
            this.widget.page()
        );
    }

    async openCheckIn(): Promise<AddImpactCheckInModal> {
        await this.addCheckInButton.click();
        return new AddImpactCheckInModal(this.widget.page().locator('.modal .modal-content:visible'));
    }

    async openCloseOutcomeModal(): Promise<CloseOutcomeModal> {
        await this.closeOutcomeButton.click();
        return new CloseOutcomeModal(this.widget.page().locator('.modal .modal-content:visible'));
    }

    async reopenOutcome(): Promise<void> {
        await this.reopenOutcomeButton.click();
    }
}

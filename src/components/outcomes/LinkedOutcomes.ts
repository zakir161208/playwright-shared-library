import {Locator, Page} from '@playwright/test';
import {AddStrategicOutcomeModal} from '@components/outcomes/AddStrategicOutcomeModal';
import {AddImpactModal} from '@components/outcomes/AddImpactModal';
import {AddThemeModal} from '@components/outcomes/AddThemeModal';
import {ConfirmationModal} from '@components/ConfirmationModal';
import {ImpactSection} from '@components/outcomes/ImpactSection';
import {CheckInWidget} from '@components/outcomes/CheckInWidget';

type LinkedOutcomeType = 'theme' | 'strategic' | 'impact';

export class LinkedOutcomes {
    private readonly page: Page;
    private readonly section: Locator;

    constructor(page: Page, section: Locator) {
        this.page = page;
        this.section = section;
    }

    addThemeButtonLocator(): Locator {
        return this.section.getByTestId('linked-outcome-add-theme');
    }

    addStrategicOutcomeButtonLocator(): Locator {
        return this.section.getByTestId('linked-outcome-add-strategic');
    }

    addImpactButtonLocator(): Locator {
        return this.section.getByTestId('linked-outcome-add-impact');
    }

    linkedOutcomeLocator(name: string): Locator {
        return this.section.locator('.outcome-tag-name').filter({hasText: name});
    }

    getImpactSection(): ImpactSection {
        return new ImpactSection(this.section.getByTestId('impact-card').first());
    }

    getCheckInWidget(): CheckInWidget {
        return new CheckInWidget(this.section.getByTestId('impact-check-in-widget'));
    }

    async openThemeDialog(): Promise<AddThemeModal> {
        await this.addThemeButtonLocator().click();
        return new AddThemeModal(this.page.locator('.modal .modal-content'));
    }

    async openStrategicOutcomeDialog(): Promise<AddStrategicOutcomeModal> {
        await this.addStrategicOutcomeButtonLocator().click();
        return new AddStrategicOutcomeModal(
            this.page.locator('.modal .modal-content')
        );
    }

    async openImpactDialog(): Promise<AddImpactModal> {
        await this.addImpactButtonLocator().click();
        return new AddImpactModal(this.page.locator('.modal .modal-content:visible'));
    }

    async removeLinkedOutcome(type: LinkedOutcomeType): Promise<ConfirmationModal> {
        await this.section.getByTestId(`linked-outcome-remove-${type}`).click();
        return new ConfirmationModal(this.page.locator('.modal .modal-content:visible'));
    }
}

import {Locator} from '@playwright/test';
import {AddImpactModal} from '@components/outcomes/AddImpactModal';

export class ImpactSection {
    private readonly card: Locator;

    constructor(card: Locator) {
        this.card = card;
    }

    sectionLocator(): Locator {
        return this.card;
    }

    editButtonLocator(): Locator {
        return this.card.getByTestId('impact-edit-button');
    }

    impactNameLocator(): Locator {
        return this.card.getByTestId('impact-name');
    }

    baselineValueLocator(): Locator {
        return this.card.getByTestId('impact-baseline-value');
    }

    targetValueLocator(): Locator {
        return this.card.getByTestId('impact-target-value');
    }

    async editImpact(): Promise<AddImpactModal> {
        await this.editButtonLocator().click();
        return new AddImpactModal(this.card.page().locator('.modal .modal-content:visible'));
    }
}

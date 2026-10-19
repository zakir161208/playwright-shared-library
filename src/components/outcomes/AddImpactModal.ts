import {Locator} from '@playwright/test';

export class AddImpactModal {
    private readonly modal: Locator;
    private readonly baselineLocator: Locator;
    private readonly targetLocator: Locator;
    private readonly increaseDirectionButton: Locator;
    private readonly decreaseDirectionButton: Locator;
    private readonly metricTypeLocator: Locator;
    private readonly metricTypeOptionsLocator: Locator;

    constructor(modal: Locator) {
        this.modal = modal;
        this.baselineLocator = this.modal.getByTestId('impact-outcome-baseline');
        this.targetLocator = this.modal.getByTestId('impact-outcome-target');
        this.increaseDirectionButton = this.modal.getByTestId('impact-outcome-direction-increase');
        this.decreaseDirectionButton = this.modal.getByTestId('impact-outcome-direction-decrease');
        this.metricTypeLocator = this.modal.getByTestId('impact-outcome-metric-type');
        this.metricTypeOptionsLocator = this.modal.locator('.ideascale-select-menu:visible');
    }

    modalLocator(): Locator {
        return this.modal;
    }

    async fillImpactName(name: string): Promise<void> {
        await this.modal.getByTestId('impact-outcome-name').fill(name);
    }

    async selectMetricType(metricType: string): Promise<void> {
        await this.metricTypeLocator.click();
        await this.metricTypeOptionsLocator.getByText(metricType, {exact: true}).click();
    }

    async fillUnit(unit: string): Promise<void> {
        await this.modal.getByTestId('tactical-outcome-unit').fill(unit);
    }

    async selectIncreaseDirection(): Promise<void> {
        await this.increaseDirectionButton.click();
    }

    async selectDecreaseDirection(): Promise<void> {
        await this.decreaseDirectionButton.click();
    }

    async fillBaseline(baseline: string): Promise<void> {
        await this.baselineLocator.fill(baseline);
    }

    async fillTarget(target: string): Promise<void> {
        await this.targetLocator.fill(target);
    }

    async fillTimeframe(timeframe: string): Promise<void> {
        await this.modal.getByTestId('impact-outcome-timeframe-value').fill(timeframe);
    }

    async save(): Promise<void> {
        await this.modal.getByTestId('submit-button').click();
    }
}

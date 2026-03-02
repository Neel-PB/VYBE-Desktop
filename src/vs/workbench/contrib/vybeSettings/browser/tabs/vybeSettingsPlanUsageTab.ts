/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as DOM from '../../../../../base/browser/dom.js';
import {
	createSection,
	createPlanCard,
	createUsageProgressCell,
} from '../vybeSettingsComponents.js';
import {
	SETTINGS_SECTION_LIST_GAP_PX,
	SETTINGS_PLAN_CARD_GAP_PX,
	SETTINGS_PLAN_CARD_MIN_WIDTH_PX,
	SETTINGS_PLAN_CARD_PADDING_PX,
	SETTINGS_PLAN_CARD_BORDER_RADIUS_PX,
} from '../vybeSettingsDesignTokens.js';

/**
 * Renders the Plan & Usage tab: plan cards row (Current Plan + spacer) and
 * "Included in Ultra" section with Total usage progress cell.
 */
export function renderPlanUsageTab(parent: HTMLElement): void {
	// ─── Section 1: Plan cards row (no section title) ─────────────────────────
	const section = DOM.append(parent, DOM.$('.vybe-settings-section'));
	section.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';

	const sectionList = DOM.append(section, DOM.$('.vybe-settings-section-list'));
	sectionList.style.cssText = `display: flex; flex-direction: column; gap: ${SETTINGS_SECTION_LIST_GAP_PX}px;`;

	const subSection = DOM.append(sectionList, DOM.$('.vybe-settings-sub-section'));
	subSection.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';

	// No background on wrapper so area to the right of the card shows page background
	const subSectionList = DOM.append(subSection, DOM.$('.vybe-settings-sub-section-list'));
	subSectionList.style.cssText = 'display: flex; flex-direction: column; gap: 0;';

	const cardsRow = DOM.append(subSectionList, DOM.$('.vybe-settings-plan-cards-row'));
	cardsRow.style.cssText = `
		display: flex;
		flex-wrap: wrap;
		column-gap: ${SETTINGS_PLAN_CARD_GAP_PX}px;
		row-gap: ${SETTINGS_PLAN_CARD_GAP_PX}px;
		padding: 0;
	`;

	createPlanCard(cardsRow, {
		planLabel: 'Current Plan',
		planName: 'Ultra',
		price: '$200/mo',
		resetText: 'Resets on Mar 5 (5 days)',
		buttonLabel: 'Manage',
	});

	// Spacer card (invisible, for layout balance)
	const spacerCard = DOM.append(cardsRow, DOM.$('.vybe-settings-plan-card.vybe-settings-plan-card-spacer'));
	spacerCard.style.cssText = `
		flex: 1;
		min-width: ${SETTINGS_PLAN_CARD_MIN_WIDTH_PX}px;
		padding: ${SETTINGS_PLAN_CARD_PADDING_PX}px;
		border-radius: ${SETTINGS_PLAN_CARD_BORDER_RADIUS_PX}px;
		background: transparent;
		border: 1px solid transparent;
		visibility: hidden;
		pointer-events: none;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	`;

	// ─── Section 2: Included in Ultra ──────────────────────────────────────
	const usageSection = createSection(parent, 'Included in Ultra');
	const usageSectionList = usageSection.querySelector('.vybe-settings-section-list') as HTMLElement;
	const usageSubSection = DOM.append(usageSectionList, DOM.$('.vybe-settings-sub-section'));
	usageSubSection.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';

	createUsageProgressCell(usageSubSection, {
		label: 'Total',
		percentage: 42,
		progressPct: 42,
		detailText: '31% Auto and 64% API used',
		autoComposerPct: 31,
		autoComposerDescription: 'Consumed by Auto and Composer models. Additional usage consumes API quota.',
		apiPct: 64,
		apiDescription: 'Consumed by other models. Your plan includes at least $400 of API usage.',
	});
}

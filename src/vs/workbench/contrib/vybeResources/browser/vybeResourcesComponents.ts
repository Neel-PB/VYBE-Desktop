/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as DOM from '../../../../base/browser/dom.js';
import {
	RESOURCES_COLOR_DESCRIPTION,
	RESOURCES_DESCRIPTION_FONT_SIZE_PX,
	RESOURCES_DESCRIPTION_LINE_HEIGHT_PX,
	RESOURCES_TAB_CONTENT_GAP_PX,
} from './vybeResourcesDesignTokens.js';

/**
 * Reusable UI for Vybe Resources tabs. Extend as needed; can also use
 * vybeSettings createSection/createCell for consistent styling if desired.
 */

export function createEmptyState(parent: HTMLElement, message: string): HTMLElement {
	const wrap = DOM.append(parent, DOM.$('.vybe-resources-empty-state'));
	wrap.style.cssText = `
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 32px 24px;
		text-align: center;
		gap: 8px;
	`;
	const p = DOM.append(wrap, DOM.$('p'));
	p.textContent = message;
	p.style.cssText = `
		margin: 0;
		font-size: ${RESOURCES_DESCRIPTION_FONT_SIZE_PX}px;
		line-height: ${RESOURCES_DESCRIPTION_LINE_HEIGHT_PX}px;
		color: ${RESOURCES_COLOR_DESCRIPTION};
		max-width: 360px;
	`;
	return wrap;
}

export function createContentSection(parent: HTMLElement, gap: number = RESOURCES_TAB_CONTENT_GAP_PX): HTMLElement {
	const section = DOM.append(parent, DOM.$('.vybe-resources-content-section'));
	section.style.cssText = `
		display: flex;
		flex-direction: column;
		gap: ${gap}px;
		min-width: 0;
	`;
	return section;
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as DOM from '../../../../../base/browser/dom.js';
import { IVybeResourcesService } from '../../common/vybeResourcesService.js';
import { createEmptyState } from '../vybeResourcesComponents.js';

export function renderChangelogTab(parent: HTMLElement, service: IVybeResourcesService): void {
	service.getChangelog().then(entries => {
		DOM.clearNode(parent);
		if (entries.length === 0) {
			createEmptyState(parent, 'No changelog entries yet. Release notes will appear here when available.');
			return;
		}
		const section = DOM.append(parent, DOM.$('.vybe-resources-changelog-list'));
		section.style.cssText = 'display: flex; flex-direction: column; gap: 16px;';
		for (const entry of entries) {
			const card = DOM.append(section, DOM.$('.vybe-resources-changelog-entry'));
			card.style.cssText = `
				padding: 12px;
				background: var(--vscode-activityBar-background);
				border-radius: 8px;
				border: 1px solid var(--vscode-panel-border, rgba(128,128,128,0.2));
			`;
			const title = DOM.append(card, DOM.$('div'));
			title.textContent = entry.version ? `${entry.version}: ${entry.title}` : entry.title;
			title.style.cssText = 'font-size: 12px; font-weight: 500; color: var(--vscode-foreground); margin-bottom: 4px;';
			const body = DOM.append(card, DOM.$('div'));
			body.textContent = entry.body;
			body.style.cssText = 'font-size: 11px; color: var(--vscode-descriptionForeground); white-space: pre-wrap;';
			const date = DOM.append(card, DOM.$('div'));
			date.textContent = entry.date;
			date.style.cssText = 'font-size: 10px; color: var(--vscode-descriptionForeground); opacity: 0.8; margin-top: 4px;';
		}
	}).catch(() => {
		createEmptyState(parent, 'Unable to load changelog. Release notes will appear here when available.');
	});
}

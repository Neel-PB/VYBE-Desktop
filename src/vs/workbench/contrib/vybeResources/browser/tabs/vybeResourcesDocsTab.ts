/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as DOM from '../../../../../base/browser/dom.js';
import { IVybeResourcesService } from '../../common/vybeResourcesService.js';
import { createEmptyState } from '../vybeResourcesComponents.js';

export function renderDocsTab(parent: HTMLElement, service: IVybeResourcesService): void {
	service.getDocs().then(docs => {
		DOM.clearNode(parent);
		if (docs.length === 0) {
			createEmptyState(parent, 'No docs yet. Documentation links will appear here when available from your team or Vybe.');
			return;
		}
		const section = DOM.append(parent, DOM.$('.vybe-resources-docs-list'));
		section.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';
		for (const doc of docs) {
			const row = DOM.append(section, DOM.$('a.vybe-resources-doc-item'));
			row.setAttribute('href', doc.url || '#');
			if (doc.url) {
				row.setAttribute('target', '_blank');
				row.setAttribute('rel', 'noopener noreferrer');
			}
			row.style.cssText = `
				display: flex; flex-direction: column; gap: 2px; padding: 8px 12px;
				background: var(--vscode-activityBar-background);
				border-radius: 8px; text-decoration: none; color: inherit; border: 1px solid var(--vscode-panel-border, rgba(128,128,128,0.2));
			`;
			const title = DOM.append(row, DOM.$('span'));
			title.textContent = doc.title;
			title.style.cssText = 'font-size: 12px; font-weight: 500; color: var(--vscode-foreground);';
			if (doc.summary) {
				const summary = DOM.append(row, DOM.$('span'));
				summary.textContent = doc.summary;
				summary.style.cssText = 'font-size: 11px; color: var(--vscode-descriptionForeground);';
			}
		}
	}).catch(() => {
		createEmptyState(parent, 'Unable to load docs. Documentation will appear here when available.');
	});
}

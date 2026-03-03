/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as DOM from '../../../../../base/browser/dom.js';
import { IVybeResourcesService } from '../../common/vybeResourcesService.js';
import { createEmptyState } from '../vybeResourcesComponents.js';
import { DisposableStore } from '../../../../../base/common/lifecycle.js';

export function renderMessagesTab(
	parent: HTMLElement,
	service: IVybeResourcesService,
	disposables: DisposableStore
): void {
	service.getMessages().then(messages => {
		DOM.clearNode(parent);
		if (messages.length === 0) {
			createEmptyState(parent, 'No messages yet. When you have updates from your team or Vybe, they’ll appear here.');
			return;
		}
		const section = DOM.append(parent, DOM.$('.vybe-resources-messages-list'));
		section.style.cssText = 'display: flex; flex-direction: column; gap: 12px;';
		for (const msg of messages) {
			const card = DOM.append(section, DOM.$('.vybe-resources-message-card'));
			card.style.cssText = `
				padding: 12px;
				background: var(--vscode-activityBar-background);
				border-radius: 8px;
				border: 1px solid var(--vscode-panel-border, rgba(128,128,128,0.2));
			`;
			const title = DOM.append(card, DOM.$('div'));
			title.textContent = msg.title;
			title.style.cssText = 'font-size: 12px; font-weight: 500; color: var(--vscode-foreground); margin-bottom: 4px;';
			const body = DOM.append(card, DOM.$('div'));
			body.textContent = msg.body;
			body.style.cssText = 'font-size: 11px; color: var(--vscode-descriptionForeground);';
		}
	}).catch(() => {
		createEmptyState(parent, 'Unable to load messages. They will come from your team or Vybe when available.');
	});
}

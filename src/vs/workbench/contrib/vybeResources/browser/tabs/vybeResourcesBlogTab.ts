/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as DOM from '../../../../../base/browser/dom.js';
import { IVybeResourcesService } from '../../common/vybeResourcesService.js';
import { createEmptyState } from '../vybeResourcesComponents.js';

export function renderBlogTab(parent: HTMLElement, service: IVybeResourcesService): void {
	service.getBlogPosts().then(posts => {
		DOM.clearNode(parent);
		if (posts.length === 0) {
			createEmptyState(parent, 'No blog posts yet. Updates will appear here when available.');
			return;
		}
		const section = DOM.append(parent, DOM.$('.vybe-resources-blog-list'));
		section.style.cssText = 'display: flex; flex-direction: column; gap: 12px;';
		for (const post of posts) {
			const card = DOM.append(section, DOM.$('a.vybe-resources-blog-card'));
			card.setAttribute('href', post.url || '#');
			if (post.url) {
				card.setAttribute('target', '_blank');
				card.setAttribute('rel', 'noopener noreferrer');
			}
			card.style.cssText = `
				display: flex; flex-direction: column; gap: 4px; padding: 12px;
				background: var(--vscode-activityBar-background);
				border-radius: 8px; text-decoration: none; color: inherit; border: 1px solid var(--vscode-panel-border, rgba(128,128,128,0.2));
			`;
			const title = DOM.append(card, DOM.$('div'));
			title.textContent = post.title;
			title.style.cssText = 'font-size: 12px; font-weight: 500; color: var(--vscode-foreground);';
			const summary = DOM.append(card, DOM.$('div'));
			summary.textContent = post.summary;
			summary.style.cssText = 'font-size: 11px; color: var(--vscode-descriptionForeground);';
			const date = DOM.append(card, DOM.$('div'));
			date.textContent = post.publishedAt;
			date.style.cssText = 'font-size: 10px; color: var(--vscode-descriptionForeground); opacity: 0.8;';
		}
	}).catch(() => {
		createEmptyState(parent, 'Unable to load blog posts. Updates will appear here when available.');
	});
}

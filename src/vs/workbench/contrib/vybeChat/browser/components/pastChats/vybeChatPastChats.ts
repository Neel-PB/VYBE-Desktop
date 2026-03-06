/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { $, append, clearNode, addDisposableListener } from '../../../../../../base/browser/dom.js';
import { Disposable } from '../../../../../../base/common/lifecycle.js';
import { Codicon } from '../../../../../../base/common/codicons.js';
import { ThemeIcon } from '../../../../../../base/common/themables.js';
import { ICommandService } from '../../../../../../platform/commands/common/commands.js';
import { IViewsService } from '../../../../../services/views/common/viewsService.js';
import { IVybeChatConversationIndexService } from '../../../common/vybeChatConversationIndex.js';
import { getVybeChatViewId, getVybeChatViewContainerId, VYBE_CHAT_NEW_CHAT_LABEL } from '../../../common/vybeChatConstants.js';
import { CHAT_PAST_MAX_ITEMS } from '../../vybeChatDesignTokens.js';

interface PastChatItem {
	sessionId: string;
	title: string;
	timestamp: number;
}

/**
 * Renders the inline "Past Chats" section at the bottom of the empty chat state.
 * Shows the most recent N conversations from the conversation index.
 * Clicking an item navigates to that session. "View All" opens the history dropdown.
 */
export class VybeChatPastChats extends Disposable {

	readonly domNode: HTMLElement;
	private listContainer!: HTMLElement;
	private chevron!: HTMLElement;
	private viewAll!: HTMLElement;
	private isCollapsed: boolean = false;

	constructor(
		parent: HTMLElement,
		private readonly conversationIndex: IVybeChatConversationIndexService,
		private readonly commandService: ICommandService,
		private readonly viewsService: IViewsService,
	) {
		super();
		this.domNode = append(parent, $('.vybe-chat-past-section'));
		this.build();
		this.refresh();
	}

	private build(): void {
		const content = append(this.domNode, $('.vybe-chat-past-content'));

		const header = append(content, $('.vybe-chat-past-header'));

		const left = append(header, $('.vybe-chat-past-header-left'));
		const label = append(left, $('span.vybe-chat-past-label'));
		label.textContent = 'Past Chats';
		this.chevron = append(left, $('span'));
		this.chevron.classList.add(...ThemeIcon.asClassNameArray(Codicon.chevronDown));
		this.chevron.style.transition = 'transform 0.15s ease';

		this._register(addDisposableListener(left, 'click', () => {
			this.toggleCollapse();
		}));

		this.viewAll = append(header, $('a.vybe-chat-past-view-all'));
		const viewAll = this.viewAll;
		viewAll.textContent = 'View All';
		viewAll.setAttribute('href', '#');
		this._register(addDisposableListener(viewAll, 'click', (e) => {
			e.preventDefault();
			this.commandService.executeCommand('vybeChat.showHistory');
		}));

		this.listContainer = append(content, $('.vybe-chat-past-list'));
	}

	private toggleCollapse(): void {
		this.isCollapsed = !this.isCollapsed;
		this.chevron.style.transform = this.isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)';
		this.listContainer.style.display = this.isCollapsed ? 'none' : '';
		this.viewAll.style.display = this.isCollapsed ? 'none' : '';
	}

	refresh(): void {
		clearNode(this.listContainer);

		const index = this.conversationIndex.getIndex();
		const items: PastChatItem[] = [];

		for (const [sessionId, entry] of Object.entries(index)) {
			items.push({
				sessionId,
				title: entry.title,
				timestamp: entry.lastUsed,
			});
		}

		items.sort((a, b) => b.timestamp - a.timestamp);
		const visible = items.slice(0, CHAT_PAST_MAX_ITEMS);

		if (visible.length === 0) {
			this.domNode.style.display = 'none';
			return;
		}

		this.domNode.style.display = '';

		for (const item of visible) {
			this.renderItem(item);
		}
	}

	private renderItem(item: PastChatItem): void {
		const row = append(this.listContainer, $('.vybe-chat-past-item'));
		row.setAttribute('tabindex', '0');

		const title = append(row, $('.vybe-chat-past-item-title'));
		title.textContent = item.title || VYBE_CHAT_NEW_CHAT_LABEL;

		const time = append(row, $('.vybe-chat-past-item-time'));
		time.textContent = this.formatRelativeTime(item.timestamp);

		this._register(addDisposableListener(row, 'click', () => {
			this.navigateToSession(item.sessionId);
		}));

		this._register(addDisposableListener(row, 'keydown', (e) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				this.navigateToSession(item.sessionId);
			}
		}));
	}

	private async navigateToSession(sessionId: string): Promise<void> {
		const viewId = getVybeChatViewId(sessionId);
		const containerId = getVybeChatViewContainerId(sessionId);
		await this.viewsService.openViewContainer(containerId, true);
		await this.viewsService.openView(viewId, true);
		this.conversationIndex.updateLastUsed(sessionId);
		this.conversationIndex.setCurrentSessionId(sessionId);
	}

	private formatRelativeTime(timestamp: number): string {
		const now = Date.now();
		const diffMs = now - timestamp;
		const diffMins = Math.floor(diffMs / (1000 * 60));
		const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
		const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

		if (diffMins < 1) { return 'Now'; }
		if (diffMins < 60) { return `${diffMins}m`; }
		if (diffHours < 24) { return `${diffHours}h`; }
		if (diffDays < 7) { return `${diffDays}d`; }
		if (diffDays < 30) { return `${Math.floor(diffDays / 7)}w`; }
		if (diffDays < 365) { return `${Math.floor(diffDays / 30)}mo`; }
		return `${Math.floor(diffDays / 365)}yr`;
	}
}

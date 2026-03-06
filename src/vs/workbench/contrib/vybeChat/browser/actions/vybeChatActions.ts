/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { localize2 } from '../../../../../nls.js';
import { Action2, MenuId, registerAction2 } from '../../../../../platform/actions/common/actions.js';
import { ServicesAccessor } from '../../../../../platform/instantiation/common/instantiation.js';
import { Codicon } from '../../../../../base/common/codicons.js';
import { ContextKeyExpr } from '../../../../../platform/contextkey/common/contextkey.js';
import { IViewsService } from '../../../../services/views/common/viewsService.js';
import { ICommandService } from '../../../../../platform/commands/common/commands.js';
import { IThemeService } from '../../../../../platform/theme/common/themeService.js';
import { IVybeChatSessionsService } from '../../common/vybeChatSessionsService.js';
import { IVybeChatConversationIndexService } from '../../common/vybeChatConversationIndex.js';
import { getSessionIdFromViewId, getVybeChatViewId, getVybeChatViewContainerId, VYBE_CHAT_DEFAULT_SESSION_ID, VYBE_CHAT_NEW_CHAT_LABEL } from '../../common/vybeChatConstants.js';
import { HistoryDropdown, type ChatHistoryItem, type IHistoryDropdownCallbacks } from '../components/titlebar/historyDropdown.js';

const VYBE_CHAT_VIEW_REGEX = /^workbench\.panel\.vybeChat\.view\.chat\./;

// Module-level state for the singleton history dropdown
let activeHistoryDropdown: HistoryDropdown | null = null;

// --- New Chat ---------------------------------------------------------------

registerAction2(class NewVybeChatAction extends Action2 {
	constructor() {
		super({
			id: 'vybeChat.newChat',
			title: localize2('vybeChat.newChat', "New Chat"),
			icon: Codicon.add,
			f1: false,
			menu: {
				id: MenuId.ViewTitle,
				group: 'navigation',
				order: 1,
				when: ContextKeyExpr.regex('view', VYBE_CHAT_VIEW_REGEX),
			},
		});
	}

	async run(accessor: ServicesAccessor): Promise<void> {
		const sessionsService = accessor.get(IVybeChatSessionsService);
		const viewsService = accessor.get(IViewsService);
		const conversationIndex = accessor.get(IVybeChatConversationIndexService);
		const sessionId = await sessionsService.createSession();
		conversationIndex.setEntry(sessionId, { title: VYBE_CHAT_NEW_CHAT_LABEL, lastUsed: Date.now() });
		const viewId = getVybeChatViewId(sessionId);
		await viewsService.openView(viewId, true);
	}
});

// --- Close Chat -------------------------------------------------------------

registerAction2(class CloseVybeChatAction extends Action2 {
	constructor() {
		super({
			id: 'vybeChat.closeChat',
			title: localize2('vybeChat.closeChat', "Close Chat"),
			icon: Codicon.close,
			f1: false,
		});
	}

	async run(accessor: ServicesAccessor, viewIdOrSessionId?: string): Promise<void> {
		if (!viewIdOrSessionId) {
			return;
		}
		const sessionId = getSessionIdFromViewId(viewIdOrSessionId) ?? viewIdOrSessionId;
		const sessionsService = accessor.get(IVybeChatSessionsService);
		const conversationIndex = accessor.get(IVybeChatConversationIndexService);
		await sessionsService.closeSession(sessionId);
		if (sessionId !== VYBE_CHAT_DEFAULT_SESSION_ID) {
			await conversationIndex.removeEntry(sessionId);
		}
	}
});

// --- History Dropdown -------------------------------------------------------

registerAction2(class ShowVybeChatHistoryAction extends Action2 {
	constructor() {
		super({
			id: 'vybeChat.showHistory',
			title: localize2('vybeChat.showHistory', "Chat History"),
			icon: Codicon.history,
			f1: false,
			menu: {
				id: MenuId.ViewTitle,
				group: 'navigation',
				order: 2,
				when: ContextKeyExpr.regex('view', VYBE_CHAT_VIEW_REGEX),
			},
		});
	}

	async run(accessor: ServicesAccessor): Promise<void> {
		const themeService = accessor.get(IThemeService);
		const sessionsService = accessor.get(IVybeChatSessionsService);
		const conversationIndex = accessor.get(IVybeChatConversationIndexService);
		const viewsService = accessor.get(IViewsService);

		// Toggle: if already visible, close
		if (activeHistoryDropdown && activeHistoryDropdown.isVisible) {
			activeHistoryDropdown.hide();
			activeHistoryDropdown.dispose();
			activeHistoryDropdown = null;
			return;
		}

		// Find the history button in the auxiliary bar's title actions
		const anchor = this.findHistoryButtonAnchor();
		if (!anchor) {
			return;
		}

		// Wait for conversation index to be ready
		await conversationIndex.whenReady();

		// Build history items from conversation index + sessions service
		const items = this.buildHistoryItems(conversationIndex, sessionsService, viewsService);

		// Create dropdown
		if (activeHistoryDropdown) {
			activeHistoryDropdown.dispose();
		}
		activeHistoryDropdown = new HistoryDropdown(anchor, themeService);

		const callbacks: IHistoryDropdownCallbacks = {
			onSelect: async (sessionId) => {
				const viewId = getVybeChatViewId(sessionId);
				const containerId = getVybeChatViewContainerId(sessionId);
				await viewsService.openViewContainer(containerId, true);
				await viewsService.openView(viewId, true);
				conversationIndex.updateLastUsed(sessionId);
				conversationIndex.setCurrentSessionId(sessionId);
				activeHistoryDropdown?.hide();
				activeHistoryDropdown?.dispose();
				activeHistoryDropdown = null;
			},
			onRename: async (event) => {
				conversationIndex.updateTitle(event.id, event.newTitle);
				await sessionsService.renameSession(event.id, event.newTitle);
			},
			onDelete: async (sessionId) => {
				await sessionsService.closeSession(sessionId);
				await conversationIndex.removeEntry(sessionId);
			},
		};

		activeHistoryDropdown.show(items, callbacks);
	}

	private findHistoryButtonAnchor(): HTMLElement | null {
		// eslint-disable-next-line no-restricted-syntax
		const auxBar = document.querySelector('.part.auxiliarybar');
		if (!auxBar) {
			return null;
		}

		// eslint-disable-next-line no-restricted-syntax
		const historyButtons = auxBar.querySelectorAll('.codicon-history');
		for (const btn of historyButtons) {
			const actionItem = btn.closest('.action-item');
			if (actionItem) {
				return actionItem as HTMLElement;
			}
		}

		return null;
	}

	private buildHistoryItems(
		conversationIndex: IVybeChatConversationIndexService,
		sessionsService: IVybeChatSessionsService,
		viewsService: IViewsService,
	): ChatHistoryItem[] {
		const index = conversationIndex.getIndex();
		const activeSessionIds = sessionsService.getAllSessionIds();
		const currentSessionId = conversationIndex.getCurrentSessionId();

		// Determine which session is currently active
		let focusedSessionId: string | undefined = currentSessionId;
		if (!focusedSessionId) {
			// eslint-disable-next-line local/code-no-any-casts, @typescript-eslint/no-explicit-any
			const activeView = viewsService.getActiveViewWithId(undefined as any);
			if (activeView) {
				focusedSessionId = getSessionIdFromViewId(activeView.id) ?? undefined;
			}
		}

		const items: ChatHistoryItem[] = [];

		// Add entries from the conversation index (includes persisted history)
		for (const [sessionId, entry] of Object.entries(index)) {
			items.push({
				id: sessionId,
				title: entry.title,
				timestamp: new Date(entry.lastUsed),
				isCurrent: sessionId === focusedSessionId,
			});
		}

		// Add active sessions not yet in the index
		for (const sessionId of activeSessionIds) {
			if (!index[sessionId]) {
				items.push({
					id: sessionId,
					title: VYBE_CHAT_NEW_CHAT_LABEL,
					timestamp: new Date(),
					isCurrent: sessionId === focusedSessionId,
				});
			}
		}

		// Sort: most recently used first
		items.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

		return items;
	}
});

// --- Settings ---------------------------------------------------------------

registerAction2(class VybeChatSettingsAction extends Action2 {
	constructor() {
		super({
			id: 'vybeChat.settings',
			title: localize2('vybeChat.settings', "Settings"),
			icon: Codicon.ellipsis,
			f1: false,
			menu: {
				id: MenuId.ViewTitle,
				group: 'navigation',
				order: 3,
				when: ContextKeyExpr.regex('view', VYBE_CHAT_VIEW_REGEX),
			},
		});
	}

	async run(accessor: ServicesAccessor): Promise<void> {
		const commandService = accessor.get(ICommandService);
		await commandService.executeCommand('vybe.openSettingsEditor');
	}
});

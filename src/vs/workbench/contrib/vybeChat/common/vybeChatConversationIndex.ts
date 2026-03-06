/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { createDecorator } from '../../../../platform/instantiation/common/instantiation.js';

export const VYBE_CHAT_CONVERSATION_INDEX_KEY = 'vybe.chat.conversationIndex';
export const VYBE_CHAT_CURRENT_SESSION_ID_KEY = 'vybe.chat.currentSessionId';

export interface VybeConversationEntry {
	title: string;
	lastUsed: number;
	threadId?: string;
}

export type VybeConversationIndex = Record<string, VybeConversationEntry>;

export const IVybeChatConversationIndexService = createDecorator<IVybeChatConversationIndexService>('vybeChatConversationIndexService');

export interface IVybeChatConversationIndexService {
	readonly _serviceBrand: undefined;

	whenReady(): Promise<void>;
	refreshFromStorage(): Promise<void>;
	getIndex(): VybeConversationIndex;
	setEntry(sessionId: string, entry: Partial<VybeConversationEntry>): void;
	updateTitle(sessionId: string, title: string): void;
	updateLastUsed(sessionId: string): void;
	removeEntry(sessionId: string): Promise<void>;
	getCurrentSessionId(): string | undefined;
	setCurrentSessionId(sessionId: string): void;
}

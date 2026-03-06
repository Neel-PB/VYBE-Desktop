/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Disposable } from '../../../../../base/common/lifecycle.js';
import { registerSingleton, InstantiationType } from '../../../../../platform/instantiation/common/extensions.js';
import { IStorageService, StorageScope, StorageTarget } from '../../../../../platform/storage/common/storage.js';
import {
	IVybeChatConversationIndexService,
	type VybeConversationEntry,
	type VybeConversationIndex,
	VYBE_CHAT_CONVERSATION_INDEX_KEY,
	VYBE_CHAT_CURRENT_SESSION_ID_KEY,
} from '../../common/vybeChatConversationIndex.js';
import { VYBE_CHAT_NEW_CHAT_LABEL } from '../../common/vybeChatConstants.js';

class VybeChatConversationIndexService extends Disposable implements IVybeChatConversationIndexService {

	declare readonly _serviceBrand: undefined;

	private cachedIndex: VybeConversationIndex = {};
	private cachedCurrentSessionId: string | undefined;
	private initialized = false;
	private readonly _whenReady: Promise<void>;

	constructor(
		@IStorageService private readonly storageService: IStorageService,
	) {
		super();
		this._whenReady = this.initializeCache();
	}

	whenReady(): Promise<void> {
		return this._whenReady;
	}

	async refreshFromStorage(): Promise<void> {
		this.loadFromStorage();
	}

	private async initializeCache(): Promise<void> {
		if (this.initialized) {
			return;
		}
		this.loadFromStorage();
		this.initialized = true;
	}

	private loadFromStorage(): void {
		const raw = this.storageService.get(VYBE_CHAT_CONVERSATION_INDEX_KEY, StorageScope.WORKSPACE);
		if (raw) {
			try {
				this.cachedIndex = JSON.parse(raw);
			} catch {
				this.cachedIndex = {};
			}
		} else {
			this.cachedIndex = {};
		}
		this.cachedCurrentSessionId = this.storageService.get(
			VYBE_CHAT_CURRENT_SESSION_ID_KEY,
			StorageScope.WORKSPACE
		) || undefined;
	}

	private flushIndex(): void {
		this.storageService.store(
			VYBE_CHAT_CONVERSATION_INDEX_KEY,
			JSON.stringify(this.cachedIndex),
			StorageScope.WORKSPACE,
			StorageTarget.MACHINE
		);
	}

	getIndex(): VybeConversationIndex {
		return { ...this.cachedIndex };
	}

	setEntry(sessionId: string, entry: Partial<VybeConversationEntry>): void {
		const existing = this.cachedIndex[sessionId] ?? { title: VYBE_CHAT_NEW_CHAT_LABEL, lastUsed: 0 };
		this.cachedIndex[sessionId] = {
			title: entry.title ?? existing.title,
			lastUsed: entry.lastUsed ?? existing.lastUsed ?? Date.now(),
			threadId: entry.threadId ?? existing.threadId,
		};
		this.flushIndex();
	}

	updateTitle(sessionId: string, title: string): void {
		const existing = this.cachedIndex[sessionId] ?? { title: VYBE_CHAT_NEW_CHAT_LABEL, lastUsed: Date.now() };
		this.cachedIndex[sessionId] = { ...existing, title };
		this.flushIndex();
	}

	updateLastUsed(sessionId: string): void {
		const existing = this.cachedIndex[sessionId] ?? { title: VYBE_CHAT_NEW_CHAT_LABEL, lastUsed: 0 };
		this.cachedIndex[sessionId] = { ...existing, lastUsed: Date.now() };
		this.flushIndex();
	}

	async removeEntry(sessionId: string): Promise<void> {
		delete this.cachedIndex[sessionId];
		this.flushIndex();
	}

	getCurrentSessionId(): string | undefined {
		return this.cachedCurrentSessionId;
	}

	setCurrentSessionId(sessionId: string): void {
		this.cachedCurrentSessionId = sessionId;
		this.storageService.store(
			VYBE_CHAT_CURRENT_SESSION_ID_KEY,
			sessionId,
			StorageScope.WORKSPACE,
			StorageTarget.MACHINE
		);
	}
}

registerSingleton(IVybeChatConversationIndexService, VybeChatConversationIndexService, InstantiationType.Delayed);

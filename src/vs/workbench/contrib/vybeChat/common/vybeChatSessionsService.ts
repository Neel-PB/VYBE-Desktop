/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { createDecorator } from '../../../../platform/instantiation/common/instantiation.js';
import type { Event } from '../../../../base/common/event.js';

export const IVybeChatSessionsService = createDecorator<IVybeChatSessionsService>('vybeChatSessionsService');

export interface IVybeChatSessionsService {
	readonly _serviceBrand: undefined;

	readonly onDidResetSession: Event<string>;

	createSession(): Promise<string>;
	createDefaultSession(): Promise<string>;
	closeSession(sessionId: string): Promise<void>;
	renameSession(sessionId: string, newName: string): Promise<void>;
	updateSessionTitle(sessionId: string, title: string): Promise<void>;
	getAllSessionIds(): string[];
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

export const VYBE_CHAT_VIEW_CONTAINER_ID_PREFIX = 'workbench.panel.vybeChat';
export const VYBE_CHAT_VIEW_ID_PREFIX = 'workbench.panel.vybeChat.view.chat';
export const VYBE_CHAT_DEFAULT_SESSION_ID = 'default-new-chat';
export const VYBE_CHAT_NEW_CHAT_LABEL = 'New Chat';

export function getVybeChatViewContainerId(sessionId: string): string {
	return `${VYBE_CHAT_VIEW_CONTAINER_ID_PREFIX}.${sessionId}`;
}

export function getVybeChatViewId(sessionId: string): string {
	return `${VYBE_CHAT_VIEW_ID_PREFIX}.${sessionId}`;
}

export function getSessionIdFromViewContainerId(containerId: string): string | undefined {
	const prefix = VYBE_CHAT_VIEW_CONTAINER_ID_PREFIX + '.';
	if (containerId.startsWith(prefix)) {
		return containerId.substring(prefix.length);
	}
	return undefined;
}

export function getSessionIdFromViewId(viewId: string): string | undefined {
	const prefix = VYBE_CHAT_VIEW_ID_PREFIX + '.';
	if (viewId.startsWith(prefix)) {
		return viewId.substring(prefix.length);
	}
	return undefined;
}

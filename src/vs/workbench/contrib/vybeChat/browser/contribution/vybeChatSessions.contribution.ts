/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { localize2 } from '../../../../../nls.js';
import { IViewDescriptor, IViewsRegistry, Extensions as ViewExtensions, IViewDescriptorService, IViewContainersRegistry, ViewContainer, ViewContainerLocation } from '../../../../common/views.js';
import { Registry } from '../../../../../platform/registry/common/platform.js';
import { SyncDescriptor } from '../../../../../platform/instantiation/common/descriptors.js';
import { Disposable } from '../../../../../base/common/lifecycle.js';
import { Emitter } from '../../../../../base/common/event.js';
import { getVybeChatViewId, VYBE_CHAT_NEW_CHAT_LABEL, VYBE_CHAT_DEFAULT_SESSION_ID, getVybeChatViewContainerId } from '../../common/vybeChatConstants.js';
import { VybeChatViewPane } from '../vybeChatViewPane.js';
import { getVybeChatIconUri } from '../../common/vybeChatIcon.js';
import { ViewPaneContainer } from '../../../../browser/parts/views/viewPaneContainer.js';
import { DEFAULT_VYBE_CHAT_VIEW_CONTAINER } from './vybeChatParticipant.contribution.js';
import { IVybeChatSessionsService } from '../../common/vybeChatSessionsService.js';
import { registerSingleton, InstantiationType } from '../../../../../platform/instantiation/common/extensions.js';

class VybeChatSessionsService extends Disposable implements IVybeChatSessionsService {

	declare readonly _serviceBrand: undefined;

	private sessionCounter = 0;
	private readonly registeredContainers = new Map<string, ViewContainer>();

	private readonly _onDidResetSession = this._register(new Emitter<string>());
	readonly onDidResetSession = this._onDidResetSession.event;

	constructor(
		@IViewDescriptorService private readonly viewDescriptorService: IViewDescriptorService,
	) {
		super();
		this.registeredContainers.set(VYBE_CHAT_DEFAULT_SESSION_ID, DEFAULT_VYBE_CHAT_VIEW_CONTAINER);
	}

	async createSession(): Promise<string> {
		const sessionId = `session-${Date.now()}-${++this.sessionCounter}`;
		return this.createSessionWithId(sessionId);
	}

	async createDefaultSession(): Promise<string> {
		if (this.registeredContainers.has(VYBE_CHAT_DEFAULT_SESSION_ID)) {
			return VYBE_CHAT_DEFAULT_SESSION_ID;
		}
		this.registeredContainers.set(VYBE_CHAT_DEFAULT_SESSION_ID, DEFAULT_VYBE_CHAT_VIEW_CONTAINER);
		return VYBE_CHAT_DEFAULT_SESSION_ID;
	}

	private async createSessionWithId(sessionId: string): Promise<string> {
		if (this.registeredContainers.has(sessionId)) {
			return sessionId;
		}
		if (sessionId === VYBE_CHAT_DEFAULT_SESSION_ID) {
			return this.createDefaultSession();
		}

		const containerId = getVybeChatViewContainerId(sessionId);
		const viewId = getVybeChatViewId(sessionId);

		const viewContainer = Registry.as<IViewContainersRegistry>(ViewExtensions.ViewContainersRegistry).registerViewContainer({
			id: containerId,
			title: localize2('vybeChat.newChat', 'New Chat'),
			icon: getVybeChatIconUri(),
			ctorDescriptor: new SyncDescriptor(ViewPaneContainer, [containerId, { mergeViewWithContainerWhenSingleView: true }]),
			storageId: containerId,
			hideIfEmpty: false,
			order: 1,
		}, ViewContainerLocation.AuxiliaryBar, { doNotRegisterOpenCommand: true });

		const viewDescriptor: IViewDescriptor = {
			id: viewId,
			name: localize2('vybeChat.newChat', 'New Chat'),
			containerIcon: getVybeChatIconUri(),
			containerTitle: VYBE_CHAT_NEW_CHAT_LABEL,
			singleViewPaneContainerTitle: VYBE_CHAT_NEW_CHAT_LABEL,
			ctorDescriptor: new SyncDescriptor(VybeChatViewPane),
			canToggleVisibility: false,
			canMoveView: false,
		};

		Registry.as<IViewsRegistry>(ViewExtensions.ViewsRegistry).registerViews([viewDescriptor], viewContainer);
		this.registeredContainers.set(sessionId, viewContainer);

		return sessionId;
	}

	async closeSession(sessionId: string): Promise<void> {
		const allIds = this.getAllSessionIds();
		const isOnlyTab = allIds.length === 1;

		if (sessionId === VYBE_CHAT_DEFAULT_SESSION_ID && isOnlyTab) {
			this.resetDefaultToNewChat();
			return;
		}

		const viewContainer = this.registeredContainers.get(sessionId);
		if (!viewContainer) {
			return;
		}

		if (sessionId === VYBE_CHAT_DEFAULT_SESSION_ID) {
			return;
		}

		const viewId = getVybeChatViewId(sessionId);
		const viewDescriptor = this.viewDescriptorService.getViewDescriptorById(viewId);

		if (viewDescriptor) {
			Registry.as<IViewsRegistry>(ViewExtensions.ViewsRegistry).deregisterViews([viewDescriptor], viewContainer);
		}
		Registry.as<IViewContainersRegistry>(ViewExtensions.ViewContainersRegistry).deregisterViewContainer(viewContainer);
		this.registeredContainers.delete(sessionId);
	}

	private resetDefaultToNewChat(): void {
		this.updateContainerTitle(VYBE_CHAT_DEFAULT_SESSION_ID, VYBE_CHAT_NEW_CHAT_LABEL);
		this._onDidResetSession.fire(VYBE_CHAT_DEFAULT_SESSION_ID);
	}

	async renameSession(sessionId: string, newName: string): Promise<void> {
		this.updateContainerTitle(sessionId, newName);
	}

	async updateSessionTitle(sessionId: string, title: string): Promise<void> {
		this.updateContainerTitle(sessionId, title);
	}

	getAllSessionIds(): string[] {
		return Array.from(this.registeredContainers.keys());
	}

	private updateContainerTitle(sessionId: string, title: string): void {
		const viewContainer = this.registeredContainers.get(sessionId);
		if (!viewContainer) {
			return;
		}
		if (typeof viewContainer.title === 'string') {
			// eslint-disable-next-line local/code-no-any-casts, @typescript-eslint/no-explicit-any
			(viewContainer as any).title = title;
		} else if (viewContainer.title) {
			// eslint-disable-next-line local/code-no-any-casts, @typescript-eslint/no-explicit-any
			(viewContainer.title as any).value = title;
			// eslint-disable-next-line local/code-no-any-casts, @typescript-eslint/no-explicit-any
			(viewContainer.title as any).original = title;
		}
		const viewContainerModel = this.viewDescriptorService.getViewContainerModel(viewContainer);
		// eslint-disable-next-line local/code-no-any-casts, @typescript-eslint/no-explicit-any
		if (viewContainerModel && (viewContainerModel as any).updateContainerInfo) {
			// eslint-disable-next-line local/code-no-any-casts, @typescript-eslint/no-explicit-any
			(viewContainerModel as any).updateContainerInfo();
		}
	}
}

registerSingleton(IVybeChatSessionsService, VybeChatSessionsService, InstantiationType.Delayed);

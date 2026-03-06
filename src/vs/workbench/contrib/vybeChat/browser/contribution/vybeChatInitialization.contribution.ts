/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Disposable } from '../../../../../base/common/lifecycle.js';
import { LifecyclePhase, ILifecycleService } from '../../../../services/lifecycle/common/lifecycle.js';
import { Registry } from '../../../../../platform/registry/common/platform.js';
import { Extensions as WorkbenchExtensions, IWorkbenchContribution, IWorkbenchContributionsRegistry } from '../../../../common/contributions.js';
import { ICommandService } from '../../../../../platform/commands/common/commands.js';
import { IVybeChatSessionsService } from '../../common/vybeChatSessionsService.js';
import { IVybeChatConversationIndexService } from '../../common/vybeChatConversationIndex.js';
import { IViewsService } from '../../../../services/views/common/viewsService.js';
import { VYBE_CHAT_DEFAULT_SESSION_ID, getVybeChatViewId, getVybeChatViewContainerId } from '../../common/vybeChatConstants.js';
import { setHistoryCommandRunner } from '../vybeChatHistoryCommandRunner.js';

class VybeChatInitializationContribution extends Disposable implements IWorkbenchContribution {
	static readonly ID = 'workbench.contrib.vybeChatInitialization';

	constructor(
		@ICommandService commandService: ICommandService,
		@IVybeChatSessionsService private readonly vybeChatSessionsService: IVybeChatSessionsService,
		@IVybeChatConversationIndexService private readonly conversationIndex: IVybeChatConversationIndexService,
		@IViewsService private readonly viewsService: IViewsService,
		@ILifecycleService private readonly lifecycleService: ILifecycleService,
	) {
		super();

		setHistoryCommandRunner(() => commandService.executeCommand('vybeChat.showHistory'));

		this.lifecycleService.when(LifecyclePhase.Restored).then(() => {
			this.initializeDefaultChat();
		});
	}

	private async initializeDefaultChat(): Promise<void> {
		const defaultViewId = getVybeChatViewId(VYBE_CHAT_DEFAULT_SESSION_ID);
		const defaultContainerId = getVybeChatViewContainerId(VYBE_CHAT_DEFAULT_SESSION_ID);
		const existingView = this.viewsService.getViewWithId(defaultViewId);

		if (!existingView) {
			await this.vybeChatSessionsService.createDefaultSession();
			await this.viewsService.openViewContainer(defaultContainerId, true);
			await this.viewsService.openView(defaultViewId, true);
		}

		const currentSessionId = this.conversationIndex.getCurrentSessionId();
		if (currentSessionId && currentSessionId !== VYBE_CHAT_DEFAULT_SESSION_ID) {
			const viewId = getVybeChatViewId(currentSessionId);
			const existing = this.viewsService.getViewWithId(viewId);
			if (existing) {
				await this.viewsService.openView(viewId, true);
			}
		}
	}
}

Registry.as<IWorkbenchContributionsRegistry>(WorkbenchExtensions.Workbench).registerWorkbenchContribution(
	VybeChatInitializationContribution,
	LifecyclePhase.Restored
);

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// VYBE: Terminal contribution — registers all VYBE terminal contributions.
// Also registers a stub ITerminalChatService since the native terminal chat
// contribution is disabled but terminalTabbedView still depends on the service.

import { registerTerminalContribution } from '../../terminal/browser/terminalExtensions.js';
import { registerActiveXtermAction } from '../../terminal/browser/terminalActions.js';
import { TerminalContextKeys } from '../../terminal/common/terminalContextKey.js';
import { ContextKeyExpr } from '../../../../platform/contextkey/common/contextkey.js';
import { KeyCode, KeyMod } from '../../../../base/common/keyCodes.js';
import { KeybindingWeight } from '../../../../platform/keybinding/common/keybindingsRegistry.js';
import { localize2 } from '../../../../nls.js';
import { ITerminalChatService, isDetachedTerminalInstance, type ITerminalInstance, type IChatTerminalToolProgressPart } from '../../terminal/browser/terminal.js';
import { InstantiationType, registerSingleton } from '../../../../platform/instantiation/common/extensions.js';
import { Emitter } from '../../../../base/common/event.js';
import { Disposable, type IDisposable } from '../../../../base/common/lifecycle.js';
import type { URI } from '../../../../base/common/uri.js';

// VYBE: Stub ITerminalChatService — no-op implementation for dependency satisfaction
class VybeStubTerminalChatService extends Disposable implements ITerminalChatService {
	declare readonly _serviceBrand: undefined;
	private readonly _onDidRegister = this._register(new Emitter<ITerminalInstance>());
	readonly onDidRegisterTerminalInstanceWithToolSession = this._onDidRegister.event;
	private readonly _onDidContinueInBackground = this._register(new Emitter<string>());
	readonly onDidContinueInBackground = this._onDidContinueInBackground.event;
	registerTerminalInstanceWithToolSession(): void { }
	async getTerminalInstanceByToolSessionId(): Promise<ITerminalInstance | undefined> { return undefined; }
	getToolSessionTerminalInstances(): readonly ITerminalInstance[] { return []; }
	getToolSessionIdForInstance(): string | undefined { return undefined; }
	registerTerminalInstanceWithChatSession(): void { }
	getChatSessionResourceForInstance(): URI | undefined { return undefined; }
	isBackgroundTerminal(): boolean { return false; }
	registerProgressPart(): IDisposable { return Disposable.None; }
	setFocusedProgressPart(): void { }
	clearFocusedProgressPart(): void { }
	getFocusedProgressPart(): IChatTerminalToolProgressPart | undefined { return undefined; }
	getMostRecentProgressPart(): IChatTerminalToolProgressPart | undefined { return undefined; }
	setChatSessionAutoApproval(): void { }
	hasChatSessionAutoApproval(): boolean { return false; }
	addSessionAutoApproveRule(): void { }
	getSessionAutoApproveRules(): Readonly<Record<string, boolean | { approve: boolean; matchCommandLine?: boolean }>> { return {}; }
	continueInBackground(): void { }
}
registerSingleton(ITerminalChatService, VybeStubTerminalChatService, InstantiationType.Delayed);

// Prompt Bar
import { VybeTerminalPromptBarController } from './promptBar/vybeTerminalPromptBarController.js';

registerTerminalContribution(VybeTerminalPromptBarController.ID, VybeTerminalPromptBarController, false);

registerActiveXtermAction({
	id: 'vybeTerminalPromptBar.expand',
	title: localize2('vybeTerminalPromptBar.expand', 'Open Terminal Composer'),
	category: localize2('terminalCategory', 'Terminal'),
	keybinding: {
		primary: KeyMod.CtrlCmd | KeyCode.KeyI,
		when: ContextKeyExpr.and(TerminalContextKeys.focusInAny),
		weight: KeybindingWeight.ExternalExtension + 10,
	},
	f1: true,
	run: (_xterm, _accessor, instance) => {
		if (isDetachedTerminalInstance(instance)) { return; }
		const ctrl = VybeTerminalPromptBarController.get(instance);
		ctrl?.show();
	},
});

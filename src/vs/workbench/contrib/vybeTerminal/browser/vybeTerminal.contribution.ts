/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// VYBE: Terminal contribution — registers all VYBE terminal contributions.

import { registerTerminalContribution } from '../../terminal/browser/terminalExtensions.js';
import { registerActiveXtermAction } from '../../terminal/browser/terminalActions.js';
import { TerminalContextKeys } from '../../terminal/common/terminalContextKey.js';
import { ContextKeyExpr } from '../../../../platform/contextkey/common/contextkey.js';
import { KeyCode, KeyMod } from '../../../../base/common/keyCodes.js';
import { KeybindingWeight } from '../../../../platform/keybinding/common/keybindingsRegistry.js';
import { localize2 } from '../../../../nls.js';
import { isDetachedTerminalInstance } from '../../terminal/browser/terminal.js';

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

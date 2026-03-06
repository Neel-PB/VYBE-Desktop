/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// VYBE: Inline composer actions — keybinding for ⌘I to open the inline composer.

import { KeyCode, KeyMod } from '../../../../../base/common/keyCodes.js';
import { ICodeEditor } from '../../../../../editor/browser/editorBrowser.js';
import { EditorAction2 } from '../../../../../editor/browser/editorExtensions.js';
import { EditorContextKeys } from '../../../../../editor/common/editorContextKeys.js';
import { ICodeEditorService } from '../../../../../editor/browser/services/codeEditorService.js';
import { localize2 } from '../../../../../nls.js';
import { ServicesAccessor } from '../../../../../platform/instantiation/common/instantiation.js';
import { KeybindingWeight } from '../../../../../platform/keybinding/common/keybindingsRegistry.js';
import { VybeInlineComposerController } from './vybeInlineComposerController.js';

export const VYBE_INLINE_COMPOSER_ACTION_ID = 'vybeInlineComposer.start';

export class OpenVybeInlineComposerAction extends EditorAction2 {

	constructor() {
		super({
			id: VYBE_INLINE_COMPOSER_ACTION_ID,
			title: localize2('vybeInlineComposer.start', 'Open Inline Composer'),
			f1: true,
			precondition: EditorContextKeys.writable,
			keybinding: {
				when: EditorContextKeys.focus,
				weight: KeybindingWeight.WorkbenchContrib + 10,
				primary: KeyMod.CtrlCmd | KeyCode.KeyI,
			},
		});
	}

	override runEditorCommand(accessor: ServicesAccessor, editor: ICodeEditor): void {
		const codeEditorService = accessor.get(ICodeEditorService);
		const activeEditor = codeEditorService.getActiveCodeEditor() ?? editor;
		if (!activeEditor || activeEditor.isSimpleWidget) {
			return;
		}

		const ctrl = VybeInlineComposerController.get(activeEditor);
		ctrl?.show();
	}
}

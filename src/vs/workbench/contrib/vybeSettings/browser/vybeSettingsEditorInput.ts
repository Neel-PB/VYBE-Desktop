/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { localize } from '../../../../nls.js';
import { EditorInput } from '../../../common/editor/editorInput.js';
import { ThemeIcon } from '../../../../base/common/themables.js';

export class VybeSettingsEditorInput extends EditorInput {
	static readonly ID = 'vybeSettingsEditorInput';

	constructor(private readonly _initialTabId?: string) {
		super();
	}

	override get typeId(): string { return VybeSettingsEditorInput.ID; }
	override get editorId(): string | undefined { return VybeSettingsEditorInput.ID; }
	override get resource(): undefined { return undefined; }
	override getName(): string { return localize('vybeSettings.editorName', "VYBE Settings"); }
	override matches(other: unknown): boolean { return other instanceof VybeSettingsEditorInput && this._initialTabId === (other as VybeSettingsEditorInput)._initialTabId; }
	override isReadonly(): boolean { return true; }
	override isDirty(): boolean { return false; }
	override getIcon(): ThemeIcon | undefined { return ThemeIcon.fromId('settings'); }

	/** When set, the editor will open with this tab selected (e.g. 'models'). */
	getInitialTabId(): string | undefined {
		return this._initialTabId;
	}
}


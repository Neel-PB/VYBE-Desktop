/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { localize } from '../../../../nls.js';
import { EditorInput } from '../../../common/editor/editorInput.js';
import { ThemeIcon } from '../../../../base/common/themables.js';

export type VybeResourcesInitialTab = 'messages' | 'changelog' | 'docs' | 'blog';

export interface IVybeResourcesEditorOptions {
	initialTab?: VybeResourcesInitialTab;
}

export class VybeResourcesEditorInput extends EditorInput {
	static readonly ID = 'vybeResourcesEditorInput';

	override get typeId(): string { return VybeResourcesEditorInput.ID; }
	override get editorId(): string | undefined { return VybeResourcesEditorInput.ID; }
	override get resource(): undefined { return undefined; }
	override getName(): string { return localize('vybeResources.editorName', "Resources"); }
	override matches(other: unknown): boolean { return other instanceof VybeResourcesEditorInput; }
	override isReadonly(): boolean { return true; }
	override isDirty(): boolean { return false; }
	override getIcon(): ThemeIcon | undefined { return ThemeIcon.fromId('book'); }

	constructor(public readonly options: IVybeResourcesEditorOptions = {}) {
		super();
	}
}

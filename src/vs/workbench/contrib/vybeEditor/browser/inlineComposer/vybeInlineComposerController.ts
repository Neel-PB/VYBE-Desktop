/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// VYBE: Inline composer controller — editor contribution that manages the view zone
// and widget lifecycle for the VYBE inline composer.

import { Disposable, DisposableStore } from '../../../../../base/common/lifecycle.js';
import { ICodeEditor } from '../../../../../editor/browser/editorBrowser.js';
import { IEditorContribution } from '../../../../../editor/common/editorCommon.js';
import { IInstantiationService } from '../../../../../platform/instantiation/common/instantiation.js';
import { VybeInlineComposerWidget } from './vybeInlineComposerWidget.js';

export class VybeInlineComposerController extends Disposable implements IEditorContribution {

	static readonly ID = 'editor.contrib.vybeInlineComposer';

	static get(editor: ICodeEditor): VybeInlineComposerController | null {
		return editor.getContribution<VybeInlineComposerController>(VybeInlineComposerController.ID);
	}

	private _widget: VybeInlineComposerWidget | null = null;
	private readonly _sessionStore = this._register(new DisposableStore());
	private _generationTimeout: ReturnType<typeof setTimeout> | null = null;
	private _pendingPrompt: string = '';

	constructor(
		private readonly _editor: ICodeEditor,
		@IInstantiationService private readonly _instantiationService: IInstantiationService,
	) {
		super();
	}

	show(): void {
		if (this._widget) {
			this._widget.focus();
			return;
		}

		const position = this._editor.getPosition();
		if (!position) {
			return;
		}

		const lineNumber = position.lineNumber;

		this._widget = this._sessionStore.add(
			this._instantiationService.createInstance(VybeInlineComposerWidget, this._editor)
		);

		this._sessionStore.add(this._widget.onClose(() => this.hide()));
		this._sessionStore.add(this._widget.onSend((text: string) => {
			this._handleSend(text);
		}));
		this._sessionStore.add(this._widget.onStop(() => {
			this._handleStop();
		}));

		this._widget.showAtLine(lineNumber);
	}

	hide(): void {
		this._clearGenerationTimeout();
		this._sessionStore.clear();
		this._widget = null;
	}

	private _handleSend(text: string): void {
		this._pendingPrompt = text;

		// TODO: Wire to AI backend — for now simulate generation with timeout (4 seconds)
		this._generationTimeout = setTimeout(() => {
			if (this._widget) {
				this._widget.showCompletion(this._pendingPrompt, 'This is a simulated AI response.');
			}
		}, 4000);
	}

	private _handleStop(): void {
		this._clearGenerationTimeout();
	}

	private _clearGenerationTimeout(): void {
		if (this._generationTimeout) {
			clearTimeout(this._generationTimeout);
			this._generationTimeout = null;
		}
	}

	override dispose(): void {
		this._clearGenerationTimeout();
		super.dispose();
	}
}

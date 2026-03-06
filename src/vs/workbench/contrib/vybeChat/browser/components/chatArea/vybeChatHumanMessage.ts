/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { $, append, addDisposableListener, getWindow } from '../../../../../../base/browser/dom.js';
import { Disposable, IDisposable } from '../../../../../../base/common/lifecycle.js';
import { Emitter, Event } from '../../../../../../base/common/event.js';
import { createEditor, LexicalEditor } from '../../../../../../base/common/lexical/lexical.js';
import { MentionNode } from '../composer/lexical/vybeMentionNode.js';
import { applyFileIconClasses } from '../composer/lexical/vybeMentionPlugin.js';
import { VybeChatComposer, type ComposerSendPayload } from '../composer/vybeChatComposer.js';
import { IModelService } from '../../../../../../editor/common/services/model.js';
import { ILanguageService } from '../../../../../../editor/common/languages/language.js';
import { IThemeService } from '../../../../../../platform/theme/common/themeService.js';

export interface HumanMessageOptions {
	editorStateJSON: unknown;
	messageId: string;
	messageIndex: number;
}

export interface HumanMessageServices {
	modelService: IModelService;
	languageService: ILanguageService;
	themeService: IThemeService;
	onOpenSettingsModelsTab?: () => void;
	onOpenSettingsDocsTab?: () => void;
}

/**
 * Human message widget for the conversation view.
 *
 * Readonly mode: displays the sent message in a readonly Lexical editor,
 * sticky at top of its pair container, max-height 72px, click to edit.
 *
 * Edit mode: replaces readonly display with a full VybeChatComposer.
 * On resend, updates state and fires onResend event.
 */
export class VybeChatHumanMessage extends Disposable {

	readonly domNode: HTMLElement;

	private readonly readonlyContainer: HTMLElement;
	private readonly editContainer: HTMLElement;
	private readonly readonlyEditorRoot: HTMLElement;
	private readonlyEditor: LexicalEditor;

	private editComposer: VybeChatComposer | null = null;
	private editSendSub: IDisposable | null = null;
	private clickOutsideSub: IDisposable | null = null;

	private editorStateJSON: unknown;
	private isEditing = false;

	private readonly _onResend = this._register(new Emitter<ComposerSendPayload>());
	readonly onResend: Event<ComposerSendPayload> = this._onResend.event;

	constructor(
		options: HumanMessageOptions,
		private readonly services: HumanMessageServices,
	) {
		super();
		this.editorStateJSON = options.editorStateJSON;

		// --- Build DOM ---

		this.domNode = $('div.vybe-chat-human-message');
		this.domNode.tabIndex = 0;
		this.domNode.setAttribute('data-message-id', options.messageId);
		this.domNode.setAttribute('data-message-index', String(options.messageIndex));
		this.domNode.setAttribute('data-message-role', 'human');

		// Readonly container (visible by default) - mirrors .vybe-composer-input-box
		this.readonlyContainer = append(this.domNode, $('div.vybe-chat-human-readonly'));

		const box = append(this.readonlyContainer, $('div.vybe-chat-human-message-box'));
		const textClip = append(box, $('div.vybe-chat-human-message-text'));

		this.readonlyEditorRoot = append(textClip, $('div.vybe-chat-human-readonly-editor'));
		this.readonlyEditorRoot.setAttribute('contenteditable', 'false');
		this.readonlyEditorRoot.setAttribute('spellcheck', 'false');
		this.readonlyEditorRoot.setAttribute('data-lexical-editor', 'true');

		// Edit container (hidden by default)
		this.editContainer = append(this.domNode, $('div.vybe-chat-human-edit'));
		this.editContainer.style.display = 'none';

		// --- Initialize readonly Lexical editor ---

		this.readonlyEditor = createEditor({
			namespace: 'VybeChatReadonly',
			nodes: [MentionNode],
			editable: false,
			theme: { paragraph: 'vybe-composer-paragraph' },
			onError: (err: Error) => console.error('[VybeChatHumanMessage]', err),
		});

		this.readonlyEditor.setRootElement(this.readonlyEditorRoot);
		this._register({ dispose: () => this.readonlyEditor.setRootElement(null) });

		this.applyReadonlyState();

		// --- Click to edit ---

		this._register(addDisposableListener(this.readonlyContainer, 'click', () => {
			if (!this.isEditing) {
				this.switchToEditMode();
			}
		}));
	}

	private applyReadonlyState(): void {
		if (!this.editorStateJSON) { return; }
		try {
			// eslint-disable-next-line local/code-no-any-casts, @typescript-eslint/no-explicit-any
			const state = this.readonlyEditor.parseEditorState(this.editorStateJSON as any);
			this.readonlyEditor.setEditorState(state);
			applyFileIconClasses(
				this.readonlyEditor,
				this.services.modelService,
				this.services.languageService,
			);
		} catch (e) {
			console.error('[VybeChatHumanMessage] Failed to restore editor state:', e);
		}
	}

	switchToEditMode(): void {
		if (this.isEditing) { return; }
		this.isEditing = true;
		this.domNode.classList.add('editing');

		this.readonlyContainer.style.display = 'none';
		this.editContainer.style.display = '';

		this.editComposer = new VybeChatComposer(
			this.editContainer,
			this.services.themeService,
			this.services.modelService,
			this.services.languageService,
			this.services.onOpenSettingsModelsTab,
			this.services.onOpenSettingsDocsTab,
		);

		this.editComposer.restoreEditorState(this.editorStateJSON);
		this.editComposer.focus();

		this.editSendSub = this.editComposer.onSend((payload) => {
			this.editorStateJSON = payload.editorStateJSON;
			this.switchToReadonlyMode();
			this._onResend.fire(payload);
		});

		// Click outside to collapse back to readonly
		const win = getWindow(this.domNode);
		const onMouseDown = (e: MouseEvent) => {
			if (!this.domNode.contains(e.target as Node)) {
				// Capture current state before collapsing so edits aren't lost
				if (this.editComposer) {
					this.editorStateJSON = this.editComposer.getEditorStateJSON();
				}
				this.switchToReadonlyMode();
			}
		};
		win.document.addEventListener('mousedown', onMouseDown, true);
		this.clickOutsideSub = { dispose: () => win.document.removeEventListener('mousedown', onMouseDown, true) };
	}

	switchToReadonlyMode(): void {
		if (!this.isEditing) { return; }
		this.isEditing = false;
		this.domNode.classList.remove('editing');

		this.clickOutsideSub?.dispose();
		this.clickOutsideSub = null;

		this.editSendSub?.dispose();
		this.editSendSub = null;

		if (this.editComposer) {
			this.editComposer.dispose();
			this.editComposer = null;
		}

		while (this.editContainer.firstChild) {
			this.editContainer.removeChild(this.editContainer.firstChild);
		}

		this.editContainer.style.display = 'none';
		this.readonlyContainer.style.display = '';

		this.applyReadonlyState();
	}

	override dispose(): void {
		this.clickOutsideSub?.dispose();
		this.editSendSub?.dispose();
		this.editComposer?.dispose();
		super.dispose();
	}
}

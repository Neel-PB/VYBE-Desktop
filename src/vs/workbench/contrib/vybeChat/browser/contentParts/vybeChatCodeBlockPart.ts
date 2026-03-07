/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * VYBE Chat Code Block Part
 *
 * Two modes:
 *  1. Plain code block — AI-generated code snippet (no header)
 *  2. Reference code block — cites existing code with file header
 *     (file icon + filename + line range)
 *
 * Both modes use Monaco editor for syntax highlighting, a hover-reveal
 * copy button, and support streaming content updates.
 *
 * The file header is built from the reusable createFileHeader component,
 * which is also used by text-edit and terminal content parts.
 */

import { VybeChatContentPart, IVybeChatCodeBlockContent } from './vybeChatContentPart.js';
import { $, addDisposableListener } from '../../../../../base/browser/dom.js';
import { ICodeEditor } from '../../../../../editor/browser/editorBrowser.js';
import { CodeEditorWidget } from '../../../../../editor/browser/widget/codeEditor/codeEditorWidget.js';
import { IModelService } from '../../../../../editor/common/services/model.js';
import { ILanguageService } from '../../../../../editor/common/languages/language.js';
import { IInstantiationService } from '../../../../../platform/instantiation/common/instantiation.js';
import { IClipboardService } from '../../../../../platform/clipboard/common/clipboardService.js';
import { IEditorService } from '../../../../services/editor/common/editorService.js';
import { IWorkspaceContextService } from '../../../../../platform/workspace/common/workspace.js';
import { URI } from '../../../../../base/common/uri.js';
import * as path from '../../../../../base/common/path.js';
import { getIconClasses } from '../../../../../editor/common/services/getIconClasses.js';
import { FileKind } from '../../../../../platform/files/common/files.js';
import { ShowLightbulbIconMode } from '../../../../../editor/common/config/editorOptions.js';
import { createFileHeader } from '../vybeChatContentPartComponents.js';
import {
	CODEBLOCK_EDITOR_LINE_HEIGHT_PX,
	CODEBLOCK_EDITOR_FONT_SIZE_PX,
	CODEBLOCK_EDITOR_PADDING_V_PX,
	CODEBLOCK_MARGIN_V_PX,
} from '../vybeChatContentPartTokens.js';

import './media/vybeChatCodeBlock.css';

const EDITOR_PADDING = CODEBLOCK_EDITOR_PADDING_V_PX * 2;

export class VybeChatCodeBlockPart extends VybeChatContentPart {
	private _editor: ICodeEditor | null = null;
	private _editorContainer: HTMLElement | null = null;
	private _contentWrap: HTMLElement | null = null;
	private _copyButton: HTMLElement | null = null;
	private _content: IVybeChatCodeBlockContent;
	private _isStreaming: boolean;

	constructor(
		content: IVybeChatCodeBlockContent,
		_codeBlockIndex: number,
		@IInstantiationService private readonly _instantiationService: IInstantiationService,
		@IModelService private readonly _modelService: IModelService,
		@ILanguageService private readonly _languageService: ILanguageService,
		@IClipboardService private readonly _clipboardService: IClipboardService,
		@IEditorService private readonly _editorService: IEditorService,
		@IWorkspaceContextService private readonly _workspaceContextService: IWorkspaceContextService,
	) {
		super('codeBlock');
		this._content = content;
		this._isStreaming = content.isStreaming ?? false;
	}

	// allow-any-unicode-next-line
	// ── DOM creation ──────────────────────────────────────────────────────

	protected createDomNode(): HTMLElement {
		const outer = $('div.vybe-codeblock-outer');

		const block = $('div.vybe-codeblock-container', {
			style: `margin: ${CODEBLOCK_MARGIN_V_PX}px 0;`,
		});

		this._contentWrap = $('div.vybe-codeblock-content');

		const isReference = !!(this._content.filePath && this._content.lineRange);
		if (isReference) {
			block.appendChild(this._buildFileHeader());
		}

		this._editorContainer = $('div.vybe-codeblock-editor');
		this._setEditorHeight(this._content.code);
		this._createEditor(this._editorContainer);

		this._contentWrap.appendChild(this._editorContainer);
		this._contentWrap.appendChild(this._buildCopyOverlay(block));
		block.appendChild(this._contentWrap);

		outer.appendChild(block);
		return outer;
	}

	// allow-any-unicode-next-line
	// ── File header (reference mode only) ─────────────────────────────────

	private _buildFileHeader(): HTMLElement {
		const filePath = this._content.filePath!;
		const fileUri = path.isAbsolute(filePath)
			? URI.file(filePath)
			: this._resolveWorkspaceUri(filePath);

		const iconClasses = getIconClasses(this._modelService, this._languageService, fileUri, FileKind.FILE);
		const filename = this._content.filename || path.basename(filePath);
		const lr = this._content.lineRange!;
		const lineRangeText = `Lines ${lr.start}-${lr.end}`;

		const result = createFileHeader({
			iconClasses: Array.isArray(iconClasses) ? iconClasses : [iconClasses],
			filename,
			lineRange: lineRangeText,
			onFilenameClick: () => this._openFile(),
			onCollapseToggle: (collapsed) => {
				if (this._contentWrap) {
					this._contentWrap.style.display = collapsed ? 'none' : 'block';
				}
			},
		});

		return result.headerElement;
	}

	// allow-any-unicode-next-line
	// ── Monaco editor ─────────────────────────────────────────────────────

	private _createEditor(container: HTMLElement): void {
		const languageId = this._content.language || 'plaintext';
		const initialCode = this._isStreaming ? '' : this._content.code;
		const model = this._modelService.createModel(
			initialCode,
			this._languageService.createById(languageId),
		);

		this._editor = this._instantiationService.createInstance(
			CodeEditorWidget,
			container,
			{
				readOnly: true,
				lineNumbers: 'off',
				minimap: { enabled: false },
				scrollBeyondLastLine: false,
				wordWrap: 'off',
				fontSize: CODEBLOCK_EDITOR_FONT_SIZE_PX,
				fontFamily: 'Menlo, Monaco, "Courier New", monospace',
				lineHeight: CODEBLOCK_EDITOR_LINE_HEIGHT_PX,
				padding: { top: CODEBLOCK_EDITOR_PADDING_V_PX, bottom: CODEBLOCK_EDITOR_PADDING_V_PX },
				overviewRulerLanes: 0,
				scrollbar: {
					vertical: 'hidden',
					horizontal: 'auto',
					verticalScrollbarSize: 0,
					horizontalScrollbarSize: 6,
					alwaysConsumeMouseWheel: false,
				},
				glyphMargin: false,
				folding: false,
				selectOnLineNumbers: false,
				selectionHighlight: false,
				automaticLayout: true,
				renderLineHighlight: 'none',
				contextmenu: false,
				renderWhitespace: 'none',
				domReadOnly: true,
				guides: { indentation: false },
				lightbulb: { enabled: ShowLightbulbIconMode.Off },
			},
			{ isSimpleWidget: true, contributions: [] },
		);

		this._editor.setModel(model);
		this._register(this._editor);
		this._register(model);

		this._register(this._editor.onDidScrollChange((e) => {
			if (e.scrollTopChanged && this._editor) {
				this._editor.setScrollTop(0);
			}
		}));

		setTimeout(() => {
			if (this._editor && container.parentElement) {
				const width = container.parentElement.clientWidth || 507;
				const height = this._calcHeight(this._content.code);
				this._editor.layout({ width, height });
				this._editor.setScrollTop(0);
			}
		}, 0);
	}

	// allow-any-unicode-next-line
	// ── Copy overlay ──────────────────────────────────────────────────────

	private _buildCopyOverlay(blockContainer: HTMLElement): HTMLElement {
		const overlay = $('div.vybe-codeblock-copy-overlay');

		this._copyButton = $('button.vybe-codeblock-copy-btn');
		const icon = $('span.codicon.codicon-copy');
		this._copyButton.appendChild(icon);

		this._register(addDisposableListener(this._copyButton, 'click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			this._copyCode();
		}));

		overlay.appendChild(this._copyButton);

		this._register(addDisposableListener(blockContainer, 'mouseenter', () => {
			overlay.style.display = 'flex';
		}));
		this._register(addDisposableListener(blockContainer, 'mouseleave', () => {
			overlay.style.display = 'none';
		}));

		return overlay;
	}

	// allow-any-unicode-next-line
	// ── Copy action ───────────────────────────────────────────────────────

	private _copyCode(): void {
		this._clipboardService.writeText(this._content.code);
		if (this._copyButton) {
			// eslint-disable-next-line no-restricted-syntax
			const icon = this._copyButton.querySelector('.codicon');
			if (icon) {
				icon.classList.replace('codicon-copy', 'codicon-check');
				setTimeout(() => {
					icon?.classList.replace('codicon-check', 'codicon-copy');
				}, 1000);
			}
		}
	}

	// allow-any-unicode-next-line
	// ── Open file (reference mode) ────────────────────────────────────────

	private async _openFile(): Promise<void> {
		if (!this._content.filePath) {
			return;
		}
		const fileUri = path.isAbsolute(this._content.filePath)
			? URI.file(this._content.filePath)
			: this._resolveWorkspaceUri(this._content.filePath);

		const editorInput: { resource: URI; options?: { selection: { startLineNumber: number; startColumn: number; endLineNumber: number; endColumn: number } } } = {
			resource: fileUri,
		};

		if (this._content.lineRange) {
			const start = Math.max(1, this._content.lineRange.start);
			const end = Math.max(start, this._content.lineRange.end);
			editorInput.options = {
				selection: { startLineNumber: start, startColumn: 1, endLineNumber: end, endColumn: 1 },
			};
		}

		await this._editorService.openEditor(editorInput);
	}

	// allow-any-unicode-next-line
	// ── Streaming update ──────────────────────────────────────────────────

	updateContent(newContent: IVybeChatCodeBlockContent): void {
		if (newContent.kind !== 'codeBlock') {
			return;
		}
		this._content = newContent;
		this._isStreaming = newContent.isStreaming ?? false;

		if (this._editor) {
			const model = this._editor.getModel();
			if (model) {
				model.setValue(this._content.code);
				const height = this._calcHeight(this._content.code);
				this._setEditorHeight(this._content.code);
				if (this._editorContainer?.parentElement) {
					this._editor.layout({ width: this._editorContainer.parentElement.clientWidth, height });
					this._editor.setScrollTop(0);
				}
			}
		}
	}

	// allow-any-unicode-next-line
	// ── Helpers ────────────────────────────────────────────────────────────

	private _calcHeight(code: string): number {
		const lines = code.split('\n').length;
		return lines * CODEBLOCK_EDITOR_LINE_HEIGHT_PX + EDITOR_PADDING;
	}

	private _setEditorHeight(code: string): void {
		if (!this._editorContainer) {
			return;
		}
		const h = this._calcHeight(code);
		this._editorContainer.style.height = `${h}px`;
		this._editorContainer.style.minHeight = `${h}px`;
		this._editorContainer.style.maxHeight = `${h}px`;
	}

	private _resolveWorkspaceUri(relativePath: string): URI {
		const folder = this._workspaceContextService?.getWorkspace().folders[0];
		return folder ? URI.joinPath(folder.uri, relativePath) : URI.file(relativePath);
	}

	override hasSameContent(other: VybeChatContentPart): boolean {
		if (other.kind !== 'codeBlock') {
			return false;
		}
		const o = other as VybeChatCodeBlockPart;
		return o._content.code === this._content.code && o._content.language === this._content.language;
	}

	override dispose(): void {
		this._editor = null;
		this._editorContainer = null;
		this._contentWrap = null;
		this._copyButton = null;
		super.dispose();
	}
}

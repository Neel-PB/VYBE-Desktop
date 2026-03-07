/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * VYBE Chat Markdown Content Part
 *
 * Renders markdown AI responses using IVybeChatMarkdownRendererService.
 * Supports real-time streaming with debounced incremental rendering
 * and clickable file-path inline code.
 */

import { $, addDisposableListener, getWindow } from '../../../../../base/browser/dom.js';
import { IVybeChatMarkdownRendererService, decodeHtmlEntitiesInMarkdown, IVybeChatMarkdownRenderResult } from '../../common/vybeChatMarkdownRenderer.js';
import { VybeChatContentPart, IVybeChatMarkdownContent, IVybeChatCodeBlockContent } from './vybeChatContentPart.js';
import { VybeChatCodeBlockPart } from './vybeChatCodeBlockPart.js';
import { DomScrollableElement } from '../../../../../base/browser/ui/scrollbar/scrollableElement.js';
import { ScrollbarVisibility } from '../../../../../base/common/scrollable.js';
import { IEditorService } from '../../../../services/editor/common/editorService.js';
import { IWorkspaceContextService } from '../../../../../platform/workspace/common/workspace.js';
import { IInstantiationService } from '../../../../../platform/instantiation/common/instantiation.js';
import { IClipboardService } from '../../../../../platform/clipboard/common/clipboardService.js';
import { URI } from '../../../../../base/common/uri.js';
import * as path from '../../../../../base/common/path.js';
import { DisposableStore } from '../../../../../base/common/lifecycle.js';

const STREAMING_DEBOUNCE_MS = 100;

export class VybeChatMarkdownPart extends VybeChatContentPart {

	private _markdownRoot: HTMLElement | undefined;
	private _currentContent: string = '';
	private _targetContent: string = '';
	private _isStreaming: boolean = false;
	private _renderResult: IVybeChatMarkdownRenderResult | undefined;
	private _debounceTimer: ReturnType<typeof setTimeout> | null = null;
	private _pendingContent: string | null = null;
	private readonly _linkListeners = new DisposableStore();
	private _codeBlockParts: VybeChatCodeBlockPart[] = [];
	private _codeBlockIndex = 0;
	private _tableScrollables: DomScrollableElement[] = [];

	public onStreamingUpdate?: () => void;

	constructor(
		content: IVybeChatMarkdownContent,
		private readonly _markdownService: IVybeChatMarkdownRendererService,
		private readonly _editorService: IEditorService | undefined,
		private readonly _workspaceContextService: IWorkspaceContextService | undefined,
		private readonly _instantiationService?: IInstantiationService,
		private readonly _clipboardService?: IClipboardService,
	) {
		super('markdown');
		const raw = content.content ?? '';
		this._targetContent = decodeHtmlEntitiesInMarkdown(raw);
		this._isStreaming = content.isStreaming ?? false;
		this._currentContent = this._isStreaming ? '' : this._targetContent;
	}

	// -- lifecycle ------------------------------------------------------------

	protected override createDomNode(): HTMLElement {
		const outer = $('div.vybe-chat-markdown-response', {
			tabindex: '0',
		});

		const initialContent = this._currentContent || this._targetContent;
		this._renderFull(outer, initialContent);
		return outer;
	}

	override dispose(): void {
		if (this._debounceTimer !== null) {
			clearTimeout(this._debounceTimer);
			this._debounceTimer = null;
		}
		this._pendingContent = null;
		this._disposeCodeBlocks();
		this._disposeTableScrollables();
		this._linkListeners.dispose();
		this._renderResult?.dispose();
		this._renderResult = undefined;
		this._markdownRoot = undefined;
		super.dispose();
	}

	// -- public API -----------------------------------------------------------

	getCurrentContent(): string {
		return this._currentContent;
	}

	updateContent(newContent: IVybeChatMarkdownContent): void {
		const newText = decodeHtmlEntitiesInMarkdown(newContent.content ?? '');
		const wasStreaming = this._isStreaming;
		this._isStreaming = newContent.isStreaming ?? false;
		this._targetContent = newText;

		// Content unchanged, just stopping stream → skip re-render
		if (newText === this._currentContent && wasStreaming && !this._isStreaming) {
			this._cancelDebounce();
			return;
		}

		if (this._isStreaming) {
			this._pendingContent = newText;
			// First chunk: render immediately
			if (this._currentContent.length === 0) {
				this._renderIncremental(newText);
				return;
			}
			// Subsequent chunks: debounce
			if (this._debounceTimer === null) {
				this._debounceTimer = setTimeout(() => {
					this._debounceTimer = null;
					const content = this._pendingContent ?? this._targetContent;
					this._pendingContent = null;
					this._renderIncremental(content);
				}, STREAMING_DEBOUNCE_MS);
			}
		} else {
			// Stream ended or one-shot update: render immediately
			this._cancelDebounce();
			this._renderIncremental(newText);
		}
	}

	override hasSameContent(other: VybeChatContentPart): boolean {
		if (other.kind !== 'markdown') {
			return false;
		}
		return (other as VybeChatMarkdownPart)._targetContent === this._targetContent;
	}

	// -- rendering ------------------------------------------------------------

	private _renderFull(container: HTMLElement, content: string): void {
		this._disposeCodeBlocks();
		this._disposeTableScrollables();
		this._renderResult?.dispose();
		this._renderResult = this._markdownService.render(content, {
			isStreaming: this._isStreaming,
			codeBlockSlot: (lang, code) => this._createCodeBlockSlot(lang, code),
		});
		this._markdownRoot = this._renderResult.element;
		container.replaceChildren(this._markdownRoot);
		this._register(this._renderResult);
		this._currentContent = content;
		this._wireInlineCodeLinks(this._markdownRoot);
		this._wireTableScrollbars(this._markdownRoot);
	}

	private _renderIncremental(content: string): void {
		if (content === this._currentContent) {
			return;
		}

		if (!this._markdownRoot) {
			this._renderFull(this.domNode, content);
			this.onStreamingUpdate?.();
			return;
		}

		this._disposeCodeBlocks();
		this._disposeTableScrollables();
		this._markdownService.renderIncremental(this._markdownRoot, content, {
			isStreaming: this._isStreaming,
			codeBlockSlot: (lang, code) => this._createCodeBlockSlot(lang, code),
		});
		this._currentContent = content;
		this._wireInlineCodeLinks(this._markdownRoot);
		this._wireTableScrollbars(this._markdownRoot);
		this.onStreamingUpdate?.();
	}

	private _createCodeBlockSlot(lang: string, code: string): HTMLElement | null {
		if (!this._instantiationService) {
			return null;
		}
		const content: IVybeChatCodeBlockContent = {
			kind: 'codeBlock',
			code,
			language: lang,
			isStreaming: false,
		};
		const part = this._instantiationService.createInstance(
			VybeChatCodeBlockPart,
			content,
			this._codeBlockIndex++,
		);
		this._codeBlockParts.push(part);
		return part.domNode;
	}

	private _disposeCodeBlocks(): void {
		for (const part of this._codeBlockParts) {
			part.dispose();
		}
		this._codeBlockParts = [];
		this._codeBlockIndex = 0;
	}

	private _wireTableScrollbars(container: HTMLElement): void {
		// eslint-disable-next-line no-restricted-syntax
		const wrappers = container.querySelectorAll('.markdown-table-wrapper');
		wrappers.forEach((wrapperEl) => {
			const wrapper = wrapperEl as HTMLElement;
			const parentContainer = wrapper.parentElement;
			if (!parentContainer || wrapper.getAttribute('data-scrollbar-wired') === 'true') {
				return;
			}
			wrapper.setAttribute('data-scrollbar-wired', 'true');

			const scrollable = new DomScrollableElement(wrapper, {
				vertical: ScrollbarVisibility.Hidden,
				horizontal: ScrollbarVisibility.Auto,
				useShadows: false,
				horizontalScrollbarSize: 6,
			});

			const scrollDomNode = scrollable.getDomNode();
			scrollDomNode.style.position = 'relative';
			scrollDomNode.style.overflow = 'hidden';
			scrollDomNode.style.width = '100%';

			parentContainer.appendChild(scrollDomNode);

			this._addTableCopyButton(parentContainer, wrapper);

			this._tableScrollables.push(scrollable);

			const win = getWindow(parentContainer);
			win.requestAnimationFrame(() => {
				win.requestAnimationFrame(() => {
					this._updateTableScrollDimensions(scrollable, wrapper);
				});
			});
		});
	}

	private _addTableCopyButton(tableContainer: HTMLElement, wrapper: HTMLElement): void {
		if (!this._clipboardService) {
			return;
		}
		const clipboardService = this._clipboardService;

		const overlay = $('div.markdown-table-copy-overlay');
		const btn = $('button.markdown-table-copy-btn');
		const icon = $('span.codicon.codicon-copy');
		btn.appendChild(icon);
		overlay.appendChild(btn);
		tableContainer.appendChild(overlay);

		this._linkListeners.add(addDisposableListener(btn, 'click', (e) => {
			e.preventDefault();
			e.stopPropagation();

			// eslint-disable-next-line no-restricted-syntax
			const table = wrapper.querySelector('table');
			if (!table) {
				return;
			}

			const rows: string[] = [];
			// eslint-disable-next-line no-restricted-syntax
			table.querySelectorAll('tr').forEach((tr) => {
				const cells: string[] = [];
				// eslint-disable-next-line no-restricted-syntax
				tr.querySelectorAll('th, td').forEach((cell) => {
					cells.push((cell as HTMLElement).textContent?.trim() ?? '');
				});
				rows.push(cells.join('\t'));
			});

			clipboardService.writeText(rows.join('\n'));
			icon.classList.replace('codicon-copy', 'codicon-check');
			setTimeout(() => icon.classList.replace('codicon-check', 'codicon-copy'), 1000);
		}));
	}

	private _updateTableScrollDimensions(scrollable: DomScrollableElement, contentEl: HTMLElement): void {
		const scrollDomNode = scrollable.getDomNode();
		const viewportWidth = scrollDomNode.clientWidth;
		const viewportHeight = scrollDomNode.clientHeight;

		contentEl.style.width = 'auto';
		void contentEl.offsetWidth;
		const contentWidth = contentEl.scrollWidth;
		contentEl.style.width = `${viewportWidth}px`;

		scrollable.setScrollDimensions({
			width: viewportWidth,
			scrollWidth: contentWidth,
			height: viewportHeight,
			scrollHeight: viewportHeight,
		});
	}

	private _disposeTableScrollables(): void {
		for (const s of this._tableScrollables) {
			s.dispose();
		}
		this._tableScrollables = [];
	}

	private _cancelDebounce(): void {
		if (this._debounceTimer !== null) {
			clearTimeout(this._debounceTimer);
			this._debounceTimer = null;
		}
		this._pendingContent = null;
	}

	// -- file-path inline code ------------------------------------------------

	private _wireInlineCodeLinks(container: HTMLElement): void {
		if (!this._editorService) {
			return;
		}

		this._linkListeners.clear();
		// eslint-disable-next-line no-restricted-syntax
		const codeElements = container.querySelectorAll('.markdown-inline-code');
		const editorService = this._editorService;
		const workspaceContextService = this._workspaceContextService;

		codeElements.forEach((codeEl) => {
			const el = codeEl as HTMLElement;
			if (el.classList.contains('markdown-link')) {
				return;
			}
			const text = el.textContent?.trim();
			if (!text) {
				return;
			}

			const looksLikeFile =
				/\.[a-zA-Z0-9]{1,10}$/.test(text) ||
				text.includes('/') ||
				text.includes('\\');
			if (!looksLikeFile) {
				return;
			}

			el.style.cursor = 'pointer';
			el.title = `Click to open ${text}`;

			this._linkListeners.add(addDisposableListener(el, 'click', async (e) => {
				e.preventDefault();
				e.stopPropagation();
				try {
					let fileUri: URI;
					if (path.isAbsolute(text)) {
						fileUri = URI.file(text);
					} else {
						const folder = workspaceContextService?.getWorkspace().folders[0];
						fileUri = folder ? URI.joinPath(folder.uri, text) : URI.file(text);
					}
					await editorService.openEditor({ resource: fileUri });
				} catch {
					// silently ignore (file may not exist)
				}
			}));
		});
	}
}

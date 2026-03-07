/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import './media/vybeChat.css';
import './media/vybeChatComposer.css';
import './media/vybeChatConversation.css';
import './markdown/media/vybeChatMarkdown.css';

import { $, append, getWindow } from '../../../../base/browser/dom.js';
import { generateUuid } from '../../../../base/common/uuid.js';
import { ViewPane, IViewPaneOptions } from '../../../browser/parts/views/viewPane.js';
import { IKeybindingService } from '../../../../platform/keybinding/common/keybinding.js';
import { IContextMenuService } from '../../../../platform/contextview/browser/contextView.js';
import { IConfigurationService } from '../../../../platform/configuration/common/configuration.js';
import { IContextKeyService } from '../../../../platform/contextkey/common/contextkey.js';
import { IViewDescriptorService } from '../../../common/views.js';
import { IInstantiationService } from '../../../../platform/instantiation/common/instantiation.js';
import { IOpenerService } from '../../../../platform/opener/common/opener.js';
import { IThemeService } from '../../../../platform/theme/common/themeService.js';
import { IHoverService } from '../../../../platform/hover/browser/hover.js';
import { ICommandService } from '../../../../platform/commands/common/commands.js';
import { IViewsService } from '../../../services/views/common/viewsService.js';
import { IVybeChatConversationIndexService } from '../common/vybeChatConversationIndex.js';
import { VybeChatComposer, type ComposerSendPayload } from './components/composer/vybeChatComposer.js';
import { VybeChatPastChats } from './components/pastChats/vybeChatPastChats.js';
import { VybeChatConversationView } from './components/chatArea/vybeChatConversationView.js';
import { VybeChatHumanMessage } from './components/chatArea/vybeChatHumanMessage.js';
import { IModelService } from '../../../../editor/common/services/model.js';
import { ILanguageService } from '../../../../editor/common/languages/language.js';
import { IEditorService } from '../../../services/editor/common/editorService.js';
import { IWorkspaceContextService } from '../../../../platform/workspace/common/workspace.js';
import { IVybeChatMarkdownRendererService } from '../common/vybeChatMarkdownRenderer.js';
import { IClipboardService } from '../../../../platform/clipboard/common/clipboardService.js';
import { getIconClasses } from '../../../../editor/common/services/getIconClasses.js';
import { FileKind } from '../../../../platform/files/common/files.js';
import { URI } from '../../../../base/common/uri.js';
import { MessagePage } from './components/chatArea/messagePage.js';
import type { IVybeChatContentData } from './contentParts/vybeChatContentPart.js';

export class VybeChatViewPane extends ViewPane {

	private chatBody!: HTMLElement;
	private composer!: VybeChatComposer;
	private conversationView: VybeChatConversationView | null = null;
	private messageCount = 0;
	private currentHeight = 0;

	constructor(
		options: IViewPaneOptions,
		@IKeybindingService keybindingService: IKeybindingService,
		@IContextMenuService contextMenuService: IContextMenuService,
		@IConfigurationService configurationService: IConfigurationService,
		@IContextKeyService contextKeyService: IContextKeyService,
		@IViewDescriptorService viewDescriptorService: IViewDescriptorService,
		@IInstantiationService private readonly _instantiationService: IInstantiationService,
		@IOpenerService openerService: IOpenerService,
		@IThemeService themeService: IThemeService,
		@IHoverService hoverService: IHoverService,
		@ICommandService private readonly commandService: ICommandService,
		@IViewsService private readonly viewsService: IViewsService,
		@IVybeChatConversationIndexService private readonly conversationIndex: IVybeChatConversationIndexService,
		@IModelService private readonly modelService: IModelService,
		@ILanguageService private readonly languageService: ILanguageService,
		@IEditorService private readonly _editorService: IEditorService,
		@IWorkspaceContextService private readonly _workspaceContextService: IWorkspaceContextService,
		@IVybeChatMarkdownRendererService private readonly _markdownService: IVybeChatMarkdownRendererService,
		@IClipboardService private readonly _clipboardService: IClipboardService,
	) {
		super(options, keybindingService, contextMenuService, configurationService, contextKeyService, viewDescriptorService, _instantiationService, openerService, themeService, hoverService);
		this._themeService = themeService;
	}

	private readonly _themeService: IThemeService;

	protected override renderBody(container: HTMLElement): void {
		super.renderBody(container);

		container.style.overflow = 'hidden';

		this.chatBody = append(container, $('.vybe-chat-body'));

		this.composer = this._register(new VybeChatComposer(
			this.chatBody,
			this._themeService,
			this.modelService,
			this.languageService,
			() => this.commandService.executeCommand('vybe.openSettingsEditor.models'),
			() => this.commandService.executeCommand('vybe.openSettingsEditor.indexing-docs'),
		));

		this._register(new VybeChatPastChats(
			this.chatBody,
			this.conversationIndex,
			this.commandService,
			this.viewsService,
		));

		this._register(this.composer.onSend(payload => this.handleSend(payload)));
	}

	private handleSend(payload: ComposerSendPayload): void {
		const isFirstMessage = !this.conversationView;
		if (isFirstMessage) {
			this.transitionToConversation();
		}
		this.addHumanMessage(payload);

		if (isFirstMessage) {
			const win = getWindow(this.chatBody);
			win.requestAnimationFrame(() => this.relayoutConversation());
		}
	}

	private transitionToConversation(): void {
		this.conversationView = this._register(new VybeChatConversationView(
			this.chatBody,
			this.composer.domNode,
		));

		this.chatBody.classList.add('has-messages');
		this.relayoutConversation();
	}

	private relayoutConversation(): void {
		if (!this.conversationView || this.currentHeight <= 0) { return; }
		const composerEl = this.composer.domNode;
		const composerStyle = getWindow(composerEl).getComputedStyle(composerEl);
		const composerOuterHeight = composerEl.offsetHeight
			+ parseFloat(composerStyle.marginTop)
			+ parseFloat(composerStyle.marginBottom);
		const conversationsHeight = this.currentHeight - composerOuterHeight;
		this.conversationView.domNode.style.height = `${conversationsHeight}px`;
		this.conversationView.layout(conversationsHeight);
	}

	private addHumanMessage(payload: ComposerSendPayload): void {
		const messageId = generateUuid();

		const humanMessage = this._register(new VybeChatHumanMessage(
			{
				editorStateJSON: payload.editorStateJSON,
				messageId,
				messageIndex: this.messageCount++,
			},
			{
				modelService: this.modelService,
				languageService: this.languageService,
				themeService: this._themeService,
				onOpenSettingsModelsTab: () => this.commandService.executeCommand('vybe.openSettingsEditor.models'),
				onOpenSettingsDocsTab: () => this.commandService.executeCommand('vybe.openSettingsEditor.indexing-docs'),
			},
		));

		const aiResponse = $('div.vybe-chat-ai-response');

		const page = this._register(new MessagePage(
			this._markdownService,
			this._instantiationService,
			this._editorService,
			this._workspaceContextService,
			this._clipboardService,
		));

		page.setContent(this._getMockContentData());
		aiResponse.appendChild(page.domNode);

		// Simulate streaming: after 2s, transition tool from loading → completed
		const win = getWindow(this.chatBody);
		win.setTimeout(() => {
			page.updatePartAt(1, { kind: 'tool', toolType: 'read', state: 'completed', target: 'vybeChatViewPane.ts' });
			page.updatePartAt(3, {
				kind: 'tool', toolType: 'grep', state: 'completed', target: 'src|createHeader',
				resultCount: 3,
				resultItems: [
					{ title: 'vybeChatContentPartComponents.ts', badge: '1', iconClass: this._fileIcon('vybeChatContentPartComponents.ts') },
					{ title: 'vybeChatToolPart.ts', badge: '1', iconClass: this._fileIcon('vybeChatToolPart.ts') },
					{ title: 'vybeChatThinkingPart.ts', badge: '1', iconClass: this._fileIcon('vybeChatThinkingPart.ts') },
				],
			});
			page.updatePartAt(5, { kind: 'thinking', value: 'The user wants to understand the content parts architecture. Let me analyze the codebase structure and identify the key patterns used across tool, thinking, and code block parts.\n\n**Architecture Overview**\nThe system uses a base class VybeChatContentPart with specialized subclasses for each content type.\n\n**Shared Components**\nDesign tokens provide consistent styling values. Reusable DOM builders handle headers, chevrons, badges, and scrollable shells.', duration: 3200, isStreaming: false });
		}, 2000);

		this.conversationView!.addMessagePair(humanMessage.domNode, aiResponse);
	}

	private _fileIcon(filename: string): string {
		return getIconClasses(this.modelService, this.languageService, URI.file(filename), FileKind.FILE).join(' ');
	}

	private _folderIcon(_name: string): string {
		return 'codicon codicon-folder';
	}

	/**
	 * Mock content data covering every content part type and state.
	 */
	private _getMockContentData(): IVybeChatContentData[] {
		return [
			// 0: Thinking (streaming)
			{
				kind: 'thinking',
				value: 'Let me analyze the codebase...',
				duration: 0,
				isStreaming: true,
			},

			// 1: Tool — read (loading → will transition to completed)
			{
				kind: 'tool',
				toolType: 'read',
				state: 'loading',
				target: 'vybeChatViewPane.ts',
			},

			// 2: Tool — read (completed, header-only, no chevron)
			{
				kind: 'tool',
				toolType: 'read',
				state: 'completed',
				target: 'vybeChatContentPart.ts',
			},

			// 3: Tool — grep (loading → will transition to completed with results)
			{
				kind: 'tool',
				toolType: 'grep',
				state: 'loading',
				target: 'src|createHeader',
			},

			// 4: Tool — read attempted (failed)
			{
				kind: 'tool',
				toolType: 'read',
				state: 'attempted',
				target: 'nonexistent.ts',
				errorMessage: 'File not found',
			},

			// 5: Thinking (streaming → will transition to completed)
			{
				kind: 'thinking',
				value: 'Analyzing the architecture...',
				duration: 0,
				isStreaming: true,
			},

			// 6: Tool — list (completed with results)
			{
				kind: 'tool',
				toolType: 'list',
				state: 'completed',
				target: 'src/vs/workbench/contrib/vybeChat',
				resultCount: 5,
				resultItems: [
					{ title: 'browser', iconClass: this._folderIcon('browser') },
					{ title: 'common', iconClass: this._folderIcon('common') },
					{ title: 'electron-main', iconClass: this._folderIcon('electron-main') },
					{ title: 'package.json', iconClass: this._fileIcon('package.json') },
					{ title: 'README.md', iconClass: this._fileIcon('README.md') },
				],
			},

			// 7: Tool — list (completed, >5 items — should scroll)
			{
				kind: 'tool',
				toolType: 'list',
				state: 'completed',
				target: 'src/vs/workbench/contrib/vybeChat/browser',
				resultCount: 8,
				resultItems: [
					{ title: 'components', iconClass: this._folderIcon('components') },
					{ title: 'contentParts', iconClass: this._folderIcon('contentParts') },
					{ title: 'markdown', iconClass: this._folderIcon('markdown') },
					{ title: 'media', iconClass: this._folderIcon('media') },
					{ title: 'vybeChatViewPane.ts', iconClass: this._fileIcon('vybeChatViewPane.ts') },
					{ title: 'vybeChatContentPartComponents.ts', iconClass: this._fileIcon('vybeChatContentPartComponents.ts') },
					{ title: 'vybeChatContentPartTokens.ts', iconClass: this._fileIcon('vybeChatContentPartTokens.ts') },
					{ title: 'vybeChatToolPartDesignTokens.ts', iconClass: this._fileIcon('vybeChatToolPartDesignTokens.ts') },
				],
			},

			// 8: Tool — grep attempted
			{
				kind: 'tool',
				toolType: 'grep',
				state: 'attempted',
				target: 'src|nonExistentPattern',
				errorMessage: 'Search failed',
			},

			// 8: Tool — search codebase (completed)
			{
				kind: 'tool',
				toolType: 'search_codebase',
				state: 'completed',
				target: 'how does the markdown renderer work?',
				resultCount: 2,
				resultItems: [
					{ title: 'vybeMarkdownRendererService.ts', badge: '85%', iconClass: this._fileIcon('vybeMarkdownRendererService.ts') },
					{ title: 'vybeMarkdownToDom.ts', badge: '72%', iconClass: this._fileIcon('vybeMarkdownToDom.ts') },
				],
			},

			// 9: Tool — list attempted
			{
				kind: 'tool',
				toolType: 'list',
				state: 'attempted',
				target: '/nonexistent/path',
				errorMessage: 'Non-existent path',
			},

			// 10: Tool — search web (completed)
			{
				kind: 'tool',
				toolType: 'search_web',
				state: 'completed',
				target: 'VS Code extension API markdown rendering',
				resultCount: 3,
				webLinks: [
					{ title: 'VS Code API - MarkdownString', url: 'https://code.visualstudio.com/api/references/vscode-api#MarkdownString' },
					{ title: 'Webview API | Visual Studio Code', url: 'https://code.visualstudio.com/api/extension-guides/webview' },
					{ title: 'GitHub - marked.js', url: 'https://github.com/markedjs/marked' },
				],
				webBody: 'The VS Code extension API provides MarkdownString for rendering markdown content in hovers, completions, and other UI elements.',
			},

			// 11: Tool — fetch URL attempted
			{
				kind: 'tool',
				toolType: 'fetch_url',
				state: 'attempted',
				target: 'https://example.com/broken-link',
				errorMessage: '404 Not Found',
			},

			// 12: Tool — edit attempted
			{
				kind: 'tool',
				toolType: 'edit',
				state: 'attempted',
				target: 'readonlyFile.ts',
				errorMessage: 'File is read-only',
			},

			// 13: Markdown response
			{
				kind: 'markdown',
				content: 'Here\'s a summary of the content parts architecture:\n\n## Key Components\n\n1. **Design Tokens** — centralized styling constants\n2. **Shared Components** — reusable DOM builders (`createHeader`, `createFileHeader`, `createBadge`)\n3. **Content Parts** — specialized renderers for each content type\n\n### Tool Verb States (small table)\n\n| State | Example | Animation |\n|-------|---------|----------|\n| Loading | "Reading" | Shimmer |\n| Completed | "Read" | None |\n| Attempted | "Read attempted" | None |\n\n### Full Content Part Reference (wide table)\n\n| Part | Kind | Header Verb (Loading) | Header Verb (Completed) | Header Verb (Attempted) | Has Chevron | Expandable | Monaco Editor | File Header |\n|------|------|----------------------|------------------------|------------------------|-------------|------------|---------------|-------------|\n| Thinking | `thinking` | Thinking | Thought for Xs | — | Yes | Yes (scroll) | No | No |\n| Tool (Read) | `tool` | Reading | Read | Read attempted | No (header-only) | No | No | No |\n| Tool (Grep) | `tool` | Grepping | Grepped | Grep attempted | Yes | Yes (list) | No | No |\n| Tool (List) | `tool` | Listing | Listed | List attempted | Yes | Yes (list) | No | No |\n| Tool (Search) | `tool` | Searching file | Searched file | Search file attempted | Yes | Yes (list) | No | No |\n| Tool (Web) | `tool` | Searching web | Searched web | Search web attempted | Yes | Yes (card) | No | No |\n| Code Block | `codeBlock` | — | — | — | No | No | Yes | Optional |\n| Text Edit | `textEdit` | Editing | Edited | Edit attempted | No | Yes (diff) | Yes | Yes |\n\nThe `MessagePage` orchestrator maps `kind → Part` and handles streaming updates via `updatePartAt()`.\n\n```typescript\nconst page = new MessagePage(markdownService, instantiationService);\npage.setContent(contentData);\npage.updatePartAt(0, updatedData);\n```\n\nAll parts extend `VybeChatContentPart` and implement `createDomNode()` + `updateContent()`.\n\n### Inline Color Tokens\n\nThe primary brand color is `#007ACC` and the error color is `#F44747`. We also use `#4EC9B0` for type annotations, `#DCDCAA` for function names, and `#CE9178` for string literals. The background is `#1E1E1E` with foreground text at `#D4D4D4`.',
				isStreaming: false,
			},

			// 14: Code block (plain — no file header)
			{
				kind: 'codeBlock',
				code: 'export function getToolVerb(toolType: string, state: \'loading\' | \'completed\' | \'attempted\'): string {\n\tconst verbs = TOOL_VERBS[toolType];\n\tif (!verbs) {\n\t\treturn toolType;\n\t}\n\treturn verbs[state];\n}',
				language: 'typescript',
			},
		];
	}

	protected override layoutBody(height: number, width: number): void {
		super.layoutBody(height, width);
		this.currentHeight = height;
		if (this.chatBody) {
			this.chatBody.style.height = `${height}px`;
			this.chatBody.style.width = `${width}px`;
		}
		this.relayoutConversation();
	}

	override focus(): void {
		super.focus();
		this.composer?.focus();
	}
}

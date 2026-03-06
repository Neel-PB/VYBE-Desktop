/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import './media/vybeChatComposer.css';
import './media/vybeChatConversation.css';

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
		@IInstantiationService instantiationService: IInstantiationService,
		@IOpenerService openerService: IOpenerService,
		@IThemeService themeService: IThemeService,
		@IHoverService hoverService: IHoverService,
		@ICommandService private readonly commandService: ICommandService,
		@IViewsService private readonly viewsService: IViewsService,
		@IVybeChatConversationIndexService private readonly conversationIndex: IVybeChatConversationIndexService,
		@IModelService private readonly modelService: IModelService,
		@ILanguageService private readonly languageService: ILanguageService,
	) {
		super(options, keybindingService, contextMenuService, configurationService, contextKeyService, viewDescriptorService, instantiationService, openerService, themeService, hoverService);
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
			// Re-layout after the CSS state change (.has-messages) takes effect
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
		const placeholder = append(aiResponse, $('div.vybe-chat-ai-response-placeholder'));

		const msgIndex = this.messageCount - 1;
		if (msgIndex === 0) {
			placeholder.textContent = 'This is a full-length placeholder response to simulate a complete AI reply. '.repeat(30).trim();
		} else if (msgIndex === 1) {
			placeholder.textContent = 'This is a half-length placeholder response. '.repeat(12).trim();
		} else {
			placeholder.textContent = 'This is an extra-long placeholder response that exceeds the full viewport height to test scrolling behavior with large content blocks. '.repeat(50).trim();
		}

		this.conversationView!.addMessagePair(humanMessage.domNode, aiResponse);
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

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import './media/vybeChatComposer.css';

import { $, append } from '../../../../base/browser/dom.js';
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
import { VybeChatComposer } from './components/composer/vybeChatComposer.js';
import { VybeChatPastChats } from './components/pastChats/vybeChatPastChats.js';
import { IModelService } from '../../../../editor/common/services/model.js';
import { ILanguageService } from '../../../../editor/common/languages/language.js';

export class VybeChatViewPane extends ViewPane {

	private chatBody!: HTMLElement;
	private composer!: VybeChatComposer;

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

		// Suppress any native scrollbar on the pane-body container.
		// All scrolling is handled by DomScrollableElement within the composer.
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
	}

	protected override layoutBody(height: number, width: number): void {
		super.layoutBody(height, width);
		if (this.chatBody) {
			this.chatBody.style.height = `${height}px`;
			this.chatBody.style.width = `${width}px`;
		}
	}

	override focus(): void {
		super.focus();
		this.composer?.focus();
	}
}

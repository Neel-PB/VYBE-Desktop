/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { EditorPane } from '../../../browser/parts/editor/editorPane.js';
import { IEditorOpenContext } from '../../../common/editor.js';
import { ITelemetryService } from '../../../../platform/telemetry/common/telemetry.js';
import { IThemeService } from '../../../../platform/theme/common/themeService.js';
import { IStorageService } from '../../../../platform/storage/common/storage.js';
import { IInstantiationService } from '../../../../platform/instantiation/common/instantiation.js';
import { IEditorOptions } from '../../../../platform/editor/common/editor.js';
import { IEditorGroup } from '../../../services/editor/common/editorGroupsService.js';
import { CancellationToken } from '../../../../base/common/cancellation.js';
import { EditorInput } from '../../../common/editor/editorInput.js';
import * as DOM from '../../../../base/browser/dom.js';
import { addDisposableListener, EventType, IDimension } from '../../../../base/browser/dom.js';
import { DomScrollableElement } from '../../../../base/browser/ui/scrollbar/scrollableElement.js';
import { ScrollbarVisibility } from '../../../../base/common/scrollable.js';
import { DisposableStore } from '../../../../base/common/lifecycle.js';
import { IVybeResourcesService } from '../common/vybeResourcesService.js';
import { RESOURCES_SIDEBAR_COLUMN_WIDTH_PX, RESOURCES_TAB_CONTENT_GAP_PX, RESOURCES_TAB_CONTENT_MAX_WIDTH_PX } from './vybeResourcesDesignTokens.js';
import { renderMessagesTab } from './tabs/vybeResourcesMessagesTab.js';
import { renderChangelogTab } from './tabs/vybeResourcesChangelogTab.js';
import { renderDocsTab } from './tabs/vybeResourcesDocsTab.js';
import { renderBlogTab } from './tabs/vybeResourcesBlogTab.js';
import { VybeResourcesEditorInput } from './vybeResourcesEditorInput.js';

export class VybeResourcesEditor extends EditorPane {
	static readonly ID = 'workbench.editor.vybeResources';

	private containerEl!: HTMLElement;
	private sidebarEl!: HTMLElement;
	private contentEl!: HTMLElement;
	private contentWrapperEl!: HTMLElement;
	private contentScrollable!: DomScrollableElement;
	private sidebarScrollable!: DomScrollableElement;
	private tabContentEl!: HTMLElement;
	private tabTitleEl!: HTMLElement;
	private selectedTab: string = 'messages';
	private readonly tabDisposables: DisposableStore = new DisposableStore();

	constructor(
		group: IEditorGroup,
		@ITelemetryService telemetryService: ITelemetryService,
		@IThemeService themeService: IThemeService,
		@IStorageService storageService: IStorageService,
		@IInstantiationService _instantiationService: IInstantiationService,
		@IVybeResourcesService private readonly resourcesService: IVybeResourcesService
	) {
		super(VybeResourcesEditor.ID, group, telemetryService, themeService, storageService);
		this._register(this.tabDisposables);
	}

	private static readonly SIDEBAR_PADDING_PX = 16;
	private static readonly SIDEBAR_SCROLLBAR_WIDTH_PX = 10;

	protected createEditor(parent: HTMLElement): void {
		this.containerEl = DOM.append(parent, DOM.$('.vybe-resources-editor'));
		this.containerEl.style.cssText = `
			height: 100%; width: 100%; display: flex; flex-direction: column;
			min-width: 0; min-height: 0; overflow: hidden;
		`;

		const layoutMain = DOM.append(this.containerEl, DOM.$('.vybe-resources-layout-main'));
		layoutMain.style.cssText = 'display: flex; height: 100%; min-height: 0; flex: 1; min-width: 0;';

		const colW = RESOURCES_SIDEBAR_COLUMN_WIDTH_PX;
		const sidebarColumn = DOM.append(layoutMain, DOM.$('.vybe-resources-sidebar-column'));
		sidebarColumn.style.cssText = `
			width: ${colW}px; min-width: ${colW}px; max-width: ${colW}px;
			flex: 0 0 ${colW}px; display: flex; flex-direction: column; min-height: 0; flex-shrink: 0;
		`;

		this.sidebarEl = this.createSidebar(sidebarColumn);
		this.contentEl = this.createContentArea(layoutMain);
		this.updateStyles();
	}

	private createSidebar(parent: HTMLElement): HTMLElement {
		const sidebar = DOM.append(parent, DOM.$('.vybe-resources-sidebar'));
		const pad = VybeResourcesEditor.SIDEBAR_PADDING_PX;
		sidebar.style.cssText = `
			width: 100%; min-width: 0; flex: 1; padding: ${pad}px; box-sizing: border-box;
			display: flex; flex-direction: column; min-height: 0; overflow: hidden;
		`;

		const cellsWrapper = DOM.$('.vybe-resources-sidebar-cells-wrapper');
		cellsWrapper.style.cssText = `display: flex; flex-direction: column; min-width: 0; padding-right: ${VybeResourcesEditor.SIDEBAR_SCROLLBAR_WIDTH_PX}px; box-sizing: border-box;`;

		const cellsContainer = DOM.append(cellsWrapper, DOM.$('.vybe-resources-sidebar-cells'));
		cellsContainer.style.cssText = 'display: flex; flex-direction: column; gap: 1px;';

		type NavTab = { icon: string; label: string; id: string };
		type NavItem = { divider: true } | NavTab;
		function isNavTab(item: NavItem): item is NavTab {
			return 'id' in item;
		}
		const navItems: NavItem[] = [
			{ icon: 'codicon-mail', label: 'Messages', id: 'messages' },
			{ divider: true },
			{ icon: 'codicon-checklist', label: 'Changelog', id: 'changelog' },
			{ icon: 'codicon-book', label: 'Docs', id: 'docs' },
			{ icon: 'codicon-rss', label: 'Blog', id: 'blog' },
		];

		for (const item of navItems) {
			if ('divider' in item && item.divider) {
				const divider = DOM.append(cellsContainer, DOM.$('hr.vybe-resources-sidebar-divider'));
				divider.style.cssText = `
					margin: 8px 0; border: none;
					border-top: 1px solid var(--vscode-panel-border, var(--vscode-widget-border, rgba(128, 128, 128, 0.2)));
					width: 100%;
				`;
			} else if (isNavTab(item)) {
				const cell = DOM.append(cellsContainer, DOM.$('.vybe-resources-sidebar-cell'));
				cell.style.cssText = `
					display: flex; align-items: center; gap: 6px; padding: 4px 6px; border-radius: 4px; cursor: pointer;
					background-color: ${this.selectedTab === item.id ? 'var(--vscode-activityBar-background)' : 'transparent'};
					transition: background-color 0.2s ease;
				`;
				cell.dataset.tabId = item.id;

				this._register(addDisposableListener(cell, EventType.MOUSE_ENTER, () => {
					if (this.selectedTab !== item.id) cell.style.backgroundColor = 'var(--vscode-activityBar-background)';
				}));
				this._register(addDisposableListener(cell, EventType.MOUSE_LEAVE, () => {
					if (this.selectedTab !== item.id) cell.style.backgroundColor = 'transparent';
				}));

				const icon = DOM.append(cell, DOM.$(`span.codicon.${item.icon}`));
				icon.style.cssText = 'font-size: 16px; color: var(--vscode-descriptionForeground, rgba(128, 128, 128, 0.7));';
				const label = DOM.append(cell, DOM.$('span'));
				label.textContent = item.label;
				label.style.cssText = 'font-size: 12px; color: var(--vscode-foreground); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;';

				this._register(addDisposableListener(cell, EventType.CLICK, () => this.selectTab(item.id)));
			}
		}

		this.sidebarScrollable = this._register(new DomScrollableElement(cellsWrapper, {
			vertical: ScrollbarVisibility.Auto,
			horizontal: ScrollbarVisibility.Hidden,
			useShadows: false
		}));
		const sidebarScrollNode = this.sidebarScrollable.getDomNode();
		sidebarScrollNode.style.cssText = 'flex: 1 1 0%; min-height: 0; height: 100%; position: relative; overflow: hidden;';
		sidebar.appendChild(sidebarScrollNode);

		return sidebar;
	}

	private createContentArea(parent: HTMLElement): HTMLElement {
		const content = DOM.append(parent, DOM.$('.vybe-resources-pane-content'));
		content.style.cssText = `
			flex: 1 1 0%; min-width: 0; min-height: 0; box-sizing: border-box; overflow: hidden;
			position: relative; display: flex; flex-direction: column;
		`;

		const contentWrapper = DOM.$('.vybe-resources-pane-content-wrapper');
		contentWrapper.style.cssText = `
			width: 100%; max-width: ${RESOURCES_TAB_CONTENT_MAX_WIDTH_PX}px; padding: 0; box-sizing: border-box; position: relative;
		`;
		this.contentWrapperEl = contentWrapper;

		const contentCenterWrap = DOM.$('.vybe-resources-pane-content-center');
		contentCenterWrap.style.cssText = 'width: 100%; min-width: 100%; display: flex; justify-content: center; box-sizing: border-box;';
		contentCenterWrap.appendChild(contentWrapper);

		const tab = DOM.append(contentWrapper, DOM.$('.vybe-resources-tab'));
		tab.style.cssText = 'display: flex; flex-direction: column; gap: 20px; padding: 16px; box-sizing: border-box;';

		const tabHeader = DOM.append(tab, DOM.$('.vybe-resources-tab-header'));
		tabHeader.style.cssText = 'padding: 0;';
		const tabTitle = DOM.append(tabHeader, DOM.$('.vybe-resources-tab-title'));
		tabTitle.textContent = 'Messages';
		tabTitle.style.cssText = 'font-size: 16px; font-weight: 500; color: var(--vscode-foreground); letter-spacing: -0.32px; line-height: 21px;';
		this.tabTitleEl = tabTitle;

		const tabContent = DOM.append(tab, DOM.$('.vybe-resources-tab-content'));
		tabContent.style.cssText = `display: flex; flex-direction: column; gap: ${RESOURCES_TAB_CONTENT_GAP_PX}px;`;
		this.tabContentEl = tabContent;

		this.selectTab(this.selectedTab);

		this.contentScrollable = this._register(new DomScrollableElement(contentCenterWrap, {
			vertical: ScrollbarVisibility.Auto,
			horizontal: ScrollbarVisibility.Hidden,
			useShadows: false
		}));
		const scrollNode = this.contentScrollable.getDomNode();
		scrollNode.style.cssText = 'height: 100%; width: 100%; position: relative; overflow: hidden;';
		content.appendChild(scrollNode);

		const win = DOM.getWindow(content);
		win.requestAnimationFrame(() => {
			win.requestAnimationFrame(() => this.updateScrollDimensions());
		});

		return content;
	}

	private updateScrollDimensions(): void {
		if (!this.contentScrollable || !this.contentWrapperEl) return;
		const node = this.contentScrollable.getDomNode();
		const viewportWidth = node.clientWidth;
		const viewportHeight = node.clientHeight;
		this.contentWrapperEl.style.height = 'auto';
		void this.contentWrapperEl.offsetHeight;
		const contentHeight = this.contentWrapperEl.scrollHeight;
		this.contentWrapperEl.style.height = `${viewportHeight}px`;
		this.contentScrollable.setScrollDimensions({
			width: viewportWidth,
			scrollWidth: viewportWidth,
			height: viewportHeight,
			scrollHeight: contentHeight
		});
	}

	private selectTab(tabId: string): void {
		this.selectedTab = tabId;

		const cells = this.sidebarEl?.querySelectorAll('.vybe-resources-sidebar-cell[data-tab-id]');
		cells?.forEach(cell => {
			if (DOM.isHTMLElement(cell)) {
				cell.style.backgroundColor = cell.dataset.tabId === tabId ? 'var(--vscode-activityBar-background)' : 'transparent';
			}
		});

		const titles: Record<string, string> = {
			messages: 'Messages',
			changelog: 'Changelog',
			docs: 'Docs',
			blog: 'Blog'
		};
		if (this.tabTitleEl) this.tabTitleEl.textContent = titles[tabId] ?? 'Messages';

		if (this.tabContentEl) {
			this.tabDisposables.clear();
			DOM.clearNode(this.tabContentEl);

			switch (tabId) {
				case 'messages':
					renderMessagesTab(this.tabContentEl, this.resourcesService, this.tabDisposables);
					break;
				case 'changelog':
					renderChangelogTab(this.tabContentEl, this.resourcesService);
					break;
				case 'docs':
					renderDocsTab(this.tabContentEl, this.resourcesService);
					break;
				case 'blog':
					renderBlogTab(this.tabContentEl, this.resourcesService);
					break;
				default:
					renderMessagesTab(this.tabContentEl, this.resourcesService, this.tabDisposables);
			}

			const win = DOM.getWindow(this.contentEl);
			win.requestAnimationFrame(() => {
				win.requestAnimationFrame(() => this.updateScrollDimensions());
			});
		}
	}

	override updateStyles(): void {}

	override async setInput(input: EditorInput, options: IEditorOptions | undefined, context: IEditorOpenContext, token: CancellationToken): Promise<void> {
		await super.setInput(input, options, context, token);
		const initialTab = (input as VybeResourcesEditorInput).options?.initialTab;
		if (initialTab && ['messages', 'changelog', 'docs', 'blog'].includes(initialTab)) {
			this.selectedTab = initialTab;
			if (this.sidebarEl && this.tabContentEl) {
				this.selectTab(initialTab);
			}
		}
	}

	override layout(dimension: IDimension): void {
		if (this.containerEl) {
			this.containerEl.style.width = '100%';
			this.containerEl.style.height = `${dimension.height}px`;
		}
		if (this.containerEl) {
			const win = DOM.getWindow(this.containerEl);
			win.requestAnimationFrame(() => {
				if (this.contentScrollable) this.updateScrollDimensions();
			});
		}
	}
}

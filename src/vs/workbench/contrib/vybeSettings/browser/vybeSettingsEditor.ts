/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { EditorPane } from '../../../browser/parts/editor/editorPane.js';
import { IEditorOpenContext } from '../../../common/editor.js';
import { ITelemetryService } from '../../../../platform/telemetry/common/telemetry.js';
import { IThemeService } from '../../../../platform/theme/common/themeService.js';
import { IStorageService } from '../../../../platform/storage/common/storage.js';
import { IInstantiationService } from '../../../../platform/instantiation/common/instantiation.js';
import { IContextKeyService } from '../../../../platform/contextkey/common/contextkey.js';
import { IConfigurationService } from '../../../../platform/configuration/common/configuration.js';
import { IWorkspaceContextService } from '../../../../platform/workspace/common/workspace.js';
import { IEditorOptions } from '../../../../platform/editor/common/editor.js';
import { IEditorGroup } from '../../../services/editor/common/editorGroupsService.js';
import { CancellationToken } from '../../../../base/common/cancellation.js';
import { EditorInput } from '../../../common/editor/editorInput.js';
import { IIndexService } from './stubs/indexServiceStub.js';
import { ICommandService } from '../../../../platform/commands/common/commands.js';
import { IDefaultAccountService } from '../../../../platform/defaultAccount/common/defaultAccount.js';
import * as DOM from '../../../../base/browser/dom.js';
import { addDisposableListener, EventType, IDimension } from '../../../../base/browser/dom.js';
import { DomScrollableElement } from '../../../../base/browser/ui/scrollbar/scrollableElement.js';
import { ScrollbarVisibility } from '../../../../base/common/scrollable.js';
import { DisposableStore } from '../../../../base/common/lifecycle.js';
import { renderGeneralTab } from './tabs/vybeSettingsGeneralTab.js';
import { renderPlanUsageTab } from './tabs/vybeSettingsPlanUsageTab.js';
import { renderAgentsTab } from './tabs/vybeSettingsAgentsTab.js';
import { renderTabTab } from './tabs/vybeSettingsTabTab.js';
import { renderModelsTab } from './tabs/vybeSettingsModelsTab.js';
import { renderCloudAgentsTab } from './tabs/vybeSettingsCloudAgentsTab.js';
import { renderToolsMcpTab } from './tabs/vybeSettingsToolsMcpTab.js';
import { renderRulesCommandsTab } from './tabs/vybeSettingsRulesCommandsTab.js';
import { renderIndexingDocsTab } from './tabs/vybeSettingsIndexingDocsTab.js';
import { renderNetworkTab } from './tabs/vybeSettingsNetworkTab.js';
import { renderBetaTab } from './tabs/vybeSettingsBetaTab.js';
import { renderPluginsTab } from './tabs/vybeSettingsPluginsTab.js';
import { renderHooksTab } from './tabs/vybeSettingsHooksTab.js';
import { renderMarketplaceTab } from './tabs/vybeSettingsMarketplaceTab.js';
import { renderDocsTab } from './tabs/vybeSettingsDocsTab.js';
import { SETTINGS_TAB_CONTENT_GAP_PX } from './vybeSettingsDesignTokens.js';

export class VybeSettingsEditor extends EditorPane {
	static readonly ID = 'workbench.editor.vybeSettings';

	private containerEl!: HTMLElement;
	private sidebarEl!: HTMLElement;
	private contentEl!: HTMLElement;
	private contentWrapperEl!: HTMLElement;
	private contentScrollable!: DomScrollableElement;
	private sidebarScrollable!: DomScrollableElement;
	private sidebarContentEl!: HTMLElement;
	private sidebarHeaderNameEl!: HTMLElement;
	private sidebarAvatarInitialEl!: HTMLElement;
	private sidebarCellEls: HTMLElement[] = [];
	private tabContentEl!: HTMLElement;
	private tabTitleEl!: HTMLElement;
	private selectedTab: string = 'general';
	private readonly tabDisposables: DisposableStore = new DisposableStore();
	private readonly storageService: IStorageService;

	constructor(
		group: IEditorGroup,
		@ITelemetryService telemetryService: ITelemetryService,
		@IThemeService themeService: IThemeService,
		@IStorageService storageService: IStorageService,
		@IInstantiationService private readonly instantiationService: IInstantiationService,
		@IContextKeyService _contextKeyService: IContextKeyService,
		@IConfigurationService private readonly configurationService: IConfigurationService,
		@IWorkspaceContextService private readonly workspaceContextService: IWorkspaceContextService,
		@IIndexService private readonly indexService: IIndexService,
		@ICommandService private readonly commandService: ICommandService,
		@IDefaultAccountService private readonly defaultAccountService: IDefaultAccountService
	) {
		super(VybeSettingsEditor.ID, group, telemetryService, themeService, storageService);
		this.storageService = storageService;
		this._register(this.tabDisposables);
	}

	/** Sidebar horizontal padding (left + right). */
	private static readonly SIDEBAR_PADDING_PX = 16;
	/** Total sidebar column width (content 200px + padding 16px each side). */
	private static readonly SIDEBAR_COLUMN_WIDTH_PX = 232;
	/** Max width of tab content area (Cursor settings). */
	private static readonly TAB_CONTENT_MAX_WIDTH_PX = 1041;

	protected createEditor(parent: HTMLElement): void {
		this.containerEl = DOM.append(parent, DOM.$('.vybe-settings-editor'));
		this.containerEl.style.cssText = `
			height: 100%;
			width: 100%;
			display: flex;
			flex-direction: column;
			min-width: 0;
			min-height: 0;
			overflow: hidden;
		`;

		// Main layout: flex row; min-height 0 so it stays within editor pane when panel is open
		const layoutMain = DOM.append(this.containerEl, DOM.$('.vybe-settings-layout-main'));
		layoutMain.style.cssText = 'display: flex; height: 100%; min-height: 0; flex: 1; min-width: 0;';

		// Sidebar column: width = content (200px) + padding both sides so sidebar content is 200px
		const sidebarColumn = DOM.append(layoutMain, DOM.$('.vybe-settings-sidebar-column'));
		const colW = VybeSettingsEditor.SIDEBAR_COLUMN_WIDTH_PX;
		sidebarColumn.style.cssText = `
			width: ${colW}px;
			min-width: ${colW}px;
			max-width: ${colW}px;
			flex: 0 0 ${colW}px;
			display: flex;
			flex-direction: column;
			min-height: 0;
			flex-shrink: 0;
		`;

		// Build sidebar (fills column)
		this.sidebarEl = this.createSidebar(sidebarColumn);

		// Build content area (flex: 1 so it takes remaining space and adjusts on resize)
		this.contentEl = this.createContentArea(layoutMain);

		this.updateStyles();
	}

	private createSidebar(parent: HTMLElement): HTMLElement {
		const sidebar = DOM.append(parent, DOM.$('.vybe-settings-sidebar'));
		const pad = VybeSettingsEditor.SIDEBAR_PADDING_PX;
		sidebar.style.cssText = `
			width: 100%;
			min-width: 0;
			flex: 1;
			padding: ${pad}px;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			min-height: 0;
			overflow: hidden;
		`;

		// Reserve same width as scrollable area (nav cells have padding-right for scrollbar)
		const SIDEBAR_SCROLLBAR_WIDTH_PX = 10;
		const sidebarGutter = `padding-right: ${SIDEBAR_SCROLLBAR_WIDTH_PX}px; box-sizing: border-box;`;

		// Sidebar header (fixed at top, same effective width as nav cells)
		const header = DOM.append(sidebar, DOM.$('.vybe-settings-sidebar-header'));
		header.style.cssText = `display: flex; align-items: center; gap: 8px; margin-bottom: 16px; ${sidebarGutter}`;

		const avatar = DOM.append(header, DOM.$('.vybe-settings-sidebar-avatar'));
		avatar.style.cssText = `
			width: 28px;
			height: 28px;
			border-radius: 50%;
			background-color: var(--vscode-list-inactiveSelectionBackground, rgba(128, 128, 128, 0.1));
			display: flex;
			align-items: center;
			justify-content: center;
			flex-shrink: 0;
		`;

		this.sidebarAvatarInitialEl = DOM.append(avatar, DOM.$('p.vybe-settings-sidebar-avatar-initial'));
		this.sidebarAvatarInitialEl.textContent = 'n';
		this.sidebarAvatarInitialEl.style.cssText = `
			margin: 0;
			font-size: 12px;
			text-transform: uppercase;
			color: var(--vscode-descriptionForeground, rgba(128, 128, 128, 0.6));
			text-align: center;
		`;

		const headerContent = DOM.append(header, DOM.$('.vybe-settings-sidebar-header-content'));
		headerContent.style.cssText = 'display: flex; flex-direction: column; gap: 2px; flex: 1; min-width: 0;';

		// User's name (sidebar name); updated from default account when available
		const nameEl = DOM.append(headerContent, DOM.$('p.vybe-settings-sidebar-header-name'));
		nameEl.textContent = 'User';
		nameEl.title = '';
		nameEl.style.cssText = `
			margin: 0;
			font-size: 12px;
			color: var(--vscode-foreground);
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		`;
		this.sidebarHeaderNameEl = nameEl;
		this.updateSidebarUserName();

		const plan = DOM.append(headerContent, DOM.$('p.vybe-settings-sidebar-header-plan'));
		plan.textContent = 'Pro+ Plan';
		plan.style.cssText = `
			margin: 0;
			font-size: 12px;
			color: var(--vscode-descriptionForeground, rgba(128, 128, 128, 0.7));
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		`;

		// Search input (fixed, same effective width as nav cells)
		const searchContainer = DOM.append(sidebar, DOM.$('div'));
		searchContainer.style.cssText = `flex-shrink: 0; margin-bottom: 8px; ${sidebarGutter}`;
		const searchInput = DOM.append(searchContainer, DOM.$('input', { type: 'text', placeholder: 'Search settings ⌘F' }));
		searchInput.style.cssText = `
			width: 100%;
			padding: 6px;
			box-sizing: border-box;
			font-size: 12px;
			border: 1px solid var(--vscode-input-border);
			background: var(--vscode-panel-background);
			color: var(--vscode-input-foreground);
			border-radius: 4px;
		`;

		// Only the nav cells scroll; wrap them in a container with padding for the scrollbar
		const cellsWrapper = DOM.$('.vybe-settings-sidebar-cells-wrapper');
		cellsWrapper.style.cssText = `display: flex; flex-direction: column; min-width: 0; padding-right: ${SIDEBAR_SCROLLBAR_WIDTH_PX}px; box-sizing: border-box;`;
		this.sidebarContentEl = cellsWrapper;

		const cellsContainer = DOM.append(cellsWrapper, DOM.$('.vybe-settings-sidebar-cells'));
		cellsContainer.style.cssText = 'display: flex; flex-direction: column; gap: 1px;';

		// Navigation items (order matches Cursor settings sidebar)
		type NavItem = { divider: true } | { icon: string; label: string; id: string } | { footer: true; label: string; id: string; icon: string } | { logout: true; label: string; icon: string };
		const navItems: NavItem[] = [
			{ icon: 'codicon-gear', label: 'General', id: 'general' },
			{ icon: 'codicon-dashboard', label: 'Plan & Usage', id: 'plan-usage' },
			{ icon: 'codicon-agent', label: 'Agents', id: 'agents' },
			{ icon: 'codicon-keyboard-tab', label: 'Tab', id: 'tab' },
			{ icon: 'codicon-symbol-method', label: 'Models', id: 'models' },
			{ icon: 'codicon-cloud', label: 'Cloud Agents', id: 'cloud-agents' },
			{ divider: true },
			{ icon: 'codicon-package', label: 'Plugins', id: 'plugins' },
			{ icon: 'codicon-clippy', label: 'Rules, Skills, Subagents', id: 'rules-commands' },
			{ icon: 'codicon-type-hierarchy-sub', label: 'Tools & MCP', id: 'tools-mcp' },
			{ icon: 'codicon-debug-line-by-line', label: 'Hooks', id: 'hooks' },
			{ divider: true },
			{ icon: 'codicon-server', label: 'Indexing & Docs', id: 'indexing-docs' },
			{ icon: 'codicon-globe', label: 'Network', id: 'network' },
			{ icon: 'codicon-beaker', label: 'Beta', id: 'beta' },
			{ divider: true },
			{ footer: true, label: 'Marketplace', id: 'marketplace', icon: 'codicon-extensions' },
			{ footer: true, label: 'Docs', id: 'docs', icon: 'codicon-book' },
			{ divider: true },
			{ logout: true, label: 'Log out', icon: 'codicon-sign-out' },
		];

		function isDivider(item: NavItem): item is { divider: true } {
			return 'divider' in item && item.divider === true;
		}

		function isFooter(item: NavItem): item is { footer: true; label: string; id: string; icon: string } {
			return 'footer' in item && item.footer === true;
		}

		function isLogout(item: NavItem): item is { logout: true; label: string; icon: string } {
			return 'logout' in item && item.logout === true;
		}

		for (const item of navItems) {
			if (isDivider(item)) {
				const divider = DOM.append(cellsContainer, DOM.$('hr.vybe-settings-sidebar-divider'));
				divider.style.cssText = `
					margin: 8px 0;
					border: none;
					border-top: 1px solid var(--vscode-panel-border, var(--vscode-widget-border, rgba(128, 128, 128, 0.2)));
					width: 100%;
				`;
			} else if (isFooter(item)) {
				const footerCell = DOM.append(cellsContainer, DOM.$('.vybe-settings-sidebar-cell'));
				footerCell.style.cssText = `
					display: flex;
					align-items: center;
					gap: 6px;
					padding: 4px 6px;
					border-radius: 4px;
					cursor: pointer;
					background-color: ${this.selectedTab === item.id ? 'var(--vscode-activityBar-background)' : 'transparent'};
					transition: background-color 0.2s ease;
				`;
				footerCell.dataset.tabId = item.id;
				this.sidebarCellEls.push(footerCell);

				this._register(addDisposableListener(footerCell, EventType.MOUSE_ENTER, () => {
					if (this.selectedTab !== item.id) {
						footerCell.style.backgroundColor = 'var(--vscode-activityBar-background)';
					}
				}));
				this._register(addDisposableListener(footerCell, EventType.MOUSE_LEAVE, () => {
					if (this.selectedTab !== item.id) {
						footerCell.style.backgroundColor = 'transparent';
					}
				}));

				const icon = DOM.append(footerCell, DOM.$(`span.codicon.${item.icon}`));
				icon.style.cssText = item.icon === 'codicon-extensions' ? 'font-size: 14px; padding-left: 1px; padding-right: 1px; color: var(--vscode-descriptionForeground, rgba(128, 128, 128, 0.7));' : 'font-size: 16px; color: var(--vscode-descriptionForeground, rgba(128, 128, 128, 0.7));';

				const label = DOM.append(footerCell, DOM.$('span.vybe-settings-sidebar-cell-label'));
				label.textContent = item.label;
				label.title = item.label;
				label.style.cssText = `
					font-size: 12px;
					color: var(--vscode-foreground);
					flex: 1;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				`;

				this._register(addDisposableListener(footerCell, EventType.CLICK, () => {
					this.selectTab(item.id);
				}));
			} else if (isLogout(item)) {
				const logoutCell = DOM.append(cellsContainer, DOM.$('.vybe-settings-sidebar-cell'));
				logoutCell.style.cssText = `
					display: flex;
					align-items: center;
					gap: 6px;
					padding: 4px 6px;
					border-radius: 4px;
					cursor: pointer;
					background-color: transparent;
					transition: background-color 0.2s ease;
				`;

				this._register(addDisposableListener(logoutCell, EventType.MOUSE_ENTER, () => {
					logoutCell.style.backgroundColor = 'var(--vscode-activityBar-background)';
				}));
				this._register(addDisposableListener(logoutCell, EventType.MOUSE_LEAVE, () => {
					logoutCell.style.backgroundColor = 'transparent';
				}));

				const icon = DOM.append(logoutCell, DOM.$(`span.codicon.${item.icon}`));
				icon.style.cssText = 'font-size: 16px; color: var(--vscode-descriptionForeground, rgba(128, 128, 128, 0.7));';

				const label = DOM.append(logoutCell, DOM.$('span.vybe-settings-sidebar-cell-label'));
				label.textContent = item.label;
				label.title = item.label;
				label.style.cssText = `
					font-size: 12px;
					color: var(--vscode-foreground);
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				`;

				this._register(addDisposableListener(logoutCell, EventType.CLICK, () => {
					this.commandService.executeCommand('workbench.action.agenticSignOut');
				}));
			} else {
				const cell = DOM.append(cellsContainer, DOM.$('.vybe-settings-sidebar-cell'));
				cell.style.cssText = `
					display: flex;
					align-items: center;
					gap: 6px;
					padding: 4px 6px;
					border-radius: 4px;
					cursor: pointer;
					background-color: ${this.selectedTab === item.id ? 'var(--vscode-activityBar-background)' : 'transparent'};
					transition: background-color 0.2s ease;
				`;
				cell.dataset.tabId = item.id;
				this.sidebarCellEls.push(cell);

				// Add hover effect
				this._register(addDisposableListener(cell, EventType.MOUSE_ENTER, () => {
					if (this.selectedTab !== item.id) {
						cell.style.backgroundColor = 'var(--vscode-activityBar-background)';
					}
				}));

				this._register(addDisposableListener(cell, EventType.MOUSE_LEAVE, () => {
					if (this.selectedTab !== item.id) {
						cell.style.backgroundColor = 'transparent';
					}
				}));

				const icon = DOM.append(cell, DOM.$(`span.codicon.${item.icon}`));
				icon.style.cssText = 'font-size: 16px; color: var(--vscode-descriptionForeground, rgba(128, 128, 128, 0.7));';

				const label = DOM.append(cell, DOM.$('span.vybe-settings-sidebar-cell-label'));
				label.textContent = item.label;
				label.title = item.label;
				label.style.cssText = `
					font-size: 12px;
					color: var(--vscode-foreground);
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				`;

				this._register(addDisposableListener(cell, EventType.CLICK, () => {
					this.selectTab(item.id);
				}));
			}
		}

		// VS Code-style scrollbar for nav cells only (search bar stays fixed above)
		this.sidebarScrollable = this._register(new DomScrollableElement(cellsWrapper, {
			vertical: ScrollbarVisibility.Auto,
			horizontal: ScrollbarVisibility.Hidden,
			useShadows: false
		}));
		const sidebarScrollableNode = this.sidebarScrollable.getDomNode();
		sidebarScrollableNode.style.cssText = 'flex: 1 1 0%; min-height: 0; height: 100%; position: relative; overflow: hidden;';
		sidebar.appendChild(sidebarScrollableNode);

		const window = DOM.getWindow(sidebar);
		window.requestAnimationFrame(() => {
			window.requestAnimationFrame(() => {
				this.updateSidebarScrollDimensions();
			});
		});

		return sidebar;
	}

	private updateSidebarUserName(): void {
		if (!this.sidebarHeaderNameEl) {
			return;
		}
		this.defaultAccountService.getDefaultAccount().then(account => {
			if (account?.accountName && this.sidebarHeaderNameEl) {
				this.sidebarHeaderNameEl.textContent = account.accountName;
				this.sidebarHeaderNameEl.title = account.accountName;
				const initial = account.accountName.trim().charAt(0).toUpperCase();
				if (this.sidebarAvatarInitialEl && initial) {
					this.sidebarAvatarInitialEl.textContent = initial;
				}
			}
		}).catch(() => { /* ignore */ });
	}

	private updateSidebarScrollDimensions(): void {
		if (!this.sidebarScrollable || !this.sidebarContentEl) {
			return;
		}
		const scrollableDomNode = this.sidebarScrollable.getDomNode();
		const viewportHeight = scrollableDomNode.clientHeight;
		const viewportWidth = scrollableDomNode.clientWidth;
		this.sidebarContentEl.style.height = 'auto';
		void this.sidebarContentEl.offsetHeight;
		const contentHeight = this.sidebarContentEl.scrollHeight;
		this.sidebarContentEl.style.height = `${viewportHeight}px`;
		this.sidebarScrollable.setScrollDimensions({
			width: viewportWidth,
			scrollWidth: viewportWidth,
			height: viewportHeight,
			scrollHeight: contentHeight
		});
	}

	private createContentArea(parent: HTMLElement): HTMLElement {
		// Outer content container: fills pane, min-height 0 so it stays within editor (does not extend behind panel)
		const content = DOM.append(parent, DOM.$('.vybe-settings-pane-content'));
		content.style.cssText = `
			flex: 1 1 0%;
			min-width: 0;
			min-height: 0;
			box-sizing: border-box;
			overflow: hidden;
			position: relative;
			display: flex;
			flex-direction: column;
		`;

		// Inner content wrapper: max-width only (all padding on tab so scroll dimensions match content)
		const contentWrapper = DOM.$('.vybe-settings-pane-content-wrapper');
		contentWrapper.style.cssText = `
			width: 100%;
			max-width: ${VybeSettingsEditor.TAB_CONTENT_MAX_WIDTH_PX}px;
			padding: 0;
			box-sizing: border-box;
			position: relative;
		`;
		this.contentWrapperEl = contentWrapper;

		// Center the tab content in the tab region (full-width flex container)
		const contentCenterWrap = DOM.$('.vybe-settings-pane-content-center');
		contentCenterWrap.style.cssText = 'width: 100%; min-width: 100%; display: flex; justify-content: center; box-sizing: border-box;';
		contentCenterWrap.appendChild(contentWrapper);

		// Tab container: all padding here so scrollable content size equals visible content + padding
		const tab = DOM.append(contentWrapper, DOM.$('.vybe-settings-tab'));
		tab.style.cssText = 'display: flex; flex-direction: column; gap: 20px; padding: 16px; box-sizing: border-box;';

		// Tab header
		const tabHeader = DOM.append(tab, DOM.$('.vybe-settings-tab-header'));
		tabHeader.style.cssText = 'padding: 0;';

		const tabTitle = DOM.append(tabHeader, DOM.$('.vybe-settings-tab-title'));
		tabTitle.textContent = 'General';
		tabTitle.style.cssText = `
			font-size: 16px;
			font-weight: 500;
			color: var(--vscode-foreground);
			letter-spacing: -0.32px;
			line-height: 21px;
		`;
		this.tabTitleEl = tabTitle;

		// Tab content
		const tabContent = DOM.append(tab, DOM.$('.vybe-settings-tab-content'));
		tabContent.style.cssText = `display: flex; flex-direction: column; gap: ${SETTINGS_TAB_CONTENT_GAP_PX}px;`;
		this.tabContentEl = tabContent;

		// Render initial tab (selectedTab may have been set from EditorInput.initialTabId in setInput)
		this.selectTab(this.selectedTab);

		// Create VS Code native scrollbar - wraps centering container so tab content is centered
		this.contentScrollable = this._register(new DomScrollableElement(contentCenterWrap, {
			vertical: ScrollbarVisibility.Auto,
			horizontal: ScrollbarVisibility.Hidden,
			useShadows: false
		}));

		const scrollableDomNode = this.contentScrollable.getDomNode();
		scrollableDomNode.style.height = '100%';
		scrollableDomNode.style.width = '100%';
		scrollableDomNode.style.position = 'relative';
		scrollableDomNode.style.overflow = 'hidden';

		// Append scrollable element to content (DomScrollableElement already wrapped contentWrapper)
		content.appendChild(scrollableDomNode);

		// Update scroll dimensions after DOM is ready and layout has occurred
		const window = DOM.getWindow(content);
		window.requestAnimationFrame(() => {
			window.requestAnimationFrame(() => {
				this.updateScrollDimensions();
			});
		});

		return content;
	}

	private updateScrollDimensions(): void {
		if (!this.contentScrollable || !this.contentWrapperEl) {
			return;
		}

		const scrollableDomNode = this.contentScrollable.getDomNode();

		// Get viewport dimensions from scrollable container
		const viewportWidth = scrollableDomNode.clientWidth;
		const viewportHeight = scrollableDomNode.clientHeight;

		// Temporarily set wrapper to auto to measure full content height
		this.contentWrapperEl.style.height = 'auto';
		void this.contentWrapperEl.offsetHeight;
		const contentHeight = this.contentWrapperEl.scrollHeight;

		// Constrain wrapper to viewport height so the scrollable has a proper viewport (required for DomScrollableElement to show scroll)
		this.contentWrapperEl.style.height = `${viewportHeight}px`;

		// Set scroll dimensions with the measured content height. Do not call scanDomNode() after this:
		// scanDomNode() re-reads scrollHeight from the DOM, which would be viewportHeight (wrapper is constrained), and would overwrite contentHeight, preventing full scroll.
		this.contentScrollable.setScrollDimensions({
			width: viewportWidth,
			scrollWidth: viewportWidth,
			height: viewportHeight,
			scrollHeight: contentHeight
		});
	}

	private selectTab(tabId: string): void {
		this.selectedTab = tabId;

		// Update sidebar selection
		for (const cell of this.sidebarCellEls) {
			cell.style.backgroundColor = cell.dataset.tabId === tabId ? 'var(--vscode-activityBar-background)' : 'transparent';
		}

		// Update tab title
		if (this.tabTitleEl) {
			const labels: { [key: string]: string } = {
				'general': 'General',
				'plan-usage': 'Plan & Usage',
				'agents': 'Agents',
				'tab': 'Tab',
				'models': 'Models',
				'cloud-agents': 'Cloud Agents',
				'plugins': 'Plugins',
				'rules-commands': 'Rules, Skills, Subagents',
				'tools-mcp': 'Tools & MCP',
				'hooks': 'Hooks',
				'indexing-docs': 'Indexing & Docs',
				'network': 'Network',
				'beta': 'Beta',
				'marketplace': 'Marketplace',
				'docs': 'Docs'
			};
			this.tabTitleEl.textContent = labels[tabId] || 'General';
		}

		// Clear and re-render tab content
		if (this.tabContentEl) {
			// Dispose previous tab's disposables
			this.tabDisposables.clear();
			DOM.clearNode(this.tabContentEl);

			switch (tabId) {
				case 'general':
					renderGeneralTab(this.tabContentEl, this.storageService, this.tabDisposables);
					break;
				case 'plan-usage':
					renderPlanUsageTab(this.tabContentEl);
					break;
				case 'agents':
					renderAgentsTab(this.tabContentEl);
					break;
				case 'tab':
					renderTabTab(this.tabContentEl);
					break;
				case 'models':
					renderModelsTab(this.tabContentEl, this.storageService, this.instantiationService, this.tabDisposables);
					break;
				case 'cloud-agents':
					renderCloudAgentsTab(this.tabContentEl);
					break;
				case 'plugins':
					renderPluginsTab(this.tabContentEl);
					break;
				case 'tools-mcp':
					renderToolsMcpTab(this.tabContentEl);
					break;
				case 'rules-commands':
					renderRulesCommandsTab(this.tabContentEl);
					break;
				case 'hooks':
					renderHooksTab(this.tabContentEl);
					break;
				case 'indexing-docs':
					renderIndexingDocsTab(this.tabContentEl, this.configurationService, this.workspaceContextService, this.indexService, this.tabDisposables, this.commandService);
					break;
				case 'network':
					renderNetworkTab(this.tabContentEl);
					break;
				case 'beta':
					renderBetaTab(this.tabContentEl);
					break;
				case 'marketplace':
					renderMarketplaceTab(this.tabContentEl);
					break;
				case 'docs':
					renderDocsTab(this.tabContentEl);
					break;
				default:
					break;
			}

			// Update scroll dimensions after content changes
			const window = DOM.getWindow(this.contentEl);
			window.requestAnimationFrame(() => {
				window.requestAnimationFrame(() => {
					this.updateScrollDimensions();
				});
			});
		}
	}

	override updateStyles(): void {
		// Theme-aware styling updates can go here
	}

	override async setInput(input: EditorInput, options: IEditorOptions | undefined, context: IEditorOpenContext, token: CancellationToken): Promise<void> {
		await super.setInput(input, options, context, token);
		// Open on a specific tab when requested (e.g. from "Add Models" in composer model dropdown)
		const initialTabId = (input as { getInitialTabId?: () => string | undefined }).getInitialTabId?.();
		if (initialTabId) {
			this.selectedTab = initialTabId;
		}
	}

	/** Returns the current rendered width of the sidebar (for debugging). */
	getSidebarWidth(): number {
		if (!this.sidebarEl) {
			return 0;
		}
		return this.sidebarEl.offsetWidth;
	}

	override layout(dimension: IDimension): void {
		if (this.containerEl) {
			// Use 100% width so container fills parent (avoids being forced to a narrow dimension that truncates sidebar)
			this.containerEl.style.width = '100%';
			this.containerEl.style.height = `${dimension.height}px`;
		}

		// Update scroll dimensions when layout changes
		if (this.containerEl) {
			const window = DOM.getWindow(this.containerEl);
			window.requestAnimationFrame(() => {
				if (this.contentScrollable) {
					this.updateScrollDimensions();
				}
				if (this.sidebarScrollable) {
					this.updateSidebarScrollDimensions();
				}
			});
		}
	}
}

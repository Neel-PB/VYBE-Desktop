/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { $, append, addDisposableListener, clearNode, h } from '../../../../base/browser/dom.js';
import { KeybindingLabel } from '../../../../base/browser/ui/keybindingLabel/keybindingLabel.js';
import { coalesce, shuffle } from '../../../../base/common/arrays.js';
import { Disposable, DisposableStore } from '../../../../base/common/lifecycle.js';
import { ResolvedKeybinding } from '../../../../base/common/keybindings.js';
import { isMacintosh, isWeb, OS } from '../../../../base/common/platform.js';
import { URI } from '../../../../base/common/uri.js';
import { localize } from '../../../../nls.js';
import { CommandsRegistry, ICommandService } from '../../../../platform/commands/common/commands.js';
import { IConfigurationService } from '../../../../platform/configuration/common/configuration.js';
import { ContextKeyExpr, ContextKeyExpression, IContextKeyService } from '../../../../platform/contextkey/common/contextkey.js';
import { IKeybindingService } from '../../../../platform/keybinding/common/keybinding.js';
import { ILabelService } from '../../../../platform/label/common/label.js';
import { IStorageService, StorageScope, StorageTarget, WillSaveStateReason } from '../../../../platform/storage/common/storage.js';
import { defaultKeybindingLabelStyles } from '../../../../platform/theme/browser/defaultStyles.js';
import { IWindowOpenable } from '../../../../platform/window/common/window.js';
import { IWorkspaceContextService, WorkbenchState } from '../../../../platform/workspace/common/workspace.js';
import { IWorkspacesService, isRecentFolder, isRecentWorkspace } from '../../../../platform/workspaces/common/workspaces.js';
import { IHostService } from '../../../services/host/browser/host.js';
import { IWorkbenchLayoutService, Parts, SINGLE_WINDOW_PARTS } from '../../../services/layout/browser/layoutService.js';

interface WatermarkEntry {
	readonly id: string;
	readonly text: string;
	readonly when?: {
		native?: ContextKeyExpression;
		web?: ContextKeyExpression;
	};
}

const showChatContextKey = ContextKeyExpr.and(ContextKeyExpr.equals('chatSetupHidden', false), ContextKeyExpr.equals('chatSetupDisabled', false));

const openChat: WatermarkEntry = { text: localize('watermark.openChat', "Open Chat"), id: 'workbench.action.chat.open', when: { native: showChatContextKey, web: showChatContextKey } };
const showCommands: WatermarkEntry = { text: localize('watermark.showCommands', "Show All Commands"), id: 'workbench.action.showCommands' };
const gotoFile: WatermarkEntry = { text: localize('watermark.quickAccess', "Go to File"), id: 'workbench.action.quickOpen' };
const openFile: WatermarkEntry = { text: localize('watermark.openFile', "Open File"), id: 'workbench.action.files.openFile' };
const openFolder: WatermarkEntry = { text: localize('watermark.openFolder', "Open Folder"), id: 'workbench.action.files.openFolder' };
const openFileOrFolder: WatermarkEntry = { text: localize('watermark.openFileFolder', "Open File or Folder"), id: 'workbench.action.files.openFileFolder' };
const openRecent: WatermarkEntry = { text: localize('watermark.openRecent', "Open Recent"), id: 'workbench.action.openRecent' };
const newUntitledFile: WatermarkEntry = { text: localize('watermark.newUntitledFile', "New Untitled Text File"), id: 'workbench.action.files.newUntitledFile' };
const findInFiles: WatermarkEntry = { text: localize('watermark.findInFiles', "Find in Files"), id: 'workbench.action.findInFiles' };
const toggleTerminal: WatermarkEntry = { text: localize({ key: 'watermark.toggleTerminal', comment: ['toggle is a verb here'] }, "Toggle Terminal"), id: 'workbench.action.terminal.toggleTerminal', when: { web: ContextKeyExpr.equals('terminalProcessSupported', true) } };
const startDebugging: WatermarkEntry = { text: localize('watermark.startDebugging', "Start Debugging"), id: 'workbench.action.debug.start', when: { web: ContextKeyExpr.equals('terminalProcessSupported', true) } };
const openSettings: WatermarkEntry = { text: localize('watermark.openSettings', "Open Settings"), id: 'workbench.action.openSettings' };

const baseEntries: WatermarkEntry[] = [
	openChat,
	showCommands,
];

const emptyWindowEntries: WatermarkEntry[] = coalesce([
	...baseEntries,
	openRecent,
	...(isMacintosh && !isWeb ? [openFileOrFolder] : [openFile, openFolder]),
	isMacintosh && !isWeb ? newUntitledFile : undefined, // fill in one more on macOS to get to 5 entries
]);

const workspaceEntries: WatermarkEntry[] = [
	...baseEntries,
];

const otherEntries: WatermarkEntry[] = [
	gotoFile,
	findInFiles,
	startDebugging,
	toggleTerminal,
	openSettings,
];

/** Workspace-open watermark: button-style entries. Supports dynamic Show/Hide labels and optional keybinding override. */
interface VybeWorkspaceWatermarkEntry {
	/** Static label, or used when part is hidden when labelShow/labelHide are set */
	readonly label: string;
	readonly commandId: string;
	readonly codicon: string;
	/** When set, label becomes labelShow when part is hidden and labelHide when part is visible */
	readonly labelShow?: string;
	readonly labelHide?: string;
	/** Part to check for dynamic label (e.g. Parts.AUXILIARYBAR_PART). Must be a single-window part for isVisible(). */
	readonly part?: SINGLE_WINDOW_PARTS;
	/** If set, show this command's keybinding instead of commandId's (e.g. Cmd+J for terminal via togglePanel) */
	readonly keybindingCommandId?: string;
	/** When part is visible, show this command's keybinding (e.g. Cmd+B for hide files) */
	readonly keybindingCommandIdWhenVisible?: string;
	/** When set and part is visible, run this command instead of commandId (e.g. togglePanel to hide panel) */
	readonly commandIdWhenVisible?: string;
}

const VYBE_WORKSPACE_WATERMARK_ENTRIES: VybeWorkspaceWatermarkEntry[] = [
	{ label: localize('watermark.showAgentPanel', 'Show Agent Panel'), labelShow: localize('watermark.showAgentPanel', 'Show Agent Panel'), labelHide: localize('watermark.hideAgentPanel', 'Hide Agent Panel'), commandId: 'workbench.action.toggleAuxiliaryBar', codicon: 'comment', part: Parts.AUXILIARYBAR_PART },
	{ label: localize('watermark.showTerminal', 'Show Terminal'), labelShow: localize('watermark.showTerminal', 'Show Terminal'), labelHide: localize('watermark.hideTerminal', 'Hide Terminal'), commandId: 'workbench.action.terminal.toggleTerminal', codicon: 'terminal', part: Parts.PANEL_PART, keybindingCommandId: 'workbench.action.togglePanel', commandIdWhenVisible: 'workbench.action.togglePanel' },
	{ label: localize('watermark.showFiles', 'Show Files'), labelShow: localize('watermark.showFiles', 'Show Files'), labelHide: localize('watermark.hideFiles', 'Hide Files'), commandId: 'workbench.view.explorer', codicon: 'files', part: Parts.SIDEBAR_PART, keybindingCommandId: 'workbench.view.explorer', keybindingCommandIdWhenVisible: 'workbench.action.toggleSidebarVisibility', commandIdWhenVisible: 'workbench.action.toggleSidebarVisibility' },
	{ label: localize('watermark.searchFiles', 'Search Files'), commandId: 'workbench.action.quickOpen', codicon: 'search' },
	{ label: localize('watermark.openBrowser', 'Open Browser'), commandId: 'workbench.action.browser.open', codicon: 'globe' },
];

export class EditorGroupWatermark extends Disposable {

	private static readonly CACHED_WHEN = 'editorGroupWatermark.whenConditions';
	private static readonly SETTINGS_KEY = 'workbench.tips.enabled';
	private static readonly MINIMUM_ENTRIES = 3;

	private readonly cachedWhen: { [when: string]: boolean };

	private readonly shortcuts: HTMLElement;
	private readonly watermarkContainer: HTMLElement;
	private readonly vybeEmptyState: HTMLElement;
	private readonly vybeWorkspaceState: HTMLElement;
	private readonly vybeWorkspaceButtons: HTMLElement;
	private readonly transientDisposables = this._register(new DisposableStore());
	private readonly keybindingLabels = this._register(new DisposableStore());

	private enabled = false;
	private workbenchState: WorkbenchState;

	constructor(
		container: HTMLElement,
		@IKeybindingService private readonly keybindingService: IKeybindingService,
		@IWorkspaceContextService private readonly contextService: IWorkspaceContextService,
		@IContextKeyService private readonly contextKeyService: IContextKeyService,
		@IConfigurationService private readonly configurationService: IConfigurationService,
		@IStorageService private readonly storageService: IStorageService,
		@IWorkspacesService private readonly workspacesService: IWorkspacesService,
		@IHostService private readonly hostService: IHostService,
		@ICommandService private readonly commandService: ICommandService,
		@ILabelService private readonly labelService: ILabelService,
		@IWorkbenchLayoutService private readonly layoutService: IWorkbenchLayoutService
	) {
		super();

		this.cachedWhen = this.storageService.getObject(EditorGroupWatermark.CACHED_WHEN, StorageScope.PROFILE, Object.create(null));
		this.workbenchState = this.contextService.getWorkbenchState();

		const elements = h('.editor-group-watermark', [
			h('.watermark-container@watermarkContainer', [
				h('.letterpress'),
				h('.shortcuts@shortcuts'),
			]),
			h('.vybe-empty-state@vybeEmptyState'),
			h('.vybe-workspace-state@vybeWorkspaceState', [
				h('.vybe-workspace-buttons.watermark-box@vybeWorkspaceButtons'),
			]),
		]);

		append(container, elements.root);
		this.shortcuts = elements.shortcuts;
		this.watermarkContainer = elements.watermarkContainer;
		this.vybeEmptyState = elements.vybeEmptyState;
		this.vybeWorkspaceState = elements.vybeWorkspaceState;
		this.vybeWorkspaceButtons = elements.vybeWorkspaceButtons;
		this.vybeEmptyState.style.display = 'none';
		this.vybeWorkspaceState.style.display = 'none';

		this.registerListeners();

		this.render();
	}

	private registerListeners(): void {
		this._register(this.configurationService.onDidChangeConfiguration(e => {
			if (
				e.affectsConfiguration(EditorGroupWatermark.SETTINGS_KEY) &&
				this.enabled !== this.configurationService.getValue<boolean>(EditorGroupWatermark.SETTINGS_KEY)
			) {
				this.render();
			}
		}));

		this._register(this.contextService.onDidChangeWorkbenchState(workbenchState => {
			if (this.workbenchState !== workbenchState) {
				this.workbenchState = workbenchState;
				this.render();
			}
		}));

		this._register(this.storageService.onWillSaveState(e => {
			if (e.reason === WillSaveStateReason.SHUTDOWN) {
				const entries = [...emptyWindowEntries, ...workspaceEntries, ...otherEntries];
				for (const entry of entries) {
					const when = isWeb ? entry.when?.web : entry.when?.native;
					if (when) {
						this.cachedWhen[entry.id] = this.contextKeyService.contextMatchesRules(when);
					}
				}

				this.storageService.store(EditorGroupWatermark.CACHED_WHEN, JSON.stringify(this.cachedWhen), StorageScope.PROFILE, StorageTarget.MACHINE);
			}
		}));

		this._register(this.workspacesService.onDidChangeRecentlyOpened(() => {
			if (this.workbenchState === WorkbenchState.EMPTY && this.vybeEmptyState.style.display !== 'none') {
				this.render();
			}
		}));
	}

	private render(): void {
		this.enabled = this.configurationService.getValue<boolean>(EditorGroupWatermark.SETTINGS_KEY);

		clearNode(this.shortcuts);
		this.transientDisposables.clear();
		clearNode(this.vybeEmptyState);

		const useVybeEmptyState = this.enabled && this.workbenchState === WorkbenchState.EMPTY;
		const useVybeWorkspaceState = this.enabled && this.workbenchState !== WorkbenchState.EMPTY;

		const root = this.vybeEmptyState.parentElement;
		if (useVybeEmptyState) {
			this.watermarkContainer.style.display = 'none';
			this.vybeEmptyState.style.display = 'flex';
			this.vybeWorkspaceState.style.display = 'none';
			root?.classList.add('vybe-empty-state-visible');
			this.renderVybeEmptyState();
			return;
		}

		if (useVybeWorkspaceState) {
			this.watermarkContainer.style.display = 'none';
			this.vybeEmptyState.style.display = 'none';
			this.vybeWorkspaceState.style.display = 'flex';
			root?.classList.remove('vybe-empty-state-visible');
			this.renderVybeWorkspaceState();
			return;
		}

		root?.classList.remove('vybe-empty-state-visible');
		this.watermarkContainer.style.display = '';
		this.vybeEmptyState.style.display = 'none';
		this.vybeWorkspaceState.style.display = 'none';

		if (!this.enabled) {
			return;
		}

		const entries = this.filterEntries(this.workbenchState !== WorkbenchState.EMPTY ? workspaceEntries : emptyWindowEntries);
		if (entries.length < EditorGroupWatermark.MINIMUM_ENTRIES) {
			const additionalEntries = this.filterEntries(otherEntries);
			shuffle(additionalEntries);
			entries.push(...additionalEntries.slice(0, EditorGroupWatermark.MINIMUM_ENTRIES - entries.length));
		}

		const box = append(this.shortcuts, $('.watermark-box'));

		const update = () => {
			clearNode(box);
			this.keybindingLabels.clear();

			for (const entry of entries) {
				const keys = this.keybindingService.lookupKeybinding(entry.id);
				if (!keys) {
					continue;
				}

				const dl = append(box, $('dl'));
				const dt = append(dl, $('dt'));
				dt.textContent = entry.text;

				const dd = append(dl, $('dd'));

				const label = this.keybindingLabels.add(new KeybindingLabel(dd, OS, { renderUnboundKeybindings: true, ...defaultKeybindingLabelStyles }));
				label.set(keys);
			}
		};

		update();
		this.transientDisposables.add(this.keybindingService.onDidUpdateKeybindings(update));
	}

	private static readonly VYBE_RECENT_LIMIT = 5;

	private renderVybeEmptyState(): void {
		const container = $('.vybe-empty-state-inner');
		append(this.vybeEmptyState, container);

		// Action buttons row
		const buttonsRow = $('.vybe-empty-state-buttons');
		append(container, buttonsRow);

		const openProject = () => this.commandService.executeCommand('workbench.action.files.openFolder');
		const cloneRepo = () => this.commandService.executeCommand('git.clone');
		const connectSsh = () => this.commandService.executeCommand('remote-ssh.connect');

		this.addVybeButton(buttonsRow, 'folder', localize('watermark.openProject', 'Open project'), openProject);
		this.addVybeButton(buttonsRow, 'cloud-download', localize('watermark.cloneRepo', 'Clone repo'), cloneRepo);
		this.addVybeButton(buttonsRow, 'remote', localize('watermark.connectViaSsh', 'Connect via SSH'), connectSsh);

		// Recent projects section
		const recentSection = $('.vybe-empty-state-recent');
		append(container, recentSection);

		const header = $('.vybe-empty-state-recent-header');
		append(recentSection, header);

		const headerLabel = $('span.vybe-empty-state-recent-title');
		headerLabel.textContent = localize('watermark.recentProjects', 'Recent projects');
		append(header, headerLabel);

		const viewAll = $('span.vybe-empty-state-view-all');
		viewAll.textContent = localize('watermark.viewAll', 'View all');
		append(header, viewAll);

		const list = $('.vybe-empty-state-recent-list');
		append(recentSection, list);

		this.workspacesService.getRecentlyOpened().then(recentlyOpened => {
			const workspaces = recentlyOpened.workspaces.slice(0, EditorGroupWatermark.VYBE_RECENT_LIMIT);
			viewAll.textContent = localize('watermark.viewAllN', 'View all ({0})', recentlyOpened.workspaces.length);
			this.transientDisposables.add(addDisposableListener(viewAll, 'click', () => {
				this.commandService.executeCommand('workbench.action.openRecent');
			}));

			for (const recent of workspaces) {
				const openable = this.recentToOpenable(recent);
				if (!openable) {
					continue;
				}
				const label = recent.label || (isRecentFolder(recent)
					? this.labelService.getUriBasenameLabel(recent.folderUri)
					: this.getWorkspaceDisplayName(recent.workspace.configPath));
				const pathLabel = isRecentFolder(recent)
					? this.labelService.getUriLabel(recent.folderUri, { noPrefix: true })
					: this.labelService.getUriLabel(recent.workspace.configPath, { noPrefix: true });
				const row = $('.vybe-empty-state-recent-item');
				const nameSpan = $('div.vybe-empty-state-recent-name');
				nameSpan.textContent = label;
				const pathSpan = $('div.vybe-empty-state-recent-path');
				pathSpan.textContent = pathLabel;
				pathSpan.dir = 'rtl';
				append(row, nameSpan);
				append(row, pathSpan);
				append(list, row);
				this.transientDisposables.add(addDisposableListener(row, 'click', () => {
					this.hostService.openWindow([openable]);
				}));
			}
		});
	}

	private renderVybeWorkspaceState(): void {
		clearNode(this.vybeWorkspaceButtons);
		this.keybindingLabels.clear();

		const update = () => {
			clearNode(this.vybeWorkspaceButtons);
			this.keybindingLabels.clear();
			for (const entry of VYBE_WORKSPACE_WATERMARK_ENTRIES) {
				if (!CommandsRegistry.getCommand(entry.commandId)) {
					continue;
				}
				const partVisible = entry.part !== undefined && this.layoutService.isVisible(entry.part);
				const label = entry.part !== undefined && entry.labelShow !== undefined && entry.labelHide !== undefined
					? (partVisible ? entry.labelHide : entry.labelShow)
					: entry.label;
				const keybindingCommandId = partVisible && entry.keybindingCommandIdWhenVisible !== undefined
					? entry.keybindingCommandIdWhenVisible
					: (entry.keybindingCommandId ?? entry.commandId);
				const keys = this.keybindingService.lookupKeybinding(keybindingCommandId);
				// When part is visible and commandIdWhenVisible is set, run that to hide (e.g. togglePanel for terminal)
				const commandToRun = entry.part !== undefined && entry.commandIdWhenVisible !== undefined && this.layoutService.isVisible(entry.part)
					? entry.commandIdWhenVisible
					: entry.commandId;
				if (commandToRun !== entry.commandId && !CommandsRegistry.getCommand(commandToRun)) {
					continue;
				}
				this.addVybeWorkspaceButton(this.vybeWorkspaceButtons, entry.codicon, label, commandToRun, keys ?? undefined);
			}
		};

		update();
		this.transientDisposables.add(this.keybindingService.onDidUpdateKeybindings(update));
		this.transientDisposables.add(this.layoutService.onDidChangePartVisibility(update));
	}

	private addVybeWorkspaceButton(parent: HTMLElement, _codicon: string, label: string, commandId: string, keys: ResolvedKeybinding | undefined): void {
		const row = $('dl.vybe-workspace-button.watermark-item');
		const dt = append(row, $('dt'));
		dt.textContent = label;
		const dd = append(row, $('dd'));
		if (keys) {
			const keybindingLabel = this.keybindingLabels.add(new KeybindingLabel(dd, OS, { renderUnboundKeybindings: false, ...defaultKeybindingLabelStyles }));
			keybindingLabel.set(keys);
		}
		append(parent, row);
		this.transientDisposables.add(addDisposableListener(row, 'click', () => this.commandService.executeCommand(commandId)));
	}

	private static readonly WORKSPACE_EXT = '.code-workspace';

	private getWorkspaceDisplayName(configPath: URI): string {
		const base = this.labelService.getUriBasenameLabel(configPath);
		return base.endsWith(EditorGroupWatermark.WORKSPACE_EXT)
			? base.slice(0, -EditorGroupWatermark.WORKSPACE_EXT.length)
			: base;
	}

	private recentToOpenable(recent: import('../../../../platform/workspaces/common/workspaces.js').IRecent): IWindowOpenable | undefined {
		if (isRecentFolder(recent)) {
			return { folderUri: recent.folderUri };
		}
		if (isRecentWorkspace(recent)) {
			return { workspaceUri: recent.workspace.configPath };
		}
		return undefined;
	}

	private addVybeButton(parent: HTMLElement, codicon: string, label: string, onClick: () => void): void {
		const btn = $('.vybe-empty-state-button');
		const icon = $('span.codicon');
		icon.classList.add('codicon-' + codicon);
		const text = $('div.vybe-empty-state-button-label');
		text.textContent = label;
		append(btn, icon);
		append(btn, text);
		append(parent, btn);
		this.transientDisposables.add(addDisposableListener(btn, 'click', onClick));
	}

	private filterEntries(entries: WatermarkEntry[]): WatermarkEntry[] {
		const filteredEntries = entries
			.filter(entry => {
				if (this.cachedWhen[entry.id]) {
					return true; // cached from previous session
				}

				const contextKey = isWeb ? entry.when?.web : entry.when?.native;
				return !contextKey /* works without context */ || this.contextKeyService.contextMatchesRules(contextKey);
			})
			.filter(entry => !!CommandsRegistry.getCommand(entry.id))
			.filter(entry => !!this.keybindingService.lookupKeybinding(entry.id));

		return filteredEntries;
	}
}

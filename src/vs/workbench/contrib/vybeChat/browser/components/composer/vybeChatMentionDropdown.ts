/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Phase 4E -- @ mention typeahead dropdown with sub-views.
 *
 * Main view: shows context categories (Files & Folders, Docs, Terminals, etc.)
 * Typing a query filters categories and placeholder files.
 * Clicking a category transitions into its sub-view (file list, terminal list, etc.).
 * ESC in sub-view -> back to main. ESC in main -> close.
 *
 * Scrollbar follows VSCODE_SCROLLBAR_IMPLEMENTATION_GUIDE.md:
 *   - Uses DomScrollableElement with setScrollDimensions() (not scanDomNode)
 *   - max-height on getDomNode() wrapper, never on content element
 *   - Measure via height:auto -> reflow -> read scrollHeight -> constrain back
 */

import { $, append, addDisposableListener, EventType } from '../../../../../../base/browser/dom.js';
import { StandardKeyboardEvent } from '../../../../../../base/browser/keyboardEvent.js';
import { KeyCode } from '../../../../../../base/common/keyCodes.js';
import { DisposableStore, IDisposable } from '../../../../../../base/common/lifecycle.js';
import { DomScrollableElement } from '../../../../../../base/browser/ui/scrollbar/scrollableElement.js';
import { ScrollbarVisibility } from '../../../../../../base/common/scrollable.js';
import { IThemeService } from '../../../../../../platform/theme/common/themeService.js';
import { getVybeDropdownThemeColors, IVybeDropdownThemeColors } from '../../../../vybeDropdown/browser/vybeDropdownTheme.js';
import { URI } from '../../../../../../base/common/uri.js';
import { FileKind } from '../../../../../../platform/files/common/files.js';
import { getIconClasses } from '../../../../../../editor/common/services/getIconClasses.js';
import { IModelService } from '../../../../../../editor/common/services/model.js';
import { ILanguageService } from '../../../../../../editor/common/languages/language.js';

// --- Tokens ------------------------------------------------------------------

const MT = {
	panelWidth: 240,
	borderRadius: 6,
	padding: 2,
	sectionGap: 4,
	itemGap: 2,
	itemPaddingH: 6,
	itemPaddingV: 2,
	itemBorderRadius: 4,
	iconLabelGap: 6,
	iconSize: 14,
	fileIconHeight: 17,
	fileIconMarginLeft: -2,
	labelFontSize: 12,
	labelLineHeight: 17,
	itemContentHeight: 16,
	chevronSize: 8,
	chevronOpacity: 0.3,
	dividerOpacity: 0.8,
	maxScrollHeight: 320,
	anchorGap: 2,
	zIndex: 2648,
	zIndexBackdrop: 2647,
	headerFontSize: 11,
	headerLineHeight: 15,
	headerOpacity: 0.4,
	headerPaddingV: 2,
	headerPaddingH: 6,
} as const;

// --- Types -------------------------------------------------------------------

type MentionView = 'main' | 'files' | 'terminals' | 'pastChats' | 'docs';

interface MentionFileItem {
	name: string;
	dir: string;
	isFolder: boolean;
}

interface MentionCategoryItem {
	id: MentionView | 'browser';
	label: string;
	icon: string;
	hasSubmenu: boolean;
}

interface MentionSimpleItem {
	name: string;
	icon: string;
	isAction?: boolean;
}

// --- Placeholder Data --------------------------------------------------------

const CATEGORIES: MentionCategoryItem[] = [
	{ id: 'files', label: 'Files & Folders', icon: 'codicon-files', hasSubmenu: true },
	{ id: 'docs', label: 'Docs', icon: 'codicon-book', hasSubmenu: true },
	{ id: 'terminals', label: 'Terminals', icon: 'codicon-terminal', hasSubmenu: true },
	{ id: 'pastChats', label: 'Past Chats', icon: 'codicon-comment', hasSubmenu: true },
	{ id: 'browser', label: 'Browser', icon: 'codicon-globe', hasSubmenu: false },
];

const PLACEHOLDER_SEARCH_FILES: MentionFileItem[] = [
	{ name: 'vybeChatComposer.ts', dir: 'browser/components/composer', isFolder: false },
	{ name: 'vybeChatViewPane.ts', dir: 'browser', isFolder: false },
	{ name: 'vybeSettingsEditor.ts', dir: 'browser', isFolder: false },
	{ name: 'vybeChatMentionDropdown.ts', dir: 'browser/components/composer', isFolder: false },
	{ name: 'package.json', dir: 'VYBE-Desktop', isFolder: false },
];

const PLACEHOLDER_FILE_BROWSER: MentionFileItem[] = [
	{ name: 'docs', dir: 'VYBE-Desktop/', isFolder: true },
	{ name: 'browser', dir: 'src/vs/workbench/contrib/vybeChat/', isFolder: true },
	{ name: 'components', dir: 'src/vs/workbench/contrib/vybeChat/browser/', isFolder: true },
	{ name: 'src', dir: 'VYBE-Desktop/', isFolder: true },
	{ name: 'contrib', dir: 'src/vs/workbench/', isFolder: true },
	{ name: 'workbench', dir: 'src/vs/', isFolder: true },
	{ name: 'vybeChatComposer.ts', dir: 'browser/components/composer', isFolder: false },
	{ name: 'vybeChatViewPane.ts', dir: 'browser', isFolder: false },
	{ name: 'vybeSettingsEditor.ts', dir: 'browser', isFolder: false },
	{ name: 'package.json', dir: 'VYBE-Desktop', isFolder: false },
	{ name: 'product.json', dir: 'VYBE-Desktop', isFolder: false },
	{ name: 'workbench.contribution.ts', dir: 'src/vs/workbench/browser', isFolder: false },
	{ name: 'vybeChatMentionDropdown.ts', dir: 'browser/components/composer', isFolder: false },
	{ name: 'vybeChatComposerDropdowns.ts', dir: 'browser/components/composer', isFolder: false },
	{ name: 'vybeChatModelDropdown.ts', dir: 'browser/components/composer', isFolder: false },
	{ name: 'vybeChatImageAttachments.ts', dir: 'browser/components/composer', isFolder: false },
	{ name: 'compositeBarActions.ts', dir: 'src/vs/workbench/browser/parts', isFolder: false },
	{ name: 'activitybarPart.ts', dir: 'src/vs/workbench/browser/parts/activitybar', isFolder: false },
	{ name: 'hygiene.ts', dir: 'build', isFolder: false },
	{ name: 'tsconfig.json', dir: 'src', isFolder: false },
	{ name: 'editorOptions.ts', dir: 'src/vs/editor/common/config', isFolder: false },
	{ name: '.gitignore', dir: 'VYBE-Desktop', isFolder: false },
];

const PLACEHOLDER_TERMINALS: MentionSimpleItem[] = [
	{ name: 'node', icon: 'codicon-terminal' },
	{ name: 'zsh', icon: 'codicon-terminal' },
	{ name: 'npm run watch', icon: 'codicon-terminal' },
];

const PLACEHOLDER_PAST_CHATS: MentionSimpleItem[] = [
	{ name: 'Fix @ dropdown background', icon: 'codicon-comment' },
	{ name: 'Implement model dropdown', icon: 'codicon-comment' },
	{ name: 'Build empty chat state', icon: 'codicon-comment' },
];

const PLACEHOLDER_DOCS: MentionSimpleItem[] = [
	{ name: 'Add new doc', icon: 'codicon-add', isAction: true },
	{ name: 'VS Code API Reference', icon: 'codicon-book' },
	{ name: 'TypeScript Documentation', icon: 'codicon-book' },
	{ name: 'LangGraph Documentation', icon: 'codicon-book' },
];

const VIEW_HEADERS: Record<string, string> = {
	files: 'Files & Folders',
	terminals: 'Terminals',
	pastChats: 'Past Chats',
	docs: 'Docs',
};

// --- Public API --------------------------------------------------------------

export interface IMentionDropdownController extends IDisposable {
	updateQuery(query: string): void;
}

export interface MentionDropdownCallbacks {
	onSelectFile: (name: string, dir: string, isFolder: boolean) => void;
	onSelectCategory: (id: string) => void;
	onSelectItem: (type: string, name: string) => void;
	onAction: (actionId: string) => void;
	onClose: () => void;
}

export function showMentionDropdown(
	anchorRect: DOMRect,
	win: Window,
	openDownward: boolean,
	themeService: IThemeService,
	modelService: IModelService,
	languageService: ILanguageService,
	callbacks: MentionDropdownCallbacks,
): IMentionDropdownController {
	const doc = win.document;
	const body = doc.body;
	const store = new DisposableStore();
	let closed = false;

	const colors = getVybeDropdownThemeColors(themeService);

	let currentView: MentionView = 'main';
	let focusables: HTMLElement[] = [];
	let focusedIndex = 0;
	let currentQuery = '';

	// -- Backdrop ------------------------------------------------------
	const backdrop = append(body, $('div.vybe-mention-backdrop'));
	backdrop.style.cssText = `
		position: fixed; top: 0; left: 0; right: 0; bottom: 0;
		background-color: transparent;
		z-index: ${MT.zIndexBackdrop};
		pointer-events: all;
	`;

	// -- Wrapper ------------------------------------------------------
	const wrapper = append(body, $('div.vybe-mention-wrapper'));

	// eslint-disable-next-line no-restricted-syntax
	const workbench = doc.querySelector('.monaco-workbench') as HTMLElement | null;
	if (workbench) {
		for (const cls of ['vs-dark', 'vs', 'hc-black', 'hc-light']) {
			if (workbench.classList.contains(cls)) {
				wrapper.classList.add(cls);
			}
		}
	}
	wrapper.classList.add('show-file-icons');

	// Set positioning first via cssText (replaces all inline styles)
	if (openDownward) {
		wrapper.style.cssText = `
			position: fixed; z-index: ${MT.zIndex};
			top: ${anchorRect.bottom + MT.anchorGap}px;
			left: ${anchorRect.left}px;
			transform-origin: left top; width: initial;
		`;
	} else {
		wrapper.style.cssText = `
			position: fixed; z-index: ${MT.zIndex};
			top: ${anchorRect.top - MT.anchorGap}px;
			left: ${anchorRect.left}px;
			transform: translateY(-100%);
			transform-origin: left bottom; width: initial;
		`;
	}

	// Copy scrollbar CSS variables AFTER cssText (which wipes inline styles).
	// These are set on .monaco-workbench but our dropdown is appended to body.
	if (workbench) {
		const wbStyle = win.getComputedStyle(workbench);
		for (const v of [
			'--vscode-scrollbarSlider-background',
			'--vscode-scrollbarSlider-hoverBackground',
			'--vscode-scrollbarSlider-activeBackground',
		]) {
			const val = wbStyle.getPropertyValue(v);
			if (val) { wrapper.style.setProperty(v, val.trim()); }
		}
	}

	// -- Panel --------------------------------------------------------
	const panel = append(wrapper, $('div.vybe-mention-panel'));
	panel.setAttribute('tabindex', '-1');
	applyPanelStyles(panel, colors);

	// -- Scrollable (per VSCODE_SCROLLBAR_IMPLEMENTATION_GUIDE) -------
	const scrollContent = $('div.vybe-mention-scroll-content');
	scrollContent.style.cssText = 'display: block; width: 100%;';

	const scrollable = store.add(new DomScrollableElement(scrollContent, {
		vertical: ScrollbarVisibility.Auto,
		horizontal: ScrollbarVisibility.Hidden,
		useShadows: false,
		verticalScrollbarSize: 6,
	}));

	const scrollDom = scrollable.getDomNode();
	scrollDom.style.cssText = `
		position: relative;
		overflow: hidden;
		width: 100%;
		max-height: ${MT.maxScrollHeight}px;
	`;
	panel.appendChild(scrollDom);

	function updateScrollDimensions(): void {
		const viewportWidth = scrollDom.clientWidth;

		scrollContent.style.height = 'auto';
		void scrollContent.offsetHeight;
		const contentHeight = scrollContent.scrollHeight;

		const viewportHeight = Math.min(contentHeight, MT.maxScrollHeight);

		scrollContent.style.height = `${viewportHeight}px`;
		scrollDom.style.height = `${viewportHeight}px`;

		scrollable.setScrollDimensions({
			width: viewportWidth,
			scrollWidth: viewportWidth,
			height: viewportHeight,
			scrollHeight: contentHeight,
		});
	}

	// --- Rendering ---------------------------------------------------

	function render(): void {
		while (scrollContent.firstChild) {
			scrollContent.removeChild(scrollContent.firstChild);
		}
		focusables = [];
		focusedIndex = 0;

		switch (currentView) {
			case 'main': renderMainView(); break;
			case 'files': renderFilesView(); break;
			case 'terminals': renderSimpleListView('terminals', PLACEHOLDER_TERMINALS); break;
			case 'pastChats': renderSimpleListView('pastChats', PLACEHOLDER_PAST_CHATS); break;
			case 'docs': renderSimpleListView('docs', PLACEHOLDER_DOCS); break;
		}

		updateHighlight();
		setTimeout(() => updateScrollDimensions(), 0);
	}

	// -- Main view: categories (+ search files when query) -----------

	function renderMainView(): void {
		const q = currentQuery.toLowerCase();
		const content = makeContentContainer();

		if (q) {
			const matchFiles = PLACEHOLDER_SEARCH_FILES.filter(f => f.name.toLowerCase().includes(q));
			const matchCats = CATEGORIES.filter(c => c.label.toLowerCase().includes(q));

			if (matchFiles.length > 0) {
				const section = makeSection(content);
				matchFiles.forEach(f => focusables.push(buildFileRow(section, f)));
			}

			if (matchFiles.length > 0 && matchCats.length > 0) {
				buildDivider(content);
			}

			if (matchCats.length > 0) {
				const section = makeSection(content);
				matchCats.forEach(c => focusables.push(buildCategoryRow(section, c)));
			}

			if (matchFiles.length === 0 && matchCats.length === 0) {
				buildEmptyState(content, 'No results found');
			}
		} else {
			const section = makeSection(content);
			CATEGORIES.forEach(c => focusables.push(buildCategoryRow(section, c)));
		}

		attachMouseHover(content);
	}

	// -- Files & Folders sub-view -------------------------------------

	function renderFilesView(): void {
		const q = currentQuery.toLowerCase();
		const items = q
			? PLACEHOLDER_FILE_BROWSER.filter(f => f.name.toLowerCase().includes(q))
			: PLACEHOLDER_FILE_BROWSER;

		const content = makeContentContainer();
		buildSectionHeader(content, VIEW_HEADERS['files']);

		if (items.length > 0) {
			const section = makeSection(content);
			items.forEach(f => focusables.push(buildFileRow(section, f)));
		} else {
			buildEmptyState(content, 'No files found');
		}

		attachMouseHover(content);
	}

	// -- Generic simple-list sub-view (terminals, chats, docs) --------

	function renderSimpleListView(viewKey: string, data: MentionSimpleItem[]): void {
		const q = currentQuery.toLowerCase();
		const items = q
			? data.filter(d => d.name.toLowerCase().includes(q))
			: data;

		const content = makeContentContainer();
		buildSectionHeader(content, VIEW_HEADERS[viewKey]);

		if (items.length > 0) {
			const section = makeSection(content);
			items.forEach(item => focusables.push(buildSimpleRow(section, item, viewKey)));
		} else {
			buildEmptyState(content, `No ${VIEW_HEADERS[viewKey].toLowerCase()} found`);
		}

		attachMouseHover(content);
	}

	// --- Shared builders ---------------------------------------------

	function makeContentContainer(): HTMLElement {
		const content = append(scrollContent, $('div'));
		content.style.cssText = `
			display: flex; flex-direction: column;
			gap: ${MT.sectionGap}px;
			padding: ${MT.padding}px;
		`;
		return content;
	}

	function makeSection(container: HTMLElement): HTMLElement {
		const section = append(container, $('div'));
		section.style.cssText = `display: flex; flex-direction: column; gap: ${MT.itemGap}px;`;
		return section;
	}

	function buildSectionHeader(container: HTMLElement, label: string): void {
		const header = append(container, $('div'));
		header.style.cssText = `
			font-size: ${MT.headerFontSize}px;
			line-height: ${MT.headerLineHeight}px;
			opacity: ${MT.headerOpacity};
			padding: ${MT.headerPaddingV}px ${MT.headerPaddingH}px;
			color: ${colors.panelFg};
		`;
		header.textContent = label;
	}

	function buildDivider(container: HTMLElement): void {
		const divider = append(container, $('div'));
		divider.style.cssText = `
			height: 1px; width: 100%;
			background-color: ${colors.separator};
			opacity: ${MT.dividerOpacity};
		`;
	}

	function buildEmptyState(container: HTMLElement, message: string): void {
		const empty = append(container, $('div'));
		empty.style.cssText = `
			padding: ${MT.itemPaddingV}px ${MT.itemPaddingH}px;
			font-size: ${MT.labelFontSize}px;
			line-height: ${MT.labelLineHeight}px;
			color: ${colors.mutedFg}; opacity: 0.6;
		`;
		empty.textContent = message;
	}

	function attachMouseHover(content: HTMLElement): void {
		store.add(addDisposableListener(content, EventType.MOUSE_OVER, (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			for (let i = 0; i < focusables.length; i++) {
				if (focusables[i] === target || focusables[i].contains(target)) {
					focusedIndex = i;
					updateHighlight();
					break;
				}
			}
		}));
	}

	// -- Row: file/folder item ----------------------------------------

	function buildFileRow(container: HTMLElement, file: MentionFileItem): HTMLElement {
		const row = append(container, $('div.vybe-mention-item'));
		row.style.cssText = rowStyle();

		const left = append(row, $('div'));
		left.style.cssText = `
			display: flex; align-items: center;
			gap: ${MT.iconLabelGap}px; min-width: 0;
			height: ${MT.itemContentHeight}px; flex: 1; overflow: hidden;
		`;

		const iconWrap = append(left, $('span'));
		iconWrap.style.cssText = 'flex-shrink: 0; display: flex; align-items: center; justify-content: center;';

		if (file.isFolder) {
			const folderIcon = append(iconWrap, $('i.codicon.codicon-folder'));
			folderIcon.style.cssText = `
				font-size: ${MT.iconSize}px;
				width: ${MT.iconSize}px; height: ${MT.iconSize}px;
				display: flex; align-items: center; justify-content: center;
				color: ${colors.panelFg};
			`;
		} else {
			const fileUri = URI.file(`/placeholder/${file.dir}/${file.name}`);
			const iconClasses = getIconClasses(modelService, languageService, fileUri, FileKind.FILE);

			const iconOuter = doc.createElement('div');
			iconOuter.style.cssText = `height: ${MT.fileIconHeight}px; margin-left: ${MT.fileIconMarginLeft}px;`;
			const iconInner = doc.createElement('div');
			iconInner.style.cssText = 'position: relative; height: 100%; width: 100%; display: flex; align-items: center; justify-content: center;';
			iconOuter.appendChild(iconInner);
			const iconEl = doc.createElement('div');
			iconEl.className = iconClasses.join(' ');
			iconEl.style.height = '100%';
			iconInner.appendChild(iconEl);
			iconWrap.appendChild(iconOuter);
		}

		const nameEl = append(left, $('span'));
		nameEl.textContent = file.name;
		nameEl.style.cssText = `
			font-size: ${MT.labelFontSize}px; line-height: ${MT.labelLineHeight}px;
			white-space: nowrap; text-overflow: ellipsis; overflow: hidden;
			color: ${colors.panelFg}; flex-shrink: 1; min-width: 0;
		`;

		store.add(addDisposableListener(row, 'click', (e) => {
			e.stopPropagation();
			closeAndCallback(() => callbacks.onSelectFile(file.name, file.dir, file.isFolder));
		}));

		return row;
	}

	// -- Row: category item (with optional chevron) -------------------

	function buildCategoryRow(container: HTMLElement, cat: MentionCategoryItem): HTMLElement {
		const row = append(container, $('div.vybe-mention-item'));
		row.style.cssText = rowStyle();

		const left = append(row, $('div'));
		left.style.cssText = `
			display: flex; align-items: center;
			gap: ${MT.iconLabelGap}px; min-width: 0;
			height: ${MT.itemContentHeight}px; flex: 1;
		`;

		const icon = append(left, $(`i.codicon.${cat.icon}`));
		icon.style.cssText = `
			font-size: ${MT.iconSize}px;
			width: ${MT.iconSize}px; height: ${MT.iconSize}px;
			display: flex; align-items: center; justify-content: center;
			flex-shrink: 0; color: ${colors.panelFg};
		`;

		const labelEl = append(left, $('span'));
		labelEl.textContent = cat.label;
		labelEl.style.cssText = `
			font-size: ${MT.labelFontSize}px; line-height: ${MT.labelLineHeight}px;
			white-space: nowrap; text-overflow: ellipsis; overflow: hidden;
			color: ${colors.panelFg};
		`;

		if (cat.hasSubmenu) {
			const right = append(row, $('div'));
			right.style.cssText = `
				display: flex; align-items: center; justify-content: center;
				height: ${MT.itemContentHeight}px; flex-shrink: 0;
			`;
			const chevron = append(right, $('span.codicon.codicon-chevron-right'));
			chevron.style.cssText = `
				font-size: ${MT.chevronSize}px;
				opacity: ${MT.chevronOpacity};
				color: ${colors.panelFg};
			`;
		}

		store.add(addDisposableListener(row, 'click', (e) => {
			e.stopPropagation();
			if (cat.hasSubmenu && isNavigableView(cat.id)) {
				navigateTo(cat.id as MentionView);
			} else {
				closeAndCallback(() => callbacks.onSelectCategory(cat.id));
			}
		}));

		return row;
	}

	// -- Row: simple item (terminal, chat, doc) -----------------------

	function buildSimpleRow(container: HTMLElement, item: MentionSimpleItem, viewKey: string): HTMLElement {
		const row = append(container, $('div.vybe-mention-item'));
		row.style.cssText = rowStyle();

		const left = append(row, $('div'));
		left.style.cssText = `
			display: flex; align-items: center;
			gap: ${MT.iconLabelGap}px; min-width: 0;
			height: ${MT.itemContentHeight}px; flex: 1;
		`;

		const icon = append(left, $(`i.codicon.${item.icon}`));
		icon.style.cssText = `
			font-size: ${MT.iconSize}px;
			width: ${MT.iconSize}px; height: ${MT.iconSize}px;
			display: flex; align-items: center; justify-content: center;
			flex-shrink: 0; color: ${colors.panelFg};
		`;

		const labelEl = append(left, $('span'));
		labelEl.textContent = item.name;
		labelEl.style.cssText = `
			font-size: ${MT.labelFontSize}px; line-height: ${MT.labelLineHeight}px;
			white-space: nowrap; text-overflow: ellipsis; overflow: hidden;
			color: ${colors.panelFg};
		`;

		store.add(addDisposableListener(row, 'click', (e) => {
			e.stopPropagation();
			if (item.isAction) {
				closeAndCallback(() => callbacks.onAction(item.name));
			} else {
				closeAndCallback(() => callbacks.onSelectItem(viewKey, item.name));
			}
		}));

		return row;
	}

	// --- Helpers -----------------------------------------------------

	function rowStyle(): string {
		return `
			display: flex; align-items: center; justify-content: space-between;
			padding: ${MT.itemPaddingV}px ${MT.itemPaddingH}px;
			border-radius: ${MT.itemBorderRadius}px;
			cursor: pointer; min-width: 0;
			height: ${MT.itemContentHeight + MT.itemPaddingV * 2}px;
			box-sizing: border-box; gap: ${MT.iconLabelGap}px;
		`;
	}

	function isNavigableView(id: string): boolean {
		return id === 'files' || id === 'terminals' || id === 'pastChats' || id === 'docs';
	}

	function navigateTo(view: MentionView): void {
		currentView = view;
		render();
	}

	function navigateBack(): void {
		currentView = 'main';
		render();
	}

	// -- Panel styles -------------------------------------------------

	function applyPanelStyles(el: HTMLElement, c: IVybeDropdownThemeColors): void {
		el.style.cssText = `
			box-sizing: border-box;
			display: flex; flex-direction: column;
			width: ${MT.panelWidth}px;
			background-color: ${c.panelBg};
			border: 1px solid ${c.separator};
			border-radius: ${MT.borderRadius}px;
			box-shadow: ${c.shadow};
			color: ${c.panelFg};
			font-family: -apple-system, "system-ui", sans-serif;
			font-size: ${MT.labelFontSize}px;
			line-height: ${MT.labelLineHeight}px;
			user-select: none; outline: none;
			contain: paint; pointer-events: auto;
		`;
	}

	// -- Highlight ----------------------------------------------------

	function updateHighlight(): void {
		focusables.forEach((el, i) => {
			el.style.backgroundColor = i === focusedIndex ? colors.hoverBg : 'transparent';
		});
	}

	// -- Keyboard (capture phase) -------------------------------------

	const onKeyDown = (e: KeyboardEvent) => {
		if (closed) { return; }
		const event = new StandardKeyboardEvent(e);

		if (event.equals(KeyCode.DownArrow)) {
			if (focusables.length > 0) {
				focusedIndex = (focusedIndex + 1) % focusables.length;
				updateHighlight();
				scrollToFocused();
			}
			event.preventDefault();
			event.stopPropagation();
		} else if (event.equals(KeyCode.UpArrow)) {
			if (focusables.length > 0) {
				focusedIndex = (focusedIndex - 1 + focusables.length) % focusables.length;
				updateHighlight();
				scrollToFocused();
			}
			event.preventDefault();
			event.stopPropagation();
		} else if (event.equals(KeyCode.Enter)) {
			if (focusedIndex >= 0 && focusedIndex < focusables.length) {
				focusables[focusedIndex].click();
			}
			event.preventDefault();
			event.stopPropagation();
		} else if (event.equals(KeyCode.Escape)) {
			if (currentView !== 'main') {
				navigateBack();
			} else {
				close();
			}
			event.preventDefault();
			event.stopPropagation();
		}
	};

	doc.addEventListener('keydown', onKeyDown, true);
	store.add({ dispose: () => doc.removeEventListener('keydown', onKeyDown, true) });

	// -- Scroll to focused --------------------------------------------

	function scrollToFocused(): void {
		if (focusedIndex < 0 || focusedIndex >= focusables.length) { return; }
		const el = focusables[focusedIndex];
		const viewportRect = scrollDom.getBoundingClientRect();
		const elRect = el.getBoundingClientRect();

		if (elRect.top < viewportRect.top) {
			const delta = viewportRect.top - elRect.top;
			scrollable.setScrollPosition({ scrollTop: scrollable.getScrollPosition().scrollTop - delta });
		} else if (elRect.bottom > viewportRect.bottom) {
			const delta = elRect.bottom - viewportRect.bottom;
			scrollable.setScrollPosition({ scrollTop: scrollable.getScrollPosition().scrollTop + delta });
		}
	}

	// -- Outside click ------------------------------------------------

	backdrop.addEventListener('mousedown', (e) => { e.preventDefault(); close(); });

	const outsideHandler = (e: MouseEvent) => {
		if (closed) { return; }
		if (!wrapper.contains(e.target as Node)) { close(); }
	};
	doc.addEventListener('mousedown', outsideHandler);

	// -- Theme change -------------------------------------------------

	store.add(themeService.onDidColorThemeChange(() => {
		if (closed) { return; }
		const c = getVybeDropdownThemeColors(themeService);
		applyPanelStyles(panel, c);
	}));

	// -- Close / cleanup ----------------------------------------------

	function close(): void {
		if (closed) { return; }
		closed = true;
		store.dispose();
		doc.removeEventListener('mousedown', outsideHandler);
		backdrop.remove();
		wrapper.remove();
		callbacks.onClose();
	}

	function closeAndCallback(cb: () => void): void {
		close();
		cb();
	}

	// -- Initial render -----------------------------------------------
	render();

	// -- Controller ---------------------------------------------------
	return {
		updateQuery(query: string): void {
			if (query === currentQuery) { return; }
			currentQuery = query;
			render();
		},
		dispose: close,
	};
}

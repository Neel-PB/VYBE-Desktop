/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { $, append, addDisposableListener, EventType, getWindow } from '../../../../base/browser/dom.js';
import { StandardKeyboardEvent } from '../../../../base/browser/keyboardEvent.js';
import { KeyCode } from '../../../../base/common/keyCodes.js';
import { Disposable, DisposableStore, IDisposable } from '../../../../base/common/lifecycle.js';
import { IThemeService } from '../../../../platform/theme/common/themeService.js';
import { showVybeDropdownPanel, IVybeDropdownContentResult } from '../../vybeDropdown/browser/vybeDropdownPanel.js';
import { getDropdownDividerStyle, getDropdownRowBaseStyle } from '../../vybeDropdown/browser/vybeDropdownStyles.js';
import { getVybeDropdownThemeColors, IVybeDropdownThemeColors } from '../../vybeDropdown/browser/vybeDropdownTheme.js';
import { VybeDropdownTokens } from '../../vybeDropdown/browser/vybeDropdownTokens.js';
import { IWorkbenchThemeService } from '../../../services/themes/common/workbenchThemeService.js';
import type { IWorkbenchColorTheme } from '../../../services/themes/common/workbenchThemeService.js';
import { ColorScheme } from '../../../../platform/theme/common/theme.js';
import { ICommandService } from '../../../../platform/commands/common/commands.js';

type PlanTier = 'Free' | 'Pro' | 'Pro+' | 'Max';

function upgradeLabel(plan: PlanTier): string {
	switch (plan) {
		case 'Free': return 'Upgrade to Pro';
		case 'Pro': return 'Upgrade to Pro+';
		case 'Pro+': return 'Upgrade to Max';
		default: return '';
	}
}

/**
 * Account dropdown for the title bar: plan header, upgrade button, manage account,
 * Messages with badge, and Theme submenu (theme names only).
 */
export class VybeAccountDropdown extends Disposable {
	private _panelDisposable: IDisposable | null = null;

	/** Current plan – placeholder until account/plan service exists. */
	private _currentPlan: PlanTier = 'Free';

	/** Unread messages count – placeholder (1 temporarily to show badge). */
	private _messagesCount: number = 1;

	private static readonly OPEN_MESSAGES_COMMAND_ID = 'vybe.openMessages';

	constructor(
		private readonly anchorElement: HTMLElement,
		@IThemeService private readonly themeService: IThemeService,
		@IWorkbenchThemeService private readonly workbenchThemeService: IWorkbenchThemeService,
		@ICommandService private readonly commandService: ICommandService,
	) {
		super();
	}

	show(anchor?: HTMLElement): void {
		if (this._panelDisposable) {
			this.hide();
			return;
		}
		const el = anchor ?? this.anchorElement;
		this._panelDisposable = showVybeDropdownPanel(el, this.themeService, {
			buildContent: (container: HTMLElement) => this.buildContent(container),
			width: VybeDropdownTokens.panelWidthAccount,
			onClose: () => { this._panelDisposable = null; },
		});
	}

	private buildContent(container: HTMLElement): IVybeDropdownContentResult {
		const T = VybeDropdownTokens;
		const colors = getVybeDropdownThemeColors(this.themeService);
		const colorsRef = { current: colors };

		// 1) Header row: same as Vybe Settings sidebar (avatar + name + plan), no click
		const header = append(container, $('div.vybe-account-dropdown-header'));
		header.style.cssText = `
			display: flex; align-items: center; gap: ${T.headerGap}px;
			box-sizing: border-box; width: 100%;
			padding: ${T.headerPaddingTop}px ${T.headerPaddingH}px ${T.headerPaddingBottom}px ${T.headerPaddingH}px; margin: 0;
			user-select: none; pointer-events: none;
		`;

		const avatar = append(header, $('div.vybe-account-dropdown-avatar'));
		avatar.style.cssText = `
			width: ${T.avatarSize}px; height: ${T.avatarSize}px; border-radius: 50%;
			background-color: ${colors.switchOff};
			display: flex; align-items: center; justify-content: center; flex-shrink: 0;
		`;
		const avatarInitial = append(avatar, $('span'));
		avatarInitial.textContent = 'U';
		avatarInitial.style.cssText = `
			font-size: ${T.fontSizeSmall}px; text-transform: uppercase;
			color: ${colors.mutedFg}; font-weight: 400;
		`;

		const headerContent = append(header, $('div.vybe-account-dropdown-header-content'));
		headerContent.style.cssText = `display: flex; flex-direction: column; gap: ${T.headerContentGap}px; flex: 1; min-width: 0;`;

		const nameEl = append(headerContent, $('p'));
		nameEl.textContent = 'User';
		nameEl.style.cssText = `
			margin: 0; font-size: ${T.fontSizeSmall}px; color: ${colors.panelFg};
			overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
		`;

		const planEl = append(headerContent, $('p'));
		planEl.textContent = this._currentPlan === 'Free' || this._currentPlan === 'Max'
			? this._currentPlan
			: this._currentPlan === 'Pro+' ? 'Pro+ Plan' : 'Pro Plan';
		planEl.style.cssText = `
			margin: 0; font-size: ${T.fontSizeSmall}px; color: ${colors.mutedFg};
			font-weight: 400; opacity: 0.9;
			overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
		`;

		let upgradeBtn: HTMLButtonElement | null = null;
		// 2) Upgrade button (hidden for Max) – same horizontal inset as rows, full width minus gaps, centered label
		if (this._currentPlan !== 'Max') {
			const btnLabel = upgradeLabel(this._currentPlan);
			const btn = append(container, $('button.vybe-account-dropdown-upgrade')) as HTMLButtonElement;
			btn.textContent = btnLabel;
			btn.type = 'button';
			btn.tabIndex = -1;
			const btnBg = colors.switchOn && colors.switchOn !== 'transparent' && !/rgba?\([^)]*,\s*0\)/.test(colors.switchOn)
				? colors.switchOn
				: '#0e639c';
			const btnFg = colors.switchKnob && colors.switchKnob !== 'transparent' ? colors.switchKnob : '#ffffff';
			btn.style.cssText = `
				box-sizing: border-box;
				width: calc(100% - ${T.rowMarginH * 2}px);
				margin: 0 ${T.rowMarginH}px;
				height: ${T.rowHeight}px;
				padding: 0 ${T.rowPaddingH}px;
				background-color: ${btnBg};
				color: ${btnFg};
				border: none;
				border-radius: ${T.rowBorderRadius}px;
				font-size: ${T.fontSizeSmall}px;
				font-weight: 500;
				text-align: center;
				cursor: pointer;
				font-family: inherit;
			`;
			addDisposableListener(btn, 'click', () => { /* TODO: open upgrade flow */ });
			upgradeBtn = btn;
		}

		container.appendChild(this.createDivider(colors));

		// 3) Manage account + Messages (one group, left-aligned, no divider between)
		const manageRow = this.createLeftAlignedRow('Manage account', colors, () => { /* TODO */ });
		manageRow.dataset.hoverBg = colors.hoverBg;
		container.appendChild(manageRow);

		const messagesRow = this.createMessagesRow(colors);
		messagesRow.dataset.hoverBg = colors.hoverBg;
		container.appendChild(messagesRow);

		container.appendChild(this.createDivider(colors));

		// 4) Theme submenu row (chevron rotates; theme options in keyboard nav when open)
		const themeRef = { isOpen: (): boolean => false, getOptions: (): HTMLElement[] => [] };
		const themeWrapper = this.createThemeSubmenuRow(colorsRef, themeRef);
		const themeRow = themeWrapper.querySelector('.vybe-dropdown-row--submenu') as HTMLElement;
		themeRow.dataset.hoverBg = colors.hoverBg;
		container.appendChild(themeWrapper);

		// Delegated hover: one listener so updateTheme can change data-hover-bg and hover color updates
		const store = new DisposableStore();
		store.add(addDisposableListener(container, 'mouseenter', (e: MouseEvent) => {
			const row = (e.target as HTMLElement).closest?.('.vybe-dropdown-row, .vybe-dropdown-submenu-option') as HTMLElement | null;
			if (row?.dataset.hoverBg) row.style.backgroundColor = row.dataset.hoverBg;
		}, true));
		store.add(addDisposableListener(container, 'mouseleave', (e: MouseEvent) => {
			const row = (e.target as HTMLElement).closest?.('.vybe-dropdown-row, .vybe-dropdown-submenu-option') as HTMLElement | null;
			if (row) row.style.backgroundColor = 'transparent';
		}, true));

		const focusables: HTMLElement[] = [manageRow, messagesRow, themeRow];
		const navResult = this.setupKeyboardNav(container, focusables, colorsRef, themeRef);
		store.add(navResult);

		const messagesBadge = messagesRow.querySelector('.vybe-account-dropdown-messages-badge') as HTMLElement | null;
		const themeRowLabel = themeRow.querySelector('span:first-child') as HTMLElement;
		const themeRowValue = themeRow.querySelector('.vybe-account-dropdown-theme-value') as HTMLElement;
		const themeRowChevron = themeRow.querySelector('.vybe-account-dropdown-theme-chevron') as HTMLElement;

		const updateTheme = (c: IVybeDropdownThemeColors): void => {
			colorsRef.current = c;
			avatar.style.backgroundColor = c.switchOff;
			avatarInitial.style.color = c.mutedFg;
			nameEl.style.color = c.panelFg;
			planEl.style.color = c.mutedFg;
			if (upgradeBtn) {
				const btnBg = c.switchOn && c.switchOn !== 'transparent' && !/rgba?\([^)]*,\s*0\)/.test(c.switchOn) ? c.switchOn : '#0e639c';
				const btnFg = c.switchKnob && c.switchKnob !== 'transparent' ? c.switchKnob : '#ffffff';
				upgradeBtn.style.backgroundColor = btnBg;
				upgradeBtn.style.color = btnFg;
			}
			container.querySelectorAll('.vybe-dropdown-divider').forEach((d) => {
				(d as HTMLElement).style.backgroundColor = c.separator;
			});
			manageRow.style.color = c.panelFg;
			manageRow.dataset.hoverBg = c.hoverBg;
			messagesRow.style.color = c.panelFg;
			messagesRow.dataset.hoverBg = c.hoverBg;
			if (messagesBadge) {
				messagesBadge.style.backgroundColor = c.switchOn;
				messagesBadge.style.color = c.switchKnob;
			}
			themeRowLabel.style.color = c.panelFg;
			themeRowValue.style.color = c.mutedFg;
			themeRowChevron.style.color = c.panelFg;
			themeRow.dataset.hoverBg = c.hoverBg;
			container.querySelectorAll('.vybe-dropdown-submenu-category').forEach((el) => {
				(el as HTMLElement).style.color = c.mutedFg;
			});
			container.querySelectorAll('.vybe-dropdown-submenu-option').forEach((opt) => {
				const o = opt as HTMLElement;
				o.dataset.hoverBg = c.hoverBg;
				const text = o.querySelector('span:first-of-type') as HTMLElement;
				const check = o.querySelector('.vybe-dropdown-submenu-option-check') as HTMLElement;
				if (text) text.style.color = c.panelFg;
				if (check) check.style.color = c.panelFg;
			});
			navResult.refreshHighlight();
		};

		return { dispose: () => store.dispose(), updateTheme };
	}

	private createDivider(colors: IVybeDropdownThemeColors): HTMLElement {
		const divider = $('div');
		divider.className = 'vybe-dropdown-divider';
		divider.style.cssText = `${getDropdownDividerStyle(VybeDropdownTokens)} background-color: ${colors.separator}; opacity: 0.8;`;
		return divider;
	}

	/** Reusable submenu category label (e.g. "Light", "Dark"). Same font size as options; muted but readable. */
	private createSubmenuCategoryLabel(label: string, colors: IVybeDropdownThemeColors): HTMLElement {
		const T = VybeDropdownTokens;
		const el = $('div');
		el.className = 'vybe-dropdown-submenu-category';
		el.setAttribute('role', 'presentation');
		el.textContent = label;
		el.style.cssText = `
			box-sizing: border-box;
			width: calc(100% - ${T.rowMarginH * 2}px);
			margin: 0 ${T.rowMarginH}px;
			padding: ${T.rowPaddingV}px ${T.rowPaddingH}px ${T.categoryLabelPaddingBottom}px;
			font-size: ${T.fontSizeSmall}px;
			line-height: ${T.lineHeightRow}px;
			color: ${colors.mutedFg};
			font-weight: 400;
			opacity: 0.9;
			text-align: right;
		`;
		return el;
	}

	private createLeftAlignedRow(label: string, colors: IVybeDropdownThemeColors, onClick: () => void): HTMLElement {
		const T = VybeDropdownTokens;
		const row = $('div');
		row.className = 'vybe-dropdown-row';
		row.style.cssText = `${getDropdownRowBaseStyle(T)} color: ${colors.panelFg};`;
		row.textContent = label;
		addDisposableListener(row, 'click', () => onClick());
		return row;
	}

	private createMessagesRow(colors: IVybeDropdownThemeColors): HTMLElement {
		const T = VybeDropdownTokens;
		const row = $('div');
		row.className = 'vybe-dropdown-row';
		row.style.cssText = `${getDropdownRowBaseStyle(T, { justifyContent: 'space-between' })} color: ${colors.panelFg};`;

		const labelSpan = append(row, $('span'));
		labelSpan.textContent = 'Messages';

		const n = Math.max(0, this._messagesCount);
		if (n >= 1) {
			const badge = append(row, $('span'));
			badge.className = 'vybe-account-dropdown-messages-badge';
			badge.textContent = n > 99 ? '99+' : String(n);
			badge.style.cssText = `
				display: inline-flex; align-items: center; justify-content: center;
				width: ${T.badgeSize}px; height: ${T.badgeSize}px; min-width: ${T.badgeSize}px;
				border-radius: 50%; background-color: ${colors.switchOn}; color: ${colors.switchKnob};
				font-size: ${T.badgeFontSize}px; font-weight: 600; box-sizing: border-box;
				flex-shrink: 0;
			`;
		}

		addDisposableListener(row, 'click', () => {
			this.hide();
			this.commandService.executeCommand(VybeAccountDropdown.OPEN_MESSAGES_COMMAND_ID);
		});
		return row;
	}

	private getThemeType(theme: IWorkbenchColorTheme): 'light' | 'dark' {
		const t = (theme as unknown as { type?: ColorScheme }).type;
		if (t === ColorScheme.LIGHT || t === ColorScheme.HIGH_CONTRAST_LIGHT) return 'light';
		return 'dark';
	}

	private createThemeSubmenuRow(colorsRef: { current: IVybeDropdownThemeColors }, themeRef: { isOpen: () => boolean; getOptions: () => HTMLElement[] }): HTMLElement {
		const T = VybeDropdownTokens;
		const colors = colorsRef.current;
		const wrapper = $('div');
		wrapper.style.cssText = 'display: flex; flex-direction: column; width: 100%;';

		const row = append(wrapper, $('div'));
		row.className = 'vybe-dropdown-row vybe-dropdown-row--submenu';
		row.style.cssText = getDropdownRowBaseStyle(T, { justifyContent: 'space-between', minWidth: true });

		const labelSpan = append(row, $('span'));
		labelSpan.textContent = 'Theme';
		labelSpan.style.cssText = `color: ${colors.panelFg}; flex-shrink: 0;`;

		const currentTheme = this.workbenchThemeService.getColorTheme();
		const valueWrapper = append(row, $('div'));
		valueWrapper.style.cssText = `display: flex; align-items: center; justify-content: flex-end; column-gap: ${T.inlineGap}px; min-width: 0; flex: 1; overflow: hidden;`;

		const currentValueSpan = append(valueWrapper, $('span'));
		currentValueSpan.textContent = currentTheme.label;
		currentValueSpan.className = 'vybe-account-dropdown-theme-value';
		currentValueSpan.style.cssText = `color: ${colors.mutedFg}; font-size: ${T.fontSizeSmall}px; font-weight: 400; opacity: 0.9; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0;`;

		const chevron = append(valueWrapper, $('span'));
		chevron.className = 'codicon codicon-chevron-right vybe-account-dropdown-theme-chevron';
		chevron.style.cssText = `color: ${colors.panelFg}; font-size: 13px; line-height: 13px; width: 13px; height: 13px; opacity: 0.3; flex-shrink: 0; text-align: center; font-family: codicon; transition: transform 0.2s ease; transform: rotate(0deg);`;

		const submenu = append(wrapper, $('div'));
		submenu.className = 'vybe-dropdown-submenu';
		submenu.style.cssText = 'display: none; flex-direction: column; width: 100%;';

		let submenuOpen = false;
		themeRef.isOpen = () => submenuOpen;
		themeRef.getOptions = () => Array.from(submenu.querySelectorAll<HTMLElement>('.vybe-dropdown-submenu-option'));

		const toggleSubmenu = async (): Promise<void> => {
			if (submenuOpen) {
				submenu.style.display = 'none';
				submenuOpen = false;
				chevron.style.transform = 'rotate(0deg)';
				return;
			}
			if (submenu.children.length === 0) {
				const themes = await this.workbenchThemeService.getColorThemes();
				const current = this.workbenchThemeService.getColorTheme();
				const c = colorsRef.current;
				const light: IWorkbenchColorTheme[] = [];
				const dark: IWorkbenchColorTheme[] = [];
				for (const theme of themes) {
					if (this.getThemeType(theme) === 'light') light.push(theme);
					else dark.push(theme);
				}
				const addSection = (label: string) => {
					submenu.appendChild(this.createSubmenuCategoryLabel(label, c));
					submenu.appendChild(this.createDivider(c));
				};
				const addOption = (theme: IWorkbenchColorTheme) => {
					const opt = this.createThemeSubmenuOption(theme, theme.id === current.id, c, () => {
						currentValueSpan.textContent = theme.label;
						submenu.querySelectorAll('.vybe-dropdown-submenu-option').forEach((el) => {
							const o = el as HTMLElement;
							const isSelected = o.dataset.themeId === theme.id;
							o.classList.toggle('is-selected', isSelected);
							const checkEl = o.querySelector('.vybe-dropdown-submenu-option-check') as HTMLElement;
							if (checkEl) checkEl.style.opacity = isSelected ? '1' : '0';
						});
						this.workbenchThemeService.setColorTheme(theme, 'auto');
						submenu.style.display = 'none';
						submenuOpen = false;
						chevron.style.transform = 'rotate(0deg)';
					});
					submenu.appendChild(opt);
				};
				if (light.length) {
					addSection('Light');
					light.forEach(addOption);
				}
				if (dark.length) {
					addSection('Dark');
					dark.forEach(addOption);
				}
			}
			submenu.style.display = 'flex';
			submenuOpen = true;
			chevron.style.transform = 'rotate(90deg)';
		};

		addDisposableListener(row, 'click', (e: MouseEvent) => { e.stopPropagation(); toggleSubmenu(); });

		return wrapper;
	}

	private createThemeSubmenuOption(theme: IWorkbenchColorTheme, isSelected: boolean, colors: IVybeDropdownThemeColors, onSelect: () => void): HTMLElement {
		const T = VybeDropdownTokens;
		const option = $('div');
		option.className = `vybe-dropdown-submenu-option ${isSelected ? 'is-selected' : ''}`;
		option.dataset.themeId = theme.id;
		option.style.cssText = `
			display: flex; align-items: center; justify-content: space-between; height: ${T.rowHeight}px;
			padding: ${T.rowPaddingV}px ${T.rowPaddingH}px; margin: 0 ${T.rowMarginH}px;
			border-radius: ${T.rowBorderRadius}px;
			cursor: pointer; box-sizing: border-box; background-color: transparent;
			width: calc(100% - ${T.rowMarginH * 2}px); min-width: 0;
		`;

		const text = append(option, $('span'));
		text.textContent = theme.label;
		text.style.cssText = `color: ${colors.panelFg}; font-size: ${T.fontSizeSmall}px; line-height: ${T.lineHeightRow}px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0;`;

		const check = append(option, $('span'));
		check.className = 'codicon codicon-check vybe-dropdown-submenu-option-check';
		check.style.cssText = `
			flex-shrink: 0; color: ${colors.panelFg}; font-size: ${T.submenuCheckSize}px; line-height: ${T.submenuCheckSize}px;
			width: ${T.submenuCheckSize}px; height: ${T.submenuCheckSize}px; display: flex; align-items: center; justify-content: center;
			font-family: codicon; opacity: ${isSelected ? '1' : '0'};
		`;

		option.dataset.hoverBg = colors.hoverBg;
		addDisposableListener(option, 'click', (e: MouseEvent) => { e.stopPropagation(); onSelect(); });

		return option;
	}

	private setupKeyboardNav(
		container: HTMLElement,
		focusables: HTMLElement[],
		colorsRef: { current: IVybeDropdownThemeColors },
		themeRef: { isOpen: () => boolean; getOptions: () => HTMLElement[] }
	): DisposableStore & { refreshHighlight(): void } {
		const store = new DisposableStore();
		let focusedIndex = -1;
		const getEffectiveFocusables = (): HTMLElement[] => {
			if (themeRef.isOpen()) {
				const opts = themeRef.getOptions();
				return [...focusables.slice(0, -1), ...opts, focusables[focusables.length - 1]];
			}
			return focusables;
		};
		const updateHighlight = () => {
			const list = getEffectiveFocusables();
			const hoverBg = colorsRef.current.hoverBg;
			list.forEach((el, i) => {
				el.style.backgroundColor = i === focusedIndex ? hoverBg : 'transparent';
			});
		};
		// VS Code: no focus on open. tabIndex -1 so nothing gets focus until user presses a key.
		container.tabIndex = -1;
		// First key gives focus: document capture so we see key before any focused element
		const win = getWindow(container);
		store.add(addDisposableListener(win.document, EventType.KEY_DOWN, (e: KeyboardEvent) => {
			const target = e.target as Node;
			if (container.contains(target)) return; // already in panel, let container handle it
			const event = new StandardKeyboardEvent(e);
			if (!event.equals(KeyCode.DownArrow) && !event.equals(KeyCode.UpArrow) && !event.equals(KeyCode.Enter) && !event.equals(KeyCode.Escape)) return;
			container.tabIndex = 0;
			container.focus();
			const list = getEffectiveFocusables();
			if (event.equals(KeyCode.UpArrow)) {
				focusedIndex = list.length - 1;
			} else {
				focusedIndex = 0;
			}
			updateHighlight();
			if (event.equals(KeyCode.Enter)) {
				list[focusedIndex].click();
			} else if (event.equals(KeyCode.Escape)) {
				this.hide();
			}
			event.preventDefault();
			event.stopPropagation();
		}, true));
		store.add(addDisposableListener(container, EventType.KEY_DOWN, (e: KeyboardEvent) => {
			const event = new StandardKeyboardEvent(e);
			const list = getEffectiveFocusables();
			if (event.equals(KeyCode.DownArrow)) {
				focusedIndex = focusedIndex < 0 ? 0 : (focusedIndex + 1) % list.length;
				updateHighlight();
				event.preventDefault();
				event.stopPropagation();
			} else if (event.equals(KeyCode.UpArrow)) {
				focusedIndex = focusedIndex < 0 ? list.length - 1 : (focusedIndex - 1 + list.length) % list.length;
				updateHighlight();
				event.preventDefault();
				event.stopPropagation();
			} else if (event.equals(KeyCode.Enter)) {
				if (focusedIndex < 0) return;
				list[focusedIndex].click();
				event.preventDefault();
				event.stopPropagation();
				setTimeout(() => {
					container.focus();
					const newList = getEffectiveFocusables();
					focusedIndex = Math.min(focusedIndex, newList.length - 1);
					updateHighlight();
				}, 0);
			} else if (event.equals(KeyCode.Escape)) {
				if (themeRef.isOpen()) {
					const themeRow = focusables[focusables.length - 1];
					themeRow.click();
					focusedIndex = focusables.length - 1;
					updateHighlight();
					event.preventDefault();
					event.stopPropagation();
				} else {
					this.hide();
					event.preventDefault();
					event.stopPropagation();
				}
			}
		}));
		store.add(addDisposableListener(container, EventType.MOUSE_OVER, (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const list = getEffectiveFocusables();
			for (let i = 0; i < list.length; i++) {
				if (list[i] === target || list[i].contains(target)) {
					focusedIndex = i;
					updateHighlight();
					break;
				}
			}
		}));
		return Object.assign(store, { refreshHighlight: updateHighlight });
	}

	hide(): void {
		if (this._panelDisposable) {
			this._panelDisposable.dispose();
			this._panelDisposable = null;
		}
	}

	isVisible(): boolean {
		return this._panelDisposable !== null;
	}

	override dispose(): void {
		this.hide();
		super.dispose();
	}
}

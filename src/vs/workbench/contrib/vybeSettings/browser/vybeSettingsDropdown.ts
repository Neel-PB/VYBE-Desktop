/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { $, append, addDisposableListener, EventType, getWindow } from '../../../../base/browser/dom.js';
import { StandardKeyboardEvent } from '../../../../base/browser/keyboardEvent.js';
import { KeyCode } from '../../../../base/common/keyCodes.js';
import { Disposable, DisposableStore, IDisposable } from '../../../../base/common/lifecycle.js';
import { IThemeService } from '../../../../platform/theme/common/themeService.js';
import { ICommandService } from '../../../../platform/commands/common/commands.js';
import { showVybeDropdownPanel } from '../../vybeDropdown/browser/vybeDropdownPanel.js';
import { getDropdownRowBaseStyle, getDropdownDividerStyle, attachDropdownRowHover } from '../../vybeDropdown/browser/vybeDropdownStyles.js';
import { getVybeDropdownThemeColors, IVybeDropdownThemeColors } from '../../vybeDropdown/browser/vybeDropdownTheme.js';
import { VybeDropdownTokens } from '../../vybeDropdown/browser/vybeDropdownTokens.js';
import { IWorkbenchLayoutService, Parts, SINGLE_WINDOW_PARTS } from '../../../services/layout/browser/layoutService.js';
import { IConfigurationService } from '../../../../platform/configuration/common/configuration.js';

type ToggleState = 'on' | 'off';

const SIDEBAR_LOCATION_KEY = 'workbench.sideBar.location';

interface ToggleRowConfig {
	label: string;
	keybinding?: string;
	icon: string;
	iconOverlay?: string;
	state: ToggleState;
	/** Command to run when toggle is clicked (e.g. workbench.action.toggleSidebarVisibility) */
	commandId: string;
	/** Layout part for reading visibility (e.g. Parts.SIDEBAR_PART) */
	part: SINGLE_WINDOW_PARTS;
}

export class VybeSettingsDropdown extends Disposable {
	private _panelDisposable: IDisposable | null = null;
	private agentSidebarSubmenu: HTMLElement | null = null;
	private agentSidebarSubmenuVisible: boolean = false;
	private agentSidebarCurrentValue: string = 'Left';
	private agentSidebarChevron: HTMLElement | null = null;
	private agentSidebarCurrentValueSpan: HTMLElement | null = null;
	private toggleStates: Map<string, boolean> = new Map();

	constructor(
		private anchorElement: HTMLElement,
		@IThemeService private readonly themeService: IThemeService,
		@ICommandService private readonly commandService: ICommandService,
		@IWorkbenchLayoutService private readonly layoutService: IWorkbenchLayoutService,
		@IConfigurationService private readonly configurationService: IConfigurationService,
	) {
		super();
	}

	public show(anchor?: HTMLElement): void {
		if (this._panelDisposable) {
			this.hide();
			return;
		}
		const el = anchor ?? this.anchorElement;
		const colors = getVybeDropdownThemeColors(this.themeService);
		this._panelDisposable = showVybeDropdownPanel(el, this.themeService, {
			buildContent: (container: HTMLElement) => this.buildSettingsContent(container, colors),
			onClose: () => { this._panelDisposable = null; },
		});
	}

	private buildSettingsContent(container: HTMLElement, colors: IVybeDropdownThemeColors): IDisposable {
		const focusables: HTMLElement[] = [];

		// Section 1: Toggle Options
		const section1 = append(container, $('div'));
		section1.className = 'vybe-dropdown-section';
		section1.style.cssText = `display: flex; flex-direction: column; width: 100%;`;

		const toggleRows: ToggleRowConfig[] = [
			{
				label: 'Sidebar',
				keybinding: '⌘B',
				icon: 'codicon-layout-activitybar-left',
				state: this.layoutService.isVisible(Parts.SIDEBAR_PART) ? 'on' : 'off',
				commandId: 'workbench.action.toggleSidebarVisibility',
				part: Parts.SIDEBAR_PART,
			},
			{
				label: 'Panel',
				keybinding: '⌘J',
				icon: 'codicon-layout-statusbar',
				state: this.layoutService.isVisible(Parts.PANEL_PART) ? 'on' : 'off',
				commandId: 'workbench.action.togglePanel',
				part: Parts.PANEL_PART,
			},
			{
				label: 'Agent',
				keybinding: '⌥⌘B',
				icon: 'codicon-layout-activitybar-right',
				state: this.layoutService.isVisible(Parts.AUXILIARYBAR_PART) ? 'on' : 'off',
				commandId: 'workbench.action.toggleAuxiliaryBar',
				part: Parts.AUXILIARYBAR_PART,
			},
		];

		toggleRows.forEach((row) => {
			this.toggleStates.set(row.label, row.state === 'on');
			const el = this.createToggleRow(row, colors);
			section1.appendChild(el);
			focusables.push(el);
		});

		container.appendChild(this.createDivider(colors));

		// Section 2: Submenu and footer
		const section2 = append(container, $('div'));
		section2.className = 'vybe-dropdown-section';
		section2.style.cssText = `display: flex; flex-direction: column; width: 100%;`;

		const sidebarLocation = this.configurationService.getValue<string>(SIDEBAR_LOCATION_KEY) ?? 'left';
		this.agentSidebarCurrentValue = sidebarLocation === 'right' ? 'Left' : 'Right';
		const agentWrapper = this.createSubmenuRow('Agent Sidebar', this.agentSidebarCurrentValue, colors);
		section2.appendChild(agentWrapper);
		focusables.push(agentWrapper.firstElementChild as HTMLElement);

		container.appendChild(this.createDivider(colors));
		const footerLink = this.createFooterLink('VYBE Settings', colors);
		container.appendChild(footerLink);
		focusables.push(footerLink);

		// VS Code: no focus on open. First key gives focus to panel and first item.
		const store = new DisposableStore();
		let focusedIndex = -1;
		const getEffectiveFocusables = (): HTMLElement[] => {
			if (this.agentSidebarSubmenuVisible && this.agentSidebarSubmenu) {
				const opts = Array.from(this.agentSidebarSubmenu.querySelectorAll<HTMLElement>('.vybe-dropdown-submenu-option'));
				return [...focusables.slice(0, 4), ...opts, focusables[4]];
			}
			return focusables;
		};
		const updateHighlight = () => {
			const list = getEffectiveFocusables();
			list.forEach((el, i) => {
				el.style.backgroundColor = i === focusedIndex ? colors.hoverBg : 'transparent';
			});
		};
		container.tabIndex = -1;
		const win = getWindow(container);
		store.add(addDisposableListener(win.document, EventType.KEY_DOWN, (e: KeyboardEvent) => {
			if (container.contains(e.target as Node)) return;
			const event = new StandardKeyboardEvent(e);
			if (!event.equals(KeyCode.DownArrow) && !event.equals(KeyCode.UpArrow) && !event.equals(KeyCode.Enter) && !event.equals(KeyCode.Escape)) return;
			container.tabIndex = 0;
			container.focus();
			const list = getEffectiveFocusables();
			focusedIndex = event.equals(KeyCode.UpArrow) ? list.length - 1 : 0;
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
					if (focusedIndex === 3 && this.agentSidebarSubmenuVisible) {
						focusedIndex = 4;
						updateHighlight();
					} else if (focusedIndex >= 4 && !this.agentSidebarSubmenuVisible) {
						focusedIndex = 3;
						updateHighlight();
					}
				}, 0);
			} else if (event.equals(KeyCode.Escape)) {
				if (this.agentSidebarSubmenuVisible) {
					this.toggleAgentSidebarSubmenu();
					focusedIndex = 3;
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
		return store;
	}

	private createToggleRow(config: ToggleRowConfig, colors: IVybeDropdownThemeColors): HTMLElement {
		const T = VybeDropdownTokens;
		const row = $('div');
		row.className = 'vybe-dropdown-row vybe-dropdown-row--toggle';
		row.style.cssText = getDropdownRowBaseStyle(T, { justifyContent: 'space-between' });

		const leftContainer = append(row, $('div'));
		leftContainer.style.cssText = `display: flex; align-items: center; height: ${T.lineHeightRow}px;`;

		if (config.iconOverlay) {
			const iconContainer = append(leftContainer, $('span'));
			iconContainer.style.cssText = `
				display: flex; align-items: center; justify-content: center;
				width: ${T.iconSize}px; height: ${T.iconSize}px; margin-right: ${T.iconLabelGap}px;
				position: relative; color: ${colors.mutedFg};
			`;
			const iconLayer1 = append(iconContainer, $('span'));
			iconLayer1.className = `codicon ${config.icon}`;
			iconLayer1.setAttribute('aria-hidden', 'true');
			iconLayer1.style.cssText = `display: block; width: ${T.iconSize}px; height: ${T.iconSize}px; line-height: ${T.iconSize}px; font-size: ${T.iconSize}px; text-align: center; pointer-events: none; position: relative;`;
			const iconLayer2 = append(iconContainer, $('span'));
			iconLayer2.className = `codicon ${config.iconOverlay}`;
			iconLayer2.setAttribute('aria-hidden', 'true');
			iconLayer2.style.cssText = `display: block; width: ${T.iconSize}px; height: ${T.iconSize}px; line-height: ${T.iconSize}px; font-size: ${T.iconSize}px; text-align: center; pointer-events: none; position: absolute; top: 0; left: 0; right: 0; bottom: 0; opacity: 0.4;`;
		} else {
			const icon = append(leftContainer, $('span'));
			icon.className = `codicon ${config.icon}`;
			icon.style.cssText = `
				display: flex; align-items: center; justify-content: center;
				width: ${T.iconSize}px; height: ${T.iconSize}px; margin-right: ${T.iconLabelGap}px;
				color: ${colors.mutedFg}; font-size: ${T.iconSize}px;
			`;
		}

		const label = append(leftContainer, $('span'));
		label.textContent = config.label;
		label.style.cssText = `color: ${colors.panelFg}; font-size: ${T.fontSizeSmall}px; font-weight: 400; line-height: ${T.lineHeightRow}px; display: block; height: ${T.lineHeightRow}px; font-family: system-ui, -apple-system, "system-ui", sans-serif;`;

		const rightContainer = append(row, $('div'));
		rightContainer.style.cssText = `display: flex; align-items: center; height: ${T.lineHeightRow}px; column-gap: ${T.iconLabelGap}px;`;

		if (config.keybinding) {
			const keybinding = append(rightContainer, $('span'));
			keybinding.textContent = config.keybinding;
			keybinding.style.cssText = `color: ${colors.panelFg}; font-size: ${T.fontSizeSmall}px; font-weight: 400; line-height: ${T.lineHeightRow}px; opacity: 0.4; display: block; height: ${T.lineHeightRow}px;`;
		}

		let currentState = this.toggleStates.get(config.label) ?? (config.state === 'on');
		const { switchContainer, switchOuter, bgFill, knob } = this.createToggleSwitch(currentState, colors);
		rightContainer.appendChild(switchContainer);

		this._register(attachDropdownRowHover(row, colors.hoverBg));
		this._register(addDisposableListener(row, 'click', async (e: MouseEvent) => {
			e.stopPropagation();
			await this.commandService.executeCommand(config.commandId);
			const visible = this.layoutService.isVisible(config.part);
			currentState = visible;
			this.toggleStates.set(config.label, visible);
			this.updateToggleSwitch(switchOuter, bgFill, knob, visible, colors);
		}));

		return row;
	}

	private createSubmenuRow(label: string, currentValue: string, colors: IVybeDropdownThemeColors): HTMLElement {
		const T = VybeDropdownTokens;
		const wrapper = $('div');
		wrapper.style.cssText = `display: block; width: 100%;`;

		const row = append(wrapper, $('div'));
		row.className = 'vybe-dropdown-row vybe-dropdown-row--submenu';
		row.style.cssText = getDropdownRowBaseStyle(T, { justifyContent: 'space-between' });

		const labelSpan = append(row, $('span'));
		labelSpan.textContent = label;
		labelSpan.style.cssText = `color: ${colors.panelFg}; font-size: ${T.fontSizeSmall}px; font-weight: 400; line-height: ${T.lineHeightRow}px; display: block; height: ${T.lineHeightRow}px; font-family: system-ui, -apple-system, "system-ui", sans-serif;`;

		const valueWrapper = append(row, $('div'));
		valueWrapper.style.cssText = `display: flex; align-items: center; height: ${T.lineHeightRow}px; column-gap: ${T.inlineGap}px;`;

		this.agentSidebarCurrentValueSpan = append(valueWrapper, $('span'));
		this.agentSidebarCurrentValueSpan.textContent = currentValue;
		this.agentSidebarCurrentValueSpan.style.cssText = `color: ${colors.mutedFg}; font-size: ${T.fontSizeSmall}px; font-weight: 400; line-height: ${T.lineHeightRow}px; display: block; height: ${T.lineHeightRow}px;`;

		this.agentSidebarChevron = append(valueWrapper, $('span'));
		this.agentSidebarChevron.className = 'codicon codicon-chevron-right';
		this.agentSidebarChevron.style.cssText = `color: ${colors.panelFg}; font-size: 13px; line-height: 13px; width: 13px; height: 13px; opacity: 0.3; display: block; text-align: center; font-family: codicon; transition: transform 0.2s ease; transform: rotate(0deg);`;

		this.agentSidebarSubmenu = append(wrapper, $('div'));
		this.agentSidebarSubmenu.className = 'vybe-dropdown-submenu';
		this.agentSidebarSubmenu.style.cssText = 'display: none; flex-direction: column; width: 100%;';

		['Left', 'Right'].forEach((option) => {
			this.agentSidebarSubmenu!.appendChild(this.createSubmenuOption(option, option === currentValue, colors));
		});

		this._register(attachDropdownRowHover(row, colors.hoverBg));
		this._register(addDisposableListener(row, 'click', (e: MouseEvent) => { e.stopPropagation(); this.toggleAgentSidebarSubmenu(); }));

		return wrapper;
	}

	private createSubmenuOption(label: string, isSelected: boolean, colors: IVybeDropdownThemeColors): HTMLElement {
		const T = VybeDropdownTokens;
		const option = $('div');
		option.className = `vybe-dropdown-submenu-option ${isSelected ? 'is-selected' : ''}`;
		option.dataset.optionLabel = label;
		option.style.cssText = `
			display: flex; align-items: center; justify-content: space-between; height: ${T.rowHeight}px;
			padding: ${T.rowPaddingV}px ${T.rowPaddingH}px; margin: 0 ${T.rowMarginH}px;
			border-radius: ${T.rowBorderRadius}px;
			cursor: pointer; box-sizing: border-box;
			width: calc(100% - ${T.rowMarginH * 2}px); background-color: transparent;
		`;

		const text = append(option, $('span'));
		text.textContent = label;
		text.style.cssText = `color: ${colors.panelFg}; font-size: ${T.fontSizeSmall}px; line-height: ${T.lineHeightRow}px; font-family: system-ui, -apple-system, "system-ui", sans-serif;`;

		const check = append(option, $('span'));
		check.className = 'codicon codicon-check vybe-dropdown-submenu-option-check';
		check.style.cssText = `
			flex-shrink: 0; color: ${colors.panelFg}; font-size: ${T.submenuCheckSize}px; line-height: ${T.submenuCheckSize}px;
			width: ${T.submenuCheckSize}px; height: ${T.submenuCheckSize}px; display: flex; align-items: center; justify-content: center;
			font-family: codicon; opacity: ${isSelected ? '1' : '0'};
		`;

		this._register(attachDropdownRowHover(option, colors.hoverBg));
		this._register(addDisposableListener(option, 'click', (e: MouseEvent) => {
			e.stopPropagation();
			this.configurationService.updateValue(SIDEBAR_LOCATION_KEY, label === 'Left' ? 'right' : 'left');
			this.agentSidebarCurrentValue = label;
			if (this.agentSidebarCurrentValueSpan) {
				this.agentSidebarCurrentValueSpan.textContent = label;
			}
			if (this.agentSidebarSubmenu) {
				this.agentSidebarSubmenu.querySelectorAll('.vybe-dropdown-submenu-option').forEach((opt) => {
					const el = opt as HTMLElement;
					const now = el.dataset.optionLabel === label;
					el.classList.toggle('is-selected', now);
					const checkEl = el.querySelector('.vybe-dropdown-submenu-option-check') as HTMLElement;
					if (checkEl) checkEl.style.opacity = now ? '1' : '0';
				});
			}
			this.toggleAgentSidebarSubmenu();
		}));

		return option;
	}

	private createDivider(colors: IVybeDropdownThemeColors): HTMLElement {
		const divider = $('div');
		divider.className = 'vybe-dropdown-divider';
		divider.style.cssText = `${getDropdownDividerStyle(VybeDropdownTokens)} background-color: ${colors.separator}; opacity: 0.8;`;
		return divider;
	}

	private createFooterLink(label: string, colors: IVybeDropdownThemeColors): HTMLElement {
		const T = VybeDropdownTokens;
		const footerLink = $('button') as HTMLButtonElement;
		footerLink.type = 'button';
		footerLink.className = 'vybe-dropdown-footer-link';
		footerLink.style.cssText = `${getDropdownRowBaseStyle(T, { justifyContent: 'space-between' })} background-color: transparent; border: none; outline: none; font-family: -apple-system, "system-ui", sans-serif;`;

		const labelSpan = append(footerLink, $('span'));
		labelSpan.textContent = label;
		labelSpan.style.cssText = `color: ${colors.panelFg}; font-size: ${T.fontSizeSmall}px; font-weight: 400; line-height: ${T.lineHeightRow}px; display: flex; align-items: center; height: ${T.lineHeightRow}px; font-family: system-ui, -apple-system, "system-ui", sans-serif;`;

		this._register(attachDropdownRowHover(footerLink, colors.hoverBg));
		this._register(addDisposableListener(footerLink, 'click', (e: MouseEvent) => {
			e.stopPropagation();
			this.commandService.executeCommand('vybe.openSettingsEditor');
			this.hide();
		}));

		return footerLink;
	}

	private toggleAgentSidebarSubmenu(): void {
		if (!this.agentSidebarSubmenu || !this.agentSidebarChevron) {
			return;
		}

		this.agentSidebarSubmenuVisible = !this.agentSidebarSubmenuVisible;

		if (this.agentSidebarSubmenuVisible) {
			this.agentSidebarSubmenu.style.display = 'flex';
			this.agentSidebarSubmenu.classList.add('is-open');
			this.agentSidebarChevron.classList.add('is-open');
			this.agentSidebarChevron.style.transform = 'rotate(90deg)';
		} else {
			this.agentSidebarSubmenu.style.display = 'none';
			this.agentSidebarSubmenu.classList.remove('is-open');
			this.agentSidebarChevron.classList.remove('is-open');
			this.agentSidebarChevron.style.transform = 'rotate(0deg)';
		}
	}

	public hide(): void {
		if (this._panelDisposable) {
			this._panelDisposable.dispose();
			this._panelDisposable = null;
		}
		this.agentSidebarSubmenu = null;
		this.agentSidebarChevron = null;
		this.agentSidebarCurrentValueSpan = null;
		this.agentSidebarSubmenuVisible = false;
	}

	public isVisible(): boolean {
		return this._panelDisposable !== null;
	}

	private createToggleSwitch(isOn: boolean, colors: IVybeDropdownThemeColors): { switchContainer: HTMLElement; switchOuter: HTMLElement; bgFill: HTMLElement; knob: HTMLElement } {
		const switchContainer = $('span');
		switchContainer.style.cssText = `
			flex-shrink: 0;
			margin-left: 4px;
			cursor: pointer;
		`;

		const switchOuter = append(switchContainer, $('div'));
		switchOuter.style.cssText = `
			width: 24px;
			height: 14px;
			border-radius: 14px;
			position: relative;
			display: flex;
			align-items: center;
			cursor: pointer;
			transition: all 300ms;
			overflow: hidden;
			background: ${isOn ? colors.switchOn : colors.switchOff};
			opacity: 1;
		`;

		const bgFill = append(switchOuter, $('div'));
		bgFill.style.cssText = `
			border-radius: 14px;
			position: absolute;
			top: 0;
			bottom: 0;
			height: 100%;
			left: 0;
			background: ${colors.switchOn};
			opacity: ${isOn ? '1' : '0'};
			width: ${isOn ? '100%' : '0%'};
			transition: ${isOn ? '300ms' : '150ms'} cubic-bezier(0.4, 0, 0.2, 1);
		`;

		const knob = append(switchOuter, $('div'));
		knob.style.cssText = `
			width: 10px;
			height: 10px;
			border-radius: 50%;
			position: absolute;
			background: ${colors.switchKnob};
			transition: 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
			left: ${isOn ? 'calc(100% - 12px)' : '2px'};
		`;

		return { switchContainer, switchOuter, bgFill, knob };
	}

	private updateToggleSwitch(switchOuter: HTMLElement, bgFill: HTMLElement, knob: HTMLElement, isOn: boolean, colors: IVybeDropdownThemeColors): void {
		switchOuter.style.background = isOn ? colors.switchOn : colors.switchOff;

		// Update fill
		bgFill.style.opacity = isOn ? '1' : '0';
		bgFill.style.width = isOn ? '100%' : '0%';
		bgFill.style.transition = isOn ? '300ms cubic-bezier(0.4, 0, 0.2, 1)' : '150ms cubic-bezier(0.4, 0, 0.2, 1)';

		// Update knob position
		knob.style.left = isOn ? 'calc(100% - 12px)' : '2px';
	}

	override dispose(): void {
		this.hide();
		super.dispose();
	}
}

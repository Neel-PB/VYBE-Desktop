/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { localize } from '../../../../nls.js';
import { IAction } from '../../../../base/common/actions.js';
import { Codicon } from '../../../../base/common/codicons.js';
import { ThemeIcon } from '../../../../base/common/themables.js';
import { VybeSettingsDropdown } from '../../vybeSettings/browser/vybeSettingsDropdown.js';
import { VybeAccountDropdown } from './vybeAccountDropdown.js';

/** When true, title bar hides the four layout toggles and shows a single Settings button that opens VybeSettingsDropdown. */
export const VYBE_USE_TITLEBAR_SETTINGS_BUTTON = true;

export function getVybeLayoutControlEnabled(): boolean {
	return !VYBE_USE_TITLEBAR_SETTINGS_BUTTON;
}

export interface IVybeTitlebarPartHost {
	getActionToolBarElement(): HTMLElement;
	getOrCreateVybeSettingsDropdown(anchor: HTMLElement): VybeSettingsDropdown;
	getOrCreateVybeAccountDropdown(anchor: HTMLElement): VybeAccountDropdown;
}

/**
 * Returns the Settings action for the title bar: one gear button that opens VybeSettingsDropdown
 * (Sidebar/Panel/Agent toggles, Agent Sidebar submenu, VYBE Settings link). Same behavior and
 * findButton logic as old VYBE.
 */
export function createVybeTitleBarSettingsAction(host: IVybeTitlebarPartHost): IAction {
	return {
		id: 'vybe.titlebar.settings',
		label: localize('settings', 'Settings'),
		tooltip: localize('settings', 'Settings'),
		class: ThemeIcon.asClassName(Codicon.settings),
		enabled: true,
		run: (event?: { originalEvent?: Event }) => {
			if (event?.originalEvent) {
				event.originalEvent.stopPropagation();
			}
			const toolbar = host.getActionToolBarElement();
			const findButton = (): HTMLElement | null => {
				let button = toolbar.querySelector(`[data-action-id="vybe.titlebar.settings"]`) as HTMLElement | null;
				if (button) {
					const clickable = button.querySelector('a, button') as HTMLElement | null;
					return clickable || button;
				}
				button = toolbar.querySelector(`[aria-label="${localize('settings', 'Settings')}"]`) as HTMLElement | null;
				if (button) {
					const clickable = button.querySelector('a, button') as HTMLElement | null;
					return clickable || button;
				}
				const iconElements = toolbar.querySelectorAll('.codicon.codicon-settings');
				for (const icon of Array.from(iconElements)) {
					const actionItem = icon.closest('.action-item');
					if (actionItem) {
						const clickable = actionItem.querySelector('a, button') as HTMLElement | null;
						if (clickable) return clickable;
						return actionItem as HTMLElement;
					}
				}
				const lastActionItem = toolbar.querySelector('.monaco-action-bar .action-item:last-child a, .monaco-action-bar .action-item:last-child button');
				return lastActionItem as HTMLElement | null;
			};
			const settingsButton = findButton();
			if (settingsButton) {
				host.getOrCreateVybeSettingsDropdown(settingsButton).show(settingsButton);
			}
		}
	};
}

/**
 * Returns the Account action for the title bar: account codicon button to the right of Settings.
 * Opens VybeAccountDropdown (content TBD per specifications).
 */
export function createVybeTitleBarAccountAction(host: IVybeTitlebarPartHost): IAction {
	return {
		id: 'vybe.titlebar.account',
		label: localize('account', 'Account'),
		tooltip: localize('account', 'Account'),
		class: ThemeIcon.asClassName(Codicon.account),
		enabled: true,
		run: (event?: { originalEvent?: Event }) => {
			if (event?.originalEvent) {
				event.originalEvent.stopPropagation();
			}
			const toolbar = host.getActionToolBarElement();
			const findButton = (): HTMLElement | null => {
				let button = toolbar.querySelector(`[data-action-id="vybe.titlebar.account"]`) as HTMLElement | null;
				if (button) {
					const clickable = button.querySelector('a, button') as HTMLElement | null;
					return clickable || button;
				}
				button = toolbar.querySelector(`[aria-label="${localize('account', 'Account')}"]`) as HTMLElement | null;
				if (button) {
					const clickable = button.querySelector('a, button') as HTMLElement | null;
					return clickable || button;
				}
				const iconElements = toolbar.querySelectorAll('.codicon.codicon-account');
				for (const icon of Array.from(iconElements)) {
					const actionItem = icon.closest('.action-item');
					if (actionItem) {
						const clickable = actionItem.querySelector('a, button') as HTMLElement | null;
						if (clickable) return clickable;
						return actionItem as HTMLElement;
					}
				}
				const lastActionItem = toolbar.querySelector('.monaco-action-bar .action-item:last-child a, .monaco-action-bar .action-item:last-child button');
				return lastActionItem as HTMLElement | null;
			};
			const accountButton = findButton();
			if (accountButton) {
				host.getOrCreateVybeAccountDropdown(accountButton).show(accountButton);
			}
		}
	};
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// VYBE: Terminal prompt bar controller — terminal contribution that manages the
// prompt bar lifecycle. Injects the prompt bar DOM into the terminal wrapper
// as a flex sibling of the xterm host to avoid resize flicker.
// Key architecture:
// VS Code's terminal calculates row count from the split-view dimension, not DOM
// measurements. We call instance.layout() with an adjusted dimension (full height
// minus prompt bar height) so the terminal's own resize pipeline handles everything
// correctly — cols, rows, scrollbar, and canvas rendering.

import type { Terminal as RawXtermTerminal } from '@xterm/xterm';
import { Disposable } from '../../../../../base/common/lifecycle.js';
import { IInstantiationService } from '../../../../../platform/instantiation/common/instantiation.js';
import { ITerminalContribution, ITerminalInstance, type IXtermTerminal } from '../../../terminal/browser/terminal.js';
import type { ITerminalContributionContext } from '../../../terminal/browser/terminalExtensions.js';
import { VybeTerminalPromptBar } from './vybeTerminalPromptBar.js';
import { getWindow, type IDimension } from '../../../../../base/browser/dom.js';

export class VybeTerminalPromptBarController extends Disposable implements ITerminalContribution {

	static readonly ID = 'terminal.vybePromptBar';

	static get(instance: ITerminalInstance): VybeTerminalPromptBarController | null {
		return instance.getContribution<VybeTerminalPromptBarController>(VybeTerminalPromptBarController.ID);
	}

	private _promptBar: VybeTerminalPromptBar | undefined;
	private _wrapperElement: HTMLElement | undefined;
	private _xtermHostElement: HTMLElement | undefined;
	private _lastFullDimension: IDimension | undefined;
	private _isRelayouting: boolean = false;
	private _generationTimeout: ReturnType<typeof setTimeout> | null = null;
	private _pendingPrompt: string = '';

	constructor(
		private readonly _ctx: ITerminalContributionContext,
		@IInstantiationService private readonly _instantiationService: IInstantiationService,
	) {
		super();
	}

	xtermReady(_xterm: IXtermTerminal & { raw: RawXtermTerminal }): void {
		this._wrapperElement = this._ctx.instance.domElement;
		if (!this._wrapperElement) {
			return;
		}

		// eslint-disable-next-line no-restricted-syntax
		const xtermHost = this._wrapperElement.querySelector('.terminal-xterm-host') as HTMLElement | null;
		this._xtermHostElement = xtermHost ?? undefined;

		this._promptBar = this._register(this._instantiationService.createInstance(VybeTerminalPromptBar));

		this._applyFlexLayout();

		this._wrapperElement.appendChild(this._promptBar.domNode);

		// After DOM injection, trigger a relayout so xterm knows about the reduced height.
		// Use double-rAF to ensure flex layout has been computed before measuring.
		const win = getWindow(this._wrapperElement!);
		win.requestAnimationFrame(() => {
			win.requestAnimationFrame(() => {
				this._triggerRelayout();
			});
		});

		this._register(this._promptBar.onClose(() => {
			// Hint bar is now showing (smaller) — relayout to give xterm more rows
			getWindow(this._wrapperElement!).requestAnimationFrame(() => this._triggerRelayout());
			this._ctx.instance.focus();
		}));

		this._register(this._promptBar.onExpand(() => {
			// Composer is now showing (taller) — relayout to give xterm fewer rows
			getWindow(this._wrapperElement!).requestAnimationFrame(() => this._triggerRelayout());
		}));

		this._register(this._promptBar.onSend(({ text, mode }) => {
			this._handleSend(text, mode);
		}));

		this._register(this._promptBar.onStop(() => {
			this._handleStop();
		}));
	}

	/**
	 * Called by the terminal after the main layout pass. We store the full
	 * dimension and, if this isn't a relayout we triggered ourselves, call
	 * instance.layout() again with the adjusted (reduced) dimension.
	 */
	layout(_xterm: IXtermTerminal & { raw: RawXtermTerminal }, dimension: IDimension): void {
		if (this._isRelayouting) {
			// This is our own relayout call — don't recurse
			return;
		}

		this._lastFullDimension = dimension;

		if (!this._promptBar) {
			return;
		}

		const promptBarHeight = this._promptBar.domNode.getBoundingClientRect().height;
		if (promptBarHeight <= 0) {
			return;
		}

		const adjustedHeight = dimension.height - promptBarHeight;
		if (adjustedHeight <= 0) {
			return;
		}

		// Re-layout the terminal instance with the adjusted dimension.
		// The _isRelayouting flag prevents infinite recursion.
		this._isRelayouting = true;
		try {
			this._ctx.instance.layout({ width: dimension.width, height: adjustedHeight });
		} finally {
			this._isRelayouting = false;
		}
	}

	show(): void {
		this._promptBar?.expand();
	}

	hide(): void {
		this._promptBar?.collapse();
	}

	get promptBar(): VybeTerminalPromptBar | undefined {
		return this._promptBar;
	}

	/**
	 * Trigger a terminal relayout using the last known full dimension,
	 * adjusted for the current prompt bar height.
	 */
	private _triggerRelayout(): void {
		if (!this._promptBar) {
			return;
		}

		let dimension = this._lastFullDimension;

		// If we don't have a stored dimension yet, measure the wrapper
		if (!dimension && this._wrapperElement) {
			const rect = this._wrapperElement.getBoundingClientRect();
			if (rect.width > 0 && rect.height > 0) {
				dimension = { width: rect.width, height: rect.height };
			}
		}

		if (!dimension) {
			return;
		}

		const promptBarHeight = this._promptBar.domNode.getBoundingClientRect().height;
		if (promptBarHeight <= 0) {
			return;
		}

		const adjustedHeight = dimension.height - promptBarHeight;
		if (adjustedHeight <= 0) {
			return;
		}

		this._isRelayouting = true;
		try {
			this._ctx.instance.layout({ width: dimension.width, height: adjustedHeight });
		} finally {
			this._isRelayouting = false;
		}
	}

	/**
	 * Apply inline styles to guarantee the flex sibling layout wins regardless
	 * of CSS specificity. The terminal-wrapper becomes a flex column container,
	 * xterm-host fills remaining space, and the prompt bar sits at the bottom.
	 */
	private _applyFlexLayout(): void {
		if (!this._wrapperElement) {
			return;
		}

		this._wrapperElement.classList.add('vybe-terminal-has-prompt-bar');
		this._wrapperElement.style.display = 'flex';
		this._wrapperElement.style.flexDirection = 'column';

		if (this._xtermHostElement) {
			this._xtermHostElement.style.flex = '1 1 0%';
			this._xtermHostElement.style.minHeight = '0';
			this._xtermHostElement.style.height = 'auto';
			this._xtermHostElement.style.position = 'relative';
		}
	}

	private _handleSend(text: string, mode: string): void {
		this._pendingPrompt = text;

		this._promptBar?.showGenerating();

		if (mode === 'command') {
			this._generationTimeout = setTimeout(() => {
				this._ctx.instance.sendText(this._pendingPrompt, false);
				this._promptBar?.resetToIdle();
			}, 2000);
		} else {
			this._generationTimeout = setTimeout(() => {
				this._promptBar?.showResponse(`This is a simulated response to: "${this._pendingPrompt}"`);
			}, 3000);
		}
	}

	private _handleStop(): void {
		this._clearGenerationTimeout();
	}

	private _clearGenerationTimeout(): void {
		if (this._generationTimeout) {
			clearTimeout(this._generationTimeout);
			this._generationTimeout = null;
		}
	}

	override dispose(): void {
		this._clearGenerationTimeout();
		if (this._wrapperElement) {
			this._wrapperElement.classList.remove('vybe-terminal-has-prompt-bar');
			this._wrapperElement.style.display = '';
			this._wrapperElement.style.flexDirection = '';
		}
		if (this._xtermHostElement) {
			this._xtermHostElement.style.flex = '';
			this._xtermHostElement.style.minHeight = '';
			this._xtermHostElement.style.height = '';
			this._xtermHostElement.style.position = '';
		}
		super.dispose();
	}
}

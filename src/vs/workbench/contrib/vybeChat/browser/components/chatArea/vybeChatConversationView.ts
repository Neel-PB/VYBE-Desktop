/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { $, append, getWindow } from '../../../../../../base/browser/dom.js';
import { Disposable } from '../../../../../../base/common/lifecycle.js';

/**
 * Scrollable conversation container for the active chat state.
 * Holds human-AI message pairs with sticky human messages.
 *
 * The last pair gets min-height equal to the scroll viewport so its
 * human message can become sticky while scrolling the AI response.
 */
export class VybeChatConversationView extends Disposable {

	readonly domNode: HTMLElement;
	private readonly messagesInner: HTMLElement;
	private lastPair: HTMLElement | null = null;
	private viewportHeight = 0;

	constructor(parent: HTMLElement, insertBefore: HTMLElement) {
		super();

		this.domNode = $('div.vybe-chat-conversations');
		parent.insertBefore(this.domNode, insertBefore);

		this.messagesInner = append(this.domNode, $('div.vybe-chat-messages-inner'));
	}

	addMessagePair(humanEl: HTMLElement, aiEl: HTMLElement): HTMLElement {
		const previousPair = this.lastPair;

		const pair = $('div.vybe-chat-pair-container');
		pair.appendChild(humanEl);
		pair.appendChild(aiEl);
		this.messagesInner.appendChild(pair);
		this.lastPair = pair;

		this.applyLastPairSizing();
		this.scrollNewPairIntoView(humanEl, previousPair);

		return pair;
	}

	layout(height: number): void {
		this.viewportHeight = height;
		this.applyLastPairSizing();
	}

	private applyLastPairSizing(): void {
		if (!this.lastPair || this.viewportHeight <= 0) { return; }
		this.lastPair.style.minHeight = `${this.viewportHeight}px`;
		this.lastPair.style.paddingBottom = '56px';
	}

	private scrollNewPairIntoView(humanEl: HTMLElement, previousPair: HTMLElement | null): void {
		const win = getWindow(this.domNode);
		win.requestAnimationFrame(() => {
			humanEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

			// Strip previous pair's sizing after the scroll animation settles
			if (previousPair) {
				setTimeout(() => {
					previousPair.style.minHeight = '';
					previousPair.style.paddingBottom = '';
				}, 500);
			}
		});
	}
}

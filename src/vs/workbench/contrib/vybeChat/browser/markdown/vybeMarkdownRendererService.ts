/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * VYBE Chat Markdown Renderer Service — Implementation
 *
 * Wraps the DOM builder with link handling (IOpenerService) and proper lifecycle.
 * Supports both full render and incremental (streaming) render paths.
 */

import { DisposableStore } from '../../../../../base/common/lifecycle.js';
import { IOpenerService } from '../../../../../platform/opener/common/opener.js';
import {
	IVybeChatMarkdownRendererService,
	IVybeChatMarkdownRenderOptions,
	IVybeChatMarkdownRenderResult,
	decodeHtmlEntitiesInMarkdown,
} from '../../common/vybeChatMarkdownRenderer.js';
import { buildVybeMarkdownDom, diffSections } from './vybeMarkdownToDom.js';

export class VybeMarkdownRendererService implements IVybeChatMarkdownRendererService {
	declare readonly _serviceBrand: undefined;

	constructor(
		@IOpenerService private readonly _openerService: IOpenerService,
	) { }

	render(markdown: string, options?: IVybeChatMarkdownRenderOptions): IVybeChatMarkdownRenderResult {
		const disposables = new DisposableStore();
		const decoded = decodeHtmlEntitiesInMarkdown(markdown ?? '');
		const { root } = buildVybeMarkdownDom(decoded, {
			codeBlockSlot: options?.codeBlockSlot,
			isStreaming: options?.isStreaming,
		});

		this._attachLinkHandler(root, disposables);

		return {
			get element(): HTMLElement {
				return root;
			},
			dispose: () => {
				disposables.dispose();
			},
		};
	}

	renderIncremental(existingRoot: HTMLElement, markdown: string, options?: IVybeChatMarkdownRenderOptions): void {
		const decoded = decodeHtmlEntitiesInMarkdown(markdown ?? '');
		diffSections(existingRoot, decoded, {
			codeBlockSlot: options?.codeBlockSlot,
			isStreaming: options?.isStreaming,
		});
	}

	private _attachLinkHandler(root: HTMLElement, disposables: DisposableStore): void {
		const handler = (e: MouseEvent): void => {
			const target = e.target as HTMLElement;
			const link = target.closest?.('.markdown-link');
			if (link) {
				const href = link.getAttribute('data-link');
				if (href) {
					e.preventDefault();
					this._openerService.open(href);
				}
			}
		};
		root.addEventListener('click', handler);
		disposables.add({ dispose: () => root.removeEventListener('click', handler) });
	}
}

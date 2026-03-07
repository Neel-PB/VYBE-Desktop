/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * MessagePage — Orchestrator for one AI response.
 *
 * Takes an ordered list of IVybeChatContentData items and instantiates the
 * correct content part for each.  Handles:
 *
 *  - Creation: maps kind → Part class
 *  - Streaming updates: patches existing parts when data changes
 *  - Disposal: cleans up all child parts on tear-down
 *
 * This is deliberately thin — layout, scrolling, and input belong to the
 * ViewPane and Composer, not here.
 */

import { Disposable } from "../../../../../../base/common/lifecycle.js";
import { $ } from "../../../../../../base/browser/dom.js";
import {
	type IVybeChatContentData,
	type IVybeChatContentPart,
	type IVybeChatMarkdownContent,
	type IVybeChatThinkingContent,
	type IVybeChatToolContent,
	type IVybeChatCodeBlockContent,
} from "../../contentParts/vybeChatContentPart.js";
import { VybeChatMarkdownPart } from "../../contentParts/vybeChatMarkdownPart.js";
import { VybeChatThinkingPart } from "../../contentParts/vybeChatThinkingPart.js";
import { VybeChatToolPart } from "../../contentParts/vybeChatToolPart.js";
import { VybeChatCodeBlockPart } from "../../contentParts/vybeChatCodeBlockPart.js";
import { IVybeChatMarkdownRendererService } from "../../../common/vybeChatMarkdownRenderer.js";
import { IInstantiationService } from "../../../../../../platform/instantiation/common/instantiation.js";
import { IEditorService } from "../../../../../services/editor/common/editorService.js";
import { IWorkspaceContextService } from "../../../../../../platform/workspace/common/workspace.js";
import { IClipboardService } from "../../../../../../platform/clipboard/common/clipboardService.js";

export class MessagePage extends Disposable {
	private readonly _container: HTMLElement;
	private readonly _parts: IVybeChatContentPart[] = [];

	constructor(
		private readonly _markdownService: IVybeChatMarkdownRendererService,
		private readonly _instantiationService: IInstantiationService,
		private readonly _editorService: IEditorService,
		private readonly _workspaceContextService: IWorkspaceContextService,
		private readonly _clipboardService: IClipboardService,
	) {
		super();
		this._container = $("div.vybe-message-page");
	}

	get domNode(): HTMLElement {
		return this._container;
	}

	// allow-any-unicode-next-line
	// ── Build / replace all content ───────────────────────────────────────

	setContent(items: IVybeChatContentData[]): void {
		this._clearParts();
		for (const item of items) {
			this._appendPart(item);
		}
	}

	// allow-any-unicode-next-line
	// ── Streaming: update a single part by index ──────────────────────────

	updatePartAt(index: number, data: IVybeChatContentData): void {
		const part = this._parts[index];
		if (part && part.updateContent) {
			part.updateContent(data);
		}
	}

	// allow-any-unicode-next-line
	// ── Streaming: append a new part ──────────────────────────────────────

	appendContent(item: IVybeChatContentData): void {
		this._appendPart(item);
	}

	// allow-any-unicode-next-line
	// ── Factory ───────────────────────────────────────────────────────────

	private _appendPart(data: IVybeChatContentData): void {
		const part = this._createPart(data);
		if (!part) {
			return;
		}
		this._parts.push(part);
		this._register(part);
		this._container.appendChild(part.domNode);
	}

	private _createPart(
		data: IVybeChatContentData,
	): IVybeChatContentPart | undefined {
		switch (data.kind) {
			case "markdown":
				return new VybeChatMarkdownPart(
					data as IVybeChatMarkdownContent,
					this._markdownService,
					this._editorService,
					this._workspaceContextService,
					this._instantiationService,
					this._clipboardService,
				);

			case "thinking":
				return new VybeChatThinkingPart(
					data as IVybeChatThinkingContent,
					this._markdownService,
				);

			case "tool":
				return new VybeChatToolPart(data as IVybeChatToolContent);

			case "codeBlock":
				return this._instantiationService.createInstance(
					VybeChatCodeBlockPart,
					data as IVybeChatCodeBlockContent,
					this._parts.length,
				);

			default:
				return undefined;
		}
	}

	// allow-any-unicode-next-line
	// ── Cleanup ───────────────────────────────────────────────────────────

	private _clearParts(): void {
		for (const part of this._parts) {
			part.dispose();
		}
		this._parts.length = 0;
		while (this._container.firstChild) {
			this._container.removeChild(this._container.firstChild);
		}
	}

	get partCount(): number {
		return this._parts.length;
	}

	override dispose(): void {
		this._clearParts();
		super.dispose();
	}
}

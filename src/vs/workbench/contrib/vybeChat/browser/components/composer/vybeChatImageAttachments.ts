/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { $, append, addDisposableListener, getWindow } from '../../../../../../base/browser/dom.js';
import { Disposable } from '../../../../../../base/common/lifecycle.js';
import { DomScrollableElement } from '../../../../../../base/browser/ui/scrollbar/scrollableElement.js';
import { ScrollbarVisibility } from '../../../../../../base/common/scrollable.js';

export interface ImageAttachment {
	id: string;
	url: string;
	file: File;
}

const T = {
	pillSize: 32,
	borderRadius: 4,
	gap: 8,
	closeBtnSize: 14,
	closeBtnOffset: 2,
};

export class VybeChatImageAttachments extends Disposable {

	readonly domNode: HTMLElement;
	private scrollContainer: HTMLElement;
	private imageRow: HTMLElement;
	private scrollable: DomScrollableElement;
	private images: Map<string, ImageAttachment> = new Map();
	private onChangeCallback: (() => void) | null = null;

	constructor() {
		super();

		this.domNode = $('div.vybe-composer-image-row');
		this.domNode.style.display = 'none';

		const scrollWrapper = append(this.domNode, $('div'));
		scrollWrapper.style.cssText = 'overflow: hidden; width: 100%;';

		this.scrollContainer = append(scrollWrapper, $('div'));
		this.scrollContainer.style.cssText = `
			width: 100%;
			overflow: hidden;
			height: ${T.pillSize}px;
		`;

		this.imageRow = $('div');
		this.imageRow.style.cssText = `
			display: flex;
			gap: ${T.gap}px;
			height: ${T.pillSize}px;
			min-width: 100%;
		`;

		this.scrollable = this._register(new DomScrollableElement(this.imageRow, {
			vertical: ScrollbarVisibility.Hidden,
			horizontal: ScrollbarVisibility.Auto,
			useShadows: false,
			horizontalScrollbarSize: 6,
		}));

		const scrollDom = this.scrollable.getDomNode();
		scrollDom.style.cssText = 'height: 100%; width: 100%;';
		this.scrollContainer.appendChild(scrollDom);
	}

	setOnChangeCallback(cb: () => void): void {
		this.onChangeCallback = cb;
	}

	addImage(file: File): void {
		const id = `img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
		const url = URL.createObjectURL(file);
		this.images.set(id, { id, url, file });
		this.render();
		this.onChangeCallback?.();
	}

	removeImage(id: string): void {
		const image = this.images.get(id);
		if (image) {
			URL.revokeObjectURL(image.url);
			this.images.delete(id);
		}
		this.render();
		this.onChangeCallback?.();
	}

	getImages(): ImageAttachment[] {
		return Array.from(this.images.values());
	}

	clear(): void {
		this.images.forEach(img => URL.revokeObjectURL(img.url));
		this.images.clear();
		this.render();
	}

	private render(): void {
		while (this.imageRow.firstChild) {
			this.imageRow.removeChild(this.imageRow.firstChild);
		}

		if (this.images.size === 0) {
			this.domNode.style.display = 'none';
			return;
		}

		this.domNode.style.display = 'flex';

		this.images.forEach(image => {
			this.imageRow.appendChild(this.buildPill(image));
		});

		setTimeout(() => this.scrollable.scanDomNode(), 0);
	}

	private buildPill(image: ImageAttachment): HTMLElement {
		const pill = $('div');
		pill.style.cssText = `
			display: flex;
			align-items: center;
			height: ${T.pillSize}px;
			flex-shrink: 0;
		`;

		const container = append(pill, $('div'));
		container.style.cssText = `
			width: ${T.pillSize}px;
			height: ${T.pillSize}px;
			position: relative;
			overflow: hidden;
			border-radius: ${T.borderRadius}px;
			cursor: pointer;
		`;

		const img = append(container, $('img')) as HTMLImageElement;
		img.alt = 'Attached image';
		img.src = image.url;
		img.style.cssText = 'width: 100%; height: 100%; object-fit: cover;';

		const closeBtn = append(container, $('span.codicon.codicon-close'));
		closeBtn.style.cssText = `
			position: absolute;
			top: ${T.closeBtnOffset}px;
			right: ${T.closeBtnOffset}px;
			font-size: ${T.closeBtnSize}px;
			width: ${T.closeBtnSize}px;
			height: ${T.closeBtnSize}px;
			display: none;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			background-color: rgba(128, 128, 128, 0.8);
			border-radius: ${T.borderRadius}px;
			color: white;
			z-index: 2;
		`;

		this._register(addDisposableListener(container, 'mouseenter', () => {
			closeBtn.style.display = 'flex';
		}));
		this._register(addDisposableListener(container, 'mouseleave', () => {
			closeBtn.style.display = 'none';
		}));

		this._register(addDisposableListener(closeBtn, 'click', (e) => {
			e.stopPropagation();
			this.removeImage(image.id);
		}));

		this._register(addDisposableListener(container, 'click', (e) => {
			const target = e.target as HTMLElement;
			if (!closeBtn.contains(target)) {
				this.showImageModal(image);
			}
		}));

		return pill;
	}

	private isDarkTheme(): boolean {
		const win = getWindow(this.domNode);
		// eslint-disable-next-line no-restricted-syntax
		const workbench = win.document.querySelector('.monaco-workbench');
		if (workbench) {
			return workbench.classList.contains('vs-dark') || workbench.classList.contains('hc-black');
		}
		return win.document.body.classList.contains('vs-dark') || win.document.body.classList.contains('hc-black');
	}

	private showImageModal(image: ImageAttachment): void {
		const win = getWindow(this.domNode);
		const doc = win.document;
		const dark = this.isDarkTheme();

		// eslint-disable-next-line no-restricted-syntax
		const existing = doc.querySelector('.vybe-image-modal');
		if (existing) {
			existing.remove();
		}

		const overlay = $('div');
		overlay.className = 'vybe-image-modal';
		overlay.style.cssText = `
			position: fixed;
			top: 0; left: 0;
			width: 100%; height: 100%;
			background-color: rgba(170, 170, 170, 0.7);
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 2551;
		`;

		const inner = append(overlay, $('div'));
		inner.style.cssText = `
			background: transparent;
			border-radius: 8px;
			width: calc(-10vh + 100vw);
			display: flex;
			flex-direction: column;
			gap: 12px;
			z-index: 2552;
			height: 90vh;
		`;

		const contentWrap = append(inner, $('div'));
		contentWrap.setAttribute('tabindex', '0');
		contentWrap.style.cssText = `
			height: 100%; width: 100%;
			outline: none;
			display: flex;
			align-items: center;
			justify-content: center;
		`;

		const imageWrap = append(contentWrap, $('div'));
		imageWrap.style.cssText = 'display: inline-block; position: relative;';

		const modalImg = append(imageWrap, $('img')) as HTMLImageElement;
		modalImg.src = image.url;
		modalImg.alt = 'Attached image';
		modalImg.style.cssText = `
			max-width: 100%;
			max-height: 80vh;
			object-fit: contain;
			border-radius: 8px;
			display: block;
		`;

		const toolbarBg = dark ? '#1e1f21' : '#f8f8f9';
		const toolbarBorder = dark ? '#383838' : '#d9d9d9';
		const iconColor = dark ? 'rgba(228, 228, 228, 0.92)' : 'rgba(51, 51, 51, 0.9)';
		const hoverBg = dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';

		const toolbar = append(imageWrap, $('div'));
		toolbar.style.cssText = `
			position: absolute;
			top: 6px; right: 6px;
			display: flex;
			gap: 6px;
			z-index: 2;
			background-color: ${toolbarBg};
			border: 1px solid ${toolbarBorder};
			border-radius: 6px;
			padding: 4px;
			box-shadow: rgba(0, 0, 0, 0.18) 0px 1px 4px;
		`;

		const buildToolbarBtn = (iconClass: string): HTMLElement => {
			const btn = append(toolbar, $('div'));
			btn.style.cssText = `
				width: 16px; height: 16px;
				background-color: transparent;
				border: none;
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;
				border-radius: 5px;
			`;
			const ico = append(btn, $(`span.codicon.${iconClass}`));
			ico.style.cssText = `
				font-size: 16px;
				width: 16px; height: 16px;
				display: flex;
				align-items: center;
				justify-content: center;
				color: ${iconColor};
			`;
			this._register(addDisposableListener(btn, 'mouseenter', () => { btn.style.backgroundColor = hoverBg; }));
			this._register(addDisposableListener(btn, 'mouseleave', () => { btn.style.backgroundColor = 'transparent'; }));
			return btn;
		};

		const downloadBtn = buildToolbarBtn('codicon-arrow-down');
		const closeModalBtn = buildToolbarBtn('codicon-close');

		this._register(addDisposableListener(downloadBtn, 'click', (e) => {
			e.stopPropagation();
			const link = doc.createElement('a');
			link.href = image.url;
			link.download = image.file.name;
			link.click();
		}));

		const closeModal = () => overlay.remove();

		this._register(addDisposableListener(closeModalBtn, 'click', (e) => {
			e.stopPropagation();
			closeModal();
		}));

		this._register(addDisposableListener(overlay, 'click', (e) => {
			if (e.target === overlay) {
				closeModal();
			}
		}));

		const escHandler = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				closeModal();
				win.removeEventListener('keydown', escHandler);
			}
		};
		win.addEventListener('keydown', escHandler);
		this._register({ dispose: () => win.removeEventListener('keydown', escHandler) });

		doc.body.appendChild(overlay);
	}

	override dispose(): void {
		this.clear();
		super.dispose();
	}
}

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Disposable } from '../../../../base/common/lifecycle.js';
import { createDecorator } from '../../../../platform/instantiation/common/instantiation.js';

/** Model row shape used by Models tab (stub when vybeLLM not present). */
export interface VybeModelRow {
	label: string;
	providerLabel: string;
	description?: string;
	thinking?: boolean;
	hasThinking?: boolean;
	id?: string;
	enabled?: boolean;
}

/**
 * Stub decorator for IVybeLLMModelService when vybeLLM contrib is not present.
 * Settings Models tab uses try/catch and gets null when this service is not registered.
 */
export interface IVybeLLMModelService {
	readonly _serviceBrand: undefined;
	refreshModels(): Promise<void>;
	getAllModels(): Promise<VybeModelRow[]>;
	setModelEnabled?(modelId: string, enabled: boolean): void | Promise<void>;
}

export const IVybeLLMModelService = createDecorator<IVybeLLMModelService>('vybeLLMModelService');

/**
 * Stub for ModelHoverPopup when vybeChat is not present. No-op; real implementation
 * shows model info on hover in the Models settings tab.
 */
export class ModelHoverPopup extends Disposable {
	constructor(_parent: HTMLElement) {
		super();
	}

	show(_model: VybeModelRow, _anchor: HTMLElement): void { }
	hide(): void { }
}

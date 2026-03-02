/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { createDecorator } from '../../../../../platform/instantiation/common/instantiation.js';

/**
 * Stub decorator for IVybeLLMModelService when vybeLLM contrib is not present.
 * Settings Models tab uses try/catch and gets null when this service is not registered.
 * When vybeLLM is added, register the real service and this decorator can be replaced.
 */
export interface IVybeLLMModelService {
	readonly _serviceBrand: undefined;
	refreshModels(): Promise<void>;
	getAllModels(): Promise<Array<{ label: string; providerLabel: string; description?: string; thinking?: boolean }>>;
}

export const IVybeLLMModelService = createDecorator<IVybeLLMModelService>('vybeLLMModelService');

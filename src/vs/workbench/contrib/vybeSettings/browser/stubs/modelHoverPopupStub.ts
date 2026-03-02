/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Disposable } from '../../../../../base/common/lifecycle.js';

/**
 * Stub for ModelHoverPopup when vybeChat is not present. No-op; real implementation
 * shows model info on hover in the Models settings tab.
 */
export class ModelHoverPopup extends Disposable {
	constructor(_parent: HTMLElement) {
		super();
	}

	show(_model: { label: string; providerLabel?: string; description?: string }, _anchor: HTMLElement): void { }
	hide(): void { }
}

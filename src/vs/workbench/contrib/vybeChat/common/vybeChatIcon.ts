/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { URI } from '../../../../base/common/uri.js';

/**
 * VYBE equalizer icon as a data URI for chat tab icons.
 */
export function getVybeChatIconUri(): URI {
	const svgContent = `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="vybe-gradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3ecf8e"/><stop offset="100%" stop-color="#2aa66d"/></linearGradient></defs><g fill="url(#vybe-gradient)" transform="translate(49,60)"><rect x="0" y="160" width="32" height="192" rx="16"/><rect x="48" y="120" width="32" height="232" rx="16"/><rect x="96" y="80" width="32" height="272" rx="16"/><rect x="144" y="40" width="32" height="312" rx="16"/><rect x="192" y="180" width="32" height="172" rx="16"/><rect x="240" y="40" width="32" height="312" rx="16"/><rect x="288" y="80" width="32" height="272" rx="16"/><rect x="336" y="120" width="32" height="232" rx="16"/><rect x="384" y="160" width="32" height="192" rx="16"/></g></svg>`;
	return URI.parse(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent)}`);
}

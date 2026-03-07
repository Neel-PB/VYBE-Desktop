/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * VYBE Chat Markdown Renderer — Contribution registration
 */

import { registerSingleton, InstantiationType } from '../../../../../platform/instantiation/common/extensions.js';
import { IVybeChatMarkdownRendererService } from '../../common/vybeChatMarkdownRenderer.js';
import { VybeMarkdownRendererService } from '../markdown/vybeMarkdownRendererService.js';

registerSingleton(IVybeChatMarkdownRendererService, VybeMarkdownRendererService, InstantiationType.Delayed);

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { InstantiationType, registerSingleton } from '../../../../platform/instantiation/common/extensions.js';
import { IIndexService } from '../common/indexService.js';
import { StubIndexService } from './stubIndexService.js';

registerSingleton(IIndexService, StubIndexService, InstantiationType.Delayed);

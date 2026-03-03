/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IVybeResourcesService, VybeMessage, VybeChangelogEntry, VybeDocItem, VybeBlogPost } from '../common/vybeResourcesService.js';

/**
 * Stub implementation. Replace with real service that fetches from API/console.vybe.com
 * when corporate backend is available.
 */
export class VybeResourcesServiceStub implements IVybeResourcesService {
	async getMessages(): Promise<VybeMessage[]> {
		return [];
	}

	async getChangelog(): Promise<VybeChangelogEntry[]> {
		return [];
	}

	async getDocs(): Promise<VybeDocItem[]> {
		return [];
	}

	async getBlogPosts(): Promise<VybeBlogPost[]> {
		return [];
	}
}

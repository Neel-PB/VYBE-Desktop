/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { createDecorator } from '../../../../platform/instantiation/common/instantiation.js';

/**
 * Content types for Vybe Resources. Data will come from API/console.vybe.com in future;
 * stub returns empty or placeholder data for now.
 */

export const IVybeResourcesService = createDecorator<IVybeResourcesService>('vybeResourcesService');

export interface IVybeResourcesService {
	getMessages(): Promise<VybeMessage[]>;
	getChangelog(): Promise<VybeChangelogEntry[]>;
	getDocs(): Promise<VybeDocItem[]>;
	getBlogPosts(): Promise<VybeBlogPost[]>;
}

export interface VybeMessage {
	id: string;
	title: string;
	body: string;
	readAt?: number;
	createdAt: number;
}

export interface VybeChangelogEntry {
	id: string;
	version?: string;
	title: string;
	body: string;
	date: string;
}

export interface VybeDocItem {
	id: string;
	title: string;
	url?: string;
	summary?: string;
}

export interface VybeBlogPost {
	id: string;
	title: string;
	summary: string;
	url?: string;
	publishedAt: string;
}

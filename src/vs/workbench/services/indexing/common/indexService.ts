/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { CancellationToken } from '../../../../base/common/cancellation.js';
import { Event } from '../../../../base/common/event.js';
import { URI } from '../../../../base/common/uri.js';
import { IAnyWorkspaceIdentifier } from '../../../../platform/workspace/common/workspace.js';
import { createDecorator } from '../../../../platform/instantiation/common/instantiation.js';

export const IIndexService = createDecorator<IIndexService>('indexService');

export const enum IndexState {
	Uninitialized = 'uninitialized',
	Indexing = 'indexing',
	Ready = 'ready',
	Stale = 'stale',
	Error = 'error',
	Idle = 'idle',
	Building = 'building',
	Degraded = 'degraded'
}

export interface IndexStatus {
	readonly workspace: IAnyWorkspaceIdentifier;
	readonly state: IndexState;
	readonly indexedFileCount?: number;
	readonly lastUpdated?: number;
	readonly lastIndexedTime?: number;
	readonly totalFiles?: number;
	readonly indexedFiles?: number;
	readonly totalChunks?: number;
	readonly embeddedChunks?: number;
	readonly embeddingPending?: number;
	readonly embeddingInProgress?: number;
	readonly embeddingActiveBatches?: number;
	readonly embeddingModel?: string;
	readonly errorMessage?: string;
	readonly modelDownloadState?: 'idle' | 'checking' | 'downloading' | 'extracting' | 'ready' | 'error' | 'hash';
	readonly modelDownloadProgress?: number;
	readonly modelDownloadMessage?: string;
	readonly lastFullScanTime?: number;
	readonly lastEmbeddingRunTime?: number;
	readonly failedEmbeddingCount?: number;
	readonly pendingEmbeddingCount?: number;
	readonly retrievalMode?: 'ts' | 'sqlite-vector';
	readonly vectorIndexReady?: boolean;
	readonly lastErrorCode?: string;
	readonly lastErrorMessage?: string;
	readonly paused?: boolean;
	readonly pausedReason?: string;
	readonly degradedReason?: string;
	readonly rebuilding?: boolean;
	readonly backfillingVectorIndex?: boolean;
}

export interface IndexStatusDto {
	readonly workspaceId: string;
	readonly state: IndexState;
	readonly totalFiles?: number;
	readonly indexedFiles?: number;
	readonly totalChunks?: number;
	readonly lastIndexedTime?: number;
	readonly schemaVersion?: number;
	readonly embeddedChunks?: number;
	readonly embeddingModel?: string;
	readonly errorMessage?: string;
}

export interface IndexDiagnostics {
	readonly workspace: IAnyWorkspaceIdentifier;
	readonly state: IndexState;
	readonly totalFiles: number;
	readonly indexedFiles: number;
	readonly totalChunks: number;
	readonly embeddedChunks: number;
	readonly embeddingModel?: string;
	readonly modelDownloadState?: IndexStatus['modelDownloadState'];
	readonly lastIndexedTime?: number;
	readonly lastError?: string;
	readonly dbPath?: string;
}

export interface IndexRequest {
	readonly uri: URI;
	readonly languageId?: string;
	readonly content?: string;
	readonly workspace?: IAnyWorkspaceIdentifier;
}

export interface IIndexService {
	readonly _serviceBrand: undefined;

	readonly onDidChangeStatus: Event<IndexStatus>;

	buildFullIndex(workspace: IAnyWorkspaceIdentifier, token?: CancellationToken): Promise<IndexStatus>;
	refreshPaths(workspace: IAnyWorkspaceIdentifier, uris: URI[], token?: CancellationToken): Promise<IndexStatus>;
	getStatus(workspace: IAnyWorkspaceIdentifier): Promise<IndexStatus>;
	indexSavedFiles?(workspace: IAnyWorkspaceIdentifier, uris: URI[], token?: CancellationToken): Promise<IndexStatus>;
	repairModel?(workspace: IAnyWorkspaceIdentifier, token?: CancellationToken): Promise<IndexStatus>;
	deleteIndex?(workspace: IAnyWorkspaceIdentifier, token?: CancellationToken): Promise<void>;
	getDiagnostics?(workspace: IAnyWorkspaceIdentifier, token?: CancellationToken): Promise<IndexDiagnostics>;
	pause(workspace: IAnyWorkspaceIdentifier, reason?: string): Promise<void>;
	resume(workspace: IAnyWorkspaceIdentifier): Promise<void>;
	rebuildWorkspaceIndex(workspace: IAnyWorkspaceIdentifier, reason?: string): Promise<void>;
}

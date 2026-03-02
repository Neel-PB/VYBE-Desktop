/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { CancellationToken } from '../../../../../base/common/cancellation.js';
import { Emitter, Event } from '../../../../../base/common/event.js';
import { Disposable } from '../../../../../base/common/lifecycle.js';
import { URI } from '../../../../../base/common/uri.js';
import { IAnyWorkspaceIdentifier } from '../../../../../platform/workspace/common/workspace.js';
import { createDecorator } from '../../../../../platform/instantiation/common/instantiation.js';

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

export interface IIndexService {
	readonly _serviceBrand: undefined;
	readonly onDidChangeStatus: Event<IndexStatus>;
	buildFullIndex(workspace: IAnyWorkspaceIdentifier, token?: CancellationToken): Promise<IndexStatus>;
	refreshPaths(workspace: IAnyWorkspaceIdentifier, uris: URI[], token?: CancellationToken): Promise<IndexStatus>;
	getStatus(workspace: IAnyWorkspaceIdentifier): Promise<IndexStatus>;
	pause(workspace: IAnyWorkspaceIdentifier, reason?: string): Promise<void>;
	resume(workspace: IAnyWorkspaceIdentifier): Promise<void>;
	rebuildWorkspaceIndex(workspace: IAnyWorkspaceIdentifier, reason?: string): Promise<void>;
}

/**
 * Stub IIndexService for VYBE Settings when real indexing is not yet available.
 */
export class StubIndexService extends Disposable implements IIndexService {
	readonly _serviceBrand: undefined;

	private readonly _onDidChangeStatus = this._register(new Emitter<IndexStatus>());
	readonly onDidChangeStatus: Event<IndexStatus> = this._onDidChangeStatus.event;

	buildFullIndex(_workspace: IAnyWorkspaceIdentifier, _token?: CancellationToken): Promise<IndexStatus> {
		return Promise.resolve(this.idleStatus(_workspace));
	}

	refreshPaths(_workspace: IAnyWorkspaceIdentifier, _uris: URI[], _token?: CancellationToken): Promise<IndexStatus> {
		return Promise.resolve(this.idleStatus(_workspace));
	}

	getStatus(workspace: IAnyWorkspaceIdentifier): Promise<IndexStatus> {
		return Promise.resolve(this.idleStatus(workspace));
	}

	pause(_workspace: IAnyWorkspaceIdentifier, _reason?: string): Promise<void> {
		return Promise.resolve();
	}

	resume(_workspace: IAnyWorkspaceIdentifier): Promise<void> {
		return Promise.resolve();
	}

	rebuildWorkspaceIndex(_workspace: IAnyWorkspaceIdentifier, _reason?: string): Promise<void> {
		return Promise.resolve();
	}

	private idleStatus(workspace: IAnyWorkspaceIdentifier): IndexStatus {
		return {
			workspace,
			state: IndexState.Idle,
			indexedFileCount: 0,
			totalFiles: 0,
			indexedFiles: 0,
			totalChunks: 0,
			embeddedChunks: 0
		};
	}
}

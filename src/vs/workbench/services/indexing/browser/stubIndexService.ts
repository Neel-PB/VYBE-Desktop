/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { CancellationToken } from '../../../../base/common/cancellation.js';
import { Emitter, Event } from '../../../../base/common/event.js';
import { Disposable } from '../../../../base/common/lifecycle.js';
import { URI } from '../../../../base/common/uri.js';
import { IAnyWorkspaceIdentifier } from '../../../../platform/workspace/common/workspace.js';
import { IIndexService, IndexState, IndexStatus } from '../common/indexService.js';

/**
 * Stub IIndexService for VYBE Settings when real indexing is not yet available.
 * All methods no-op; getStatus returns idle status so the Indexing & Docs tab renders.
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

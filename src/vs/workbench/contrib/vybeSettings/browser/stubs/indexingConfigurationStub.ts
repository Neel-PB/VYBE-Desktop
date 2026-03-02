/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IStringDictionary } from '../../../../../base/common/collections.js';
import { IConfigurationPropertySchema } from '../../../../../platform/configuration/common/configurationRegistry.js';

export const CONFIG_SECTION = 'vybe';
export const CONFIG_CLOUD_INDEXING_ENABLED = 'vybe.cloudIndexing.enabled';
export const CONFIG_PINECONE_INDEX_NAME = 'vybe.cloudIndexing.pineconeIndex';
export const CONFIG_CHUNK_SIZE_LINES = 'vybe.cloudIndexing.chunkSizeLines';
export const CONFIG_CLOUD_EMBEDDING_BATCH_SIZE = 'vybe.cloudIndexing.embeddingBatchSize';
export const CONFIG_CODEBASE_SEARCH_RATE_LIMIT_PER_MINUTE = 'vybe.codebaseSearch.rateLimitPerMinute';
export const CONFIG_GREP_TIMEOUT_SECONDS = 'vybe.grep.timeoutSeconds';
export const CONFIG_GREP_RATE_LIMIT_PER_MINUTE = 'vybe.grep.rateLimitPerMinute';

export const indexingConfigurationProperties: IStringDictionary<IConfigurationPropertySchema> = {
	[CONFIG_CLOUD_INDEXING_ENABLED]: {
		type: 'boolean',
		default: false,
		description: 'Enable cloud-based codebase indexing for semantic search and retrieval.'
	},
	[CONFIG_PINECONE_INDEX_NAME]: {
		type: 'string',
		default: 'vybe',
		description: 'Shared Pinecone index name for all users. User isolation is provided via namespaces.'
	},
	[CONFIG_CHUNK_SIZE_LINES]: {
		type: 'number',
		default: 200,
		minimum: 1,
		description: 'Number of lines per code chunk when indexing files.'
	},
	[CONFIG_CLOUD_EMBEDDING_BATCH_SIZE]: {
		type: 'number',
		default: 50,
		minimum: 1,
		maximum: 128,
		description: 'Batch size for embedding generation requests to Voyage AI.'
	},
	[CONFIG_CODEBASE_SEARCH_RATE_LIMIT_PER_MINUTE]: {
		type: 'number',
		default: 60,
		minimum: 1,
		description: 'Maximum codebase_search calls per minute per workspace. When exceeded, returns a rate limit error.'
	},
	[CONFIG_GREP_TIMEOUT_SECONDS]: {
		type: 'number',
		default: 60,
		minimum: 5,
		maximum: 300,
		description: 'Hard timeout in seconds for grep (agent tool). When exceeded, search is cancelled and a timeout error is returned.'
	},
	[CONFIG_GREP_RATE_LIMIT_PER_MINUTE]: {
		type: 'number',
		default: 120,
		minimum: 1,
		description: 'Maximum grep calls per minute per workspace. When exceeded, returns a rate limit error. Set to 0 to disable.'
	}
};

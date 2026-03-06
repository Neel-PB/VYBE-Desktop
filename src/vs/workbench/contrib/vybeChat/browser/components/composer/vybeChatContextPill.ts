/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Shared types for context pills (inline mention elements in the composer).
 *
 * DOM building and lifecycle are now handled by the Lexical MentionNode
 * (see lexical/vybeMentionNode.ts). This file retains the type exports
 * so that the rest of the codebase can reference them without depending
 * on Lexical directly.
 */

export type ContextPillType = 'file' | 'folder' | 'terminal' | 'doc' | 'pastChat' | 'url';

export interface ContextPillData {
	type: ContextPillType;
	name: string;
	path?: string;
	key: string;
}

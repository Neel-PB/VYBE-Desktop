/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

let historyCommandRunner: (() => void) | undefined;

export function setHistoryCommandRunner(runner: () => void): void {
	historyCommandRunner = runner;
}

export function runHistoryCommand(): boolean {
	if (historyCommandRunner) {
		historyCommandRunner();
		return true;
	}
	return false;
}

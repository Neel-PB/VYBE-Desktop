/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// VYBE: Editor contribution — registers all VYBE editor contributions.

import { EditorContributionInstantiation, registerEditorContribution } from '../../../../editor/browser/editorExtensions.js';
import { registerAction2 } from '../../../../platform/actions/common/actions.js';

// Inline Composer (editor)
import { VybeInlineComposerController } from './inlineComposer/vybeInlineComposerController.js';
import { OpenVybeInlineComposerAction } from './inlineComposer/vybeInlineComposerActions.js';

registerEditorContribution(VybeInlineComposerController.ID, VybeInlineComposerController, EditorContributionInstantiation.Lazy);
registerAction2(OpenVybeInlineComposerAction);

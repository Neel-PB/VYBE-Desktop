/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Registry } from '../../../../platform/registry/common/platform.js';
import { EditorPaneDescriptor, IEditorPaneRegistry } from '../../../browser/editor.js';
import { EditorExtensions } from '../../../common/editor.js';
import { SyncDescriptor } from '../../../../platform/instantiation/common/descriptors.js';
import { InstantiationType, registerSingleton } from '../../../../platform/instantiation/common/extensions.js';
import { MenuRegistry, MenuId, registerAction2, Action2 } from '../../../../platform/actions/common/actions.js';
import { localize, localize2 } from '../../../../nls.js';
import { IInstantiationService, ServicesAccessor } from '../../../../platform/instantiation/common/instantiation.js';
import { IEditorService, MODAL_GROUP } from '../../../services/editor/common/editorService.js';
import { IConfigurationService } from '../../../../platform/configuration/common/configuration.js';
import { ILogService } from '../../../../platform/log/common/log.js';

import { VybeSettingsEditor } from './vybeSettingsEditor.js';
import { VybeSettingsEditorInput } from './vybeSettingsEditorInput.js';
import { IIndexService, StubIndexService } from './stubs/indexServiceStub.js';

registerSingleton(IIndexService, StubIndexService, InstantiationType.Delayed);

const VYBE_SETTINGS_EDITOR_ID = VybeSettingsEditor.ID;
const VYBE_SETTINGS_COMMAND_ID = 'vybe.openSettingsEditor';
const VYBE_SETTINGS_MODELS_COMMAND_ID = 'vybe.openSettingsEditor.models';
const VYBE_SETTINGS_INDEXING_DOCS_COMMAND_ID = 'vybe.openSettingsEditor.indexing-docs';
const VYBE_MENUBAR_VYBE_MENU = new MenuId('MenubarVybeMenu');
const VYBE_LOCAL_INDEX_E2E_COMMAND_ID = 'vybe.localIndexing.runE2ETest';
const VYBE_LOCAL_INDEX_DEV_QUERY_COMMAND_ID = 'vybe.localIndexing.devQuerySimilarChunks';

Registry.as<IEditorPaneRegistry>(EditorExtensions.EditorPane).registerEditorPane(
	EditorPaneDescriptor.create(
		VybeSettingsEditor,
		VYBE_SETTINGS_EDITOR_ID,
		localize('vybeSettings.editorTitle', 'VYBE Settings')
	),
	[new SyncDescriptor(VybeSettingsEditorInput)]
);

registerAction2(class OpenVybeSettingsAction extends Action2 {
	constructor() {
		super({
			id: VYBE_SETTINGS_COMMAND_ID,
			title: localize2('vybeSettings.open', 'VYBE: Open Settings'),
			f1: true
		});
	}

	async run(accessor: ServicesAccessor): Promise<void> {
		const instantiationService = accessor.get(IInstantiationService);
		const editorService = accessor.get(IEditorService);
		const configurationService = accessor.get(IConfigurationService);
		const input = instantiationService.createInstance(VybeSettingsEditorInput);
		// Open in modal overlay when workbench.editor.useModal allows it (same as VS Code Settings)
		const useModal = configurationService.getValue<string>('workbench.editor.useModal');
		const group = useModal !== 'off' ? MODAL_GROUP : undefined;
		await editorService.openEditor(input, { pinned: true }, group);
	}
});

registerAction2(class OpenVybeSettingsModelsAction extends Action2 {
	constructor() {
		super({
			id: VYBE_SETTINGS_MODELS_COMMAND_ID,
			title: localize2('vybeSettings.openModels', 'VYBE: Open Settings (Models tab)')
		});
	}

	async run(accessor: ServicesAccessor): Promise<void> {
		const instantiationService = accessor.get(IInstantiationService);
		const editorService = accessor.get(IEditorService);
		const configurationService = accessor.get(IConfigurationService);
		const input = instantiationService.createInstance(VybeSettingsEditorInput, 'models');
		const useModal = configurationService.getValue<string>('workbench.editor.useModal');
		const group = useModal !== 'off' ? MODAL_GROUP : undefined;
		await editorService.openEditor(input, { pinned: true }, group);
	}
});

registerAction2(class OpenVybeSettingsIndexingDocsAction extends Action2 {
	constructor() {
		super({
			id: VYBE_SETTINGS_INDEXING_DOCS_COMMAND_ID,
			title: localize2('vybeSettings.openIndexingDocs', 'VYBE: Open Settings (Indexing & Docs tab)')
		});
	}

	async run(accessor: ServicesAccessor): Promise<void> {
		const instantiationService = accessor.get(IInstantiationService);
		const editorService = accessor.get(IEditorService);
		const configurationService = accessor.get(IConfigurationService);
		const input = instantiationService.createInstance(VybeSettingsEditorInput, 'indexing-docs');
		const useModal = configurationService.getValue<string>('workbench.editor.useModal');
		const group = useModal !== 'off' ? MODAL_GROUP : undefined;
		await editorService.openEditor(input, { pinned: true }, group);
	}
});

// Add to Preferences menu for discoverability (Command Palette + classic path)
MenuRegistry.appendMenuItem(MenuId.MenubarPreferencesMenu, {
	group: '4_vybe',
	command: {
		id: VYBE_SETTINGS_COMMAND_ID,
		title: localize('vybeSettings.open.preferences', 'VYBE Settings')
	},
	order: 100
});

// VYBE top menu → Settings → VYBE Settings
MenuRegistry.appendMenuItem(MenuId.MenubarHomeMenu, {
	title: localize({ key: 'miVybe', comment: ['Top-level VYBE menu in menubar'] }, "VYBE"),
	submenu: VYBE_MENUBAR_VYBE_MENU,
	group: '4_vybe',
	order: 1
});

MenuRegistry.appendMenuItem(VYBE_MENUBAR_VYBE_MENU, {
	group: '1_settings',
	command: {
		id: VYBE_SETTINGS_COMMAND_ID,
		title: localize('vybeSettings.open.simple', 'VYBE Settings')
	},
	order: 1
});

// Dev-only command to run an end-to-end verification of Phase 3 indexing.
registerAction2(class VybeLocalIndexE2ETestAction extends Action2 {
	constructor() {
		super({
			id: VYBE_LOCAL_INDEX_E2E_COMMAND_ID,
			title: localize2('vybe.localIndexing.runE2ETest', 'VYBE: Local Index E2E Test (Dev)'),
			f1: true
		});
	}

	async run(accessor: ServicesAccessor): Promise<void> {
		const logService = accessor.get(ILogService);

		// This command relied on $devRunE2EIndexTest which was part of local indexing
		// Local indexing has been removed - cloud indexing is now the only method
		const err = new Error('This dev command is not available with cloud indexing. Local indexing has been removed.');
		logService.warn('[vybe E2E] Local indexing dev command not available', err.message);
		throw err;
	}
});

// Dev-only command to query similar chunks - not available with cloud indexing
registerAction2(class VybeLocalIndexDevQuerySimilarChunksAction extends Action2 {
	constructor() {
		super({
			id: VYBE_LOCAL_INDEX_DEV_QUERY_COMMAND_ID,
			title: localize2('vybe.localIndexing.devQuerySimilarChunks', 'VYBE: Local Index Dev Query Similar Chunks (Dev)'),
			f1: true
		});
	}

	async run(accessor: ServicesAccessor): Promise<void> {
		const logService = accessor.get(ILogService);

		// This command relied on $querySimilarChunksInternal which was part of local indexing
		// Local indexing has been removed - use the codebase_search tool for cloud-based search
		const err = new Error('This dev command is not available with cloud indexing. Use codebase_search tool instead.');
		logService.warn('[vybe devQuerySimilarChunks] Local indexing dev command not available', err.message);
		throw err;
	}
});


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Registry } from '../../../../platform/registry/common/platform.js';
import { EditorPaneDescriptor, IEditorPaneRegistry } from '../../../browser/editor.js';
import { EditorExtensions } from '../../../common/editor.js';
import { SyncDescriptor } from '../../../../platform/instantiation/common/descriptors.js';
import { BrandedService } from '../../../../platform/instantiation/common/instantiation.js';
import { EditorPane } from '../../../browser/parts/editor/editorPane.js';
import { IEditorGroup } from '../../../services/editor/common/editorGroupsService.js';
import { InstantiationType, registerSingleton } from '../../../../platform/instantiation/common/extensions.js';
import { MenuRegistry, MenuId, registerAction2, Action2 } from '../../../../platform/actions/common/actions.js';
import { localize, localize2 } from '../../../../nls.js';
import { IInstantiationService, ServicesAccessor } from '../../../../platform/instantiation/common/instantiation.js';
import { IEditorService, MODAL_GROUP } from '../../../services/editor/common/editorService.js';
import { IConfigurationService } from '../../../../platform/configuration/common/configuration.js';

import { VybeResourcesEditor } from './vybeResourcesEditor.js';
import { VybeResourcesEditorInput } from './vybeResourcesEditorInput.js';
import { IVybeResourcesService } from '../common/vybeResourcesService.js';
import { VybeResourcesServiceStub } from './vybeResourcesServiceStub.js';

registerSingleton<IVybeResourcesService, []>(IVybeResourcesService, VybeResourcesServiceStub, InstantiationType.Delayed);

const VYBE_RESOURCES_EDITOR_ID = VybeResourcesEditor.ID;
const VYBE_OPEN_RESOURCES_COMMAND_ID = 'vybe.openResources';
const VYBE_OPEN_MESSAGES_COMMAND_ID = 'vybe.openMessages';

Registry.as<IEditorPaneRegistry>(EditorExtensions.EditorPane).registerEditorPane(
	EditorPaneDescriptor.create(
		VybeResourcesEditor as unknown as new (group: IEditorGroup, ...services: BrandedService[]) => EditorPane,
		VYBE_RESOURCES_EDITOR_ID,
		localize('vybeResources.editorTitle', 'Resources')
	),
	[new SyncDescriptor(VybeResourcesEditorInput)]
);

registerAction2(class OpenVybeResourcesAction extends Action2 {
	constructor() {
		super({
			id: VYBE_OPEN_RESOURCES_COMMAND_ID,
			title: localize2('vybeResources.open', 'Vybe: Open Resources'),
			f1: true
		});
	}

	async run(accessor: ServicesAccessor): Promise<void> {
		const instantiationService = accessor.get(IInstantiationService);
		const editorService = accessor.get(IEditorService);
		const configurationService = accessor.get(IConfigurationService);
		const input = instantiationService.createInstance(VybeResourcesEditorInput, {});
		const useModal = configurationService.getValue<string>('workbench.editor.useModal');
		const group = useModal !== 'off' ? MODAL_GROUP : undefined;
		await editorService.openEditor(input, { pinned: true }, group);
	}
});

registerAction2(class OpenVybeMessagesAction extends Action2 {
	constructor() {
		super({
			id: VYBE_OPEN_MESSAGES_COMMAND_ID,
			title: localize2('vybeResources.openMessages', 'Vybe: Open Messages'),
			f1: true
		});
	}

	async run(accessor: ServicesAccessor): Promise<void> {
		const instantiationService = accessor.get(IInstantiationService);
		const editorService = accessor.get(IEditorService);
		const configurationService = accessor.get(IConfigurationService);
		const input = instantiationService.createInstance(VybeResourcesEditorInput, { initialTab: 'messages' });
		const useModal = configurationService.getValue<string>('workbench.editor.useModal');
		const group = useModal !== 'off' ? MODAL_GROUP : undefined;
		await editorService.openEditor(input, { pinned: true }, group);
	}
});

MenuRegistry.appendMenuItem(MenuId.MenubarHelpMenu, {
	group: '2_vybe',
	command: {
		id: VYBE_OPEN_MESSAGES_COMMAND_ID,
		title: localize('vybeResources.messages', 'Messages')
	},
	order: 1
});

MenuRegistry.appendMenuItem(MenuId.MenubarHelpMenu, {
	group: '2_vybe',
	command: {
		id: VYBE_OPEN_RESOURCES_COMMAND_ID,
		title: localize('vybeResources.openMenu', 'Resources')
	},
	order: 2
});

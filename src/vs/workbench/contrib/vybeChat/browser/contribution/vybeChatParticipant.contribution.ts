/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { localize2 } from '../../../../../nls.js';
import { IViewContainersRegistry, IViewDescriptor, IViewsRegistry, ViewContainer, ViewContainerLocation, Extensions as ViewExtensions } from '../../../../common/views.js';
import { Registry } from '../../../../../platform/registry/common/platform.js';
import { SyncDescriptor } from '../../../../../platform/instantiation/common/descriptors.js';
import { VYBE_CHAT_DEFAULT_SESSION_ID, getVybeChatViewContainerId, getVybeChatViewId } from '../../common/vybeChatConstants.js';
import { getVybeChatIconUri } from '../../common/vybeChatIcon.js';
import { ViewPaneContainer } from '../../../../browser/parts/views/viewPaneContainer.js';
import { VybeChatViewPane } from '../vybeChatViewPane.js';

const defaultContainerId = getVybeChatViewContainerId(VYBE_CHAT_DEFAULT_SESSION_ID);

const defaultVybeChatViewContainer: ViewContainer = Registry.as<IViewContainersRegistry>(ViewExtensions.ViewContainersRegistry).registerViewContainer({
	id: defaultContainerId,
	title: localize2('vybeChat.newChat', 'New Chat'),
	icon: getVybeChatIconUri(),
	ctorDescriptor: new SyncDescriptor(ViewPaneContainer, [defaultContainerId, { mergeViewWithContainerWhenSingleView: true }]),
	storageId: defaultContainerId,
	hideIfEmpty: false,
	order: 1,
}, ViewContainerLocation.AuxiliaryBar, { isDefault: true, doNotRegisterOpenCommand: true });

const defaultViewDescriptor: IViewDescriptor = {
	id: getVybeChatViewId(VYBE_CHAT_DEFAULT_SESSION_ID),
	name: localize2('vybeChat.newChat', 'New Chat'),
	containerIcon: getVybeChatIconUri(),
	containerTitle: 'New Chat',
	singleViewPaneContainerTitle: 'New Chat',
	ctorDescriptor: new SyncDescriptor(VybeChatViewPane),
	canToggleVisibility: false,
	canMoveView: false,
};

Registry.as<IViewsRegistry>(ViewExtensions.ViewsRegistry).registerViews([defaultViewDescriptor], defaultVybeChatViewContainer);

export const DEFAULT_VYBE_CHAT_VIEW_CONTAINER = defaultVybeChatViewContainer;

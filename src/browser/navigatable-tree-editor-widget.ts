/********************************************************************************
 * Copyright (c) 2019-2020 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * https://www.eclipse.org/legal/epl-2.0, or the MIT License which is
 * available at https://opensource.org/licenses/MIT.
 *
 * SPDX-License-Identifier: EPL-2.0 OR MIT
 ********************************************************************************/
import { ILogger } from '@theia/core';
import { Navigatable } from '@theia/core/lib/browser';
import URI from '@theia/core/lib/common/uri';
import { WorkspaceService } from '@theia/workspace/lib/browser';

import { JSONFormsWidget } from './json-forms-widget';
import { JsonFormsTreeEditorWidget } from './tree-editor-widget';
import { JsonFormsTreeWidget } from './tree-widget';

export const NavigatableTreeEditorOptions = Symbol(
    'JsonFormsTreeEditorWidgetOptions'
);
export interface NavigatableTreeEditorOptions {
    uri: URI;
}

export abstract class NavigatableTreeEditorWidget extends JsonFormsTreeEditorWidget implements Navigatable {

    constructor(
        protected readonly treeWidget: JsonFormsTreeWidget,
        protected readonly formWidget: JSONFormsWidget,
        protected readonly workspaceService: WorkspaceService,
        protected readonly logger: ILogger,
        readonly widget_id: string,
        protected readonly options: NavigatableTreeEditorOptions,
    ) {
        super(
            treeWidget,
            formWidget,
            workspaceService,
            logger,
            widget_id
        );
    }

    /** The uri of the editor's resource. */
    get uri(): URI {
        return this.options.uri;
    }

    getResourceUri(): URI | undefined {
        return this.uri;
    }

    createMoveToUri(resourceUri: URI): URI | undefined {
        return this.options.uri && this.options.uri.withPath(resourceUri.path);
    }

}

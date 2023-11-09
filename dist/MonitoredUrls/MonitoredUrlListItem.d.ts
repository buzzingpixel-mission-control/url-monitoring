import React from 'react';
import { MonitoredUrlWithViewOptions } from './MonitoredUrls';
declare const MonitoredUrlListItem: {
    ({ isArchive, item, projectPageSlug, selectedItemsManager, }: {
        isArchive: boolean;
        item: MonitoredUrlWithViewOptions;
        projectPageSlug?: string | null | undefined;
        selectedItemsManager?: {
            selectedItems?: Array<string> | null | undefined;
            addSelectedItem?: (id: string) => void;
            removeSelectedItem?: (id: string) => void;
        };
    }): React.JSX.Element;
    defaultProps: {
        projectPageSlug: any;
        selectedItemsManager: any;
    };
};
export default MonitoredUrlListItem;

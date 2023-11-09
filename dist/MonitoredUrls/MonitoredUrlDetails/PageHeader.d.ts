import React from 'react';
import { MonitoredUrlWithIncidents } from './MonitoredUrlWithIncidents';
declare const PageHeader: {
    ({ data, fromProjectPageSlug, }: {
        data: MonitoredUrlWithIncidents;
        fromProjectPageSlug?: string | undefined | null;
    }): React.JSX.Element;
    defaultProps: {
        fromProjectPageSlug: any;
    };
};
export default PageHeader;

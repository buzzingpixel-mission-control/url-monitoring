import { MonitoredUrlWithIncidents } from './MonitoredUrlWithIncidents';
declare const PageHeader: {
    ({ data, fromProjectPageSlug, }: {
        data: MonitoredUrlWithIncidents;
        fromProjectPageSlug?: string | undefined | null;
    }): JSX.Element;
    defaultProps: {
        fromProjectPageSlug: any;
    };
};
export default PageHeader;

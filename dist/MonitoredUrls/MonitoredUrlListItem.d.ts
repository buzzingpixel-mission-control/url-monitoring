import { MonitoredUrlWithViewOptions } from './MonitoredUrls';
declare const MonitoredUrlListItem: {
    ({ isArchive, item, projectPageSlug, }: {
        isArchive: boolean;
        item: MonitoredUrlWithViewOptions;
        projectPageSlug?: string | null | undefined;
    }): JSX.Element;
    defaultProps: {
        projectPageSlug: any;
    };
};
export default MonitoredUrlListItem;

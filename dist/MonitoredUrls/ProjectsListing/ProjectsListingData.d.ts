import { MonitoredUrlsWithViewOptions } from '../MonitoredUrls';
export declare const useProjectListingData: (projectId: string) => {
    status: 'loading' | 'error' | 'success';
    data: MonitoredUrlsWithViewOptions;
};

import { MonitoredUrlWithViewOptions } from '../MonitoredUrls';
export declare const useMonitoredUrlDetailsData: (slug: string) => {
    status: 'loading' | 'error' | 'success';
    data?: MonitoredUrlWithViewOptions;
};

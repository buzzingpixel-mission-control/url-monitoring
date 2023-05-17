import { MonitoredUrlWithIncidents } from './MonitoredUrlWithIncidents';
export declare const useMonitoredUrlDetailsData: (slug: string) => {
    status: 'loading' | 'error' | 'success';
    data?: MonitoredUrlWithIncidents;
};

// eslint-disable-next-line import/prefer-default-export
import {
    MinutesToMilliseconds,
    useAllProjectsData,
    useApiQueryWithSignInRedirect,
} from 'buzzingpixel-mission-control-frontend-core';
import {
    MonitoredUrl, MonitoredUrlSchema, MonitoredUrlWithViewOptions, transformMonitoredUrl,
} from '../MonitoredUrls';

// eslint-disable-next-line import/prefer-default-export
export const useMonitoredUrlDetailsData = (slug: string): {
    status: 'loading' | 'error' | 'success';
    data?: MonitoredUrlWithViewOptions;
} => {
    const uri = `/monitored-urls/${slug}`;

    const response = useApiQueryWithSignInRedirect<MonitoredUrl>(
        [uri],
        { uri },
        {
            zodValidator: MonitoredUrlSchema,
            staleTime: MinutesToMilliseconds(1),
            refetchInterval: MinutesToMilliseconds(1),
        },
    );

    const projects = useAllProjectsData();

    if (response.status === 'loading' || projects.status === 'loading') {
        return {
            status: 'loading',
        };
    }

    if (response.status === 'error' || projects.status === 'error') {
        return {
            status: 'loading',
        };
    }

    return {
        status: 'success',
        data: transformMonitoredUrl(response.data, projects.data),
    };
};

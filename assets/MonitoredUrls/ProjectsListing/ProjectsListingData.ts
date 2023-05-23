import {
    MinutesToMilliseconds,
    useAllProjectsData,
    useApiQueryWithSignInRedirect,
} from 'buzzingpixel-mission-control-frontend-core';
import {
    MonitoredUrls,
    MonitoredUrlsSchema,
    MonitoredUrlsWithViewOptions,
    transformMonitoredUrls,
} from '../MonitoredUrls';

// eslint-disable-next-line import/prefer-default-export
export const useProjectListingData = (projectId: string): {
    status: 'loading' | 'error' | 'success';
    data: MonitoredUrlsWithViewOptions;
} => {
    const uri = `/monitored-urls/list/project/${projectId}`;

    const response = useApiQueryWithSignInRedirect<MonitoredUrls>(
        [uri],
        { uri },
        {
            zodValidator: MonitoredUrlsSchema,
            staleTime: MinutesToMilliseconds(1),
            refetchInterval: MinutesToMilliseconds(1),
        },
    );

    const projects = useAllProjectsData();

    if (response.status === 'loading' || projects.status === 'loading') {
        return {
            status: 'loading',
            data: [],
        };
    }

    if (response.status === 'error' || projects.status === 'error') {
        return {
            status: 'error',
            data: [],
        };
    }

    return {
        status: 'success',
        data: transformMonitoredUrls(response.data, projects.data),
    };
};

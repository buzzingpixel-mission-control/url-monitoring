import {
    useApiQueryWithSignInRedirect,
    MinutesToMilliseconds,
    useApiMutation,
    RequestMethod, useAllProjectsData,
} from 'buzzingpixel-mission-control-frontend-core';
import { MonitoredUrls, MonitoredUrlsSchema, transformMonitoredUrls } from './MonitoredUrls';
import AddMonitoredUrlFormValues from './AddMonitoredUrlFormValues';

export const useMonitoredUrlData = (archive = false) => {
    const uri = archive
        ? '/monitored-urls/list/archived'
        : '/monitored-urls/list';

    const response = useApiQueryWithSignInRedirect<MonitoredUrls>(
        [uri],
        { uri },
        {
            staleTime: MinutesToMilliseconds(5),
            zodValidator: MonitoredUrlsSchema,
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
            status: 'error',
        };
    }

    return {
        status: 'success',
        data: transformMonitoredUrls(response.data, projects.data),
    };
};

export const useAddMonitoredUrlMutation = () => useApiMutation<unknown, AddMonitoredUrlFormValues>(
    {
        invalidateQueryKeysOnSuccess: [
            '/monitored-urls/list',
            '/monitored-urls/list/archived',
        ],
        prepareApiParams: (
            data,
        ) => ({
            uri: '/monitored-urls/add',
            payload: data,
            method: RequestMethod.POST,
        }),
    },
);

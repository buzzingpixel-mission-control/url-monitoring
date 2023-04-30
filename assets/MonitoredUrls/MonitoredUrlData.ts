import {
    useApiQueryWithSignInRedirect,
    MinutesToMilliseconds,
    useApiMutation,
    RequestMethod,
} from 'buzzingpixel-mission-control-frontend-core';
import { MonitoredUrls, MonitoredUrlsSchema } from './MonitoredUrls';
import AddMonitoredUrlFormValues from './AddMonitoredUrlFormValues';

export const useMonitoredUrlData = (archive = false) => {
    const uri = archive
        ? '/monitored-urls/list/archived'
        : '/monitored-urls/list';

    return useApiQueryWithSignInRedirect<MonitoredUrls>(
        [uri],
        { uri },
        {
            staleTime: MinutesToMilliseconds(5),
            zodValidator: MonitoredUrlsSchema,
        },
    );
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

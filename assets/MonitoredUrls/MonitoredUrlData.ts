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

export const useAddProjectMutation = () => useApiMutation<unknown, AddMonitoredUrlFormValues>(
    {
        invalidateQueryKeysOnSuccess: [
            'projects-list',
            'projects-list-archived',
        ],
        prepareApiParams: (
            data,
        ) => ({
            uri: '/projects/add',
            payload: data,
            method: RequestMethod.POST,
        }),
    },
);

// eslint-disable-next-line import/prefer-default-export
import {
    MinutesToMilliseconds,
    useAllProjectsData,
    useApiQueryWithSignInRedirect,
} from 'buzzingpixel-mission-control-frontend-core';
import {
    MonitoredUrlWithIncidents, MonitoredUrlWithIncidentsIntermediate,
    MonitoredUrlWithIncidentsSchema, transformMonitoredUrlWithIncidents,
} from './MonitoredUrlWithIncidents';

// eslint-disable-next-line import/prefer-default-export
export const useMonitoredUrlDetailsData = (slug: string): {
    status: 'loading' | 'error' | 'success';
    data?: MonitoredUrlWithIncidents;
} => {
    const uri = `/monitored-urls/${slug}`;

    const response = useApiQueryWithSignInRedirect<MonitoredUrlWithIncidentsIntermediate>(
        [uri],
        { uri },
        {
            zodValidator: MonitoredUrlWithIncidentsSchema,
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
        data: transformMonitoredUrlWithIncidents(
            response.data,
            projects.data,
        ),
    };
};

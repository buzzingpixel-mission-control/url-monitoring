import {
    useApiQueryWithSignInRedirect,
    MinutesToMilliseconds,
    useApiMutation,
    RequestMethod, useAllProjectsData,
} from 'buzzingpixel-mission-control-frontend-core';
import { useQueryClient } from '@tanstack/react-query';
import {
    MonitoredUrl, MonitoredUrls, MonitoredUrlsSchema, transformMonitoredUrls,
} from './MonitoredUrls';
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

export const useEditMonitoredUrlMutation = (urlId: string) => {
    const queryClient = useQueryClient();

    return useApiMutation<unknown, AddMonitoredUrlFormValues>(
        {
            invalidateQueryKeysOnSuccess: [
                '/monitored-urls/list',
                '/monitored-urls/list/archived',
            ],
            prepareApiParams: (
                data,
            ) => ({
                uri: `/monitored-urls/edit/${urlId}`,
                payload: data,
                method: RequestMethod.PATCH,
            }),
            options: {
                onMutate: async (data) => {
                    const formValues = data as unknown as AddMonitoredUrlFormValues;

                    await queryClient.cancelQueries({
                        queryKey: [['/monitored-urls/list']],
                    });

                    await queryClient.cancelQueries({
                        queryKey: [['/monitored-urls/list/archived']],
                    });

                    const previousUrls = queryClient.getQueryData(
                        [['/monitored-urls/list']],
                    ) as MonitoredUrls;

                    const previousUrlsArchived = queryClient.getQueryData(
                        [['/monitored-urls/list/archived']],
                    ) as MonitoredUrls;

                    const urlMapper = (url: MonitoredUrl) => {
                        if (url.id === urlId) {
                            url.title = formValues.title;
                            url.url = formValues.url;
                            url.projectId = formValues.project_id;
                        }

                        return url;
                    };

                    if (previousUrls) {
                        const newUrls = previousUrls.map(
                            urlMapper,
                        );

                        queryClient.setQueryData([['/monitored-urls/list']], newUrls);
                    }

                    if (previousUrlsArchived) {
                        const newUrlsArchive = previousUrlsArchived.map(
                            urlMapper,
                        );

                        queryClient.setQueryData([['/monitored-urls/list/archived']], newUrlsArchive);
                    }

                    return {
                        previousUrls,
                        previousUrlsArchived,
                    };
                },
            },
        },
    );
};

export const useArchiveMonitoredUrlMutation = (
    urlId: string,
    isArchive: boolean,
) => {
    const queryClient = useQueryClient();

    return useApiMutation(
        {
            invalidateQueryKeysOnSuccess: [
                '/monitored-urls/list',
                '/monitored-urls/list/archived',
            ],
            prepareApiParams: () => ({
                uri: `/monitored-urls/${isArchive ? 'un-archive' : 'archive'}/${urlId}`,
                method: RequestMethod.PATCH,
            }),
            options: {
                onMutate: async () => {
                    await queryClient.cancelQueries({
                        queryKey: [['/monitored-urls/list']],
                    });

                    await queryClient.cancelQueries({
                        queryKey: [['/monitored-urls/list/archived']],
                    });

                    const previousUrls = queryClient.getQueryData(
                        [['/monitored-urls/list']],
                    ) as MonitoredUrls;

                    const previousUrlsArchived = queryClient.getQueryData(
                        [['/monitored-urls/list/archived']],
                    ) as MonitoredUrls;

                    const projectMapper = (url: MonitoredUrl) => {
                        if (url.id === urlId) {
                            url.isActive = isArchive;
                        }

                        return url;
                    };

                    if (previousUrls) {
                        const newUrls = previousUrls.map(
                            projectMapper,
                        );

                        queryClient.setQueryData([['/monitored-urls/list']], newUrls);
                    }

                    if (previousUrlsArchived) {
                        const newUrlsArchive = previousUrlsArchived.map(
                            projectMapper,
                        );

                        queryClient.setQueryData([['/monitored-urls/list/archived']], newUrlsArchive);
                    }

                    return {
                        previousUrls,
                        previousUrlsArchived,
                    };
                },
            },
        },
    );
};

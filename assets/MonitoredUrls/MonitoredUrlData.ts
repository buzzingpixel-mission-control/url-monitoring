import {
    MinutesToMilliseconds,
    RequestMethod,
    useApiMutation,
    useAllProjectsData,
    useApiQueryWithSignInRedirect,
} from 'buzzingpixel-mission-control-frontend-core';
import { useQueryClient } from '@tanstack/react-query';
import {
    MonitoredUrl,
    MonitoredUrls,
    MonitoredUrlsSchema,
    MonitoredUrlsWithViewOptions,
    transformMonitoredUrls,
} from './MonitoredUrls';
import AddMonitoredUrlFormValues from './AddMonitoredUrlFormValues';

export const useMonitoredUrlData = (archive = false): {
    status: 'loading' | 'error' | 'success';
    data: MonitoredUrlsWithViewOptions;
} => {
    const uri = archive
        ? '/monitored-urls/list/archived'
        : '/monitored-urls/list';

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

export const useAddMonitoredUrlMutation = () => useApiMutation<unknown, AddMonitoredUrlFormValues>(
    {
        invalidateQueryKeysOnSuccess: [
            '/monitored-urls/list',
            '/monitored-urls/list/archived',
        ],
        prepareApiParams: (data) => ({
            uri: '/monitored-urls/add',
            payload: data,
            method: RequestMethod.POST,
        }),
    },
);

export const useEditMonitoredUrlMutation = (urlId: string, slug: string) => {
    const queryClient = useQueryClient();

    return useApiMutation<unknown, AddMonitoredUrlFormValues>(
        {
            invalidateQueryKeysOnSuccess: [
                `/monitored-urls/${slug}`,
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
    projectId?: string | undefined | null,
) => {
    const queryClient = useQueryClient();

    const invalidateQueryKeysOnSuccess = [
        '/monitored-urls/list',
        '/monitored-urls/list/archived',
    ];

    if (projectId) {
        invalidateQueryKeysOnSuccess.push(
            `/monitored-urls/list/project/${projectId}`,
        );
    }

    return useApiMutation(
        {
            invalidateQueryKeysOnSuccess,
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

export const useArchiveSelectedMonitoredUrlsMutation = (
    urls: MonitoredUrls,
    isArchive: boolean,
) => {
    const urlIds = urls.map((url) => url.id);

    const invalidateQueryKeysOnSuccess = [
        '/monitored-urls/list',
        '/monitored-urls/list/archived',
    ];

    urls.forEach((url) => {
        invalidateQueryKeysOnSuccess.push(`/monitored-urls/${url.slug}`);

        if (!url.projectId) {
            return;
        }

        const projectListingUrl = `/monitored-urls/list/project/${url.projectId}`;

        if (invalidateQueryKeysOnSuccess.indexOf(projectListingUrl) > -1) {
            return;
        }

        invalidateQueryKeysOnSuccess.push(projectListingUrl);
    });

    return useApiMutation({
        invalidateQueryKeysOnSuccess,
        prepareApiParams: () => ({
            uri: `/monitored-urls/${isArchive ? 'un-archive' : 'archive'}`,
            method: RequestMethod.PATCH,
            payload: { urlIds },
        }),
    });
};

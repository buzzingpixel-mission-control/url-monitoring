import { z } from 'zod';
import { ProjectsWithViewOptions, ProjectWithViewOptions } from 'buzzingpixel-mission-control-frontend-core';

export enum MonitoredUrlStatus {
    unknown = '',
    up = 'up',
    pendingDown = 'pendingDown',
    down = 'down',
}

export const monitoredUrlStatusList = [
    {
        name: 'All',
        value: '',
    },
    {
        name: 'Up',
        value: 'up',
    },
    {
        name: 'Pending Down',
        value: 'pendingDown',
    },
    {
        name: 'Down',
        value: 'down',
    },
];

export const mapMonitoredUrlStatusToReadable = (status: MonitoredUrlStatus) => {
    switch (status) {
        case MonitoredUrlStatus.up:
            return 'Up';
        case MonitoredUrlStatus.pendingDown:
            return 'Pending Down';
        case MonitoredUrlStatus.down:
            return 'Down';
        default:
            return 'Unknown';
    }
};

export const MonitoredUrlSchema = z.object({
    id: z.string().min(1),
    projectId: z.string().nullable(),
    isActive: z.boolean(),
    title: z.string().min(1),
    slug: z.string().min(1),
    url: z.string().min(1),
    status: z.nativeEnum(MonitoredUrlStatus),
    checkedAt: z.string().nullable(),
    createdAt: z.string(),
});

export type MonitoredUrl = z.infer<typeof MonitoredUrlSchema>;

export const MonitoredUrlsSchema = z.array(
    MonitoredUrlSchema,
);

export type MonitoredUrls = z.infer<typeof MonitoredUrlsSchema>;

export type MonitoredUrlWithViewOptions = MonitoredUrl & {
    href: string;
    createdAtDate: Date;
    statusReadable: string;
    activeOrArchivedText: string;
    project?: ProjectWithViewOptions;
};

export type MonitoredUrlsWithViewOptions = Array<MonitoredUrlWithViewOptions>;

export const transformMonitoredUrl = (
    monitoredUrl: MonitoredUrl,
    projects?: ProjectsWithViewOptions,
): MonitoredUrlWithViewOptions => {
    projects = projects || [];

    let project;

    const filteredProjects = projects.filter(
        (p) => p.id === monitoredUrl.projectId,
    );

    if (filteredProjects[0]) {
        // eslint-disable-next-line prefer-destructuring
        project = filteredProjects[0];
    }

    return ({
        ...monitoredUrl,
        href: `/monitored-urls/${monitoredUrl.slug}`,
        createdAtDate: new Date(monitoredUrl.createdAt),
        statusReadable: mapMonitoredUrlStatusToReadable(monitoredUrl.status),
        activeOrArchivedText: monitoredUrl.isActive ? 'Active' : 'Archived',
        project,
    });
};

export const transformMonitoredUrls = (
    monitoredUrls: MonitoredUrls,
    projects?: ProjectsWithViewOptions,
): MonitoredUrlsWithViewOptions => monitoredUrls.map((
    monitoredUrl,
) => transformMonitoredUrl(monitoredUrl, projects));

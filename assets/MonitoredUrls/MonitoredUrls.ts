import { z } from 'zod';

export enum MonitoredUrlStatus {
    unknown = '',
    up = 'up',
    pendingDown = 'pendingDown',
    down = 'down',
}

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
};

export type MonitoredUrlsWithViewOptions = Array<MonitoredUrlWithViewOptions>;

export const transformMonitoredUrl = (
    monitoredUrl: MonitoredUrl,
): MonitoredUrlWithViewOptions => ({
    ...monitoredUrl,
    href: `/monitored-urls/${monitoredUrl.slug}`,
    createdAtDate: new Date(monitoredUrl.createdAt),
    statusReadable: mapMonitoredUrlStatusToReadable(monitoredUrl.status),
    activeOrArchivedText: monitoredUrl.isActive ? 'Active' : 'Archived',
});

export const transformMonitoredUrls = (
    monitoredUrls: MonitoredUrls,
): MonitoredUrlsWithViewOptions => monitoredUrls.map((
    monitoredUrl,
) => transformMonitoredUrl(monitoredUrl));

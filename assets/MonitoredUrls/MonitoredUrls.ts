import { z } from 'zod';

export enum MonitoredUrlStatus {
    unknown = '',
    up = 'up',
    pendingDown = 'pendingDown',
    down = 'down',
}

export const MonitoredUrlSchema = z.object({
    id: z.string().min(1),
    projectId: z.string().min(1),
    isActive: z.boolean(),
    title: z.string().min(1),
    slug: z.string().min(1),
    url: z.string().min(1),
    status: z.nativeEnum(MonitoredUrlStatus),
    checkedAt: z.string(),
    createdAt: z.string(),
});

export type MonitoredUrl = z.infer<typeof MonitoredUrlSchema>;

export const MonitoredUrlsSchema = z.array(
    MonitoredUrlSchema,
);

export type MonitoredUrls = z.infer<typeof MonitoredUrlsSchema>;

export type MonitoredUrlWithViewOptions = MonitoredUrl & {
    href: string;
};

export type MonitoredUrlsWithViewOptions = Array<MonitoredUrlWithViewOptions>;

export const transformMonitoredUrl = (
    monitoredUrl: MonitoredUrl,
): MonitoredUrlWithViewOptions => ({
    ...monitoredUrl,
    href: `/monitored-urls/${monitoredUrl.slug}`,
});

export const transformMonitoredUrls = (
    monitoredUrls: MonitoredUrls,
): MonitoredUrlsWithViewOptions => monitoredUrls.map((
    monitoredUrl,
) => transformMonitoredUrl(monitoredUrl));

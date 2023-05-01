import { z } from 'zod';
export declare enum MonitoredUrlStatus {
    unknown = "",
    up = "up",
    pendingDown = "pendingDown",
    down = "down"
}
export declare const MonitoredUrlSchema: z.ZodObject<{
    id: z.ZodString;
    projectId: z.ZodString;
    isActive: z.ZodBoolean;
    title: z.ZodString;
    slug: z.ZodString;
    url: z.ZodString;
    status: z.ZodNativeEnum<typeof MonitoredUrlStatus>;
    checkedAt: z.ZodString;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id?: string;
    projectId?: string;
    isActive?: boolean;
    title?: string;
    slug?: string;
    url?: string;
    status?: MonitoredUrlStatus;
    checkedAt?: string;
    createdAt?: string;
}, {
    id?: string;
    projectId?: string;
    isActive?: boolean;
    title?: string;
    slug?: string;
    url?: string;
    status?: MonitoredUrlStatus;
    checkedAt?: string;
    createdAt?: string;
}>;
export type MonitoredUrl = z.infer<typeof MonitoredUrlSchema>;
export declare const MonitoredUrlsSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    projectId: z.ZodString;
    isActive: z.ZodBoolean;
    title: z.ZodString;
    slug: z.ZodString;
    url: z.ZodString;
    status: z.ZodNativeEnum<typeof MonitoredUrlStatus>;
    checkedAt: z.ZodString;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id?: string;
    projectId?: string;
    isActive?: boolean;
    title?: string;
    slug?: string;
    url?: string;
    status?: MonitoredUrlStatus;
    checkedAt?: string;
    createdAt?: string;
}, {
    id?: string;
    projectId?: string;
    isActive?: boolean;
    title?: string;
    slug?: string;
    url?: string;
    status?: MonitoredUrlStatus;
    checkedAt?: string;
    createdAt?: string;
}>, "many">;
export type MonitoredUrls = z.infer<typeof MonitoredUrlsSchema>;
export type MonitoredUrlWithViewOptions = MonitoredUrl & {
    href: string;
};
export type MonitoredUrlsWithViewOptions = Array<MonitoredUrlWithViewOptions>;
export declare const transformMonitoredUrl: (monitoredUrl: MonitoredUrl) => MonitoredUrlWithViewOptions;
export declare const transformMonitoredUrls: (monitoredUrls: {
    id?: string;
    projectId?: string;
    isActive?: boolean;
    title?: string;
    slug?: string;
    url?: string;
    status?: MonitoredUrlStatus;
    checkedAt?: string;
    createdAt?: string;
}[]) => MonitoredUrlsWithViewOptions;

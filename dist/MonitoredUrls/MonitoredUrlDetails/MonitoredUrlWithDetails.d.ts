import { z } from 'zod';
import { ProjectsWithViewOptions } from 'buzzingpixel-mission-control-frontend-core';
import { MonitoredUrl, MonitoredUrlStatus } from '../MonitoredUrls';
export declare const MonitoredUrlWithDetailsSchema: z.ZodObject<{
    id: z.ZodString;
    projectId: z.ZodNullable<z.ZodString>;
    isActive: z.ZodBoolean;
    title: z.ZodString;
    slug: z.ZodString;
    url: z.ZodString;
    status: z.ZodNativeEnum<typeof MonitoredUrlStatus>;
    checkedAt: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
    incidents: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        monitoredUrlId: z.ZodString;
        eventType: z.ZodNativeEnum<typeof MonitoredUrlStatus>;
        statusCode: z.ZodString;
        message: z.ZodString;
        eventAt: z.ZodString;
        lastNotificationAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id?: string;
        monitoredUrlId?: string;
        eventType?: MonitoredUrlStatus;
        statusCode?: string;
        message?: string;
        eventAt?: string;
        lastNotificationAt?: string;
    }, {
        id?: string;
        monitoredUrlId?: string;
        eventType?: MonitoredUrlStatus;
        statusCode?: string;
        message?: string;
        eventAt?: string;
        lastNotificationAt?: string;
    }>, "many">;
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
    incidents?: {
        id?: string;
        monitoredUrlId?: string;
        eventType?: MonitoredUrlStatus;
        statusCode?: string;
        message?: string;
        eventAt?: string;
        lastNotificationAt?: string;
    }[];
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
    incidents?: {
        id?: string;
        monitoredUrlId?: string;
        eventType?: MonitoredUrlStatus;
        statusCode?: string;
        message?: string;
        eventAt?: string;
        lastNotificationAt?: string;
    }[];
}>;
export type MonitoredUrlWithDetails = z.infer<typeof MonitoredUrlWithDetailsSchema>;
export type MonitoredUrlWithDetailsDisplay = MonitoredUrlWithDetails & {
    lastNotificationAtDate: Date;
};
export declare const transformMonitoredUrlWithDetails: (monitoredUrl: MonitoredUrl, projects?: ProjectsWithViewOptions) => void;

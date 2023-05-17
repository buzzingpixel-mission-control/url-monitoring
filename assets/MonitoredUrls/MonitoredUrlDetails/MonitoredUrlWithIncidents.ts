import { z } from 'zod';
import { ProjectsWithViewOptions } from 'buzzingpixel-mission-control-frontend-core';
import {
    mapMonitoredUrlStatusToReadable,
    MonitoredUrlSchema,
    MonitoredUrlStatus,
    MonitoredUrlWithViewOptions,
    transformMonitoredUrl,
} from '../MonitoredUrls';

const IncidentSchema = z.object({
    id: z.string(),
    monitoredUrlId: z.string(),
    eventType: z.nativeEnum(MonitoredUrlStatus),
    statusCode: z.string(),
    message: z.string(),
    eventAt: z.string(),
    lastNotificationAt: z.string().nullable(),
});

export const MonitoredUrlWithIncidentsSchema = MonitoredUrlSchema.extend({
    incidents: z.array(IncidentSchema),
});

type IncidentIntermediate = z.infer<typeof IncidentSchema>;

export type Incident = IncidentIntermediate & {
    eventTypeReadable: string;
    eventAtDate: Date;
    lastNotificationAtDate: Date | null;
};

export type MonitoredUrlWithIncidentsIntermediate = z.infer<typeof MonitoredUrlWithIncidentsSchema>;

export type MonitoredUrlWithIncidents = MonitoredUrlWithViewOptions & {
    incidents: Array<Incident>;
};

const transformIncident = (incident: IncidentIntermediate): Incident => ({
    ...incident,
    eventTypeReadable: mapMonitoredUrlStatusToReadable(incident.eventType),
    eventAtDate: new Date(incident.eventAt),
    lastNotificationAtDate: incident.lastNotificationAt
        ? new Date(incident.lastNotificationAt)
        : null,
});

export const transformMonitoredUrlWithIncidents = (
    data: MonitoredUrlWithIncidentsIntermediate,
    projects?: ProjectsWithViewOptions,
): MonitoredUrlWithIncidents => ({
    ...transformMonitoredUrl(data, projects),
    incidents: data.incidents.map((incident) => transformIncident(incident)),
});

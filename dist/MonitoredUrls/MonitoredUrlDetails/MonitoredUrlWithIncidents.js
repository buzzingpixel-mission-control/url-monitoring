"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformMonitoredUrlWithIncidents = exports.MonitoredUrlWithIncidentsSchema = void 0;
var zod_1 = require("zod");
var MonitoredUrls_1 = require("../MonitoredUrls");
var IncidentSchema = zod_1.z.object({
    id: zod_1.z.string(),
    monitoredUrlId: zod_1.z.string(),
    eventType: zod_1.z.nativeEnum(MonitoredUrls_1.MonitoredUrlStatus),
    statusCode: zod_1.z.string(),
    message: zod_1.z.string(),
    eventAt: zod_1.z.string(),
    lastNotificationAt: zod_1.z.string().nullable(),
});
exports.MonitoredUrlWithIncidentsSchema = MonitoredUrls_1.MonitoredUrlSchema.extend({
    incidents: zod_1.z.array(IncidentSchema),
});
var transformIncident = function (incident) { return (__assign(__assign({}, incident), { eventTypeReadable: (0, MonitoredUrls_1.mapMonitoredUrlStatusToReadable)(incident.eventType), eventAtDate: new Date(incident.eventAt), lastNotificationAtDate: incident.lastNotificationAt
        ? new Date(incident.lastNotificationAt)
        : null })); };
var transformMonitoredUrlWithIncidents = function (data, projects) { return (__assign(__assign({}, (0, MonitoredUrls_1.transformMonitoredUrl)(data, projects)), { incidents: data.incidents.map(function (incident) { return transformIncident(incident); }) })); };
exports.transformMonitoredUrlWithIncidents = transformMonitoredUrlWithIncidents;

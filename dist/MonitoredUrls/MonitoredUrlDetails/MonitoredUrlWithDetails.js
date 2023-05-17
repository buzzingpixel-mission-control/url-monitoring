"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformMonitoredUrlWithDetails = exports.MonitoredUrlWithDetailsSchema = void 0;
var zod_1 = require("zod");
var MonitoredUrls_1 = require("../MonitoredUrls");
exports.MonitoredUrlWithDetailsSchema = MonitoredUrls_1.MonitoredUrlSchema.extend({
    incidents: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string(),
        monitoredUrlId: zod_1.z.string(),
        eventType: zod_1.z.nativeEnum(MonitoredUrls_1.MonitoredUrlStatus),
        statusCode: zod_1.z.string(),
        message: zod_1.z.string(),
        eventAt: zod_1.z.string(),
        lastNotificationAt: zod_1.z.string(),
    })),
});
var transformMonitoredUrlWithDetails = function (monitoredUrl, projects) {
    console.log('here');
};
exports.transformMonitoredUrlWithDetails = transformMonitoredUrlWithDetails;

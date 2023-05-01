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
exports.transformMonitoredUrls = exports.transformMonitoredUrl = exports.MonitoredUrlsSchema = exports.MonitoredUrlSchema = exports.MonitoredUrlStatus = void 0;
var zod_1 = require("zod");
var MonitoredUrlStatus;
(function (MonitoredUrlStatus) {
    MonitoredUrlStatus["up"] = "up";
    MonitoredUrlStatus["pendingDown"] = "pendingDown";
    MonitoredUrlStatus["down"] = "down";
})(MonitoredUrlStatus = exports.MonitoredUrlStatus || (exports.MonitoredUrlStatus = {}));
exports.MonitoredUrlSchema = zod_1.z.object({
    id: zod_1.z.string().min(1),
    projectId: zod_1.z.string().min(1),
    isActive: zod_1.z.boolean(),
    title: zod_1.z.string().min(1),
    slug: zod_1.z.string().min(1),
    url: zod_1.z.string().min(1),
    status: zod_1.z.nativeEnum(MonitoredUrlStatus),
    checkedAt: zod_1.z.string(),
    createdAt: zod_1.z.string(),
});
exports.MonitoredUrlsSchema = zod_1.z.array(exports.MonitoredUrlSchema);
var transformMonitoredUrl = function (monitoredUrl) { return (__assign(__assign({}, monitoredUrl), { href: "/monitored-urls/".concat(monitoredUrl.slug) })); };
exports.transformMonitoredUrl = transformMonitoredUrl;
var transformMonitoredUrls = function (monitoredUrls) { return monitoredUrls.map(function (monitoredUrl) { return (0, exports.transformMonitoredUrl)(monitoredUrl); }); };
exports.transformMonitoredUrls = transformMonitoredUrls;
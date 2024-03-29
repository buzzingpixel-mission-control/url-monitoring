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
exports.transformMonitoredUrls = exports.transformMonitoredUrl = exports.MonitoredUrlsSchema = exports.MonitoredUrlSchema = exports.mapMonitoredUrlStatusToReadable = exports.monitoredUrlStatusList = exports.MonitoredUrlStatus = void 0;
var zod_1 = require("zod");
var MonitoredUrlStatus;
(function (MonitoredUrlStatus) {
    MonitoredUrlStatus["unknown"] = "";
    MonitoredUrlStatus["up"] = "up";
    MonitoredUrlStatus["pendingDown"] = "pendingDown";
    MonitoredUrlStatus["down"] = "down";
})(MonitoredUrlStatus || (exports.MonitoredUrlStatus = MonitoredUrlStatus = {}));
exports.monitoredUrlStatusList = [
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
var mapMonitoredUrlStatusToReadable = function (status) {
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
exports.mapMonitoredUrlStatusToReadable = mapMonitoredUrlStatusToReadable;
exports.MonitoredUrlSchema = zod_1.z.object({
    id: zod_1.z.string().min(1),
    projectId: zod_1.z.string().nullable(),
    isActive: zod_1.z.boolean(),
    title: zod_1.z.string().min(1),
    slug: zod_1.z.string().min(1),
    url: zod_1.z.string().min(1),
    status: zod_1.z.nativeEnum(MonitoredUrlStatus),
    checkedAt: zod_1.z.string().nullable(),
    createdAt: zod_1.z.string(),
});
exports.MonitoredUrlsSchema = zod_1.z.array(exports.MonitoredUrlSchema);
var transformMonitoredUrl = function (monitoredUrl, projects) {
    projects = projects || [];
    var project;
    var filteredProjects = projects.filter(function (p) { return p.id === monitoredUrl.projectId; });
    if (filteredProjects[0]) {
        // eslint-disable-next-line prefer-destructuring
        project = filteredProjects[0];
    }
    return (__assign(__assign({}, monitoredUrl), { href: "/monitored-urls/".concat(monitoredUrl.slug), createdAtDate: new Date(monitoredUrl.createdAt), statusReadable: (0, exports.mapMonitoredUrlStatusToReadable)(monitoredUrl.status), activeOrArchivedText: monitoredUrl.isActive ? 'Active' : 'Archived', project: project }));
};
exports.transformMonitoredUrl = transformMonitoredUrl;
var transformMonitoredUrls = function (monitoredUrls, projects) { return monitoredUrls.map(function (monitoredUrl) { return (0, exports.transformMonitoredUrl)(monitoredUrl, projects); }); };
exports.transformMonitoredUrls = transformMonitoredUrls;

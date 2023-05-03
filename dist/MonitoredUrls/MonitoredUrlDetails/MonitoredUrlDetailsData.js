"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMonitoredUrlDetailsData = void 0;
// eslint-disable-next-line import/prefer-default-export
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var MonitoredUrls_1 = require("../MonitoredUrls");
// eslint-disable-next-line import/prefer-default-export
var useMonitoredUrlDetailsData = function (slug) {
    var uri = "/monitored-urls/".concat(slug);
    var response = (0, buzzingpixel_mission_control_frontend_core_1.useApiQueryWithSignInRedirect)([uri], { uri: uri }, {
        zodValidator: MonitoredUrls_1.MonitoredUrlSchema,
        staleTime: (0, buzzingpixel_mission_control_frontend_core_1.MinutesToMilliseconds)(1),
        refetchInterval: (0, buzzingpixel_mission_control_frontend_core_1.MinutesToMilliseconds)(1),
    });
    var projects = (0, buzzingpixel_mission_control_frontend_core_1.useAllProjectsData)();
    if (response.status === 'loading' || projects.status === 'loading') {
        return {
            status: 'loading',
        };
    }
    if (response.status === 'error' || projects.status === 'error') {
        return {
            status: 'loading',
        };
    }
    return {
        status: 'success',
        data: (0, MonitoredUrls_1.transformMonitoredUrl)(response.data, projects.data),
    };
};
exports.useMonitoredUrlDetailsData = useMonitoredUrlDetailsData;

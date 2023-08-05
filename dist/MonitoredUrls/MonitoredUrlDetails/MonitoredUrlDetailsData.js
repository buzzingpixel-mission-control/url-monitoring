"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMonitoredUrlDetailsData = void 0;
// eslint-disable-next-line import/prefer-default-export
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var MonitoredUrlWithIncidents_1 = require("./MonitoredUrlWithIncidents");
// eslint-disable-next-line import/prefer-default-export
var useMonitoredUrlDetailsData = function (slug) {
    var uri = "/monitored-urls/".concat(slug);
    var response = (0, buzzingpixel_mission_control_frontend_core_1.useApiQueryWithSignInRedirect)([uri], { uri: uri }, {
        zodValidator: MonitoredUrlWithIncidents_1.MonitoredUrlWithIncidentsSchema,
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
            status: 'error',
        };
    }
    return {
        status: 'success',
        data: (0, MonitoredUrlWithIncidents_1.transformMonitoredUrlWithIncidents)(response.data, projects.data),
    };
};
exports.useMonitoredUrlDetailsData = useMonitoredUrlDetailsData;

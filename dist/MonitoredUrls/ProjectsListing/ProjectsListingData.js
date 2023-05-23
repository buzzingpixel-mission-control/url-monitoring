"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProjectListingData = void 0;
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var MonitoredUrls_1 = require("../MonitoredUrls");
// eslint-disable-next-line import/prefer-default-export
var useProjectListingData = function (projectId) {
    var uri = "/monitored-urls/list/project/".concat(projectId);
    var response = (0, buzzingpixel_mission_control_frontend_core_1.useApiQueryWithSignInRedirect)([uri], { uri: uri }, {
        zodValidator: MonitoredUrls_1.MonitoredUrlsSchema,
        staleTime: (0, buzzingpixel_mission_control_frontend_core_1.MinutesToMilliseconds)(1),
        refetchInterval: (0, buzzingpixel_mission_control_frontend_core_1.MinutesToMilliseconds)(1),
    });
    var projects = (0, buzzingpixel_mission_control_frontend_core_1.useAllProjectsData)();
    if (response.status === 'loading' || projects.status === 'loading') {
        return {
            status: 'loading',
            data: [],
        };
    }
    if (response.status === 'error' || projects.status === 'error') {
        return {
            status: 'error',
            data: [],
        };
    }
    return {
        status: 'success',
        data: (0, MonitoredUrls_1.transformMonitoredUrls)(response.data, projects.data),
    };
};
exports.useProjectListingData = useProjectListingData;

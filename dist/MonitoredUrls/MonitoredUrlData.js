"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAddMonitoredUrlMutation = exports.useMonitoredUrlData = void 0;
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var MonitoredUrls_1 = require("./MonitoredUrls");
var useMonitoredUrlData = function (archive) {
    if (archive === void 0) { archive = false; }
    var uri = archive
        ? '/monitored-urls/list/archived'
        : '/monitored-urls/list';
    return (0, buzzingpixel_mission_control_frontend_core_1.useApiQueryWithSignInRedirect)([uri], { uri: uri }, {
        staleTime: (0, buzzingpixel_mission_control_frontend_core_1.MinutesToMilliseconds)(5),
        zodValidator: MonitoredUrls_1.MonitoredUrlsSchema,
    });
};
exports.useMonitoredUrlData = useMonitoredUrlData;
var useAddMonitoredUrlMutation = function () { return (0, buzzingpixel_mission_control_frontend_core_1.useApiMutation)({
    invalidateQueryKeysOnSuccess: [
        '/monitored-urls/list',
        '/monitored-urls/list/archived',
    ],
    prepareApiParams: function (data) { return ({
        uri: '/monitored-urls/add',
        payload: data,
        method: buzzingpixel_mission_control_frontend_core_1.RequestMethod.POST,
    }); },
}); };
exports.useAddMonitoredUrlMutation = useAddMonitoredUrlMutation;
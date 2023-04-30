"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var MinutesToMilliseconds_1 = __importDefault(require("buzzingpixel-mission-control-frontend-core/dist/MinutesToMilliseconds"));
var useMonitoredUrlData = function (archive) {
    if (archive === void 0) { archive = false; }
    var uri = archive ? '/projects/list/archived' : '/projects/list';
    return (0, buzzingpixel_mission_control_frontend_core_1.useApiQueryWithSignInRedirect)([uri], { uri: uri }, {
        staleTime: (0, MinutesToMilliseconds_1.default)(5),
        // zodValidator
    });
};
exports.default = useMonitoredUrlData;

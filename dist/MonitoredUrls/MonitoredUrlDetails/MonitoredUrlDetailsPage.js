"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var MonitoredUrlDetailsData_1 = require("./MonitoredUrlDetailsData");
var PageHeader_1 = __importDefault(require("./PageHeader"));
var Incidents_1 = __importDefault(require("./Incidents"));
var MonitoredUrlDetailsPage = function () {
    var slug = (0, react_router_dom_1.useParams)().slug;
    (0, buzzingpixel_mission_control_frontend_core_1.useHidePageTitle)(true);
    var _a = (0, react_1.useState)('Loading Monitored URL Details…'), pageNameState = _a[0], setPageNameState = _a[1];
    var _b = (0, react_1.useState)(false), isArchive = _b[0], setIsArchive = _b[1];
    (0, buzzingpixel_mission_control_frontend_core_1.usePageTitle)(pageNameState);
    (0, buzzingpixel_mission_control_frontend_core_1.useBreadcrumbs)([
        {
            name: 'Monitored URLs',
            href: isArchive ? '/monitored-urls/archived' : '/monitored-urls',
        },
        {
            name: pageNameState,
            href: "/monitored-urls/".concat(slug),
        },
    ]);
    var _c = (0, MonitoredUrlDetailsData_1.useMonitoredUrlDetailsData)(slug), status = _c.status, data = _c.data;
    if (status === 'loading') {
        return react_1.default.createElement(buzzingpixel_mission_control_frontend_core_1.PartialPageLoading, null);
    }
    var pageName = "Monitored URL: ".concat(data.title);
    if (pageNameState !== pageName) {
        setPageNameState(pageName);
    }
    if (isArchive !== !data.isActive) {
        setIsArchive(true);
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(PageHeader_1.default, { data: data }),
        react_1.default.createElement(Incidents_1.default, { incidents: data.incidents })));
};
exports.default = MonitoredUrlDetailsPage;

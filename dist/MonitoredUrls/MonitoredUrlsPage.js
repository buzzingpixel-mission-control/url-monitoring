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
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var MonitoredUrlData_1 = require("./MonitoredUrlData");
var MonitoredUrlTabs_1 = __importDefault(require("./MonitoredUrlTabs"));
var MonitoredUrlsPage = function (_a) {
    var _b = _a.isArchive, isArchive = _b === void 0 ? false : _b;
    var _c = (0, react_1.useState)(''), pageNameState = _c[0], setPageNameState = _c[1];
    if (isArchive && pageNameState !== 'Archived URLs') {
        setPageNameState('Archived URLs');
    }
    else if (!isArchive && pageNameState !== 'Monitored URLs') {
        setPageNameState('Monitored URLs');
    }
    (0, buzzingpixel_mission_control_frontend_core_1.usePageTitle)(pageNameState);
    var _d = (0, react_1.useState)(''), filterText = _d[0], setFilterText = _d[1];
    var _e = (0, react_1.useState)(false), addUrlIsOpen = _e[0], setAddUrlIsOpen = _e[1];
    var _f = (0, MonitoredUrlData_1.useMonitoredUrlData)(isArchive), status = _f.status, data = _f.data;
    var Tabs = (react_1.default.createElement(MonitoredUrlTabs_1.default, { activeHref: isArchive ? '/monitored-urls/archived' : '/monitored-urls', addUrlOnClick: function () { setAddUrlIsOpen(true); } }));
    if (status === 'loading') {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            Tabs,
            react_1.default.createElement(buzzingpixel_mission_control_frontend_core_1.PartialPageLoading, null)));
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        Tabs,
        "MonitoredUrlsPage"));
};
MonitoredUrlsPage.defaultProps = {
    isArchive: false,
};
exports.default = MonitoredUrlsPage;

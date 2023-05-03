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
var MonitoredUrlEditButton_1 = __importDefault(require("./MonitoredUrlEditButton"));
var archiveActiveStatuses = {
    Active: 'text-green-700 bg-green-50 ring-green-600/20',
    Archived: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
};
var statuses = {
    Unknown: 'text-gray-700 bg-gray-50 ring-gray-600/20',
    Up: 'text-green-700 bg-green-50 ring-green-600/20',
    'Pending Down': 'text-yellow-700 bg-yellow-50 ring-yellow-600/20',
    Down: 'text-red-700 bg-red-50 ring-red-600/20',
};
function classNames() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.filter(Boolean).join(' ');
}
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
    var pageName = "Project: ".concat(data.title);
    if (pageNameState !== pageName) {
        setPageNameState(pageName);
    }
    if (isArchive !== !data.isActive) {
        setIsArchive(true);
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "border-b border-gray-200 pb-4" },
            react_1.default.createElement("div", { className: "md:flex md:items-center md:justify-between md:space-x-5" },
                react_1.default.createElement("div", { className: "flex items-start space-x-5 overflow-hidden" },
                    react_1.default.createElement("div", { className: "pt-1.5" },
                        react_1.default.createElement("h1", { className: "text-2xl font-bold text-gray-900" }, data.title),
                        react_1.default.createElement("div", { className: "flex items-start gap-x-3" },
                            react_1.default.createElement("a", { href: data.url, className: "underline font-medium text-sm text-cyan-600 hover:text-cyan-500", target: "_blank", rel: "noreferrer" }, data.url),
                            react_1.default.createElement("p", { className: classNames(archiveActiveStatuses[data.activeOrArchivedText], 'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset') }, data.activeOrArchivedText),
                            (function () {
                                if (isArchive) {
                                    return null;
                                }
                                return (react_1.default.createElement("p", { className: classNames(statuses[data.statusReadable], 'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset') }, data.statusReadable));
                            })(),
                            (function () {
                                if (!data.project) {
                                    return null;
                                }
                                return (react_1.default.createElement(react_router_dom_1.Link, { to: data.project.href, className: classNames('text-cyan-700 bg-cyan-50 ring-cyan-600/20 hover:bg-cyan-100 hover:text-cyan-800', 'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset') },
                                    "Project:",
                                    ' ',
                                    data.project.title));
                            })()))),
                react_1.default.createElement("div", { className: "mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3" },
                    react_1.default.createElement(MonitoredUrlEditButton_1.default, null))))));
};
exports.default = MonitoredUrlDetailsPage;

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
var solid_1 = require("@heroicons/react/20/solid");
var MonitoredUrlData_1 = require("./MonitoredUrlData");
var MonitoredUrlTabs_1 = __importDefault(require("./MonitoredUrlTabs"));
var AddMonitoredUrlOverlay_1 = __importDefault(require("./AddMonitoredUrlOverlay"));
var MonitoredUrls_1 = require("./MonitoredUrls");
var MonitoredUrlList_1 = __importDefault(require("./MonitoredUrlList"));
var useQuickStatusFilter_1 = __importDefault(require("./useQuickStatusFilter"));
var useFilterText_1 = __importDefault(require("./useFilterText"));
function classNames() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.filter(Boolean).join(' ');
}
var MonitoredUrlsPage = function (_a) {
    var _b = _a.isArchive, isArchive = _b === void 0 ? false : _b;
    var _c = (0, react_1.useState)(''), pageNameState = _c[0], setPageNameState = _c[1];
    var _d = (0, useQuickStatusFilter_1.default)(), quickStatusFilter = _d[0], setQuickStatusFilter = _d[1];
    if (isArchive && pageNameState !== 'Archived URLs') {
        setPageNameState('Archived URLs');
    }
    else if (!isArchive && pageNameState !== 'Monitored URLs') {
        setPageNameState('Monitored URLs');
    }
    (0, buzzingpixel_mission_control_frontend_core_1.usePageTitle)(pageNameState);
    var _e = (0, useFilterText_1.default)(), filterText = _e[0], setFilterText = _e[1];
    var _f = (0, react_1.useState)(false), addUrlIsOpen = _f[0], setAddUrlIsOpen = _f[1];
    var _g = (0, MonitoredUrlData_1.useMonitoredUrlData)(isArchive), status = _g.status, data = _g.data;
    var Tabs = (react_1.default.createElement(MonitoredUrlTabs_1.default, { activeHref: isArchive ? '/monitored-urls/archived' : '/monitored-urls', addUrlOnClick: function () { setAddUrlIsOpen(true); } }));
    if (status === 'loading') {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            Tabs,
            react_1.default.createElement(buzzingpixel_mission_control_frontend_core_1.PartialPageLoading, null)));
    }
    var portals = function () {
        if (addUrlIsOpen) {
            return (0, buzzingpixel_mission_control_frontend_core_1.createPortal)(react_1.default.createElement(AddMonitoredUrlOverlay_1.default, { setIsOpen: setAddUrlIsOpen }));
        }
        return null;
    };
    var urls = data;
    if (urls.length < 1) {
        if (isArchive) {
            return (react_1.default.createElement(react_1.default.Fragment, null,
                portals(),
                Tabs,
                react_1.default.createElement(buzzingpixel_mission_control_frontend_core_1.NoResultsAddItem, { icon: react_1.default.createElement(solid_1.GlobeAltIcon, null), headline: "No archived urls" })));
        }
        return (react_1.default.createElement(react_1.default.Fragment, null,
            portals(),
            Tabs,
            react_1.default.createElement(buzzingpixel_mission_control_frontend_core_1.NoResultsAddItem, { icon: react_1.default.createElement(solid_1.GlobeAltIcon, null), headline: "No urls", content: "Would you like to create a monitored URL?", actionText: "Add New URL", actionUsesPlusIcon: true, actionButtonOnClick: function () { setAddUrlIsOpen(true); } })));
    }
    if (filterText !== '') {
        urls = urls.filter(function (url) { return url.title.toLowerCase().indexOf(filterText.toLowerCase()) > -1
            || url.slug.toLowerCase().indexOf(filterText.toLowerCase()) > -1
            || url.url.toLowerCase().indexOf(filterText.toLowerCase()) > -1; });
    }
    if (quickStatusFilter !== '') {
        urls = urls.filter(function (url) { return url.status === quickStatusFilter; });
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        portals(),
        Tabs,
        react_1.default.createElement("div", null,
            react_1.default.createElement("div", { className: "sm:flex sm:mb-4" },
                react_1.default.createElement("div", { className: "mb-4 sm:mb-0 sm:mr-4" },
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("div", { className: "sm:hidden" },
                            react_1.default.createElement("label", { htmlFor: "statusFilter", className: "sr-only" }, "Select a status filter"),
                            react_1.default.createElement("select", { id: "statusFilter", name: "statusFilter", className: "block w-full rounded-md border-gray-300 focus:border-cyan-500 focus:ring-cyan-500", defaultValue: quickStatusFilter, onChange: function (e) {
                                    setQuickStatusFilter(e.target.value);
                                } }, MonitoredUrls_1.monitoredUrlStatusList.map(function (filterStatus) { return (react_1.default.createElement("option", { key: filterStatus.value, value: filterStatus.value }, filterStatus.name)); }))),
                        react_1.default.createElement("div", { className: "hidden sm:block" },
                            react_1.default.createElement("nav", { className: "flex space-x-4", "aria-label": "Status Filter" }, MonitoredUrls_1.monitoredUrlStatusList.map(function (filterStatus) {
                                var isCurrent = filterStatus.value === quickStatusFilter;
                                return (react_1.default.createElement("a", { key: filterStatus.value, href: "#", className: classNames(isCurrent ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-500 hover:text-gray-700', 'rounded-md px-3 py-2 text-sm font-medium'), "aria-current": isCurrent ? 'page' : undefined, onClick: function (e) {
                                        e.preventDefault();
                                        setQuickStatusFilter(filterStatus.value);
                                    } }, filterStatus.name));
                            }))))),
                react_1.default.createElement("div", { className: "mb-4 sm:mb-0 grow" },
                    react_1.default.createElement("input", { type: "text", name: "filter", id: "filter", className: "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6", placeholder: "Filter results", value: filterText, onChange: function (e) {
                            setFilterText(e.target.value);
                        } }))),
            react_1.default.createElement(MonitoredUrlList_1.default, { isArchive: isArchive, items: urls }))));
};
MonitoredUrlsPage.defaultProps = {
    isArchive: false,
};
exports.default = MonitoredUrlsPage;

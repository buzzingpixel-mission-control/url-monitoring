"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var MonitoredUrlsPage_1 = __importDefault(require("./MonitoredUrls/MonitoredUrlsPage"));
var MonitoredUrlDetailsPage_1 = __importDefault(require("./MonitoredUrls/MonitoredUrlDetails/MonitoredUrlDetailsPage"));
var UrlMonitoringRoutes = function () { return (react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(react_router_dom_1.Route, { path: "/monitored-urls", element: react_1.default.createElement(MonitoredUrlsPage_1.default, null) }),
    react_1.default.createElement(react_router_dom_1.Route, { path: "/monitored-urls/archived", element: react_1.default.createElement(MonitoredUrlsPage_1.default, { isArchive: true }) }),
    react_1.default.createElement(react_router_dom_1.Route, { path: "/monitored-urls/:slug", element: react_1.default.createElement(MonitoredUrlDetailsPage_1.default, null) }))); };
exports.default = UrlMonitoringRoutes;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var date_1 = __importDefault(require("locutus/php/datetime/date"));
var MonitoredUrls_1 = require("../MonitoredUrls");
var Incidents = function (_a) {
    var incidents = _a.incidents;
    var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return (react_1.default.createElement("div", { className: "overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl" },
        react_1.default.createElement("div", { className: "border-b border-gray-200 bg-white px-4 py-5 sm:px-6" },
            react_1.default.createElement("h3", { className: "text-base font-semibold leading-6 text-gray-900" }, "Latest 100 incidents")),
        react_1.default.createElement("ul", { className: "divide-y divide-gray-100" }, incidents.map(function (incident) { return (react_1.default.createElement("li", { key: incident.id, className: "relative flex justify-between gap-x-6 px-4 py-5 sm:px-6" },
            react_1.default.createElement("div", { className: "flex gap-x-4" },
                react_1.default.createElement("div", { className: "min-w-0 flex-auto" },
                    react_1.default.createElement("div", { className: "flex text-xs leading-5 text-gray-500" },
                        react_1.default.createElement("div", { className: "flex items-center gap-x-1.5" }, (function () {
                            switch (incident.eventType) {
                                case MonitoredUrls_1.MonitoredUrlStatus.up:
                                    return (react_1.default.createElement(react_1.default.Fragment, null,
                                        react_1.default.createElement("div", { className: "flex-none rounded-full bg-emerald-500/20 p-1" },
                                            react_1.default.createElement("div", { className: "h-1.5 w-1.5 rounded-full bg-emerald-500" })),
                                        react_1.default.createElement("p", { className: "text-xs leading-5 text-gray-500" }, "Up")));
                                case MonitoredUrls_1.MonitoredUrlStatus.pendingDown:
                                    return (react_1.default.createElement(react_1.default.Fragment, null,
                                        react_1.default.createElement("div", { className: "flex-none rounded-full bg-yellow-500/20 p-1" },
                                            react_1.default.createElement("div", { className: "h-1.5 w-1.5 rounded-full bg-yellow-500" })),
                                        react_1.default.createElement("p", { className: "text-xs leading-5 text-gray-500" }, "Pending Down")));
                                case MonitoredUrls_1.MonitoredUrlStatus.down:
                                    return (react_1.default.createElement(react_1.default.Fragment, null,
                                        react_1.default.createElement("div", { className: "flex-none rounded-full bg-red-500/20 p-1" },
                                            react_1.default.createElement("div", { className: "h-1.5 w-1.5 rounded-full bg-red-500" })),
                                        react_1.default.createElement("p", { className: "text-xs leading-5 text-gray-500" }, "Down")));
                                default:
                                    return null;
                            }
                        })())),
                    react_1.default.createElement("p", { className: "mt-1 text-sm font-semibold leading-6 text-gray-900" }, "".concat((0, date_1.default)('Y-m-d g:i:s A', incident.eventAtDate), " (").concat(timezone, ")")),
                    react_1.default.createElement("p", { className: "mt-1 flex text-xs leading-5 text-gray-500" },
                        react_1.default.createElement("span", { className: "font-bold" }, "Status Code"),
                        ":",
                        ' ',
                        incident.statusCode),
                    react_1.default.createElement("p", { className: "mt-1 flex text-xs leading-5 text-gray-500" },
                        react_1.default.createElement("span", { className: "font-bold" }, "Message"),
                        ":",
                        ' ',
                        incident.message),
                    react_1.default.createElement("p", { className: "mt-1 flex text-xs leading-5 text-gray-500" },
                        react_1.default.createElement("span", { className: "font-bold" }, "Last Notification At"),
                        ":",
                        ' ',
                        incident.lastNotificationAtDate
                            ? "".concat((0, date_1.default)('Y-m-d g:i:s A', incident.lastNotificationAtDate), " (").concat(timezone, ")")
                            : ''))))); }))));
};
exports.default = Incidents;

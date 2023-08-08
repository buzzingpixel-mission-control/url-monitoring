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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var react_2 = require("@headlessui/react");
var solid_1 = require("@heroicons/react/20/solid");
var MonitoredUrlListItem_1 = __importDefault(require("./MonitoredUrlListItem"));
var MonitoredUrlData_1 = require("./MonitoredUrlData");
function classNames() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.filter(Boolean).join(' ');
}
var MonitoredUrlList = function (_a) {
    var isArchive = _a.isArchive, items = _a.items;
    var _b = (0, react_1.useState)([]), selectedItems = _b[0], setSelectedItems = _b[1];
    (0, react_1.useEffect)(function () {
        if (selectedItems.length < 1) {
            return;
        }
        var visibleIds = items.map(function (item) { return item.id; });
        var shouldReset = false;
        selectedItems.forEach(function (selectedItem) {
            if (visibleIds.indexOf(selectedItem) > -1) {
                return;
            }
            shouldReset = true;
        });
        if (!shouldReset) {
            return;
        }
        setTimeout(function () {
            setSelectedItems([]);
        }, 200);
    });
    var archiveMutation = (0, MonitoredUrlData_1.useArchiveSelectedMonitoredUrlsMutation)(items.filter(function (i) { return selectedItems.indexOf(i.id) > -1; }), isArchive);
    if (items.length < 1) {
        return (react_1.default.createElement(buzzingpixel_mission_control_frontend_core_1.NoResultsAddItem, { icon: react_1.default.createElement(solid_1.ClipboardDocumentCheckIcon, null), headline: "No Monitored URLs match your filters" }));
    }
    var selectedItemsManager = {
        selectedItems: selectedItems,
        addSelectedItem: function (id) {
            if (selectedItems.indexOf(id) > -1) {
                return;
            }
            var newSelectedItems = selectedItems;
            newSelectedItems.push(id);
            setSelectedItems(__spreadArray([], newSelectedItems, true));
        },
        removeSelectedItem: function (id) {
            if (selectedItems.indexOf(id) < 0) {
                return;
            }
            var newSelectedItems = selectedItems.filter(function (i) { return i !== id; });
            setSelectedItems(__spreadArray([], newSelectedItems, true));
        },
    };
    var withSelectedDisabled = selectedItems.length < 1;
    var withSelectedOpacity = withSelectedDisabled ? 'opacity-40' : 'opacity-100';
    var withSelectedPointerEvents = withSelectedDisabled
        ? 'pointer-events-none'
        : 'pointer-events-auto';
    var archiveSelected = function () {
        if (selectedItems.length < 1) {
            return;
        }
        archiveMutation.mutate({});
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "text-right pr-4 mb-4" },
            react_1.default.createElement("label", { className: "text-xs text-gray-900 mr-2", htmlFor: "select_all" }, "select all visible"),
            react_1.default.createElement("input", { id: "select_all", name: "select[]", type: "checkbox", className: "h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-600", onChange: function (e) {
                    if (e.currentTarget.checked) {
                        setSelectedItems(items.map(function (item) { return item.id; }));
                        return;
                    }
                    setSelectedItems([]);
                } })),
        react_1.default.createElement("div", { className: "text-right pr-4 mb-4 ".concat(withSelectedOpacity, " ").concat(withSelectedPointerEvents) },
            react_1.default.createElement(react_2.Menu, { as: "div", className: "relative inline-block text-left" },
                react_1.default.createElement("div", null,
                    react_1.default.createElement(react_2.Menu.Button, { className: "inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" },
                        "With Selected\u2026",
                        react_1.default.createElement(solid_1.ChevronDownIcon, { className: "-mr-1 h-5 w-5 text-gray-400", "aria-hidden": "true" }))),
                react_1.default.createElement(react_2.Transition, { as: react_1.Fragment, enter: "transition ease-out duration-100", enterFrom: "transform opacity-0 scale-95", enterTo: "transform opacity-100 scale-100", leave: "transition ease-in duration-75", leaveFrom: "transform opacity-100 scale-100", leaveTo: "transform opacity-0 scale-95" },
                    react_1.default.createElement(react_2.Menu.Items, { className: "absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" },
                        react_1.default.createElement("div", { className: "py-1" },
                            react_1.default.createElement(react_2.Menu.Item, { disabled: withSelectedDisabled }, function (_a) {
                                var active = _a.active;
                                return (react_1.default.createElement("span", { className: classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm cursor-pointer'), onClick: archiveSelected }, isArchive ? 'Un-archive' : 'Archive'));
                            })))))),
        react_1.default.createElement("div", { className: "bg-white rounded-md shadow-sm overflow-hidden" },
            react_1.default.createElement("ul", { className: "divide-y divide-gray-100" }, items.map(function (item) { return (react_1.default.createElement(MonitoredUrlListItem_1.default, { key: item.id, isArchive: isArchive, item: item, selectedItemsManager: selectedItemsManager })); })))));
};
exports.default = MonitoredUrlList;

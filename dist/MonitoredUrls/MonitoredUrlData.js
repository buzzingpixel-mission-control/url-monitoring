"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useArchiveMonitoredUrlMutation = exports.useEditMonitoredUrlMutation = exports.useAddMonitoredUrlMutation = exports.useMonitoredUrlData = void 0;
var buzzingpixel_mission_control_frontend_core_1 = require("buzzingpixel-mission-control-frontend-core");
var react_query_1 = require("@tanstack/react-query");
var MonitoredUrls_1 = require("./MonitoredUrls");
var useMonitoredUrlData = function (archive) {
    if (archive === void 0) { archive = false; }
    var uri = archive
        ? '/monitored-urls/list/archived'
        : '/monitored-urls/list';
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
var useEditMonitoredUrlMutation = function (urlId) {
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, buzzingpixel_mission_control_frontend_core_1.useApiMutation)({
        invalidateQueryKeysOnSuccess: [
            '/monitored-urls/list',
            '/monitored-urls/list/archived',
        ],
        prepareApiParams: function (data) { return ({
            uri: "/monitored-urls/edit/".concat(urlId),
            payload: data,
            method: buzzingpixel_mission_control_frontend_core_1.RequestMethod.PATCH,
        }); },
        options: {
            onMutate: function (data) { return __awaiter(void 0, void 0, void 0, function () {
                var formValues, previousUrls, previousUrlsArchived, urlMapper, newUrls, newUrlsArchive;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            formValues = data;
                            return [4 /*yield*/, queryClient.cancelQueries({
                                    queryKey: [['/monitored-urls/list']],
                                })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, queryClient.cancelQueries({
                                    queryKey: [['/monitored-urls/list/archived']],
                                })];
                        case 2:
                            _a.sent();
                            previousUrls = queryClient.getQueryData([['/monitored-urls/list']]);
                            previousUrlsArchived = queryClient.getQueryData([['/monitored-urls/list/archived']]);
                            urlMapper = function (url) {
                                if (url.id === urlId) {
                                    url.title = formValues.title;
                                    url.url = formValues.url;
                                    url.projectId = formValues.project_id;
                                }
                                return url;
                            };
                            if (previousUrls) {
                                newUrls = previousUrls.map(urlMapper);
                                queryClient.setQueryData([['/monitored-urls/list']], newUrls);
                            }
                            if (previousUrlsArchived) {
                                newUrlsArchive = previousUrlsArchived.map(urlMapper);
                                queryClient.setQueryData([['/monitored-urls/list/archived']], newUrlsArchive);
                            }
                            return [2 /*return*/, {
                                    previousUrls: previousUrls,
                                    previousUrlsArchived: previousUrlsArchived,
                                }];
                    }
                });
            }); },
        },
    });
};
exports.useEditMonitoredUrlMutation = useEditMonitoredUrlMutation;
var useArchiveMonitoredUrlMutation = function (urlId, isArchive) {
    var queryClient = (0, react_query_1.useQueryClient)();
    return (0, buzzingpixel_mission_control_frontend_core_1.useApiMutation)({
        invalidateQueryKeysOnSuccess: [
            '/monitored-urls/list',
            '/monitored-urls/list/archived',
        ],
        prepareApiParams: function () { return ({
            uri: "/monitored-urls/".concat(isArchive ? 'un-archive' : 'archive', "/").concat(urlId),
            method: buzzingpixel_mission_control_frontend_core_1.RequestMethod.PATCH,
        }); },
        options: {
            onMutate: function () { return __awaiter(void 0, void 0, void 0, function () {
                var previousUrls, previousUrlsArchived, projectMapper, newUrls, newUrlsArchive;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, queryClient.cancelQueries({
                                queryKey: [['/monitored-urls/list']],
                            })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, queryClient.cancelQueries({
                                    queryKey: [['/monitored-urls/list/archived']],
                                })];
                        case 2:
                            _a.sent();
                            previousUrls = queryClient.getQueryData([['/monitored-urls/list']]);
                            previousUrlsArchived = queryClient.getQueryData([['/monitored-urls/list/archived']]);
                            projectMapper = function (url) {
                                if (url.id === urlId) {
                                    url.isActive = isArchive;
                                }
                                return url;
                            };
                            if (previousUrls) {
                                newUrls = previousUrls.map(projectMapper);
                                queryClient.setQueryData([['/monitored-urls/list']], newUrls);
                            }
                            if (previousUrlsArchived) {
                                newUrlsArchive = previousUrlsArchived.map(projectMapper);
                                queryClient.setQueryData([['/monitored-urls/list/archived']], newUrlsArchive);
                            }
                            return [2 /*return*/, {
                                    previousUrls: previousUrls,
                                    previousUrlsArchived: previousUrlsArchived,
                                }];
                    }
                });
            }); },
        },
    });
};
exports.useArchiveMonitoredUrlMutation = useArchiveMonitoredUrlMutation;

import AddMonitoredUrlFormValues from './AddMonitoredUrlFormValues';
export declare const useMonitoredUrlData: (archive?: boolean) => {
    status: string;
    data?: undefined;
} | {
    status: string;
    data: import("./MonitoredUrls").MonitoredUrlsWithViewOptions;
};
export declare const useAddMonitoredUrlMutation: () => import("@tanstack/react-query/src/types").UseMutationResult<unknown, import("buzzingpixel-mission-control-frontend-core/dist/Api/ApiError").default, AddMonitoredUrlFormValues>;
export declare const useEditMonitoredUrlMutation: (urlId: string) => import("@tanstack/react-query/src/types").UseMutationResult<unknown, import("buzzingpixel-mission-control-frontend-core/dist/Api/ApiError").default, AddMonitoredUrlFormValues>;
export declare const useArchiveMonitoredUrlMutation: (urlId: string, isArchive: boolean) => import("@tanstack/react-query/src/types").UseMutationResult<unknown, import("buzzingpixel-mission-control-frontend-core/dist/Api/ApiError").default, unknown>;

import { MonitoredUrlsWithViewOptions } from './MonitoredUrls';
import AddMonitoredUrlFormValues from './AddMonitoredUrlFormValues';
export declare const useMonitoredUrlData: (archive?: boolean) => {
    status: 'loading' | 'error' | 'success';
    data: MonitoredUrlsWithViewOptions;
};
export declare const useAddMonitoredUrlMutation: () => import("@tanstack/react-query/src/types").UseMutationResult<unknown, import("buzzingpixel-mission-control-frontend-core/dist/Api/ApiError").default, AddMonitoredUrlFormValues>;
export declare const useEditMonitoredUrlMutation: (urlId: string, slug: string) => import("@tanstack/react-query/src/types").UseMutationResult<unknown, import("buzzingpixel-mission-control-frontend-core/dist/Api/ApiError").default, AddMonitoredUrlFormValues>;
export declare const useArchiveMonitoredUrlMutation: (urlId: string, isArchive: boolean, projectId?: string | undefined | null) => import("@tanstack/react-query/src/types").UseMutationResult<unknown, import("buzzingpixel-mission-control-frontend-core/dist/Api/ApiError").default, unknown>;
export declare const useArchiveSelectedMonitoredUrlsMutation: (urls: {
    id?: string;
    projectId?: string;
    isActive?: boolean;
    title?: string;
    slug?: string;
    url?: string;
    status?: import("./MonitoredUrls").MonitoredUrlStatus;
    checkedAt?: string;
    createdAt?: string;
}[], isArchive: boolean) => import("@tanstack/react-query/src/types").UseMutationResult<unknown, import("buzzingpixel-mission-control-frontend-core/dist/Api/ApiError").default, unknown>;

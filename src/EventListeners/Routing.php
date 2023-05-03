<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\EventListeners;

use MissionControlBackend\Http\ApiApplyRoutesEvent;
use MissionControlUrlMonitoring\MonitoredUrls\AddEdit\PatchArchiveMonitoredUrlAction;
use MissionControlUrlMonitoring\MonitoredUrls\AddEdit\PatchEditMonitoredUrlAction;
use MissionControlUrlMonitoring\MonitoredUrls\AddEdit\PatchUnArchiveMonitoredUrlAction;
use MissionControlUrlMonitoring\MonitoredUrls\AddEdit\PostAddMonitoredUrlAction;
use MissionControlUrlMonitoring\MonitoredUrls\GetDetails\GetMonitoredUrlDetailsBySlugAction;
use MissionControlUrlMonitoring\MonitoredUrls\GetMonitoredUrlsListAction;
use MissionControlUrlMonitoring\MonitoredUrls\GetMonitoredUrlsListArchivedAction;

class Routing
{
    public function onApplyRoutes(ApiApplyRoutesEvent $event): void
    {
        GetMonitoredUrlsListAction::registerRoute($event);
        GetMonitoredUrlsListArchivedAction::registerRoute($event);
        PostAddMonitoredUrlAction::registerRoute($event);
        PatchEditMonitoredUrlAction::registerRoute($event);
        PatchArchiveMonitoredUrlAction::registerRoute($event);
        PatchUnArchiveMonitoredUrlAction::registerRoute($event);
        GetMonitoredUrlDetailsBySlugAction::registerRoute($event);
    }
}

<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\EventListeners;

use MissionControlBackend\Http\ApiApplyRoutesEvent;
use MissionControlUrlMonitoring\MonitoredUrls\AddEdit\PatchEditProjectAction;
use MissionControlUrlMonitoring\MonitoredUrls\AddEdit\PostAddMonitoredUrlAction;
use MissionControlUrlMonitoring\MonitoredUrls\GetMonitoredUrlsListAction;
use MissionControlUrlMonitoring\MonitoredUrls\GetMonitoredUrlsListArchivedAction;

class Routing
{
    public function onApplyRoutes(ApiApplyRoutesEvent $event): void
    {
        GetMonitoredUrlsListAction::registerRoute($event);
        GetMonitoredUrlsListArchivedAction::registerRoute($event);
        PostAddMonitoredUrlAction::registerRoute($event);
        PatchEditProjectAction::registerRoute($event);
    }
}

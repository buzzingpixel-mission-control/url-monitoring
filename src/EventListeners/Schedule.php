<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\EventListeners;

use MissionControlBackend\Scheduler\ApplyScheduleEvent;
use MissionControlUrlMonitoring\MonitoredUrls\CheckUrls\AddUrlsToQueueAction;

class Schedule
{
    public function onApplySchedule(ApplyScheduleEvent $event): void
    {
        AddUrlsToQueueAction::registerEvent($event);
    }
}

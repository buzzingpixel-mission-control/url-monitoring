<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\EventListeners;

use MissionControlBackend\Scheduler\ApplyScheduleEvent;
use MissionControlUrlMonitoring\MonitoredUrls\CheckUrls\AddUrlsToQueueAction;
use MissionControlUrlMonitoring\MonitoredUrls\Notifications\CheckNotificationsSchedule;

class Schedule
{
    public function onApplySchedule(ApplyScheduleEvent $event): void
    {
        AddUrlsToQueueAction::registerEvent($event);
        CheckNotificationsSchedule::registerEvent($event);
    }
}

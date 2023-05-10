<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Notifications;

use MissionControlUrlMonitoring\MonitoredUrls\Incidents\MonitoredUrlIncident;

class AddIncidentNotificationToQueueNoOp implements AddIncidentNotificationToQueue
{
    public function add(MonitoredUrlIncident $incident): void
    {
    }
}

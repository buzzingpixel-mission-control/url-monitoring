<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Notifications;

use MissionControlUrlMonitoring\MonitoredUrls\Incidents\MonitoredUrlIncident;

class SendNotificationNoOp implements SendNotification
{
    public function send(MonitoredUrlIncident $incident): void
    {
    }
}

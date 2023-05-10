<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Notifications;

use MissionControlUrlMonitoring\MonitoredUrls\Incidents\MonitoredUrlIncident;
use MissionControlUrlMonitoring\MonitoredUrls\MonitoredUrl;
use MissionControlUrlMonitoring\MonitoredUrls\Notifications\Adapters\SendNotification;

class SendNotificationNoOp implements SendNotification
{
    public function send(
        MonitoredUrl $url,
        MonitoredUrlIncident $incident,
    ): void {
    }
}

<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Notifications\Adapters;

use MissionControlUrlMonitoring\MonitoredUrls\Incidents\MonitoredUrlIncident;
use MissionControlUrlMonitoring\MonitoredUrls\MonitoredUrl;

interface SendNotification
{
    public function send(
        MonitoredUrl $url,
        MonitoredUrlIncident $incident,
    ): void;
}

<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Notifications\Adapters;

use MissionControlUrlMonitoring\MonitoredUrls\Incidents\MonitoredUrlIncident;

interface SendNotification
{
    public function send(MonitoredUrlIncident $incident): void;
}

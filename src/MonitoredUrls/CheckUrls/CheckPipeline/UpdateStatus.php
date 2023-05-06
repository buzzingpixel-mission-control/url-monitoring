<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\CheckUrls\CheckPipeline;

use MissionControlUrlMonitoring\MonitoredUrls\Incidents\ValueObjects\EventType;
use MissionControlUrlMonitoring\MonitoredUrls\MonitoredUrl;

interface UpdateStatus
{
    public function update(
        EventType $eventType,
        MonitoredUrl $monitoredUrl,
    ): MonitoredUrl;
}

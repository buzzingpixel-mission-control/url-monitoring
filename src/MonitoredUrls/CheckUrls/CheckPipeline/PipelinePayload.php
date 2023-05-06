<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\CheckUrls\CheckPipeline;

use MissionControlUrlMonitoring\MonitoredUrls\Incidents\MonitoredUrlIncident;
use MissionControlUrlMonitoring\MonitoredUrls\MonitoredUrl;

readonly class PipelinePayload
{
    public function __construct(
        public MonitoredUrl $monitoredUrl,
        public MonitoredUrlIncident|null $latestIncident,
    ) {
    }
}

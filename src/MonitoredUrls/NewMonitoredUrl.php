<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls;

use MissionControlUrlMonitoring\MonitoredUrls\ValueObjects\EmptyString;
use MissionControlUrlMonitoring\MonitoredUrls\ValueObjects\IsActive;
use MissionControlUrlMonitoring\MonitoredUrls\ValueObjects\ProjectId;
use MissionControlUrlMonitoring\MonitoredUrls\ValueObjects\Slug;
use MissionControlUrlMonitoring\MonitoredUrls\ValueObjects\Title;
use MissionControlUrlMonitoring\MonitoredUrls\ValueObjects\Url;
use Spatie\Cloneable\Cloneable;

class NewMonitoredUrl
{
    use Cloneable;

    public function __construct(
        public Title $title,
        public Slug $slug,
        public Url $url,
        public IsActive $isActive = new IsActive(true),
        public ProjectId|EmptyString $projectId = new EmptyString(),
    ) {
    }
}

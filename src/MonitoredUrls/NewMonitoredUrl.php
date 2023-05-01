<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls;

use MissionControlUrlMonitoring\MonitoredUrls\ValueObjects\IsActive;
use MissionControlUrlMonitoring\MonitoredUrls\ValueObjects\NullValue;
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
        public Url $url,
        public ProjectId|NullValue $projectId = new NullValue(),
        public IsActive $isActive = new IsActive(true),
        public Slug $slug = new Slug(''),
    ) {
    }
}

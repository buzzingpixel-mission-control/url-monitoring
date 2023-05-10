<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Notifications\Adapters\Slack;

class ApplyMonitoredUrlSlackConfigEvent
{
    public function __construct(
        public MonitoredUrlSlackConfig|null $config = null,
    ) {
    }

    public function addConfig(MonitoredUrlSlackConfig $config): self
    {
        $this->config = $config;

        return $this;
    }
}

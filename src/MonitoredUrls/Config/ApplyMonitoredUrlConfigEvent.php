<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Config;

class ApplyMonitoredUrlConfigEvent
{
    public function __construct(public MonitoredUrlConfig|null $config = null)
    {
    }

    public function addConfig(MonitoredUrlConfig $config): self
    {
        $this->config = $config;

        return $this;
    }
}

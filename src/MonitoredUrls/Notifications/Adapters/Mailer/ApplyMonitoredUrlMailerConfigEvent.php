<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Notifications\Adapters\Mailer;

class ApplyMonitoredUrlMailerConfigEvent
{
    public function __construct(
        public MonitoredUrlMailerConfig|null $config = null,
    ) {
    }

    public function addConfig(MonitoredUrlMailerConfig $config): self
    {
        $this->config = $config;

        return $this;
    }
}

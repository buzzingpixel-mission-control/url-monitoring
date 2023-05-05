<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Config;

readonly class MonitoredUrlConfig
{
    public function __construct(public string $queueName)
    {
    }
}

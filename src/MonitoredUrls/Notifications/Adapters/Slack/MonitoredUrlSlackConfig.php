<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Notifications\Adapters\Slack;

readonly class MonitoredUrlSlackConfig
{
    public function __construct(public string|null $slackChannel = null)
    {
    }
}

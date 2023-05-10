<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Notifications\Adapters\Slack;

use Psr\EventDispatcher\EventDispatcherInterface;

readonly class MonitoredUrlSlackConfigFactory
{
    public function __construct(
        private EventDispatcherInterface $eventDispatcher,
    ) {
    }

    public function create(): MonitoredUrlSlackConfig
    {
        $event = new ApplyMonitoredUrlSlackConfigEvent();

        $this->eventDispatcher->dispatch($event);

        return $event->config ?? new MonitoredUrlSlackConfig();
    }
}

<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Config;

use Psr\EventDispatcher\EventDispatcherInterface;
use RuntimeException;

use function implode;

readonly class MonitoredUrlConfigFactory
{
    public function __construct(
        private EventDispatcherInterface $eventDispatcher,
    ) {
    }

    public function create(): MonitoredUrlConfig
    {
        $event = new ApplyMonitoredUrlConfigEvent();

        $this->eventDispatcher->dispatch($event);

        if ($event->config === null) {
            throw new RuntimeException(
                implode(' ', [
                    'You must listen for the event',
                    ApplyMonitoredUrlConfigEvent::class,
                    'and set up a MonitoredUrlConfig',
                ]),
            );
        }

        return $event->config;
    }
}

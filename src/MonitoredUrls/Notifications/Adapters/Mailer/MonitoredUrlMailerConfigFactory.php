<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Notifications\Adapters\Mailer;

use MissionControlBackend\Mailer\ApplyMailerConfigEvent;
use Psr\EventDispatcher\EventDispatcherInterface;
use RuntimeException;

use function implode;

readonly class MonitoredUrlMailerConfigFactory
{
    public function __construct(
        private EventDispatcherInterface $eventDispatcher,
    ) {
    }

    public function create(): MonitoredUrlMailerConfig
    {
        $event = new ApplyMonitoredUrlMailerConfigEvent();

        $this->eventDispatcher->dispatch($event);

        if ($event->config === null) {
            throw new RuntimeException(
                implode(' ', [
                    'You must listen for the event',
                    ApplyMailerConfigEvent::class,
                    'and add a config',
                ]),
            );
        }

        return $event->config;
    }
}

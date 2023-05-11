<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Notifications;

use BuzzingPixel\Queue\QueueHandler;
use BuzzingPixel\Queue\QueueItem;
use BuzzingPixel\Queue\QueueItemJob;
use BuzzingPixel\Queue\QueueItemJobCollection;
use MissionControlUrlMonitoring\MonitoredUrls\Config\MonitoredUrlConfig;
use MissionControlUrlMonitoring\MonitoredUrls\QueueKey;

readonly class AddCheckNotificationsToQueuePersist implements AddCheckNotificationsToQueue
{
    public function __construct(
        private QueueKey $queueKey,
        private QueueHandler $queueHandler,
        private MonitoredUrlConfig $config,
    ) {
    }

    public function add(): void
    {
        $this->queueHandler->enqueue(
            new QueueItem(
                $this->queueKey->getCheckNotificationsQueueHandle(),
                'Check Notifications',
                new QueueItemJobCollection([
                    new QueueItemJob(
                        CheckNotificationsJob::class,
                    ),
                ]),
            ),
            $this->config->queueName,
        );
    }
}

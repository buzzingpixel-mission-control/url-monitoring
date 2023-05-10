<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Notifications;

use BuzzingPixel\Queue\QueueHandler;
use BuzzingPixel\Queue\QueueItem;
use BuzzingPixel\Queue\QueueItemJob;
use BuzzingPixel\Queue\QueueItemJobCollection;
use MissionControlUrlMonitoring\MonitoredUrls\Config\MonitoredUrlConfig;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\MonitoredUrlIncident;
use MissionControlUrlMonitoring\MonitoredUrls\QueueKey;

readonly class AddIncidentNotificationToQueuePersist implements AddIncidentNotificationToQueue
{
    public function __construct(
        private QueueKey $queueKey,
        private MonitoredUrlConfig $config,
        private QueueHandler $queueHandler,
    ) {
    }

    public function add(MonitoredUrlIncident $incident): void
    {
        $id = $incident->id->toNative();

        $this->queueHandler->enqueue(
            new QueueItem(
                $this->queueKey->getIncidentNotificationHandle(
                    $incident,
                ),
                'Send Notification For Incident: ' . $id,
                new QueueItemJobCollection([
                    new QueueItemJob(
                        SendNotificationJob::class,
                        context: ['incidentId' => $id],
                    ),
                ]),
            ),
            $this->config->queueName,
        );
    }
}

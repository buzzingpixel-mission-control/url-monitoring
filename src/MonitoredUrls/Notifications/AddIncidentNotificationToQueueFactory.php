<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Notifications;

use MissionControlUrlMonitoring\MonitoredUrls\Incidents\MonitoredUrlIncident;
use MissionControlUrlMonitoring\MonitoredUrls\QueueKey;
use Redis;

use function count;

readonly class AddIncidentNotificationToQueueFactory
{
    public function __construct(
        private Redis $redis,
        private QueueKey $queueKey,
        private AddIncidentNotificationToQueueNoOp $noOp,
        private AddIncidentNotificationToQueuePersist $persist,
    ) {
    }

    public function create(
        MonitoredUrlIncident $incident,
    ): AddIncidentNotificationToQueue {
        $queueKey = $this->queueKey->getIncidentNotificationHandle(
            $incident,
        );

        $alreadyEnqueuedKeys = $this->redis->keys(
            '*_' . $queueKey . '_*',
        );

        if (count($alreadyEnqueuedKeys) > 0) {
            return $this->noOp;
        }

        return $this->persist;
    }
}

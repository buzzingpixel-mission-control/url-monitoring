<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Notifications;

use MissionControlUrlMonitoring\MonitoredUrls\QueueKey;
use Redis;

use function count;

readonly class AddNotificationsToQueueFactory
{
    public function __construct(
        private Redis $redis,
        private QueueKey $queueKey,
        private AddCheckNotificationsToQueueNoOp $noOp,
        private AddCheckNotificationsToQueuePersist $persist,
    ) {
    }

    public function create(): AddCheckNotificationsToQueue
    {
        $queueKey = $this->queueKey->getCheckNotificationsQueueHandle();

        $alreadyEnqueuedKeys = $this->redis->keys(
            '*_' . $queueKey . '_*',
        );

        if (count($alreadyEnqueuedKeys) > 0) {
            return $this->noOp;
        }

        return $this->persist;
    }
}

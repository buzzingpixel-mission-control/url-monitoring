<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Notifications;

use MissionControlUrlMonitoring\MonitoredUrls\QueueKey;
use Redis;

use function array_filter;
use function count;
use function mb_strpos;

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

        $alreadyEnqueuedKeys = array_filter(
            $this->redis->keys(
                '*_' . $queueKey . '_*',
            ),
            static fn (string $key) => mb_strpos($key, 'lock_') !== 0,
        );

        if (count($alreadyEnqueuedKeys) > 0) {
            return $this->noOp;
        }

        return $this->persist;
    }
}

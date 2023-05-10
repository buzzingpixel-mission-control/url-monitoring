<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\CheckUrls;

use MissionControlUrlMonitoring\MonitoredUrls\QueueKey;
use Redis;

use function count;

readonly class AddUrlsToQueueFactory
{
    public function __construct(
        private Redis $redis,
        private QueueKey $queueKey,
        private AddUrlsToQueueNoOp $noOp,
        private AddUrlsToQueueFromRepository $fromRepository,
    ) {
    }

    public function create(): AddUrlsToQueue
    {
        $enqueuedKeys = $this->redis->keys(
            $this->queueKey->getKey('*'),
        );

        if (count($enqueuedKeys) > 0) {
            return $this->noOp;
        }

        return $this->fromRepository;
    }
}

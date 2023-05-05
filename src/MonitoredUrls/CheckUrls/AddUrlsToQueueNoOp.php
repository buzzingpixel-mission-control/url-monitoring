<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\CheckUrls;

readonly class AddUrlsToQueueNoOp implements AddUrlsToQueue
{
    public function add(): void
    {
    }
}

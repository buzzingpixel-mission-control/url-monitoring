<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\CheckUrls\CheckPipeline;

use MissionControlUrlMonitoring\MonitoredUrls\MonitoredUrl;
use MissionControlUrlMonitoring\MonitoredUrls\MonitoredUrlRepository;
use Psr\Clock\ClockInterface;

readonly class UpdateCheckedAt
{
    public function __construct(
        private ClockInterface $clock,
        private MonitoredUrlRepository $repository,
    ) {
    }

    public function update(MonitoredUrl $monitoredUrl): void
    {
        $this->repository->saveMonitoredUrl($monitoredUrl->withCheckedAt(
            $this->clock->now(),
        ));
    }
}

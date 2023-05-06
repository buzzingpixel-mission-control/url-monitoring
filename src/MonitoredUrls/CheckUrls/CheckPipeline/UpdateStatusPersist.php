<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\CheckUrls\CheckPipeline;

use MissionControlUrlMonitoring\MonitoredUrls\Incidents\ValueObjects\EventType;
use MissionControlUrlMonitoring\MonitoredUrls\MonitoredUrl;
use MissionControlUrlMonitoring\MonitoredUrls\MonitoredUrlRepository;
use MissionControlUrlMonitoring\MonitoredUrls\ValueObjects\Status;

readonly class UpdateStatusPersist implements UpdateStatus
{
    public function __construct(private MonitoredUrlRepository $repository)
    {
    }

    public function update(
        EventType $eventType,
        MonitoredUrl $monitoredUrl,
    ): MonitoredUrl {
        $monitoredUrl = $monitoredUrl->withStatus(Status::from(
            $eventType->value,
        ));

        $this->repository->saveMonitoredUrl($monitoredUrl);

        return $monitoredUrl;
    }
}

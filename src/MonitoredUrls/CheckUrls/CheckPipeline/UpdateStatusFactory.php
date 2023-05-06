<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\CheckUrls\CheckPipeline;

use MissionControlUrlMonitoring\MonitoredUrls\Incidents\ValueObjects\EventType;
use MissionControlUrlMonitoring\MonitoredUrls\MonitoredUrl;

readonly class UpdateStatusFactory
{
    public function __construct(
        private UpdateStatusNoOp $noOp,
        private UpdateStatusPersist $persist,
    ) {
    }

    public function create(
        EventType $eventType,
        MonitoredUrl $monitoredUrl,
    ): UpdateStatus {
        if ($eventType->value === $monitoredUrl->status->value) {
            return $this->noOp;
        }

        return $this->persist;
    }
}

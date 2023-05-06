<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\CheckUrls\CheckPipeline;

use MissionControlUrlMonitoring\MonitoredUrls\Incidents\ValueObjects\EventType;

class AddIncidentNoOp implements AddIncident
{
    public function add(CheckUrlResults $results, EventType $eventType): void
    {
    }
}

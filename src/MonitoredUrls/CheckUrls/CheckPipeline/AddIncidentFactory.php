<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\CheckUrls\CheckPipeline;

use MissionControlUrlMonitoring\MonitoredUrls\Incidents\ValueObjects\EventType;

readonly class AddIncidentFactory
{
    public function __construct(
        private AddIncidentNoOp $noOp,
        private AddIncidentPersist $persist,
    ) {
    }

    public function create(
        CheckUrlResults $results,
        EventType $eventType,
    ): AddIncident {
        $lastIncident = $results->pipelinePayload->latestIncident;

        if ($lastIncident === null) {
            return $this->persist;
        }

        if ($lastIncident->eventType->value !== $eventType->value) {
            return $this->persist;
        }

        return $this->noOp;
    }
}

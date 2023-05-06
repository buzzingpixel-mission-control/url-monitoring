<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\CheckUrls\CheckPipeline;

use MissionControlUrlMonitoring\MonitoredUrls\CheckUrls\ValueObjects\Status;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\ValueObjects\EventType;

use function assert;

class EventTypeFactory
{
    public function create(CheckUrlResults $results): EventType
    {
        $lastIncident = $results->pipelinePayload->latestIncident;

        if ($lastIncident === null && $results->status === Status::UP) {
            return EventType::UP;
        }

        if ($lastIncident === null && $results->status === Status::DOWN) {
            return EventType::PENDING_DOWN;
        }

        // Can't be null now
        assert($lastIncident !== null);

        if (
            $results->status === Status::UP &&
            $lastIncident->eventType !== EventType::UP
        ) {
            return EventType::UP;
        }

        if (
            $results->status === Status::DOWN &&
            $lastIncident->eventType === EventType::UP
        ) {
            return EventType::PENDING_DOWN;
        }

        if (
            $results->status === Status::DOWN &&
            $lastIncident->eventType === EventType::PENDING_DOWN
        ) {
            return EventType::DOWN;
        }

        // Otherwise, if no conditions match, we'll return the same status
        return $lastIncident->eventType;
    }
}

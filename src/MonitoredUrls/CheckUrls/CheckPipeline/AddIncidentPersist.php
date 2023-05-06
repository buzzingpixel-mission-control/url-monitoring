<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\CheckUrls\CheckPipeline;

use MissionControlUrlMonitoring\MonitoredUrls\Incidents\MonitoredUrlIncidentRepository;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\NewMonitoredUrlIncident;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\ValueObjects\EventType;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\ValueObjects\Message;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\ValueObjects\MonitoredUrlId;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\ValueObjects\StatusCode;

readonly class AddIncidentPersist implements AddIncident
{
    public function __construct(
        private MonitoredUrlIncidentRepository $repository,
    ) {
    }

    public function add(CheckUrlResults $results, EventType $eventType): void
    {
        $this->repository->createMonitoredUrlIncident(
            new NewMonitoredUrlIncident(
                MonitoredUrlId::fromNative(
                    $results->pipelinePayload
                        ->monitoredUrl
                        ->id
                        ->toNative(),
                ),
                $eventType,
                StatusCode::fromNative(
                    $results->statusCode->toNative(),
                ),
                Message::fromNative(
                    $results->message->toNative(),
                ),
            ),
        );
    }
}

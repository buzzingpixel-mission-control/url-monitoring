<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Notifications;

use MissionControlUrlMonitoring\MonitoredUrls\Incidents\MonitoredUrlIncident;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\MonitoredUrlIncidentRepository;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\Persistence\FindMonitoredUrlIncidentParameters;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\ValueObjects\EventType;
use MissionControlUrlMonitoring\MonitoredUrls\Notifications\Adapters\SendNotification;

readonly class SendNotificationFactory
{
    public function __construct(
        private SendNotificationNoOp $noOp,
        private MonitoredUrlIncidentRepository $repository,
        private SendNotificationWithConfiguredAdapters $send,
    ) {
    }

    public function create(MonitoredUrlIncident $incident): SendNotification
    {
        $previousIncident = $this->repository->findOneOrNull(
            (new FindMonitoredUrlIncidentParameters())
                ->withMonitoredUrlId(
                    $incident->monitoredUrlId->toNative(),
                )
                ->withLastNotificationIsNotNull(),
        );

        /**
         * Don't send notifications if this is the first event and it's an up
         * event
         */
        if (
            $previousIncident === null &&
            $incident->eventType === EventType::UP
        ) {
            return $this->noOp;
        }

        return $this->send;
    }
}

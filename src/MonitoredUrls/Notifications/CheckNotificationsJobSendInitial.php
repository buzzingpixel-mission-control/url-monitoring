<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Notifications;

use MissionControlUrlMonitoring\MonitoredUrls\Incidents\MonitoredUrlIncidentRepository;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\Persistence\FindMonitoredUrlIncidentParameters;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\ValueObjects\EventType;

readonly class CheckNotificationsJobSendInitial
{
    public function __construct(
        private MonitoredUrlIncidentRepository $repository,
        private AddIncidentNotificationToQueueAction $addToQueue,
    ) {
    }

    public function run(): void
    {
        $findIncidentParameters = (new FindMonitoredUrlIncidentParameters())
            // Pending events never get notifications
            ->withNotEventType(EventType::PENDING_DOWN->value)
            // Send initial notifications (last_notification_sent will be null)
            ->withLastNotificationIsNull();

        $incidents = $this->repository->findAll(
            $findIncidentParameters,
        );

        $incidents->map([$this->addToQueue, 'add']);
    }
}

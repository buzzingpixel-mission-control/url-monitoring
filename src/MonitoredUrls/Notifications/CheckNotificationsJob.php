<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Notifications;

use MissionControlUrlMonitoring\MonitoredUrls\Incidents\MonitoredUrlIncidentRepository;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\Persistence\FindMonitoredUrlIncidentParameters;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\ValueObjects\EventType;

readonly class CheckNotificationsJob
{
    public function __construct(
        private MonitoredUrlIncidentRepository $repository,
        private AddIncidentNotificationToQueueAction $addToQueue,
    ) {
    }

    public function __invoke(): void
    {
        /**
         * Pending events never get notifications
         */
        $findParameters = (new FindMonitoredUrlIncidentParameters())
            ->withNotEventType(EventType::PENDING_DOWN->value);

        /**
         * Send initial notifications (last_notification_sent will be null)
         */
        $incidents = $this->repository->findAll(
            $findParameters->withLastNotificationIsNull(),
        );

        $incidents->map([$this->addToQueue, 'add']);

        /**
         * TODO: Send notifications for down events that have passed threshold
         */
    }
}

<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Notifications;

use MissionControlUrlMonitoring\MonitoredUrls\Incidents\MonitoredUrlIncident;

readonly class AddIncidentNotificationToQueueAction
{
    public function __construct(
        private AddIncidentNotificationToQueueFactory $factory,
    ) {
    }

    public function add(MonitoredUrlIncident $incident): void
    {
        $this->factory->create($incident)->add($incident);
    }
}

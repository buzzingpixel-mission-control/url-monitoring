<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Notifications;

use MissionControlUrlMonitoring\MonitoredUrls\Incidents\MonitoredUrlIncident;
use MissionControlUrlMonitoring\MonitoredUrls\Notifications\Adapters\SendNotificationAdapterFactory;

readonly class SendNotificationWithConfiguredAdapters implements SendNotification
{
    public function __construct(
        private SendNotificationAdapterFactory $sendNotifications,
    ) {
    }

    public function send(MonitoredUrlIncident $incident): void
    {
        $this->sendNotifications->create()->send($incident);
    }
}

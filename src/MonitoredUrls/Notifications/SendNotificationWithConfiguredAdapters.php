<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Notifications;

use MissionControlUrlMonitoring\MonitoredUrls\Incidents\MonitoredUrlIncident;
use MissionControlUrlMonitoring\MonitoredUrls\MonitoredUrl;
use MissionControlUrlMonitoring\MonitoredUrls\Notifications\Adapters\SendNotification;
use MissionControlUrlMonitoring\MonitoredUrls\Notifications\Adapters\SendNotificationAdapterFactory;

readonly class SendNotificationWithConfiguredAdapters implements SendNotification
{
    public function __construct(
        private SendNotificationAdapterFactory $sendNotificationsFactory,
    ) {
    }

    public function send(
        MonitoredUrl $url,
        MonitoredUrlIncident $incident,
    ): void {
        $this->sendNotificationsFactory->create()->send(
            $url,
            $incident,
        );
    }
}

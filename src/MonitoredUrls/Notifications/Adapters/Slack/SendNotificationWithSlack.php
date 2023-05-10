<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Notifications\Adapters\Slack;

use MissionControlBackend\Slack\SlackClient;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\MonitoredUrlIncident;
use MissionControlUrlMonitoring\MonitoredUrls\MonitoredUrl;
use MissionControlUrlMonitoring\MonitoredUrls\Notifications\Adapters\SendNotification;

readonly class SendNotificationWithSlack implements SendNotification
{
    public function __construct(
        private SlackClient $slackClient,
        private MessageFactory $messageFactory,
    ) {
    }

    public function send(
        MonitoredUrl $url,
        MonitoredUrlIncident $incident,
    ): void {
        $this->slackClient->chat->postMessage(
            $this->messageFactory->createFromIncident($url, $incident),
        );
    }
}

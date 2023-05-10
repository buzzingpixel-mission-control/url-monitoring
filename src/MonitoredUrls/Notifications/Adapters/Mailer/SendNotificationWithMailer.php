<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Notifications\Adapters\Mailer;

use MissionControlBackend\Mailer\QueueMailer;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\MonitoredUrlIncident;
use MissionControlUrlMonitoring\MonitoredUrls\MonitoredUrl;
use MissionControlUrlMonitoring\MonitoredUrls\Notifications\Adapters\SendNotification;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;

readonly class SendNotificationWithMailer implements SendNotification
{
    public function __construct(
        private QueueMailer $queueMailer,
        private EmailFactory $emailFactory,
    ) {
    }

    /** @throws TransportExceptionInterface */
    public function send(
        MonitoredUrl $url,
        MonitoredUrlIncident $incident,
    ): void {
        $this->queueMailer->send(
            $this->emailFactory->createFromIncident(
                $url,
                $incident,
            ),
        );
    }
}

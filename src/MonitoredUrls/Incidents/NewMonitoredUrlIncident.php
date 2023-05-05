<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Incidents;

use MissionControlUrlMonitoring\MonitoredUrls\Incidents\ValueObjects\EventType;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\ValueObjects\LastNotificationAt;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\ValueObjects\Message;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\ValueObjects\MonitoredUrlId;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\ValueObjects\NullValue;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\ValueObjects\StatusCode;

readonly class NewMonitoredUrlIncident
{
    public function __construct(
        public MonitoredUrlId $monitoredUrlId,
        public EventType $eventType,
        public StatusCode $statusCode = new StatusCode(''),
        public Message $message = new Message(''),
        public LastNotificationAt|NullValue $lastNotificationAt = new NullValue(),
    ) {
    }
}

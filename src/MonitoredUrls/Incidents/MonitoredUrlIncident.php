<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Incidents;

use DateTimeImmutable;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\Persistence\MonitoredUrlIncidentRecord;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\ValueObjects\EventAt;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\ValueObjects\EventType;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\ValueObjects\Id;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\ValueObjects\LastNotificationAt;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\ValueObjects\Message;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\ValueObjects\MonitoredUrlId;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\ValueObjects\NullValue;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\ValueObjects\StatusCode;
use Spatie\Cloneable\Cloneable;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

readonly class MonitoredUrlIncident
{
    use Cloneable;

    public static function fromRecord(MonitoredUrlIncidentRecord $record): self
    {
        if ($record->last_notification_at === null) {
            $lastNotificationAt = new NullValue();
        } else {
            $lastNotificationAt = LastNotificationAt::fromNative(
                $record->last_notification_at,
            );
        }

        return new self(
            Id::fromNative($record->id),
            MonitoredUrlId::fromNative(
                $record->monitored_url_id,
            ),
            EventType::from($record->event_type),
            StatusCode::fromNative($record->status_code),
            Message::fromNative($record->message),
            EventAt::fromNative($record->event_at),
            $lastNotificationAt,
        );
    }

    public function __construct(
        public Id $id,
        public MonitoredUrlId $monitoredUrlId,
        public EventType $eventType,
        public StatusCode $statusCode,
        public Message $message,
        public EventAt $eventAt,
        public LastNotificationAt|NullValue $lastNotificationAt,
    ) {
    }

    /** @return array<string, scalar|null> */
    public function asArray(): array
    {
        return [
            'id' => $this->id->toNative(),
            'monitoredUrlId' => $this->monitoredUrlId->toNative(),
            'eventType' => $this->eventType->value,
            'statusCode' => $this->statusCode->toNative(),
            'message' => $this->message->toNative(),
            'eventAt' => $this->eventAt->toNative(),
            'lastNotificationAt' => $this->lastNotificationAt->toNative(),
        ];
    }

    public function withMonitoredUrlId(string $value): self
    {
        return $this->with(monitoredUrlId: MonitoredUrlId::fromNative(
            $value,
        ));
    }

    public function withEventType(EventType $value): self
    {
        return $this->with(eventType: $value);
    }

    public function withStatusCode(string $value): self
    {
        return $this->with(statusCode: $value);
    }

    public function withMessage(string $value): self
    {
        return $this->with(message: $value);
    }

    public function withLastNotificationAt(DateTimeImmutable|null $value): self
    {
        if ($value === null) {
            return $this->with(lastNotificationAt: new NullValue());
        }

        return $this->with(lastNotificationAt: new LastNotificationAt(
            $value,
        ));
    }
}

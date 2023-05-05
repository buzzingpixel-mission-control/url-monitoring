<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Incidents\Persistence;

use MissionControlBackend\Persistence\Record;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\MonitoredUrlIncident;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\NewMonitoredUrlIncident;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

class MonitoredUrlIncidentRecord extends Record
{
    public static function getTableName(): string
    {
        return MonitoredUrlIncidentsTable::TABLE_NAME;
    }

    public function tableName(): string
    {
        return MonitoredUrlIncidentsTable::TABLE_NAME;
    }

    public static function fromNewEntity(NewMonitoredUrlIncident $entity): self
    {
        $record = new self();

        $record->monitored_url_id = $entity->monitoredUrlId->toNative();

        $record->event_type = $entity->eventType->value;

        $record->status_code = $entity->statusCode->toNative();

        $record->message = $entity->message->toNative();

        $record->last_notification_at = $entity->lastNotificationAt->toNative();

        return $record;
    }

    public static function fromEntity(MonitoredUrlIncident $entity): self
    {
        $record = new self();

        $record->id = $entity->id->toNative();

        $record->monitored_url_id = $entity->monitoredUrlId->toNative();

        $record->event_type = $entity->eventType->value;

        $record->status_code = $entity->statusCode->toNative();

        $record->message = $entity->message->toNative();

        $record->event_at = $entity->eventAt->toNative();

        $record->last_notification_at = $entity->lastNotificationAt->toNative();

        return $record;
    }

    /** Primary key */
    public string $id = '';

    public string $monitored_url_id = '';

    public string $event_type = '';

    public string $status_code = '';

    public string $message = '';

    public string $event_at = '';

    public string|null $last_notification_at = null;
}

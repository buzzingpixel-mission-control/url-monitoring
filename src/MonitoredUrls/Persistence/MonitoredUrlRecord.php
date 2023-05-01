<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Persistence;

use MissionControlBackend\Persistence\Record;
use MissionControlUrlMonitoring\MonitoredUrls\MonitoredUrl;
use MissionControlUrlMonitoring\MonitoredUrls\NewMonitoredUrl;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

class MonitoredUrlRecord extends Record
{
    public static function getTableName(): string
    {
        return MonitoredUrlsTable::TABLE_NAME;
    }

    public function tableName(): string
    {
        return MonitoredUrlsTable::TABLE_NAME;
    }

    public static function fromNewEntity(NewMonitoredUrl $entity): self
    {
        $record = new self();

        $record->project_id = $entity->projectId->toNative();

        $record->is_active = $entity->isActive->toNative();

        $record->title = $entity->title->toNative();

        $record->slug = $entity->slug->toNative();

        $record->url = $entity->url->toNative();

        return $record;
    }

    public static function fromEntity(MonitoredUrl $entity): self
    {
        $record = new self();

        $record->id = $entity->id->toNative();

        $record->project_id = $entity->projectId->toNative();

        $record->is_active = $entity->isActive->toNative();

        $record->title = $entity->title->toNative();

        $record->slug = $entity->slug->toNative();

        $record->url = $entity->url->toNative();

        $record->status = $entity->status->value;

        $record->checked_at = $entity->checkedAt->toNative();

        $record->created_at = $entity->createdAt->toNative();

        return $record;
    }

    /** Primary key */
    public string $id = '';

    public string $project_id = '';

    public bool $is_active = true;

    public string $title = '';

    public string $slug = '';

    public string $url = '';

    public string $status = '';

    public string|null $checked_at = null;

    public string $created_at = '';
}

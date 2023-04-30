<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Persistence;

use MissionControlBackend\Persistence\Record;

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

    /** Primary key */
    public string $id = '';

    public string $project_id = '';

    public bool $is_active = true;

    public string $title = '';

    public string $slug = '';

    public string $url = '';

    public string $status = '';

    public string $checked_at = '';

    public string $created_at = '';
}

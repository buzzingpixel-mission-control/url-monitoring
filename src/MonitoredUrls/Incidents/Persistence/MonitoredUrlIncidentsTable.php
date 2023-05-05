<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Incidents\Persistence;

use Phinx\Db\Table;
use Phinx\Migration\MigrationInterface;

class MonitoredUrlIncidentsTable
{
    public const TABLE_NAME = 'monitored_url_incidents';

    public static function createSchema(MigrationInterface $migration): Table
    {
        return $migration->table(
            self::TABLE_NAME,
            [
                'id' => false,
                'primary_key' => ['id'],
            ],
        )->addColumn(
            'id',
            'uuid',
        )->addColumn(
            'monitored_url_id',
            'uuid',
        )->addColumn(
            'event_type',
            'string',
        )->addColumn(
            'status_code',
            'string',
        )->addColumn(
            'message',
            'text',
        )->addColumn(
            'event_at',
            'datetime',
        )->addColumn(
            'last_notification_at',
            'datetime',
            ['null' => true],
        )->addIndex(['monitored_url_id']);
    }
}

<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Persistence;

use Phinx\Db\Table;
use Phinx\Migration\MigrationInterface;

class MonitoredUrlsTable
{
    public const TABLE_NAME = 'monitored_urls';

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
            'project_id',
            'uuid',
            ['null' => true],
        )->addColumn(
            'is_active',
            'boolean',
            ['default' => 1],
        )->addColumn(
            'title',
            'string',
        )->addColumn(
            'slug',
            'string',
        )->addColumn(
            'url',
            'string',
        )->addColumn(
            'status',
            'string',
        )->addColumn(
            'checked_at',
            'datetime',
            ['null' => true],
        )->addColumn(
            'created_at',
            'datetime',
        )
            ->addIndex(['project_id'])
            ->addIndex(['title'])
            ->addIndex(['slug'])
            ->addIndex(['url'])
            ->addIndex(['status'])
            ->addIndex(['checked_at'])
            ->addIndex(['created_at']);
    }
}

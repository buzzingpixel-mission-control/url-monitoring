<?php

declare(strict_types=1);

use MissionControlBackend\Persistence\Migrations\ChangeMigration;
use MissionControlUrlMonitoring\MonitoredUrls\Persistence\MonitoredUrlsTable;

/** @noinspection PhpUnused */
/** @noinspection PhpIllegalPsrClassPathInspection */
// phpcs:disable PSR1.Classes.ClassDeclaration.MissingNamespace, Squiz.Classes.ClassFileName.NoMatch

class CreateMonitoredUrlsTable extends ChangeMigration
{
    public function change(): void
    {
        MonitoredUrlsTable::createSchema($this)->create();
    }
}

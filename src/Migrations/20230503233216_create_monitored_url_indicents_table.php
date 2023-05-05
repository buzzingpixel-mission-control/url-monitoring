<?php

declare(strict_types=1);

use MissionControlBackend\Persistence\Migrations\ChangeMigration;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\Persistence\MonitoredUrlIncidentsTable;

/** @noinspection PhpUnused */
/** @noinspection PhpIllegalPsrClassPathInspection */
// phpcs:disable PSR1.Classes.ClassDeclaration.MissingNamespace, Squiz.Classes.ClassFileName.NoMatch

class CreateMonitoredUrlIndicentsTable extends ChangeMigration
{
    public function change(): void
    {
        MonitoredUrlIncidentsTable::createSchema($this)->create();
    }
}

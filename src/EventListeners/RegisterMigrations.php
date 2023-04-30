<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\EventListeners;

use MissionControlBackend\Persistence\Migrations\AddMigrationPathsEvent;
use MissionControlUrlMonitoring\MonitoredUrlSrc;

class RegisterMigrations
{
    public function onAddMigrationPaths(AddMigrationPathsEvent $event): void
    {
        $event->paths->addPathFromString(
            MonitoredUrlSrc::path() . '/Migrations',
        );
    }
}

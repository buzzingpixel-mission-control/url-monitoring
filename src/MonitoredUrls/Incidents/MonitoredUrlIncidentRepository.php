<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Incidents;

use MissionControlBackend\ActionResult;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\Persistence\CreateMonitoredUrlIncident;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\Persistence\FindMonitoredUrlIncidentParameters;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\Persistence\FindMonitoredUrlIncidents;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\Persistence\MonitoredUrlIncidentRecord;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\Persistence\SaveMonitoredUrlIncident;

readonly class MonitoredUrlIncidentRepository
{
    public function __construct(
        private SaveMonitoredUrlIncident $save,
        private FindMonitoredUrlIncidents $find,
        private CreateMonitoredUrlIncident $create,
    ) {
    }

    public function createMonitoredUrlIncident(
        NewMonitoredUrlIncident $entity,
    ): ActionResult {
        return $this->create->create(
            MonitoredUrlIncidentRecord::fromNewEntity(
                $entity,
            ),
        );
    }

    public function saveMonitoredUrlIncident(
        MonitoredUrlIncident $entity,
    ): ActionResult {
        return $this->save->save(
            MonitoredUrlIncidentRecord::fromEntity(
                $entity,
            ),
        );
    }

    public function findOne(
        FindMonitoredUrlIncidentParameters|null $parameters = null,
    ): MonitoredUrlIncident {
        return MonitoredUrlIncident::fromRecord(
            $this->find->findOne($parameters),
        );
    }

    public function findOneOrNull(
        FindMonitoredUrlIncidentParameters|null $parameters = null,
    ): MonitoredUrlIncident|null {
        $record = $this->find->findOneOrNull($parameters);

        if ($record === null) {
            return null;
        }

        return MonitoredUrlIncident::fromRecord($record);
    }

    public function findAll(
        FindMonitoredUrlIncidentParameters|null $parameters = null,
    ): MonitoredUrlIncidentCollection {
        $records = $this->find->findAll($parameters);

        /** @phpstan-ignore-next-line */
        return new MonitoredUrlIncidentCollection($records->map(
            static fn (
                MonitoredUrlIncidentRecord $record,
            ) => MonitoredUrlIncident::fromRecord($record),
        ));
    }
}

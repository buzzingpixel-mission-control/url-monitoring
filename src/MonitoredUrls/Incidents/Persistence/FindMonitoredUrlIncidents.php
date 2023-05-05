<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Incidents\Persistence;

use MissionControlBackend\Persistence\MissionControlPdo;
use PDO;

readonly class FindMonitoredUrlIncidents
{
    public function __construct(private MissionControlPdo $pdo)
    {
    }

    public function findOne(
        FindMonitoredUrlIncidentParameters|null $parameters = null,
    ): MonitoredUrlIncidentRecord {
        $parameters ??= new FindMonitoredUrlIncidentParameters();

        $parameters = $parameters->with(limit: 1);

        return $this->findAll($parameters)->first();
    }

    public function findOneOrNull(
        FindMonitoredUrlIncidentParameters|null $parameters = null,
    ): MonitoredUrlIncidentRecord|null {
        $parameters ??= new FindMonitoredUrlIncidentParameters();

        $parameters = $parameters->with(limit: 1);

        return $this->findAll($parameters)->firstOrNull();
    }

    public function findAll(
        FindMonitoredUrlIncidentParameters|null $parameters = null,
    ): MonitoredUrlIncidentRecordCollection {
        $parameters ??= new FindMonitoredUrlIncidentParameters();

        $customQuery = $parameters->buildQuery();

        $statement = $this->pdo->prepare($customQuery->query);

        $statement->execute($customQuery->params);

        $results = $statement->fetchAll(
            PDO::FETCH_CLASS,
            MonitoredUrlIncidentRecord::class,
        );

        return new MonitoredUrlIncidentRecordCollection(
            $results !== false ? $results : [],
        );
    }
}

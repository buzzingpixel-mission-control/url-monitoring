<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Persistence;

use MissionControlBackend\Persistence\MissionControlPdo;
use PDO;

readonly class FindMonitoredUrls
{
    public function __construct(private MissionControlPdo $pdo)
    {
    }

    public function findOne(
        FindMonitoredUrlParameters|null $parameters = null,
    ): MonitoredUrlRecord {
        $parameters ??= new FindMonitoredUrlParameters();

        $parameters = $parameters->with(limit: 1);

        return $this->findAll($parameters)->first();
    }

    public function findOneOrNull(
        FindMonitoredUrlParameters|null $parameters = null,
    ): MonitoredUrlRecord|null {
        $parameters ??= new FindMonitoredUrlParameters();

        $parameters = $parameters->with(limit: 1);

        return $this->findAll($parameters)->firstOrNull();
    }

    public function findAll(
        FindMonitoredUrlParameters|null $parameters = null,
    ): MonitoredUrlRecordCollection {
        $parameters ??= new FindMonitoredUrlParameters();

        $customQuery = $parameters->buildQuery();

        $statement = $this->pdo->prepare($customQuery->query);

        $statement->execute($customQuery->params);

        $results = $statement->fetchAll(
            PDO::FETCH_CLASS,
            MonitoredUrlRecord::class,
        );

        return new MonitoredUrlRecordCollection(
            $results !== false ? $results : [],
        );
    }
}

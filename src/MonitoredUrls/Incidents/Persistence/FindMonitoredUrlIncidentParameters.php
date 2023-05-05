<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Incidents\Persistence;

use MissionControlBackend\Persistence\CustomQueryParams;
use MissionControlBackend\Persistence\FetchParameters;
use MissionControlBackend\Persistence\Sort;
use MissionControlBackend\Persistence\StringCollection;

use function array_merge;
use function implode;

readonly class FindMonitoredUrlIncidentParameters extends FetchParameters
{
    public function __construct(
        public StringCollection|null $monitoredUrlIds = null,
        public StringCollection|null $notMonitoredUrlIds = null,
        public StringCollection|null $eventTypes = null,
        public StringCollection|null $notEventTypes = null,
        public StringCollection|null $statusCodes = null,
        public StringCollection|null $notStatusCodes = null,
        StringCollection|null $ids = null,
        StringCollection|null $notIds = null,
        int|null $limit = null,
        int|null $offset = null,
        string|null $orderBy = null,
        Sort|null $sort = null,
    ) {
        parent::__construct(
            $ids,
            $notIds,
            $limit,
            $offset,
            $orderBy,
            $sort,
        );
    }

    public static function getTableName(): string
    {
        return MonitoredUrlIncidentsTable::TABLE_NAME;
    }

    public function tableName(): string
    {
        return MonitoredUrlIncidentsTable::TABLE_NAME;
    }

    public function withMonitoredUrlId(string $value): static
    {
        $values = $this->monitoredUrlIds ?? new StringCollection();

        return $this->with(
            monitoredUrlIds: $values->withString($value),
        );
    }

    public function withNotMonitoredUrlId(string $value): static
    {
        $values = $this->notMonitoredUrlIds ?? new StringCollection();

        return $this->with(
            notMonitoredUrlIds: $values->withString($value),
        );
    }

    public function withEventType(string $value): static
    {
        $values = $this->eventTypes ?? new StringCollection();

        return $this->with(
            eventTypes: $values->withString($value),
        );
    }

    public function withNotEventType(string $value): static
    {
        $values = $this->notEventTypes ?? new StringCollection();

        return $this->with(
            notEventTypes: $values->withString($value),
        );
    }

    public function withStatusCode(string $value): static
    {
        $values = $this->statusCodes ?? new StringCollection();

        return $this->with(
            statusCodes: $values->withString($value),
        );
    }

    public function withNotStatusCode(string $value): static
    {
        $values = $this->notStatusCodes ?? new StringCollection();

        return $this->with(
            notStatusCodes: $values->withString($value),
        );
    }

    public function buildQuery(
        callable|null $buildCustomQuerySection = null,
    ): CustomQueryParams {
        $internalCustomQuery = $this->buildInternalCustomQuery();

        if ($buildCustomQuerySection === null) {
            $buildCustomQuerySection = $internalCustomQuery;
        } else {
            $build = $buildCustomQuerySection();

            $buildCustomQuerySection = new CustomQueryParams(
                $build->query . ' ' . $internalCustomQuery->query,
                array_merge(
                    $build->params,
                    $internalCustomQuery->params,
                ),
            );
        }

        return parent::buildQuery(
            static fn () => $buildCustomQuerySection,
        );
    }

    private function buildInternalCustomQuery(): CustomQueryParams
    {
        $params = [];

        $query = [];

        if (
            $this->monitoredUrlIds !== null &&
            $this->monitoredUrlIds->count() > 0
        ) {
            $in = [];

            $i = 1;

            $this->monitoredUrlIds->map(
                static function (string $value) use (
                    &$i,
                    &$in,
                    &$params,
                ): void {
                    $key = 'monitored_url_id_' . $i;

                    $in[] = ':' . $key;

                    $params[$key] = $value;

                    $i++;
                },
            );

            $query[] = 'AND monitored_url_id IN (' .
                implode(',', $in) .
                ')';
        }

        if (
            $this->notMonitoredUrlIds !== null &&
            $this->notMonitoredUrlIds->count() > 0
        ) {
            $in = [];

            $i = 1;

            $this->notMonitoredUrlIds->map(
                static function (string $value) use (
                    &$i,
                    &$in,
                    &$params,
                ): void {
                    $key = 'not_monitored_url_id_' . $i;

                    $in[] = ':' . $key;

                    $params[$key] = $value;

                    $i++;
                },
            );

            $query[] = 'AND monitored_url_id NOT IN (' .
                implode(',', $in) .
                ')';
        }

        if (
            $this->eventTypes !== null &&
            $this->eventTypes->count() > 0
        ) {
            $in = [];

            $i = 1;

            $this->eventTypes->map(
                static function (string $value) use (
                    &$i,
                    &$in,
                    &$params,
                ): void {
                    $key = 'event_type_' . $i;

                    $in[] = ':' . $key;

                    $params[$key] = $value;

                    $i++;
                },
            );

            $query[] = 'AND event_type IN (' .
                implode(',', $in) .
                ')';
        }

        if (
            $this->notEventTypes !== null &&
            $this->notEventTypes->count() > 0
        ) {
            $in = [];

            $i = 1;

            $this->notEventTypes->map(
                static function (string $value) use (
                    &$i,
                    &$in,
                    &$params,
                ): void {
                    $key = 'not_event_type_' . $i;

                    $in[] = ':' . $key;

                    $params[$key] = $value;

                    $i++;
                },
            );

            $query[] = 'AND event_type NOT IN (' .
                implode(',', $in) .
                ')';
        }

        if (
            $this->statusCodes !== null &&
            $this->statusCodes->count() > 0
        ) {
            $in = [];

            $i = 1;

            $this->statusCodes->map(
                static function (string $value) use (
                    &$i,
                    &$in,
                    &$params,
                ): void {
                    $key = 'status_code_' . $i;

                    $in[] = ':' . $key;

                    $params[$key] = $value;

                    $i++;
                },
            );

            $query[] = 'AND status_code IN (' .
                implode(',', $in) .
                ')';
        }

        if (
            $this->notStatusCodes !== null &&
            $this->notStatusCodes->count() > 0
        ) {
            $in = [];

            $i = 1;

            $this->notStatusCodes->map(
                static function (string $value) use (
                    &$i,
                    &$in,
                    &$params,
                ): void {
                    $key = 'not_status_code_' . $i;

                    $in[] = ':' . $key;

                    $params[$key] = $value;

                    $i++;
                },
            );

            $query[] = 'AND status_code NOT IN (' .
                implode(',', $in) .
                ')';
        }

        return new CustomQueryParams(
            implode(' ', $query),
            $params,
        );
    }
}

<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Incidents;

use RuntimeException;

use function array_map;
use function array_values;

class MonitoredUrlIncidentCollection
{
    /** @var MonitoredUrlIncident[] */
    public array $monitoredUrlIncidents;

    /** @param MonitoredUrlIncident[] $monitoredUrls */
    public function __construct(array $monitoredUrls = [])
    {
        $this->monitoredUrlIncidents = array_values(array_map(
            static fn (MonitoredUrlIncident $m) => $m,
            $monitoredUrls,
        ));
    }

    public function first(): MonitoredUrlIncident
    {
        $incident = $this->firstOrNull();

        if ($incident === null) {
            throw new RuntimeException('No url found');
        }

        return $incident;
    }

    public function firstOrNull(): MonitoredUrlIncident|null
    {
        return $this->monitoredUrlIncidents[0] ?? null;
    }

    /** @return mixed[] */
    public function map(callable $callback): array
    {
        return array_values(array_map(
            $callback,
            $this->monitoredUrlIncidents,
        ));
    }

    /** @return array<array-key, array<string, scalar|null>> */
    public function asArray(): array
    {
        /** @phpstan-ignore-next-line */
        return $this->map(
            static fn (MonitoredUrlIncident $m) => $m->asArray(),
        );
    }
}

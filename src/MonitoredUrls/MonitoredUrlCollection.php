<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls;

use RuntimeException;

use function array_map;
use function array_values;

readonly class MonitoredUrlCollection
{
    /** @var MonitoredUrl[] */
    public array $monitoredUrls;

    /** @param MonitoredUrl[] $monitoredUrls */
    public function __construct(array $monitoredUrls = [])
    {
        $this->monitoredUrls = array_values(array_map(
            static fn (MonitoredUrl $m) => $m,
            $monitoredUrls,
        ));
    }

    public function first(): MonitoredUrl
    {
        $url = $this->firstOrNull();

        if ($url === null) {
            throw new RuntimeException('No url found');
        }

        return $url;
    }

    public function firstOrNull(): MonitoredUrl|null
    {
        return $this->monitoredUrls[0] ?? null;
    }

    /** @return mixed[] */
    public function map(callable $callback): array
    {
        return array_values(array_map(
            $callback,
            $this->monitoredUrls,
        ));
    }

    /** @return array<array-key, array<string, scalar|null>> */
    public function asArray(): array
    {
        /** @phpstan-ignore-next-line */
        return $this->map(
            static fn (MonitoredUrl $m) => $m->asArray(),
        );
    }
}

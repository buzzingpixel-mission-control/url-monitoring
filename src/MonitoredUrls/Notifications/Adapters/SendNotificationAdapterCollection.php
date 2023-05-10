<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Notifications\Adapters;

use MissionControlUrlMonitoring\MonitoredUrls\Incidents\MonitoredUrlIncident;
use Spatie\Cloneable\Cloneable;

use function array_map;
use function array_merge;
use function array_values;

readonly class SendNotificationAdapterCollection implements SendNotification
{
    use Cloneable;

    /** @var SendNotification[] */
    public array $adapters;

    /** @param SendNotification[] $adapters */
    public function __construct(array $adapters = [])
    {
        $this->adapters = array_values(array_map(
            static fn (SendNotification $s) => $s,
            $adapters,
        ));
    }

    public function withAdapter(SendNotification $adapter): static
    {
        return $this->with(adapters: array_merge(
            $this->adapters,
            [$adapter],
        ));
    }

    public function send(MonitoredUrlIncident $incident): void
    {
        array_map(
            static fn (SendNotification $s) => $s->send(
                $incident,
            ),
            $this->adapters,
        );
    }
}

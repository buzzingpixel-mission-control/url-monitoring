<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Incidents\ValueObjects;

use Funeralzone\ValueObjects\ValueObject;
use MissionControlBackend\Persistence\ValueObjects\DbDateTime;

class EventAt implements ValueObject
{
    use DbDateTime;
}

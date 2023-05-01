<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\ValueObjects;

use Funeralzone\ValueObjects\ValueObject;
use MissionControlBackend\Persistence\ValueObjects\DbDateTime;

class CheckedAt implements ValueObject
{
    use DbDateTime;
}

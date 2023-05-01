<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\ValueObjects;

use Funeralzone\ValueObjectExtensions\ComplexScalars\UUIDTrait;
use Funeralzone\ValueObjects\ValueObject;

class ProjectId implements ValueObject
{
    use UUIDTrait;
}

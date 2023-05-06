<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\CheckUrls\ValueObjects;

enum Status: string
{
    case UP   = 'up';
    case DOWN = 'down';
}

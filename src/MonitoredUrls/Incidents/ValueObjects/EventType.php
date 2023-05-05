<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Incidents\ValueObjects;

enum EventType: string
{
    case UP           = 'up';
    case PENDING_DOWN = 'pendingDown';
    case DOWN         = 'down';
}

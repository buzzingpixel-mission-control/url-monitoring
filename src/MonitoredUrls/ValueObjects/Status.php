<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\ValueObjects;

enum Status: string
{
    case UNKNOWN      = '';
    case UP           = 'up';
    case PENDING_DOWN = 'pendingDown';
    case DOWN         = 'down';
}

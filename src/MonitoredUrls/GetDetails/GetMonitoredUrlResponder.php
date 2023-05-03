<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\GetDetails;

use Psr\Http\Message\ResponseInterface;

interface GetMonitoredUrlResponder
{
    public function respond(): ResponseInterface;
}

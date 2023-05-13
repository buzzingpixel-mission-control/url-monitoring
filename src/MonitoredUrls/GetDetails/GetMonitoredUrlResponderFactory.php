<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\GetDetails;

use MissionControlUrlMonitoring\MonitoredUrls\Incidents\MonitoredUrlIncidentCollection;
use MissionControlUrlMonitoring\MonitoredUrls\MonitoredUrl;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class GetMonitoredUrlResponderFactory
{
    public function createResponder(
        ServerRequestInterface $request,
        ResponseInterface $response,
        MonitoredUrl|null $monitoredUrl,
        MonitoredUrlIncidentCollection $incidents,
    ): GetMonitoredUrlResponder {
        if ($monitoredUrl === null) {
            return new GetMonitoredUrlResponderNotFound(
                $request,
            );
        }

        return new GetMonitoredUrlResponderFound(
            $monitoredUrl,
            $response,
            $incidents,
        );
    }
}

<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\GetDetails;

use MissionControlUrlMonitoring\MonitoredUrls\Incidents\MonitoredUrlIncidentCollection;
use MissionControlUrlMonitoring\MonitoredUrls\MonitoredUrl;
use Psr\Http\Message\ResponseInterface;

use function array_merge;
use function json_encode;

use const JSON_PRETTY_PRINT;

readonly class GetMonitoredUrlResponderFound implements GetMonitoredUrlResponder
{
    public function __construct(
        private MonitoredUrl $monitoredUrl,
        private ResponseInterface $response,
        private MonitoredUrlIncidentCollection $incidents,
    ) {
    }

    public function respond(): ResponseInterface
    {
        $response = $this->response->withHeader(
            'Content-type',
            'application/json',
        );

        $response->getBody()->write((string) json_encode(
            array_merge(
                $this->monitoredUrl->asArray(),
                [
                    'incidents' => $this->incidents->asArray(),
                ],
            ),
            JSON_PRETTY_PRINT,
        ));

        return $response;
    }
}

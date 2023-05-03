<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\GetDetails;

use MissionControlUrlMonitoring\MonitoredUrls\MonitoredUrl;
use Psr\Http\Message\ResponseInterface;

use function json_encode;

use const JSON_PRETTY_PRINT;

readonly class GetMonitoredUrlResponderFound implements GetMonitoredUrlResponder
{
    public function __construct(
        private MonitoredUrl $monitoredUrl,
        private ResponseInterface $response,
    ) {
    }

    public function respond(): ResponseInterface
    {
        $response = $this->response->withHeader(
            'Content-type',
            'application/json',
        );

        $response->getBody()->write((string) json_encode(
            $this->monitoredUrl->asArray(),
            JSON_PRETTY_PRINT,
        ));

        return $response;
    }
}

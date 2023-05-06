<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\CheckUrls\CheckPipeline;

use GuzzleHttp\Client;
use GuzzleHttp\RequestOptions;
use League\Pipeline\StageInterface;
use MissionControlBackend\Persistence\DateFormats;
use MissionControlUrlMonitoring\MonitoredUrls\CheckUrls\ValueObjects\CheckedAt;
use MissionControlUrlMonitoring\MonitoredUrls\CheckUrls\ValueObjects\Message;
use MissionControlUrlMonitoring\MonitoredUrls\CheckUrls\ValueObjects\Status;
use MissionControlUrlMonitoring\MonitoredUrls\CheckUrls\ValueObjects\StatusCode;
use MissionControlUrlMonitoring\MonitoredUrls\CheckUrls\ValueObjects\Url;
use Psr\Clock\ClockInterface;
use Throwable;

use function assert;
use function implode;

// phpcs:disable SlevomatCodingStandard.TypeHints.ParameterTypeHint.MissingAnyTypeHint

readonly class CheckUrl implements StageInterface
{
    public function __construct(
        private Client $guzzle,
        private ClockInterface $clock,
    ) {
    }

    public function __invoke($payload): CheckUrlResults
    {
        assert($payload instanceof PipelinePayload);

        return $this->runCheck($payload);
    }

    public function runCheck(PipelinePayload $pipelinePayload): CheckUrlResults
    {
        $url = $pipelinePayload->monitoredUrl->url->toNative();

        $urlObject = Url::fromNative($url);

        $checkAt = CheckedAt::fromNative($this->clock->now()->format(
            DateFormats::POSTGRES_ISO8601,
        ));

        try {
            $response = $this->guzzle->get($url, [
                RequestOptions::ALLOW_REDIRECTS => true,
                RequestOptions::COOKIES => false,
                RequestOptions::HTTP_ERRORS => false,
                RequestOptions::TIMEOUT => 8,
            ]);

            $status = $response->getStatusCode();

            $statusString = (string) $status;

            return new CheckUrlResults(
                $urlObject,
                $status === 200 ? Status::UP : Status::DOWN,
                StatusCode::fromNative($statusString),
                Message::fromNative(
                    implode(' ', [
                        'The URL',
                        $url,
                        'returned a status code of',
                        $statusString,
                    ]),
                ),
                $checkAt,
                $pipelinePayload,
            );
        } catch (Throwable $e) {
            return new CheckUrlResults(
                $urlObject,
                Status::DOWN,
                StatusCode::fromNative(
                    (string) $e->getCode(),
                ),
                Message::fromNative(
                    'A Guzzle Exception Occurred: ' . $e->getMessage(),
                ),
                $checkAt,
                $pipelinePayload,
            );
        }
    }
}

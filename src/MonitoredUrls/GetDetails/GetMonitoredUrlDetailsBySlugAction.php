<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\GetDetails;

use MissionControlBackend\Http\ApplyRoutesEvent;
use MissionControlBackend\Persistence\Sort;
use MissionControlIdp\Authorize\ResourceServerMiddlewareWrapper;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\MonitoredUrlIncidentRepository;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\Persistence\FindMonitoredUrlIncidentParameters;
use MissionControlUrlMonitoring\MonitoredUrls\MonitoredUrlRepository;
use MissionControlUrlMonitoring\MonitoredUrls\Persistence\FindMonitoredUrlParameters;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function assert;
use function is_string;

readonly class GetMonitoredUrlDetailsBySlugAction
{
    public static function registerRoute(ApplyRoutesEvent $event): void
    {
        $event->any('/monitored-urls/{slug}', self::class)
            ->add(ResourceServerMiddlewareWrapper::class);
    }

    public function __construct(
        private MonitoredUrlRepository $urlRepository,
        private GetMonitoredUrlResponderFactory $responderFactory,
        private MonitoredUrlIncidentRepository $incidentRepository,
    ) {
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
    ): ResponseInterface {
        $slug = $request->getAttribute('slug');

        assert(is_string($slug));

        $monitoredUrl = $this->urlRepository->findOneOrNull(
            FindMonitoredUrlParameters::create()->withSlug(
                $slug,
            ),
        );

        $incidents = $this->incidentRepository->findAll(
            (new FindMonitoredUrlIncidentParameters())
                ->withMonitoredUrlIdOrPlaceholder(
                    $monitoredUrl?->id->toNative(),
                )
                ->withLimit(100)
                ->withOrderBy('event_at')
                ->withSort(Sort::DESC),
        );

        return $this->responderFactory->createResponder(
            $request,
            $response,
            $monitoredUrl,
            $incidents,
        )->respond();
    }
}

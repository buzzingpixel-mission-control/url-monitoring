<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls;

use MissionControlBackend\Http\ApplyRoutesEvent;
use MissionControlBackend\Persistence\Sort;
use MissionControlBackend\Projects\Persistence\FindProjectParameters;
use MissionControlBackend\Projects\ProjectRepository;
use MissionControlIdp\Authorize\ResourceServerMiddlewareWrapper;
use MissionControlUrlMonitoring\MonitoredUrls\Persistence\FindMonitoredUrlParameters;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpNotFoundException;

use function assert;
use function is_string;
use function json_encode;

use const JSON_PRETTY_PRINT;

readonly class GetMonitoredUrlsListForProjectAction
{
    public static function registerRoute(ApplyRoutesEvent $event): void
    {
        $event->any(
            '/monitored-urls/list/project/{projectId}',
            self::class,
        )->add(ResourceServerMiddlewareWrapper::class);
    }

    public function __construct(
        private ProjectRepository $projectRepository,
        private MonitoredUrlRepository $monitoredUrlRepository,
    ) {
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
    ): ResponseInterface {
        $projectId = $request->getAttribute('projectId');

        assert(is_string($projectId));

        // Validate that it's a valid project ID
        $project = $this->projectRepository->findOneOrNull(
            (new FindProjectParameters())
                ->withId($projectId),
        );

        if ($project === null) {
            throw new HttpNotFoundException($request);
        }

        $items = $this->monitoredUrlRepository->findAll(
            (new FindMonitoredUrlParameters())
                ->withProjectId($projectId)
                ->withOrderBy('title')
                ->withSort(Sort::ASC),
        );

        $response = $response->withHeader(
            'Content-type',
            'application/json',
        );

        $response->getBody()->write((string) json_encode(
            $items->asArray(),
            JSON_PRETTY_PRINT,
        ));

        return $response;
    }
}

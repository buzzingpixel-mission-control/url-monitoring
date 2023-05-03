<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\AddEdit;

use MissionControlBackend\ActionResultResponseFactory;
use MissionControlBackend\Http\ApplyRoutesEvent;
use MissionControlBackend\Http\JsonResponse\JsonResponder;
use MissionControlIdp\Authorize\ResourceServerMiddlewareWrapper;
use MissionControlUrlMonitoring\MonitoredUrls\MonitoredUrlRepository;
use MissionControlUrlMonitoring\MonitoredUrls\ValueObjects\IsActive;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function assert;
use function is_string;

readonly class PatchArchiveMonitoredUrlAction
{
    public static function registerRoute(ApplyRoutesEvent $event): void
    {
        $event->patch('/monitored-urls/archive/{id}', self::class)
            ->add(ResourceServerMiddlewareWrapper::class);
    }

    public function __construct(
        private JsonResponder $jsonResponder,
        private MonitoredUrlRepository $repository,
        private ActionResultResponseFactory $responseFactory,
    ) {
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
    ): ResponseInterface {
        $id = $request->getAttribute('id');

        assert(is_string($id));

        $url = $this->repository->findOneById($id);

        return $this->jsonResponder->respond(
            $this->responseFactory->createResponse(
                $this->repository->saveMonitoredUrl(
                    $url->with(isActive: IsActive::fromNative(
                        false,
                    )),
                ),
            ),
        );
    }
}

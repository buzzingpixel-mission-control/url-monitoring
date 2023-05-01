<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\AddEdit;

use MissionControlBackend\ActionResultResponseFactory;
use MissionControlBackend\Http\ApplyRoutesEvent;
use MissionControlBackend\Http\JsonResponse\JsonResponder;
use MissionControlIdp\Authorize\ResourceServerMiddlewareWrapper;
use MissionControlUrlMonitoring\MonitoredUrls\MonitoredUrlRepository;
use MissionControlUrlMonitoring\MonitoredUrls\NewMonitoredUrl;
use MissionControlUrlMonitoring\MonitoredUrls\ValueObjects\NullValue;
use MissionControlUrlMonitoring\MonitoredUrls\ValueObjects\ProjectId;
use MissionControlUrlMonitoring\MonitoredUrls\ValueObjects\Title;
use MissionControlUrlMonitoring\MonitoredUrls\ValueObjects\Url;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function is_array;

readonly class PostAddMonitoredUrlAction
{
    public static function registerRoute(ApplyRoutesEvent $event): void
    {
        $event->post('/monitored-urls/add', self::class)
            ->add(ResourceServerMiddlewareWrapper::class);
    }

    public function __construct(
        private JsonResponder $jsonResponder,
        private MonitoredUrlRepository $repository,
        private ActionResultResponseFactory $responseFactory,
    ) {
    }

    public function __invoke(ServerRequestInterface $request): ResponseInterface
    {
        $rawPostData = $request->getParsedBody();

        $postData = PostedDataAdd::fromRawPostData(
            is_array($rawPostData) ? $rawPostData : [],
        );

        if ($postData->projectId->toNative() === '') {
            $projectId = new NullValue();
        } else {
            $projectId = ProjectId::fromNative(
                $postData->projectId->toNative(),
            );
        }

        return $this->jsonResponder->respond(
            $this->responseFactory->createResponse(
                $this->repository->createMonitoredUrl(
                    new NewMonitoredUrl(
                        Title::fromNative(
                            $postData->title->toNative(),
                        ),
                        Url::fromNative(
                            $postData->url->toNative(),
                        ),
                        $projectId,
                    ),
                ),
            ),
        );
    }
}

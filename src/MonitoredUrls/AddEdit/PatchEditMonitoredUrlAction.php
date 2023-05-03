<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\AddEdit;

use MissionControlBackend\ActionResultResponseFactory;
use MissionControlBackend\Http\ApplyRoutesEvent;
use MissionControlBackend\Http\JsonResponse\JsonResponder;
use MissionControlIdp\Authorize\ResourceServerMiddlewareWrapper;
use MissionControlUrlMonitoring\MonitoredUrls\MonitoredUrlRepository;
use MissionControlUrlMonitoring\MonitoredUrls\ValueObjects\NullValue;
use MissionControlUrlMonitoring\MonitoredUrls\ValueObjects\ProjectId;
use MissionControlUrlMonitoring\MonitoredUrls\ValueObjects\Title;
use MissionControlUrlMonitoring\MonitoredUrls\ValueObjects\Url;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function assert;
use function is_array;
use function is_string;

readonly class PatchEditProjectAction
{
    public static function registerRoute(ApplyRoutesEvent $event): void
    {
        $event->patch('/monitored-urls/edit/{id}', self::class)
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
                $this->repository->saveMonitoredUrl(
                    $url->with(title: Title::fromNative(
                        $postData->title->toNative(),
                    ))->with(url: Url::fromNative(
                        $postData->url->toNative(),
                    ))->with(projectId: $projectId),
                ),
            ),
        );
    }
}

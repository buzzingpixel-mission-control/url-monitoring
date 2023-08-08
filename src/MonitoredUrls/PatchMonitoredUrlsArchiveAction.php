<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls;

use MissionControlBackend\ActionResult;
use MissionControlBackend\ActionResultResponseFactory;
use MissionControlBackend\Http\ApplyRoutesEvent;
use MissionControlBackend\Http\JsonResponse\JsonResponder;
use MissionControlIdp\Authorize\ResourceServerMiddlewareWrapper;
use MissionControlUrlMonitoring\MonitoredUrls\Persistence\FindMonitoredUrlParameters;
use MissionControlUrlMonitoring\MonitoredUrls\ValueObjects\IsActive;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

use function array_merge;
use function json_decode;

readonly class PatchMonitoredUrlsArchiveAction
{
    public static function registerRoute(ApplyRoutesEvent $event): void
    {
        $event->patch('/monitored-urls/archive', self::class)
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
        /**
         * @var string[] $urlIds
         * @phpstan-ignore-next-line
         */
        $urlIds = json_decode(
            (string) $request->getBody(),
            true,
        )['urlIds'] ?? [];

        $urls = $this->repository->findAll(
            FindMonitoredUrlParameters::create()
                ->withIds($urlIds),
        );

        /** @var ActionResult[] $results */
        $results = $urls->map(function (MonitoredUrl $url) {
            return $this->repository->saveMonitoredUrl(
                $url->with(isActive: IsActive::fromNative(
                    false,
                )),
            );
        });

        $result = new ActionResult();

        foreach ($results as $intermediateResult) {
            if ($intermediateResult->success) {
                continue;
            }

            $result = new ActionResult(
                false,
                array_merge(
                    $result->message,
                    $intermediateResult->message,
                ),
            );
        }

        return $this->jsonResponder->respond(
            $this->responseFactory->createResponse(
                $result,
            ),
        );
    }
}

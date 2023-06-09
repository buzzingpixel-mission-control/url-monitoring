<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\CheckUrls;

use BuzzingPixel\Queue\QueueHandler;
use BuzzingPixel\Queue\QueueItem;
use BuzzingPixel\Queue\QueueItemJob;
use BuzzingPixel\Queue\QueueItemJobCollection;
use MissionControlUrlMonitoring\MonitoredUrls\Config\MonitoredUrlConfig;
use MissionControlUrlMonitoring\MonitoredUrls\MonitoredUrl;
use MissionControlUrlMonitoring\MonitoredUrls\MonitoredUrlRepository;
use MissionControlUrlMonitoring\MonitoredUrls\Persistence\FindMonitoredUrlParameters;

readonly class AddUrlsToQueueFromRepository implements AddUrlsToQueue
{
    public function __construct(
        private MonitoredUrlConfig $config,
        private QueueHandler $queueHandler,
        private MonitoredUrlRepository $repository,
    ) {
    }

    public function add(): void
    {
        $monitoredUrls = $this->repository->findAll(
            (new FindMonitoredUrlParameters())
                ->withIsActive(true),
        );

        $monitoredUrls->map(function (MonitoredUrl $url): void {
            $this->queueHandler->enqueue(
                new QueueItem(
                    'check_monitored_urls_' . $url->id->toNative(),
                    'Check Monitored URL: ' . $url->title->toNative(),
                    new QueueItemJobCollection([
                        new QueueItemJob(
                            CheckUrlJob::class,
                            context: ['urlId' => $url->id->toNative()],
                        ),
                    ]),
                ),
                $this->config->queueName,
            );
        });
    }
}

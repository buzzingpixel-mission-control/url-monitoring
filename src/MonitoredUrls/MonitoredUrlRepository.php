<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls;

use Cocur\Slugify\Slugify;
use MissionControlBackend\ActionResult;
use MissionControlUrlMonitoring\MonitoredUrls\Persistence\CreateMonitoredUrl;
use MissionControlUrlMonitoring\MonitoredUrls\Persistence\FindMonitoredUrlParameters;
use MissionControlUrlMonitoring\MonitoredUrls\Persistence\FindMonitoredUrls;
use MissionControlUrlMonitoring\MonitoredUrls\Persistence\MonitoredUrlRecord;
use MissionControlUrlMonitoring\MonitoredUrls\Persistence\SaveMonitoredUrl;
use MissionControlUrlMonitoring\MonitoredUrls\ValueObjects\Slug;

readonly class MonitoredUrlRepository
{
    public function __construct(
        private Slugify $slugify,
        private SaveMonitoredUrl $saveMonitoredUrl,
        private FindMonitoredUrls $findMonitoredUrls,
        private CreateMonitoredUrl $createMonitoredUrl,
    ) {
    }

    public function createMonitoredUrl(NewMonitoredUrl $entity): ActionResult
    {
        return $this->createMonitoredUrl->create(
            MonitoredUrlRecord::fromNewEntity(
                $entity->with(slug: Slug::fromNative(
                    $this->slugify->slugify(
                        $entity->title->toNative(),
                    ),
                )),
            ),
        );
    }

    public function saveMonitoredUrl(MonitoredUrl $entity): ActionResult
    {
        return $this->saveMonitoredUrl->save(
            MonitoredUrlRecord::fromEntity(
                $entity->with(slug: Slug::fromNative(
                    $this->slugify->slugify(
                        $entity->title->toNative(),
                    ),
                )),
            ),
        );
    }

    public function findAll(
        FindMonitoredUrlParameters|null $parameters = null,
    ): MonitoredUrlCollection {
        $records = $this->findMonitoredUrls->findAll($parameters);

        /** @phpstan-ignore-next-line */
        return new MonitoredUrlCollection($records->map(
            static fn (
                MonitoredUrlRecord $record,
            ) => MonitoredUrl::fromRecord($record),
        ));
    }
}

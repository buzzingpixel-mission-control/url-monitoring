<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Persistence;

use MissionControlBackend\Persistence\CustomQueryParams;
use MissionControlBackend\Persistence\FetchParameters;
use MissionControlBackend\Persistence\Sort;
use MissionControlBackend\Persistence\StringCollection;

use function array_merge;
use function implode;

readonly class FindMonitoredUrlParameters extends FetchParameters
{
    public static function create(): self
    {
        return new self();
    }

    public function __construct(
        public StringCollection|null $projectIds = null,
        public StringCollection|null $notProjectIds = null,
        public bool|null $isActive = null,
        public StringCollection|null $titles = null,
        public StringCollection|null $notTitles = null,
        public StringCollection|null $slugs = null,
        public StringCollection|null $notSlugs = null,
        public StringCollection|null $urls = null,
        public StringCollection|null $notUrls = null,
        public StringCollection|null $statuses = null,
        public StringCollection|null $notStatuses = null,
        StringCollection|null $ids = null,
        StringCollection|null $notIds = null,
        int|null $limit = null,
        int|null $offset = null,
        string|null $orderBy = null,
        Sort|null $sort = null,
    ) {
        parent::__construct(
            $ids,
            $notIds,
            $limit,
            $offset,
            $orderBy,
            $sort,
        );
    }

    public static function getTableName(): string
    {
        return MonitoredUrlsTable::TABLE_NAME;
    }

    public function tableName(): string
    {
        return MonitoredUrlsTable::TABLE_NAME;
    }

    public function withProjectId(string $projectId): static
    {
        $projectIds = $this->projectIds ?? new StringCollection();

        return $this->with(
            projectIds: $projectIds->withString($projectId),
        );
    }

    public function withNotProjectId(string $notProjectId): static
    {
        $notProjectIds = $this->notProjectIds ?? new StringCollection();

        return $this->with(
            projectIds: $notProjectIds->withString($notProjectId),
        );
    }

    public function withIsActive(bool|null $isActive): static
    {
        return $this->with(isActive: $isActive);
    }

    public function withTitle(string $title): static
    {
        $titles = $this->titles ?? new StringCollection();

        return $this->with(titles: $titles->withString($title));
    }

    public function withNotTitle(string $notTitle): static
    {
        $notTitles = $this->notTitles ?? new StringCollection();

        return $this->with(notTitles: $notTitles->withString($notTitle));
    }

    public function withSlug(string $slug): static
    {
        $slugs = $this->slugs ?? new StringCollection();

        return $this->with(slugs: $slugs->withString($slug));
    }

    public function withNotSlug(string $notSlug): static
    {
        $notSlugs = $this->notSlugs ?? new StringCollection();

        return $this->with(notSlugs: $notSlugs->withString($notSlug));
    }

    public function withUrl(string $url): static
    {
        $urls = $this->urls ?? new StringCollection();

        return $this->with(urls: $urls->withString($url));
    }

    public function withNotUrl(string $notUrl): static
    {
        $notUrls = $this->notUrls ?? new StringCollection();

        return $this->with(notUrls: $notUrls->withString($notUrl));
    }

    public function withStatus(string $status): static
    {
        $statuses = $this->statuses ?? new StringCollection();

        return $this->with(statuses: $statuses->withString($status));
    }

    public function withNotStatus(string $notStatus): static
    {
        $notStatuses = $this->notStatuses ?? new StringCollection();

        return $this->with(
            notStatuses: $notStatuses->withString($notStatus),
        );
    }

    public function buildQuery(
        callable|null $buildCustomQuerySection = null,
    ): CustomQueryParams {
        $internalCustomQuery = $this->buildInternalCustomQuery();

        if ($buildCustomQuerySection === null) {
            $buildCustomQuerySection = $internalCustomQuery;
        } else {
            $build = $buildCustomQuerySection();

            $buildCustomQuerySection = new CustomQueryParams(
                $build->query . ' ' . $internalCustomQuery->query,
                array_merge(
                    $build->params,
                    $internalCustomQuery->params,
                ),
            );
        }

        return parent::buildQuery(
            static fn () => $buildCustomQuerySection,
        );
    }

    private function buildInternalCustomQuery(): CustomQueryParams
    {
        $params = [];

        $query = [];

        if (
            $this->projectIds !== null &&
            $this->projectIds->count() > 0
        ) {
            $in = [];

            $i = 1;

            $this->projectIds->map(
                static function (string $projectId) use (
                    &$i,
                    &$in,
                    &$params,
                ): void {
                    $key = 'project_id_' . $i;

                    $in[] = ':' . $key;

                    $params[$key] = $projectId;

                    $i++;
                },
            );

            $query[] = 'AND project_id IN (' .
                implode(',', $in) .
                ')';
        }

        if (
            $this->notProjectIds !== null &&
            $this->notProjectIds->count() > 0
        ) {
            $in = [];

            $i = 1;

            $this->notProjectIds->map(
                static function (string $notProjectId) use (
                    &$i,
                    &$in,
                    &$params,
                ): void {
                    $key = 'not_project_id_' . $i;

                    $in[] = ':' . $key;

                    $params[$key] = $notProjectId;

                    $i++;
                },
            );

            $query[] = 'AND project_id NOT IN (' .
                implode(',', $in) .
                ')';
        }

        if ($this->isActive !== null) {
            $query[] = 'AND is_active = ' . ($this->isActive ? 'TRUE' : 'FALSE');
        }

        if (
            $this->titles !== null &&
            $this->titles->count() > 0
        ) {
            $in = [];

            $i = 1;

            $this->titles->map(
                static function (string $title) use (
                    &$i,
                    &$in,
                    &$params,
                ): void {
                    $key = 'title_' . $i;

                    $in[] = ':' . $key;

                    $params[$key] = $title;

                    $i++;
                },
            );

            $query[] = 'AND title IN (' .
                implode(',', $in) .
                ')';
        }

        if (
            $this->notTitles !== null &&
            $this->notTitles->count() > 0
        ) {
            $in = [];

            $i = 1;

            $this->notTitles->map(
                static function (string $title) use (
                    &$i,
                    &$in,
                    &$params,
                ): void {
                    $key = 'not_title_' . $i;

                    $in[] = ':' . $key;

                    $params[$key] = $title;

                    $i++;
                },
            );

            $query[] = 'AND title NOT IN (' .
                implode(',', $in) .
                ')';
        }

        if (
            $this->slugs !== null &&
            $this->slugs->count() > 0
        ) {
            $in = [];

            $i = 1;

            $this->slugs->map(
                static function (string $slug) use (
                    &$i,
                    &$in,
                    &$params,
                ): void {
                    $key = 'slug_' . $i;

                    $in[] = ':' . $key;

                    $params[$key] = $slug;

                    $i++;
                },
            );

            $query[] = 'AND slug IN (' .
                implode(',', $in) .
                ')';
        }

        if (
            $this->notSlugs !== null &&
            $this->notSlugs->count() > 0
        ) {
            $in = [];

            $i = 1;

            $this->notSlugs->map(
                static function (string $slug) use (
                    &$i,
                    &$in,
                    &$params,
                ): void {
                    $key = 'not_slug_' . $i;

                    $in[] = ':' . $key;

                    $params[$key] = $slug;

                    $i++;
                },
            );

            $query[] = 'AND slug NOT IN (' .
                implode(',', $in) .
                ')';
        }

        if (
            $this->urls !== null &&
            $this->urls->count() > 0
        ) {
            $in = [];

            $i = 1;

            $this->urls->map(
                static function (string $url) use (
                    &$i,
                    &$in,
                    &$params,
                ): void {
                    $key = 'url_' . $i;

                    $in[] = ':' . $key;

                    $params[$key] = $url;

                    $i++;
                },
            );

            $query[] = 'AND url IN (' .
                implode(',', $in) .
                ')';
        }

        if (
            $this->notUrls !== null &&
            $this->notUrls->count() > 0
        ) {
            $in = [];

            $i = 1;

            $this->notUrls->map(
                static function (string $url) use (
                    &$i,
                    &$in,
                    &$params,
                ): void {
                    $key = 'not_url_' . $i;

                    $in[] = ':' . $key;

                    $params[$key] = $url;

                    $i++;
                },
            );

            $query[] = 'AND url NOT IN (' .
                implode(',', $in) .
                ')';
        }

        if (
            $this->statuses !== null &&
            $this->statuses->count() > 0
        ) {
            $in = [];

            $i = 1;

            $this->statuses->map(
                static function (string $status) use (
                    &$i,
                    &$in,
                    &$params,
                ): void {
                    $key = 'status_' . $i;

                    $in[] = ':' . $key;

                    $params[$key] = $status;

                    $i++;
                },
            );

            $query[] = 'AND status IN (' .
                implode(',', $in) .
                ')';
        }

        if (
            $this->notStatuses !== null &&
            $this->notStatuses->count() > 0
        ) {
            $in = [];

            $i = 1;

            $this->notStatuses->map(
                static function (string $notStatus) use (
                    &$i,
                    &$in,
                    &$params,
                ): void {
                    $key = 'not_status_' . $i;

                    $in[] = ':' . $key;

                    $params[$key] = $notStatus;

                    $i++;
                },
            );

            $query[] = 'AND status NOT IN (' .
                implode(',', $in) .
                ')';
        }

        return new CustomQueryParams(
            implode(' ', $query),
            $params,
        );
    }
}

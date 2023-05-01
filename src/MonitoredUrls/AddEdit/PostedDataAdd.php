<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\AddEdit;

use MissionControlUrlMonitoring\MonitoredUrls\AddEdit\ValueObjects\ProjectId;
use MissionControlUrlMonitoring\MonitoredUrls\AddEdit\ValueObjects\Title;
use MissionControlUrlMonitoring\MonitoredUrls\AddEdit\ValueObjects\Url;

readonly class PostedDataAdd
{
    /** @param string[] $data */
    public static function fromRawPostData(array $data): self
    {
        return new self(
            Title::fromNative($data['title'] ?? ''),
            Url::fromNative($data['url'] ?? ''),
            ProjectId::fromNative($data['project_id'] ?? ''),
        );
    }

    public function __construct(
        public Title $title,
        public Url $url,
        public ProjectId $projectId,
    ) {
    }
}

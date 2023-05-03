<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls;

use MissionControlUrlMonitoring\MonitoredUrls\Persistence\MonitoredUrlRecord;
use MissionControlUrlMonitoring\MonitoredUrls\ValueObjects\CheckedAt;
use MissionControlUrlMonitoring\MonitoredUrls\ValueObjects\CreatedAt;
use MissionControlUrlMonitoring\MonitoredUrls\ValueObjects\Id;
use MissionControlUrlMonitoring\MonitoredUrls\ValueObjects\IsActive;
use MissionControlUrlMonitoring\MonitoredUrls\ValueObjects\NullValue;
use MissionControlUrlMonitoring\MonitoredUrls\ValueObjects\ProjectId;
use MissionControlUrlMonitoring\MonitoredUrls\ValueObjects\Slug;
use MissionControlUrlMonitoring\MonitoredUrls\ValueObjects\Status;
use MissionControlUrlMonitoring\MonitoredUrls\ValueObjects\Title;
use MissionControlUrlMonitoring\MonitoredUrls\ValueObjects\Url;
use Spatie\Cloneable\Cloneable;

// phpcs:disable Squiz.NamingConventions.ValidVariableName.MemberNotCamelCaps

class MonitoredUrl
{
    use Cloneable;

    public static function fromRecord(MonitoredUrlRecord $record): self
    {
        if ($record->project_id === null) {
            $projectId = new NullValue();
        } else {
            $projectId = ProjectId::fromNative($record->project_id);
        }

        if ($record->checked_at === null) {
            $checkedAt = new NullValue();
        } else {
            $checkedAt = CheckedAt::fromNative($record->checked_at);
        }

        return new self(
            Id::fromNative($record->id),
            $projectId,
            IsActive::fromNative($record->is_active),
            Title::fromNative($record->title),
            Slug::fromNative($record->slug),
            Url::fromNative($record->url),
            Status::from($record->status),
            $checkedAt,
            CreatedAt::fromNative($record->created_at),
        );
    }

    public function __construct(
        public Id $id,
        public ProjectId|NullValue $projectId,
        public IsActive $isActive,
        public Title $title,
        public Slug $slug,
        public Url $url,
        public Status $status,
        public CheckedAt|NullValue $checkedAt,
        public CreatedAt $createdAt,
    ) {
    }

    /** @return array<string, scalar|null> */
    public function asArray(): array
    {
        return [
            'id' => $this->id->toNative(),
            'projectId' => $this->projectId->toNative(),
            'isActive' => $this->isActive->toNative(),
            'title' => $this->title->toNative(),
            'slug' => $this->slug->toNative(),
            'url' => $this->url->toNative(),
            'status' => $this->status->value,
            'checkedAt' => $this->checkedAt->toNative(),
            'createdAt' => $this->createdAt->toNative(),
        ];
    }
}

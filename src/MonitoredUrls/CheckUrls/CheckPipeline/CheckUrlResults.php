<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\CheckUrls\CheckPipeline;

use MissionControlUrlMonitoring\MonitoredUrls\CheckUrls\ValueObjects\CheckedAt;
use MissionControlUrlMonitoring\MonitoredUrls\CheckUrls\ValueObjects\Message;
use MissionControlUrlMonitoring\MonitoredUrls\CheckUrls\ValueObjects\Status;
use MissionControlUrlMonitoring\MonitoredUrls\CheckUrls\ValueObjects\StatusCode;
use MissionControlUrlMonitoring\MonitoredUrls\CheckUrls\ValueObjects\Url;

readonly class CheckUrlResults
{
    public function __construct(
        public Url $url,
        public Status $status,
        public StatusCode $statusCode,
        public Message $message,
        public CheckedAt $checkedAt,
        public PipelinePayload $pipelinePayload,
    ) {
    }
}

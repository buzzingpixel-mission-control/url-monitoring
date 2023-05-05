<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\CheckUrls;

interface AddUrlsToQueue
{
    public function add(): void;
}

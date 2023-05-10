<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Notifications\Adapters\Mailer;

readonly class MonitoredUrlMailerConfig
{
    public function __construct(public Addresses $toAddresses)
    {
    }
}

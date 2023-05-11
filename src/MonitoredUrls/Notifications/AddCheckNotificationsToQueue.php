<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Notifications;

interface AddCheckNotificationsToQueue
{
    public function add(): void;
}

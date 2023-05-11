<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Notifications;

class AddCheckNotificationsToQueueNoOp implements AddCheckNotificationsToQueue
{
    public function add(): void
    {
    }
}

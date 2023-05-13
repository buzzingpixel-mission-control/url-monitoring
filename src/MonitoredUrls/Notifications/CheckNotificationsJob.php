<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Notifications;

readonly class CheckNotificationsJob
{
    public function __construct(
        private CheckNotificationsJobSendInitial $sendInitial,
        private CheckNotificationsJobSendReminders $sendReminders,
    ) {
    }

    public function __invoke(): void
    {
        $this->sendInitial->run();

        $this->sendReminders->run();
    }
}

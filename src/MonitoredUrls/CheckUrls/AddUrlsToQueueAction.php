<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\CheckUrls;

readonly class AddUrlsToQueueAction
{
    public function __construct(private AddUrlsToQueueFactory $factory)
    {
    }

    public function __invoke(): void
    {
        $this->factory->create()->add();
    }
}

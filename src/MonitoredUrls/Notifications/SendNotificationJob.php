<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Notifications;

use JetBrains\PhpStorm\ArrayShape;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\MonitoredUrlIncidentRepository;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\Persistence\FindMonitoredUrlIncidentParameters;
use Psr\Clock\ClockInterface;

readonly class SendNotificationJob
{
    public function __construct(
        private ClockInterface $clock,
        private SendNotificationFactory $factory,
        private MonitoredUrlIncidentRepository $repository,
    ) {
    }

    /** @param string[] $context */
    public function __invoke(
        /** @phpstan-ignore-next-line */
        #[ArrayShape(['incidentId' => 'string'])]
        array $context,
    ): void {
        $id = $context['incidentId'];

        $incident = $this->repository->findOne(
            (new FindMonitoredUrlIncidentParameters())
                ->withId($id),
        );

        $this->factory->create($incident)->send($incident);

        $this->repository->saveMonitoredUrlIncident(
            $incident->withLastNotificationAt(
                $this->clock->now(),
            ),
        );
    }
}

<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Notifications;

use JetBrains\PhpStorm\ArrayShape;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\MonitoredUrlIncidentRepository;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\Persistence\FindMonitoredUrlIncidentParameters;
use MissionControlUrlMonitoring\MonitoredUrls\MonitoredUrlRepository;
use Psr\Clock\ClockInterface;

readonly class SendNotificationJob
{
    public function __construct(
        private ClockInterface $clock,
        private SendNotificationFactory $factory,
        private MonitoredUrlRepository $urlRepository,
        private MonitoredUrlIncidentRepository $incidentRepository,
    ) {
    }

    /** @param string[] $context */
    public function __invoke(
        /** @phpstan-ignore-next-line */
        #[ArrayShape(['incidentId' => 'string'])]
        array $context,
    ): void {
        $id = $context['incidentId'];

        $incident = $this->incidentRepository->findOne(
            (new FindMonitoredUrlIncidentParameters())
                ->withId($id),
        );

        $url = $this->urlRepository->findOneById(
            $incident->monitoredUrlId->toNative(),
        );

        $this->factory->create($incident)->send(
            $url,
            $incident,
        );

        $this->incidentRepository->saveMonitoredUrlIncident(
            $incident->withLastNotificationAt(
                $this->clock->now(),
            ),
        );
    }
}

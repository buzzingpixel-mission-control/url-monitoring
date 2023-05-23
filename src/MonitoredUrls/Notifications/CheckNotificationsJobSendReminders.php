<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Notifications;

use DateInterval;
use DateTimeImmutable;
use MissionControlBackend\Persistence\Sort;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\MonitoredUrlIncident;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\MonitoredUrlIncidentRepository;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\Persistence\FindMonitoredUrlIncidentParameters;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\ValueObjects\EventType;
use MissionControlUrlMonitoring\MonitoredUrls\MonitoredUrl;
use MissionControlUrlMonitoring\MonitoredUrls\MonitoredUrlRepository;
use MissionControlUrlMonitoring\MonitoredUrls\Persistence\FindMonitoredUrlParameters;
use Psr\Clock\ClockInterface;

use function assert;

/**
 * Send notifications for down URLs where it has been more than an hour
 * since last notification
 */
readonly class CheckNotificationsJobSendReminders
{
    public function __construct(
        private ClockInterface $clock,
        private MonitoredUrlRepository $urlRepository,
        private AddIncidentNotificationToQueueAction $addToQueue,
        private MonitoredUrlIncidentRepository $incidentRepository,
    ) {
    }

    public function run(): void
    {
        $findUrlParameters = (new FindMonitoredUrlParameters())
            // Only do this for active URLs
            ->withIsActive(true)
            // Only get URLs that are down
            ->withStatus(EventType::DOWN->value);

        $downUrls = $this->urlRepository->findAll(
            $findUrlParameters,
        );

        $downUrls->map(function (MonitoredUrl $url): void {
            $findIncidentParameters = (new FindMonitoredUrlIncidentParameters())
                // Get the most recent event only
                ->withMonitoredUrlId($url->id->toNative())
                ->withOrderBy('event_at')
                ->withSort(Sort::DESC);

            $mostRecentIncident = $this->incidentRepository->findOneOrNull(
                $findIncidentParameters,
            );

            if (! $this->urlNeedsReminder($mostRecentIncident)) {
                return;
            }

            assert($mostRecentIncident instanceof MonitoredUrlIncident);

            $this->addToQueue->add($mostRecentIncident);
        });
    }

    private function urlNeedsReminder(MonitoredUrlIncident|null $incident): bool
    {
        // Obvs if the incident is null we don't send a reminder
        if ($incident === null) {
            return false;
        }

        // If, for some reason, this is not a down event, no reminder
        if ($incident->eventType !== EventType::DOWN) {
            return false;
        }

        $lastNotificationAt = $incident->lastNotificationAt;

        /**
         * If a notification hasn't been sent for some reason (shouldn't happen
         * based on all the criteria that got us here, but ¯\_(ツ)_/¯)
         */
        if ($lastNotificationAt->isNull()) {
            return false;
        }

        /**
         * Now calculate if it's been more than an hour since last notification
         */

        $lastNotificationDateTime = new DateTimeImmutable(
            (string) $lastNotificationAt->toNative(),
        );

        // We add 1 hour to last notification then see if it's in the past

        $lastNotificationDateTime = $lastNotificationDateTime->add(
            new DateInterval('PT1H'),
        );

        return $lastNotificationDateTime < $this->clock->now();
    }
}

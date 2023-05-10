<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Notifications\Adapters\Slack;

use MissionControlBackend\Slack\Chat\Attachment;
use MissionControlBackend\Slack\Chat\AttachmentAction;
use MissionControlBackend\Slack\Chat\Message;
use MissionControlBackend\Url\AppUrlGenerator;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\MonitoredUrlIncident;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\ValueObjects\EventType;
use MissionControlUrlMonitoring\MonitoredUrls\MonitoredUrlRepository;
use Psr\Clock\ClockInterface;

use function implode;

readonly class MessageFactory
{
    public function __construct(
        private ClockInterface $clock,
        private AppUrlGenerator $urlGenerator,
        private MonitoredUrlSlackConfig $config,
        private MonitoredUrlRepository $repository,
    ) {
    }

    public function createFromIncident(MonitoredUrlIncident $incident): Message
    {
        $url = $this->repository->findOneById(
            $incident->monitoredUrlId->toNative(),
        );

        $text = implode("\n", [
            'URL Title: ' . $url->title->toNative(),
            'URL: ' . $url->url->toNative(),
            'Status Code: ' . $incident->statusCode->toNative(),
            'Message: ' . $incident->message->toNative(),
        ]);

        $viewIncidents = new AttachmentAction(
            'View Incidents',
            $this->urlGenerator->generate(
                '/monitored-urls/' . $url->slug->toNative(),
            ),
        );

        $goToUrl = new AttachmentAction(
            'Go To URL',
            $url->url->toNative(),
        );

        $ts = (string) $this->clock->now()->getTimestamp();

        $message = (new Message());

        if ($this->config->slackChannel !== null) {
            $message = $message->withChannel(
                $this->config->slackChannel,
            );
        }

        if ($incident->eventType !== EventType::UP) {
            $preText = implode(' ', [
                ':disappointed:',
                $url->title->toNative(),
                '(' . $url->url->toNative() . ')',
                'is down',
            ]);

            return $message->withAttachment(
                (new Attachment())
                    ->withFallback($preText)
                    ->withColor('#a94442')
                    ->withPretext($preText)
                    ->withText($text)
                    ->withAction($viewIncidents)
                    ->withAction($goToUrl)
                    ->withTs($ts),
            );
        }

        $preText = implode(' ', [
            ':simple_smile:',
            $url->title->toNative(),
            '(' . $url->url->toNative() . ')',
            'is up',
        ]);

        return $message->withAttachment(
            (new Attachment())
                ->withFallback($preText)
                ->withColor('#3c763d')
                ->withPretext($preText)
                ->withText($text)
                ->withAction($viewIncidents)
                ->withAction($goToUrl)
                ->withTs($ts),
        );
    }
}

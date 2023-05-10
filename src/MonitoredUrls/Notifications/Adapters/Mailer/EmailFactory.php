<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\Notifications\Adapters\Mailer;

use BuzzingPixel\Templating\TemplateEngineFactory;
use MissionControlBackend\Mailer\EmailBuilderFactory;
use MissionControlBackend\Url\AppUrlGenerator;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\MonitoredUrlIncident;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\ValueObjects\EventType;
use MissionControlUrlMonitoring\MonitoredUrls\MonitoredUrl;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Email;

use function implode;

readonly class EmailFactory
{
    public function __construct(
        private AppUrlGenerator $urlGenerator,
        private MonitoredUrlMailerConfig $config,
        private EmailBuilderFactory $emailBuilderFactory,
        private TemplateEngineFactory $templateEngineFactory,
    ) {
    }

    public function createFromIncident(
        MonitoredUrl $url,
        MonitoredUrlIncident $incident,
    ): Email {
        if ($incident->eventType !== EventType::UP) {
            $subject = implode(' ', [
                '😞',
                $url->title->toNative(),
                '(' . $url->url->toNative() . ')',
                'is down',
            ]);

            if (! $incident->lastNotificationAt->isNull()) {
                $subject = 'Reminder: ' . $subject;
            }
        } else {
            $subject = implode(' ', [
                '🙂',
                $url->title->toNative(),
                '(' . $url->url->toNative() . ')',
                'is up',
            ]);
        }

        $viewIncidentsUrl = $this->urlGenerator->generate(
            '/monitored-urls/' . $url->slug->toNative(),
        );

        $text = implode("\n", [
            'URL Title: ' . $url->title->toNative(),
            'URL: ' . $url->url->toNative(),
            'Status Code: ' . $incident->statusCode->toNative(),
            'Message: ' . $incident->message->toNative(),
            '',
            '',
            '',
            'View Incidents: ' . $viewIncidentsUrl,
            'Go To URL: ' . $url->url->toNative(),
        ]);

        $html = $this->templateEngineFactory->create()
            ->templatePath(__DIR__ . '/email-html.phtml')
            ->addVar('title', $subject)
            ->addVar('url', $url)
            ->addVar('incident', $incident)
            ->addVar('viewIncidentsUrl', $viewIncidentsUrl)
            ->render();

        $email = $this->emailBuilderFactory->create()
            ->subject($subject)
            ->text($text)
            ->html($html)
            ->getEmail();

        $this->config->toAddresses->map(
            static fn (Address $address) => $email->addTo(
                $address,
            ),
        );

        return $email;
    }
}

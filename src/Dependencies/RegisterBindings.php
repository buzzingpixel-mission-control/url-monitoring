<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\Dependencies;

use MissionControlBackend\ContainerBindings;
use MissionControlUrlMonitoring\MonitoredUrls\Config\MonitoredUrlConfig;
use MissionControlUrlMonitoring\MonitoredUrls\Config\MonitoredUrlConfigFactory;
use MissionControlUrlMonitoring\MonitoredUrls\Notifications\Adapters\Mailer\MonitoredUrlMailerConfig;
use MissionControlUrlMonitoring\MonitoredUrls\Notifications\Adapters\Mailer\MonitoredUrlMailerConfigFactory;
use MissionControlUrlMonitoring\MonitoredUrls\Notifications\Adapters\Slack\MonitoredUrlSlackConfig;
use MissionControlUrlMonitoring\MonitoredUrls\Notifications\Adapters\Slack\MonitoredUrlSlackConfigFactory;
use Psr\Container\ContainerInterface;

use function assert;

class RegisterBindings
{
    public static function register(ContainerBindings $containerBindings): void
    {
        $containerBindings->addBinding(
            MonitoredUrlConfig::class,
            static function (ContainerInterface $di): MonitoredUrlConfig {
                $factory = $di->get(MonitoredUrlConfigFactory::class);

                assert($factory instanceof MonitoredUrlConfigFactory);

                return $factory->create();
            },
        );

        $containerBindings->addBinding(
            MonitoredUrlSlackConfig::class,
            static function (ContainerInterface $di): MonitoredUrlSlackConfig {
                $factory = $di->get(MonitoredUrlSlackConfigFactory::class);

                assert($factory instanceof MonitoredUrlSlackConfigFactory);

                return $factory->create();
            },
        );

        $containerBindings->addBinding(
            MonitoredUrlMailerConfig::class,
            static function (ContainerInterface $di): MonitoredUrlMailerConfig {
                $factory = $di->get(MonitoredUrlMailerConfigFactory::class);

                assert($factory instanceof MonitoredUrlMailerConfigFactory);

                return $factory->create();
            },
        );
    }
}

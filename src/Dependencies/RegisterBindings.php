<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\Dependencies;

use MissionControlBackend\ContainerBindings;
use MissionControlUrlMonitoring\MonitoredUrls\Config\MonitoredUrlConfig;
use MissionControlUrlMonitoring\MonitoredUrls\Config\MonitoredUrlConfigFactory;
use Psr\Container\ContainerInterface;

use function assert;

class RegisterBindings
{
    public static function register(ContainerBindings $containerBindings): void
    {
        $containerBindings->addBinding(
            MonitoredUrlConfig::class,
            static function (ContainerInterface $container): MonitoredUrlConfig {
                $factory = $container->get(MonitoredUrlConfigFactory::class);

                assert($factory instanceof MonitoredUrlConfigFactory);

                return $factory->create();
            },
        );
    }
}

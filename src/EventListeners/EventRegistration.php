<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\EventListeners;

use Crell\Tukio\OrderedProviderInterface;

class EventRegistration
{
    public static function register(OrderedProviderInterface $provider): void
    {
        $provider->addSubscriber(
            Routing::class,
            Routing::class,
        );
    }
}

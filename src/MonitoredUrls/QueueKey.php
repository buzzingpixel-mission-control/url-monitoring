<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls;

use MissionControlUrlMonitoring\MonitoredUrls\Config\MonitoredUrlConfig;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\MonitoredUrlIncident;
use ReflectionProperty;
use Symfony\Component\Cache\Adapter\AbstractAdapter;
use Symfony\Component\Cache\Adapter\RedisAdapter;

use function is_string;

readonly class QueueKey
{
    public function __construct(
        private RedisAdapter $cachePool,
        private MonitoredUrlConfig $config,
    ) {
    }

    public function getKey(string $key = ''): string
    {
        /**
         * First make sure the url queue is clear. We don't want to outrun
         * the available processing power
         */
        $queueName = $this->config->queueName;

        $redisNamespaceProperty = new ReflectionProperty(
            AbstractAdapter::class,
            'namespace',
        );

        /** @noinspection PhpExpressionResultUnusedInspection */
        $redisNamespaceProperty->setAccessible(true);

        $namespace = $redisNamespaceProperty->getValue($this->cachePool);

        $namespace = is_string($namespace) ? $namespace : '';

        return $namespace . 'queue_' . $queueName . '_' . $key;
    }

    public function getIncidentNotificationHandle(
        MonitoredUrlIncident $incident,
    ): string {
        return 'incident_notification_' . $incident->id->toNative();
    }

    public function getIncidentNotificationKey(
        MonitoredUrlIncident $incident,
    ): string {
        return $this->getKey(
            $this->getIncidentNotificationHandle($incident),
        );
    }

    public function getCheckNotificationsQueueHandle(): string
    {
        return 'check_notifications_main';
    }

    public function getCheckNotificationsQueueKey(): string
    {
        return $this->getKey($this->getCheckNotificationsQueueHandle());
    }
}

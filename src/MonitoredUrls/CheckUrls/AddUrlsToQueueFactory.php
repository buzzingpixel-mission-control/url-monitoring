<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\CheckUrls;

use MissionControlUrlMonitoring\MonitoredUrls\Config\MonitoredUrlConfig;
use Redis;
use ReflectionProperty;
use Symfony\Component\Cache\Adapter\AbstractAdapter;
use Symfony\Component\Cache\Adapter\RedisAdapter;

use function count;
use function is_string;

readonly class AddUrlsToQueueFactory
{
    public function __construct(
        private Redis $redis,
        private RedisAdapter $cachePool,
        private AddUrlsToQueueNoOp $noOp,
        private MonitoredUrlConfig $config,
        private AddUrlsToQueueFromRepository $fromRepository,
    ) {
    }

    public function create(): AddUrlsToQueue
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

        $enqueuedKeys = $this->redis->keys(
            $namespace . 'queue_' . $queueName . '_*',
        );

        if (count($enqueuedKeys) > 0) {
            return $this->noOp;
        }

        return $this->fromRepository;
    }
}

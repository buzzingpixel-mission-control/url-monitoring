<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\CheckUrls;

use JetBrains\PhpStorm\ArrayShape;

use function dump;

readonly class CheckUrl
{
    /** @param string[] $context */
    public function __invoke(
        /** @phpstan-ignore-next-line */
        #[ArrayShape(['urlId' => 'string'])]
        array $context,
    ): void {
        // TODO: Build check
        dump($context['urlId']);
    }
}

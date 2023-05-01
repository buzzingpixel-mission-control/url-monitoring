<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\ValueObjects;

use Funeralzone\ValueObjects\ValueObject;

class EmptyString implements ValueObject
{
    public function isNull(): bool
    {
        return false;
    }

    public function isSame(ValueObject $object): bool
    {
        return $object->toNative() === '';
    }

    /** @inheritDoc */
    public static function fromNative($native): self
    {
        return new self();
    }

    public function toNative(): string
    {
        return '';
    }
}

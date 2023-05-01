<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\AddEdit\ValueObjects;

use Assert\Assert;
use Funeralzone\ValueObjects\Scalars\StringTrait;
use Funeralzone\ValueObjects\ValueObject;

class Url implements ValueObject
{
    use StringTrait;

    public function __construct(string $string)
    {
        Assert::that($string)->notEmpty(
            'URL is required',
        );

        $this->string = $string;
    }
}

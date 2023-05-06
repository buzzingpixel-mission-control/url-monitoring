<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\CheckUrls\CheckPipeline;

use League\Pipeline\StageInterface;

use function assert;

// phpcs:disable SlevomatCodingStandard.TypeHints.ParameterTypeHint.MissingAnyTypeHint

readonly class CheckUrlResultsProcessor implements StageInterface
{
    public function __construct(
        private UpdateCheckedAt $updateCheckedAt,
        private EventTypeFactory $eventTypeFactory,
        private AddIncidentFactory $addIncidentFactory,
        private UpdateStatusFactory $updateStatusFactory,
    ) {
    }

    public function __invoke($payload): CheckUrlResults
    {
        assert($payload instanceof CheckUrlResults);

        return $this->runProcessor($payload);
    }

    public function runProcessor(CheckUrlResults $results): CheckUrlResults
    {
        $monitoredUrl = $results->pipelinePayload->monitoredUrl;

        $eventType = $this->eventTypeFactory->create($results);

        $this->addIncidentFactory->create(
            $results,
            $eventType,
        )->add($results, $eventType);

        $monitoredUrl = $this->updateStatusFactory->create(
            $eventType,
            $monitoredUrl,
        )->update($eventType, $monitoredUrl);

        $this->updateCheckedAt->update($monitoredUrl);

        return $results;
    }
}

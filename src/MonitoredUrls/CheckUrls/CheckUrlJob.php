<?php

declare(strict_types=1);

namespace MissionControlUrlMonitoring\MonitoredUrls\CheckUrls;

use JetBrains\PhpStorm\ArrayShape;
use League\Pipeline\Pipeline;
use League\Pipeline\PipelineBuilder;
use MissionControlBackend\Persistence\Sort;
use MissionControlUrlMonitoring\MonitoredUrls\CheckUrls\CheckPipeline\CheckUrl;
use MissionControlUrlMonitoring\MonitoredUrls\CheckUrls\CheckPipeline\CheckUrlResultsProcessor;
use MissionControlUrlMonitoring\MonitoredUrls\CheckUrls\CheckPipeline\PipelinePayload;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\MonitoredUrlIncidentRepository;
use MissionControlUrlMonitoring\MonitoredUrls\Incidents\Persistence\FindMonitoredUrlIncidentParameters;
use MissionControlUrlMonitoring\MonitoredUrls\MonitoredUrlRepository;

use function assert;

readonly class CheckUrlJob
{
    public function __construct(
        private CheckUrl $checkUrl,
        private PipelineBuilder $pipelineBuilder,
        private CheckUrlResultsProcessor $checkResultsProcessor,
        private MonitoredUrlRepository $monitoredUrlRepository,
        private MonitoredUrlIncidentRepository $monitoredUrlIncidentRepository,
    ) {
    }

    /** @param string[] $context */
    public function __invoke(
        /** @phpstan-ignore-next-line */
        #[ArrayShape(['urlId' => 'string'])]
        array $context,
    ): void {
        $id = $context['urlId'];

        $monitoredUrl = $this->monitoredUrlRepository->findOneById($id);

        $latestIncident = $this->monitoredUrlIncidentRepository->findOneOrNull(
            (new FindMonitoredUrlIncidentParameters())
                ->withMonitoredUrlId($id)
                ->withOrderBy('event_at')
                ->withSort(Sort::DESC),
        );

        $pipeline = $this->pipelineBuilder
            ->add($this->checkUrl)
            ->add($this->checkResultsProcessor)
            ->build();

        assert($pipeline instanceof Pipeline);

        $pipeline->process(new PipelinePayload(
            $monitoredUrl,
            $latestIncident,
        ));
    }
}

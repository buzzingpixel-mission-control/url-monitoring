import { addProjectDetailsSection } from 'buzzingpixel-mission-control-frontend-core';
import ProjectsListing from './MonitoredUrls/ProjectsListing/ProjectsListing';

const UrlMonitoringBoot = () => {
    addProjectDetailsSection({
        uniqueKey: 'monitored-urls',
        render: ProjectsListing,
    });
};

export default UrlMonitoringBoot;

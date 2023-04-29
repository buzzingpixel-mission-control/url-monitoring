import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { MenuItem } from 'buzzingpixel-mission-control-frontend-core';

const UrlMonitoringMenuItems = (): Array<MenuItem> => [
    {
        name: 'Monitored URLs',
        href: '/monitored-urls',
        icon: GlobeAltIcon,
    },
];

export default UrlMonitoringMenuItems;

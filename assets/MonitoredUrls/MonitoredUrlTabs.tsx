import React, { MouseEventHandler } from 'react';
import { PageTabs, Tab } from 'buzzingpixel-mission-control-frontend-core';
import {
    ArchiveBoxIcon,
    FolderIcon,
    PlusIcon,
} from '@heroicons/react/20/solid';

const tabs = [
    {
        name: 'Active URLs',
        href: '/monitored-urls',
        icon: FolderIcon,
    },
    {
        name: 'Archived URLs',
        href: '/monitored-urls/archived',
        icon: ArchiveBoxIcon,
    },
] as Array<Tab>;

const MonitoredUrlTabs = (
    {
        activeHref,
        addUrlOnClick,
    }: {
        activeHref?: string;
        addUrlOnClick?: MouseEventHandler<HTMLButtonElement> | undefined;
    },
) => {
    activeHref = activeHref || '/monitored-urls';

    return (
        <PageTabs
            tabs={tabs.map((tab) => ({
                ...tab,
                current: tab.href === activeHref,
            }))}
            rightHandButtons={[{
                key: 'add-new-url',
                text: (
                    <>
                        <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                        Add New URL
                    </>
                ),
                onClick: addUrlOnClick,
            }]}
        />
    );
};

MonitoredUrlTabs.defaultProps = {
    activeHref: undefined,
    addUrlOnClick: undefined,
};

export default MonitoredUrlTabs;

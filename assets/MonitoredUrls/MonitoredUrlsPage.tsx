import React, { useState } from 'react';
import {
    createPortal,
    NoResultsAddItem,
    PartialPageLoading,
    usePageTitle,
} from 'buzzingpixel-mission-control-frontend-core';
import { GlobeAltIcon } from '@heroicons/react/20/solid';
import { useMonitoredUrlData } from './MonitoredUrlData';
import MonitoredUrlTabs from './MonitoredUrlTabs';
import AddMonitoredUrlOverlay from './AddMonitoredUrlOverlay';
import { transformMonitoredUrls } from './MonitoredUrls';
import MonitoredUrlList from './MonitoredUrlList';

const MonitoredUrlsPage = (
    {
        isArchive = false,
    }: {
        isArchive?: boolean;
    },
) => {
    const [
        pageNameState,
        setPageNameState,
    ] = useState('');

    if (isArchive && pageNameState !== 'Archived URLs') {
        setPageNameState('Archived URLs');
    } else if (!isArchive && pageNameState !== 'Monitored URLs') {
        setPageNameState('Monitored URLs');
    }

    usePageTitle(pageNameState);

    const [
        filterText,
        setFilterText,
    ] = useState<string>('');

    const [
        addUrlIsOpen,
        setAddUrlIsOpen,
    ] = useState<boolean>(false);

    const {
        status,
        data,
    } = useMonitoredUrlData(isArchive);

    const Tabs = (
        <MonitoredUrlTabs
            activeHref={isArchive ? '/monitored-urls/archived' : '/monitored-urls'}
            addUrlOnClick={() => { setAddUrlIsOpen(true); }}
        />
    );

    if (status === 'loading') {
        return (
            <>
                {Tabs}
                <PartialPageLoading />
            </>
        );
    }

    const portals = () => {
        if (addUrlIsOpen) {
            return createPortal(<AddMonitoredUrlOverlay setIsOpen={setAddUrlIsOpen} />);
        }

        return null;
    };

    let urls = transformMonitoredUrls(data);

    if (urls.length < 1) {
        if (isArchive) {
            return (
                <>
                    {portals()}
                    {Tabs}
                    <NoResultsAddItem
                        icon={<GlobeAltIcon />}
                        headline="No archived urls"
                    />
                </>
            );
        }

        return (
            <>
                {portals()}
                {Tabs}
                <NoResultsAddItem
                    icon={<GlobeAltIcon />}
                    headline="No urls"
                    content="Would you like to create a monitored URL?"
                    actionText="Add New URL"
                    actionUsesPlusIcon
                    actionButtonOnClick={() => { setAddUrlIsOpen(true); }}
                />
            </>
        );
    }

    if (filterText !== '') {
        urls = urls.filter((url) => url.title.toLowerCase().indexOf(filterText.toLowerCase()) > -1
            || url.slug.toLowerCase().indexOf(filterText.toLowerCase()) > -1
            || url.url.toLowerCase().indexOf(filterText.toLowerCase()) > -1);
    }

    return (
        <>
            {portals()}
            {Tabs}
            <div>
                <div className="mb-4">
                    <input
                        type="text"
                        name="filter"
                        id="filter"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                        placeholder="Filter results"
                        value={filterText}
                        onChange={(e) => {
                            setFilterText(e.target.value);
                        }}
                    />
                </div>
                <MonitoredUrlList
                    isArchive={isArchive}
                    items={urls}
                />
            </div>
        </>
    );
};

MonitoredUrlsPage.defaultProps = {
    isArchive: false,
};

export default MonitoredUrlsPage;

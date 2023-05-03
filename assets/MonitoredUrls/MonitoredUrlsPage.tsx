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
import { monitoredUrlStatusList, transformMonitoredUrls } from './MonitoredUrls';
import MonitoredUrlList from './MonitoredUrlList';
import useQuickStatusFilter from './useQuickStatusFilter';
import useFilterText from './useFilterText';

function classNames (...classes) {
    return classes.filter(Boolean).join(' ');
}

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

    const [
        quickStatusFilter,
        setQuickStatusFilter,
    ] = useQuickStatusFilter();

    if (isArchive && pageNameState !== 'Archived URLs') {
        setPageNameState('Archived URLs');
    } else if (!isArchive && pageNameState !== 'Monitored URLs') {
        setPageNameState('Monitored URLs');
    }

    usePageTitle(pageNameState);

    const [
        filterText,
        setFilterText,
    ] = useFilterText();

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

    let urls = data;

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

    if (quickStatusFilter !== '') {
        urls = urls.filter((
            url,
        ) => url.status === quickStatusFilter);
    }

    return (
        <>
            {portals()}
            {Tabs}
            <div>
                <div className="sm:flex sm:mb-4">
                    <div className="mb-4 sm:mb-0 sm:mr-4">
                        <div>
                            <div className="sm:hidden">
                                <label htmlFor="statusFilter" className="sr-only">
                                    Select a status filter
                                </label>
                                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                                <select
                                    id="statusFilter"
                                    name="statusFilter"
                                    className="block w-full rounded-md border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                                    defaultValue={quickStatusFilter}
                                    onChange={(e) => {
                                        setQuickStatusFilter(e.target.value);
                                    }}
                                >
                                    {monitoredUrlStatusList.map((filterStatus) => (
                                        <option key={filterStatus.value} value={filterStatus.value}>{filterStatus.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="hidden sm:block">
                                <nav className="flex space-x-4" aria-label="Status Filter">
                                    {monitoredUrlStatusList.map((filterStatus) => {
                                        const isCurrent = filterStatus.value === quickStatusFilter;

                                        return (
                                            <a
                                                key={filterStatus.value}
                                                href="#"
                                                className={classNames(
                                                    isCurrent ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-500 hover:text-gray-700',
                                                    'rounded-md px-3 py-2 text-sm font-medium',
                                                )}
                                                aria-current={isCurrent ? 'page' : undefined}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setQuickStatusFilter(filterStatus.value);
                                                }}
                                            >
                                                {filterStatus.name}
                                            </a>
                                        );
                                    })}
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4 sm:mb-0 grow">
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

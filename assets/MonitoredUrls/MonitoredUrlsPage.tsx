import React, { useState } from 'react';
import { createPortal, PartialPageLoading, usePageTitle } from 'buzzingpixel-mission-control-frontend-core';
import { useMonitoredUrlData } from './MonitoredUrlData';
import MonitoredUrlTabs from './MonitoredUrlTabs';
import AddMonitoredUrlOverlay from './AddMonitoredUrlOverlay';

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

    return (
        <>
            {portals()}
            {Tabs}
            MonitoredUrlsPage
        </>
    );
};

MonitoredUrlsPage.defaultProps = {
    isArchive: false,
};

export default MonitoredUrlsPage;

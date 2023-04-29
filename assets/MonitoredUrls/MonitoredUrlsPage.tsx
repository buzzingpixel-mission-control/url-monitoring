import React, { useState } from 'react';
import { usePageTitle } from 'buzzingpixel-mission-control-frontend-core';

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

    if (isArchive && pageNameState !== 'Archived Projects') {
        setPageNameState('Archived Projects');
    } else if (!isArchive && pageNameState !== 'Projects') {
        setPageNameState('Projects');
    }

    usePageTitle(pageNameState);

    return <>MonitoredUrlsPage</>;
};

MonitoredUrlsPage.defaultProps = {
    isArchive: false,
};

export default MonitoredUrlsPage;

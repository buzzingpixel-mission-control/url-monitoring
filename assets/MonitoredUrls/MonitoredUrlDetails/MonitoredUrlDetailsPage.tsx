import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
    PartialPageLoading,
    useBreadcrumbs,
    useHidePageTitle,
    usePageTitle,
} from 'buzzingpixel-mission-control-frontend-core';
import { useMonitoredUrlDetailsData } from './MonitoredUrlDetailsData';
import PageHeader from './PageHeader';
import Incidents from './Incidents';

const MonitoredUrlDetailsPage = () => {
    const { slug } = useParams();

    const [searchParams] = useSearchParams();

    useHidePageTitle(true);

    const [
        pageNameState,
        setPageNameState,
    ] = useState(
        'Loading Monitored URL Details…',
    );

    const [
        isArchive,
        setIsArchive,
    ] = useState(false);

    usePageTitle(pageNameState);

    useBreadcrumbs([
        {
            name: 'Monitored URLs',
            href: isArchive ? '/monitored-urls/archived' : '/monitored-urls',
        },
        {
            name: pageNameState,
            href: `/monitored-urls/${slug}`,
        },
    ]);

    const {
        status,
        data,
    } = useMonitoredUrlDetailsData(slug);

    if (status === 'loading') {
        return <PartialPageLoading />;
    }

    const pageName = `Monitored URL: ${data.title}`;

    if (pageNameState !== pageName) {
        setPageNameState(pageName);
    }

    if (isArchive !== !data.isActive) {
        setIsArchive(true);
    }

    const fromProjectPageSlug = searchParams.get('fromProjectPageSlug');

    return (
        <>
            <PageHeader data={data} fromProjectPageSlug={fromProjectPageSlug} />
            <Incidents incidents={data.incidents} />
        </>
    );
};

export default MonitoredUrlDetailsPage;

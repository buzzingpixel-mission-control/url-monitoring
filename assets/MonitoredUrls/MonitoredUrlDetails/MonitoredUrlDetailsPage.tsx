import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    PartialPageLoading,
    useBreadcrumbs,
    useHidePageTitle,
    usePageTitle,
} from 'buzzingpixel-mission-control-frontend-core';
import { useMonitoredUrlDetailsData } from './MonitoredUrlDetailsData';
import MonitoredUrlEditButton from './MonitoredUrlEditButton';

const archiveActiveStatuses = {
    Active: 'text-green-700 bg-green-50 ring-green-600/20',
    Archived: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
};

const statuses = {
    Unknown: 'text-gray-700 bg-gray-50 ring-gray-600/20',
    Up: 'text-green-700 bg-green-50 ring-green-600/20',
    'Pending Down': 'text-yellow-700 bg-yellow-50 ring-yellow-600/20',
    Down: 'text-red-700 bg-red-50 ring-red-600/20',
};

function classNames (...classes) {
    return classes.filter(Boolean).join(' ');
}

const MonitoredUrlDetailsPage = () => {
    const { slug } = useParams();

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

    const pageName = `Project: ${data.title}`;

    if (pageNameState !== pageName) {
        setPageNameState(pageName);
    }

    if (isArchive !== !data.isActive) {
        setIsArchive(true);
    }

    return (
        <>
            <div className="border-b border-gray-200 pb-4">
                <div className="md:flex md:items-center md:justify-between md:space-x-5">
                    <div className="flex items-start space-x-5 overflow-hidden">
                        {/*
                          Use vertical padding to simulate center alignment when both lines of text are one line,
                          but preserve the same layout if the text wraps without making the image jump around.
                        */}
                        <div className="pt-1.5">
                            <h1 className="text-2xl font-bold text-gray-900">
                                {data.title}
                            </h1>
                            <div className="flex items-start gap-x-3">
                                <a
                                    href={data.url}
                                    className="underline font-medium text-sm text-cyan-600 hover:text-cyan-500"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {data.url}
                                </a>
                                <p
                                    className={classNames(
                                        archiveActiveStatuses[data.activeOrArchivedText],
                                        'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
                                    )}
                                >
                                    {data.activeOrArchivedText}
                                </p>
                                {(() => {
                                    if (isArchive) {
                                        return null;
                                    }

                                    return (
                                        <p
                                            className={classNames(
                                                statuses[data.statusReadable],
                                                'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
                                            )}
                                        >
                                            {data.statusReadable}
                                        </p>
                                    );
                                })()}
                                {(() => {
                                    if (!data.project) {
                                        return null;
                                    }

                                    return (
                                        <Link
                                            to={data.project.href}
                                            className={classNames(
                                                'text-cyan-700 bg-cyan-50 ring-cyan-600/20 hover:bg-cyan-100 hover:text-cyan-800',
                                                'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
                                            )}
                                        >
                                            Project:
                                            {' '}
                                            {data.project.title}
                                        </Link>
                                    );
                                })()}
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
                        <MonitoredUrlEditButton item={data} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default MonitoredUrlDetailsPage;

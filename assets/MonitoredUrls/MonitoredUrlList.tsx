import React from 'react';
import { NoResultsAddItem } from 'buzzingpixel-mission-control-frontend-core';
import { ClipboardDocumentCheckIcon } from '@heroicons/react/20/solid';
import { MonitoredUrlsWithViewOptions } from './MonitoredUrls';
import MonitoredUrlListItem from './MonitoredUrlListItem';

const MonitoredUrlList = (
    {
        isArchive,
        items,
    }: {
        isArchive: boolean;
        items: MonitoredUrlsWithViewOptions;
    },
) => {
    if (items.length < 1) {
        return (
            <NoResultsAddItem
                icon={<ClipboardDocumentCheckIcon />}
                headline="No Monitored URLs match your filters"
            />
        );
    }

    return (
        <div className="bg-white rounded-md shadow-sm px-4">
            <ul className="divide-y divide-gray-100">
                {items.map((item) => (
                    <MonitoredUrlListItem
                        key={item.id}
                        isArchive={isArchive}
                        item={item}
                    />
                ))}
            </ul>
        </div>
    );
};

export default MonitoredUrlList;

import React from 'react';
import phpDateFormat from 'locutus/php/datetime/date';
import { Incident } from './MonitoredUrlWithIncidents';
import { MonitoredUrlStatus } from '../MonitoredUrls';

const Incidents = (
    {
        incidents,
    }: {
        incidents: Array<Incident>;
    },
) => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return (
        <div className="overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl">
            <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                    Latest 100 incidents
                </h3>
            </div>
            <ul className="divide-y divide-gray-100">
                {incidents.map((incident) => (
                    <li
                        key={incident.id}
                        className="relative flex justify-between gap-x-6 px-4 py-5 sm:px-6"
                    >
                        <div className="flex gap-x-4">
                            <div className="min-w-0 flex-auto">
                                <div className="flex text-xs leading-5 text-gray-500">
                                    <div className="flex items-center gap-x-1.5">
                                        {(() => {
                                            switch (incident.eventType) {
                                                case MonitoredUrlStatus.up:
                                                    return (
                                                        <>
                                                            <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                            </div>
                                                            <p className="text-xs leading-5 text-gray-500">Up</p>
                                                        </>
                                                    );
                                                case MonitoredUrlStatus.pendingDown:
                                                    return (
                                                        <>
                                                            <div className="flex-none rounded-full bg-yellow-500/20 p-1">
                                                                <div className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                                                            </div>
                                                            <p className="text-xs leading-5 text-gray-500">Pending Down</p>
                                                        </>
                                                    );
                                                case MonitoredUrlStatus.down:
                                                    return (
                                                        <>
                                                            <div className="flex-none rounded-full bg-red-500/20 p-1">
                                                                <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                                            </div>
                                                            <p className="text-xs leading-5 text-gray-500">Down</p>
                                                        </>
                                                    );
                                                default:
                                                    return null;
                                            }
                                        })()}
                                    </div>
                                </div>
                                <p className="mt-1 text-sm font-semibold leading-6 text-gray-900">
                                    {`${phpDateFormat('Y-m-d g:i:s A', incident.eventAtDate)} (${timezone})`}
                                </p>
                                <p className="mt-1 flex text-xs leading-5 text-gray-500">
                                    <span className="font-bold">Status Code</span>
                                    :
                                    {' '}
                                    {incident.statusCode}
                                </p>
                                <p className="mt-1 flex text-xs leading-5 text-gray-500">
                                    <span className="font-bold">Message</span>
                                    :
                                    {' '}
                                    {incident.message}
                                </p>
                                <p className="mt-1 flex text-xs leading-5 text-gray-500">
                                    <span className="font-bold">Last Notification At</span>
                                    :
                                    {' '}
                                    {incident.lastNotificationAtDate
                                        ? `${phpDateFormat('Y-m-d g:i:s A', incident.lastNotificationAtDate)} (${timezone})`
                                        : ''}
                                </p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Incidents;

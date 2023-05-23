import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { MonitoredUrlWithViewOptions } from './MonitoredUrls';
import MonitoredUrlListItemEditor from './MonitoredUrlListItemEditor';
import { useArchiveMonitoredUrlMutation } from './MonitoredUrlData';

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

const MonitoredUrlListItem = (
    {
        isArchive,
        item,
        projectPageSlug,
    }: {
        isArchive: boolean;
        item: MonitoredUrlWithViewOptions;
        projectPageSlug?: string | null | undefined;
    },
) => {
    const [
        editIsOpen,
        setEditIsOpen,
    ] = useState<boolean>(false);

    const archiveMutation = useArchiveMonitoredUrlMutation(
        item.id,
        isArchive,
        item.projectId,
    );

    let viewDetailsLink = item.href;

    if (projectPageSlug) {
        viewDetailsLink += `?fromProjectPageSlug=${projectPageSlug}`;
    }

    return (
        <li>
            <div className="sm:flex items-center justify-between gap-x-6 py-5">
                <div className="min-w-0">
                    <div className="flex items-start gap-x-3">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                            {item.title}
                        </p>
                        <p
                            className={classNames(
                                archiveActiveStatuses[item.activeOrArchivedText],
                                'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
                            )}
                        >
                            {item.activeOrArchivedText}
                        </p>
                        {(() => {
                            if (isArchive) {
                                return null;
                            }

                            return (
                                <p
                                    className={classNames(
                                        statuses[item.statusReadable],
                                        'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
                                    )}
                                >
                                    {item.statusReadable}
                                </p>
                            );
                        })()}
                        {(() => {
                            if (!item.project || projectPageSlug) {
                                return null;
                            }

                            return (
                                <Link
                                    to={item.project.href}
                                    className={classNames(
                                        'text-cyan-700 bg-cyan-50 ring-cyan-600/20 hover:bg-cyan-100 hover:text-cyan-800',
                                        'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
                                    )}
                                >
                                    Project:
                                    {' '}
                                    {item.project.title}
                                </Link>
                            );
                        })()}
                    </div>
                    <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500 truncate">
                        <a
                            href={item.url}
                            className="underline font-medium text-cyan-600 hover:text-cyan-500"
                            target="_blank"
                            rel="noreferrer"
                        >
                            {item.url}
                        </a>
                        <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                            <circle cx={1} cy={1} r={1} />
                        </svg>
                        <p>
                            Created
                            {' '}
                            {item.createdAtDate.toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <div className="mt-2 sm:mt-0 flex flex-none items-center gap-x-4">
                    <Link
                        to={viewDetailsLink}
                        className="block rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        View Details
                        <span className="sr-only">
                            ,
                            {item.title}
                        </span>
                    </Link>
                    <Menu as="div" className="relative flex-none">
                        <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                            <span className="sr-only">Open options</span>
                            <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items
                                className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                            >
                                <Menu.Item>
                                    {({ active }) => (
                                        <span
                                            className={classNames(
                                                active ? 'bg-gray-50' : '',
                                                'cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900',
                                            )}
                                            onClick={() => {
                                                setEditIsOpen(true);
                                            }}
                                        >
                                            Edit
                                            <span className="sr-only">
                                                ,
                                                {item.title}
                                            </span>
                                        </span>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <span
                                            className={classNames(
                                                active ? 'bg-gray-50' : '',
                                                'cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900',
                                            )}
                                            onClick={() => {
                                                archiveMutation.mutate(undefined);
                                            }}
                                        >
                                            {isArchive ? 'Un-archive' : 'Archive'}
                                            <span className="sr-only">
                                                ,
                                                {item.title}
                                            </span>
                                        </span>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
            {(() => {
                if (!editIsOpen) {
                    return null;
                }

                return (
                    <MonitoredUrlListItemEditor
                        item={item}
                        setEditorIsOpen={setEditIsOpen}
                    />
                );
            })()}
        </li>
    );
};

MonitoredUrlListItem.defaultProps = {
    projectPageSlug: undefined,
};

export default MonitoredUrlListItem;

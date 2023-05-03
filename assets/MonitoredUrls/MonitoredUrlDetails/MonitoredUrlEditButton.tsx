import React, { useState } from 'react';
import { createPortal } from 'buzzingpixel-mission-control-frontend-core';
import AddMonitoredUrlOverlay from '../AddMonitoredUrlOverlay';

const MonitoredUrlEditButton = () => {
    const [
        isOpen,
        setIsOpen,
    ] = useState(false);

    return (
        <>
            {(() => {
                if (!isOpen) {
                    return null;
                }

                // TODO: Replace this with new editor
                return createPortal(<AddMonitoredUrlOverlay setIsOpen={setIsOpen} />);
            })()}
            <button
                type="button"
                className="inline-flex items-center justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                onClick={() => {
                    setIsOpen(true);
                }}
            >
                Edit
            </button>
        </>
    );
};

export default MonitoredUrlEditButton;

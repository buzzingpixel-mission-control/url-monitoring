import React, { MouseEventHandler } from 'react';
declare const MonitoredUrlTabs: {
    ({ activeHref, addUrlOnClick, }: {
        activeHref?: string;
        addUrlOnClick?: MouseEventHandler<HTMLButtonElement> | undefined;
    }): React.JSX.Element;
    defaultProps: {
        activeHref: any;
        addUrlOnClick: any;
    };
};
export default MonitoredUrlTabs;

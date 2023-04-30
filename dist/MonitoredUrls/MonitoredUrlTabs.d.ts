import { MouseEventHandler } from 'react';
declare const MonitoredUrlTabs: {
    ({ activeHref, addUrlOnClick, }: {
        activeHref?: string;
        addUrlOnClick?: MouseEventHandler<HTMLButtonElement> | undefined;
    }): JSX.Element;
    defaultProps: {
        activeHref: any;
        addUrlOnClick: any;
    };
};
export default MonitoredUrlTabs;

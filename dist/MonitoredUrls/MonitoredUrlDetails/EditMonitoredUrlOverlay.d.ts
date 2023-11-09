import React, { Dispatch, SetStateAction } from 'react';
import { MonitoredUrl } from '../MonitoredUrls';
declare const EditMonitoredUrlOverlay: ({ item, setIsOpen, }: {
    item: MonitoredUrl;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => React.JSX.Element;
export default EditMonitoredUrlOverlay;

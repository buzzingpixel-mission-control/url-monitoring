import { Dispatch, SetStateAction } from 'react';
import { MonitoredUrl } from '../MonitoredUrls';
declare const EditMonitoredUrlOverlay: ({ item, setIsOpen, }: {
    item: MonitoredUrl;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => JSX.Element;
export default EditMonitoredUrlOverlay;

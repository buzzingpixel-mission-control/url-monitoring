import React, { Dispatch, SetStateAction } from 'react';
import { MonitoredUrl } from './MonitoredUrls';
declare const ProjectListItemEditor: ({ item, setEditorIsOpen, }: {
    item: MonitoredUrl;
    setEditorIsOpen: Dispatch<SetStateAction<boolean>>;
}) => React.JSX.Element;
export default ProjectListItemEditor;

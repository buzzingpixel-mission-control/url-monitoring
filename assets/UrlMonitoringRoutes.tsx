import React from 'react';
import { Route } from 'react-router-dom';
import MonitoredUrlsPage from './MonitoredUrls/MonitoredUrlsPage';
import MonitoredUrlDetailsPage from './MonitoredUrls/MonitoredUrlDetails/MonitoredUrlDetailsPage';

const UrlMonitoringRoutes = () => (
    <>
        <Route path="/monitored-urls" element={<MonitoredUrlsPage />} />
        <Route path="/monitored-urls/archived" element={<MonitoredUrlsPage isArchive />} />
        <Route path="/monitored-urls/:slug" element={<MonitoredUrlDetailsPage />} />
    </>
);

export default UrlMonitoringRoutes;

import React from 'react';
import { Route } from 'react-router-dom';
import MonitoredUrlsPage from './MonitoredUrls/MonitoredUrlsPage';

const UrlMonitoringRoutes = () => (
    <>
        <Route path="/monitored-urls" element={<MonitoredUrlsPage />} />
    </>
);

export default UrlMonitoringRoutes;

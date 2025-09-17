import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import Dashboard from "pages/dashboard";
import StockAnalysis from "pages/stock-analysis";
import Watchlists from "pages/watchlists";
import Alerts from "pages/alerts";
import Reports from "pages/reports";
import Settings from "pages/settings";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stock-analysis" element={<StockAnalysis />} />
          <Route path="/stock-analysis/:symbol" element={<StockAnalysis />} />
          <Route path="/watchlists" element={<Watchlists />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;